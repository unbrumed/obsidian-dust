

(function () {
    let Models = {};

    Validator.add( "foreignKey", (value, props) => {
        if(typeof value !== 'string') return Validator.makeError( 'foreignKey must be a string' );
        return Validator.makeError( 'foreignKey check', null, {value, props} );
    });

    Validator.add( "applications", (value, props) => {
        return true;
    });

    Validator.add( "map", (value, props) => {
        if( !props.value || !props.value.type ) return Validator.makeError( 'Wrong Map schema declaration', null, props);
        for( key in value ){
            const obj = {};
            const schema = {};
            obj[key] = value[key];
            schema[key] = props.value;
            const r = Validator.validate( obj, schema );
            if( r !== true ) return Validator.makeError( 'Map validation error', null, r );
        }
        return true;
    });

    Validator.add( "tags", value => {
        if( !Array.isArray( value ) ) return Validator.makeError("tags must be an array", null, value);
        return true;
    });

    const toBackTick = ( str ) => str ? str.split('.').map( s => `\`${s}\`` ).join(".") : "";
    const deepValueType = ( path,schema ) => {
        const keys = path.split('.');
        let o = schema;
        for( const key of keys ){
            if( o[key] ) {
                if( o[key].type && o[key].type === 'object' ){ o = o[key].props; }
                else if( typeof o[key] === 'object' ){ o = o[key]; }
            }
            else { o = undefined; break; }
        }
        return o && !o.type ?  { type: "object" } : o;
    };
    const deepClean = obj => {
        for( const key in obj ){
            if( Object.entries(obj[key]).length === 0 && obj[key].constructor === Object ) delete obj[key];
            if( typeof obj[key] === 'object' ) deepClean( obj[key] );
        }
    };
    const scheme2list = schema => {
		const list = [];
		const concatPath = ( path,key ) => path === "" ? key : `${path}.${key}`;
    	const insert = ( obj,path,array ) => list.push( Object.assign( obj,{ path, array } ));
        const parseSchema = ( schema,path = "" ) => {
            for( const key in schema ){
				if( key === 'type' ) {
						if( schema[key] === 'object' ) return parseSchema( schema['props'], path );
						else if( schema[key] === 'array' ) return parseSchema( schema['items'], path );
						else insert( schema,path,true );
				}
                if( typeof schema[key] === 'object' ){
                    if( schema[key].type ) {
						if( schema[key].type === 'object' ) parseSchema( schema[key].props, concatPath( path,key) );
                        else if( schema[key].type === 'array' ) parseSchema( schema[key].items, concatPath( path,key) );
						else insert( schema[key],concatPath( path,key),false );
					}
				}
			}
		}
	    parseSchema( schema );
	    return list;
    };

    const get = async ( name, options = {} ) => {
        if( !name || !Models[name] ) return Error('Model not found');
        const schema = Models[name].schema;
        const collection = name;

        const filters = options.filters ? options.filters : [];
        const filtersBinds = options.filtersBinds ? options.filtersBinds : [];

        let letBody = "";
        let reqBody = `_key: ${collection}._key,`;
        const bind = {};
        const aliases = [];

        const attachSingle = ( path, collection, src ) => {
            let right = `(FOR ${collection} IN ${collection}
                FILTER ${collection}._key == ${src}.${path[0]}
                RETURN ${collection}.${path[1] ? path[1] : '_key'})`; // !!!!!!!!
            return right;
        };


        const attachArray = ( path, collection, src ) => {
            let right = `(FOR ${collection} IN ${collection}
                FILTER [${collection}._key] ALL IN ${src}.${path[0]}
                RETURN ${collection})${path[1]?"[*]."+path[1]: ""}`;
            return right;
        };

        const parsePath = ( str,schema,collection ) => {
            const path = str.split(':');
            const t = deepValueType( path[0],schema );
            if( t ) {
                if( path[1] === '$' && t.type === 'array' ) return `LENGTH(${toBackTick( collection + '.' + path[0])})`;
                if( path[1] === '$' && t.type === 'object' ) return `LENGTH(ATTRIBUTES(${toBackTick( collection + '.' + path[0])}))`;
                if( path[1] === '#' || t.type === 'boolean' || t.type === 'object' || t.type === 'string' || t.type === 'tags' || t.type === 'enum' || t.type === 'number' || t.type === 'date'){
                    return toBackTick( collection + '.' + path[0]);
                }
                if( t.type === 'foreignKey' )
                    return attachSingle( path,t.external ? t.collection : t.collection, collection ) + '[0]';
                if( t.type === 'array' && t.items && t.items.type === 'foreignKey' )
                    return attachArray( path,t.items.external ? t.items.collection : t.items.collection,collection );
            }
            return undefined;
        };

        const deep = ( objectPtr, reqPtr  ) => {
            for( const key in objectPtr ){
                if( typeof objectPtr[key] === 'object' ){
                    reqBody += `${toBackTick(key)}: { `;
                    deep( objectPtr[key],reqPtr[key] );
                    reqBody += '},';
                }
                else {
                    const right = parsePath( objectPtr[key],schema,collection );
                    if( right ) reqBody += `${toBackTick(key)}: ${right} ,`;
                }
            }
            reqBody = reqBody.slice(0,-1);
        };

        let req = `FOR ${collection} IN @@collection `;
        if( options.fields ){
            deep( options.fields, reqBody );
            req += letBody;
        }

        filters.forEach( filter => req += `FILTER ${filter} ` );
        filtersBinds.forEach( b => bind[b.name] = b.value );

        if( options.key ) req += `FILTER ${collection}._key == "${options.key}" `;
        if( options.sort ) req += `SORT ${options.sort.join(",")} `;
        if( options.limit ) req += options.limit.offset ? `LIMIT ${options.limit.offset},${options.limit.count} ` : `LIMIT ${options.limit.count} `;
        if( options.fields ) req += `RETURN { ${reqBody} }`;
        else req += `RETURN ${collection}`;
        bind['@collection'] = collection;
        if( options.foreignKey) bind['foreignKey'] = options.foreignKey;
            //console.log('GET options',options);
            //console.log('GET query',req);
            //console.log('GET bind',bind);
        return await db.arango.query( req, bind );
    };

    const findOne = async (...args) => {
        const data = await get(...args);
        return data instanceof Error ? data : data[0];
    };

    const findAll = async (...args) => get(...args);

    const checkForeignKey = async (validationError) => {
        if( validationError !== true ){
            //  Считаем ошибки. Если есть хоть одна ошибка, кроме 'foreignKey check', то выходим
            if(validationError.filter(e => e.type === 'foreignKey check').length !== validationError.length) {
                validationError.forEach(e => console.log('checkForeignKey', e.message));
                return new Error( 'Validation error!');
            }
        }

        if( validationError !== true ){
            for(const e of validationError) {
                //console.log(e, e.actual.value, e.actual.props.collection);
                if(typeof e.actual !== 'object' &&
                   typeof e.actual.value !== 'string' &&
                   typeof e.actual.props !== 'object' &&
                   typeof e.actual.props.collection !== 'string') return new Error( 'Validation model error: 666!', e);

                const check = await db.arango.query(`
                    FOR doc IN @@collection
                    FILTER doc._key == @key
                    RETURN doc._key`,
                {
                    '@collection': e.actual.props.collection,
                    'key': e.actual.value
                });
                if(check.length === 0) return new Error(`Validation error: bad foreignKey "${e.field}"!`);
            }
        }
    }

    const update = async ( name, key, data, merge = true, deleteForeignKey ) => {
        if( !name || !Models[name] ) return Error( 'Model not found');


        const schema = JSON.parse(JSON.stringify(Models[name].schema));
        //  Удаляем из схемы foreignKey, если надо
        if(deleteForeignKey) delete schema[deleteForeignKey];

        const validationError = Validator.validate( data, schema );
        //  Проверяем foreignKey
        const error = await checkForeignKey(validationError, true);
        if(error instanceof Error) return error;


        const bind = {
            '@collection': name,
            'key': key,
            'data': data,
        };
        const req = `UPDATE @key WITH @data IN @@collection OPTIONS { mergeObjects: ${!!merge} }`;
        return await db.arango.query( req, bind );
    };
    const insert = async ( name, data ) => {
        if( !name || !Models[name] ) return Error( 'Model not found');
        if( !data ) return Error( 'Error,empty payload');

        const validationError = Validator.validate( data, Models[name].schema );
        //  Проверяем foreignKey
        const error = await checkForeignKey(validationError);
        if(error instanceof Error) return error;

        const bind = {
            '@collection' : name,
            'data': data,
        };
        const req = `INSERT @data INTO @@collection RETURN NEW`;
        return await db.arango.query( req, bind );
    };
    const count = async ( name, options = {} ) => {
        if( !name || !Models[name] ) return Error( 'Model not found');

        const filters = options.filters ? options.filters : [];
        const filtersBinds = options.filtersBinds ? options.filtersBinds : [];
        const bind = { '@collection': name };

        let req = `FOR ${name} IN @@collection `;
        filters.forEach( filter => req += `FILTER ${filter} ` );
        filtersBinds.forEach( b => bind[b.name] = b.value );
        req += `COLLECT WITH COUNT INTO length RETURN length`;
        if( options.foreignKey) bind['foreignKey'] = options.foreignKey;
        return await db.arango.query( req, bind );
    };
    const contain = async ( name,key ) => {
        if( !name || !Models[name] ) return Error( 'Model not found');

        const result = [];
        for( const models in Models ){
            const schema = Models[models].schema;
            const collection = models;
            const list = scheme2list( schema ).filter( item => item.type === 'foreignKey' && item.collection === name );
            if( list.length !== 0 ){
                let req = "";
                const bind = {};
                bind[`@${collection}`] = collection;
                req += `LET ${collection} = LENGTH(\n FOR ${collection} IN @@${collection}\n `;
                req += ` FILTER `;
                for( let row in list ){
                    req += list[row].array ? ` "${key}" IN ${collection}.${list[row].path} OR ` : ` ${collection}.${list[row].path} == "${key}" OR `;
                }
                req = req.substr( 0, req.length-3 );
                req += `RETURN ${collection}\n )\n`;
                req += `RETURN ${collection}`;
                const count = await db.arango.query( req, bind );
                result.push( `${collection} : ${count[0]}` );
            }
        }
        return result;
    };
    const isRemovable = async ( name,key ) => {
        if( !name || !Models[name] ) return Error( 'Model not found');

        let req = "";
        const bind = {};
        const collections = [];
        for( const model in Models ){
            const schema = Models[model].schema;
            const collection = model;
            const list = scheme2list( schema ).filter( item => item.type === 'foreignKey' && item.collection === name );
            if( list.length !== 0 ){
                collections.push( collection );
                bind[`@${collection}`] = collection;
                req += `LET ${collection} = LENGTH(\n FOR ${collection} IN @@${collection}\n `;
                req += ` FILTER `;
                for( let row in list ){
                    req += list[row].array ? ` "${key}" IN ${collection}.${list[row].path} OR ` : ` ${collection}.${list[row].path} == "${key}" OR `;
                }
                req = req.substr( 0, req.length-3 );
                req += `RETURN ${collection}\n )\n`;
            }
        }
        req += `RETURN ${collections.join(' + ')}`;
        if( !collections.length ) return 0;
        const linksCount = await db.arango.query( req, bind );
        if( linksCount instanceof Error) return linksCount;
        return linksCount[0];
    };
    const deleteDocument = async ( name,key ) => {
        if( !name || !Models[name] ) return Error( 'Model not found');

        const count = await isRemovable( name,key );

        if( count instanceof Error) return count;
		if( count ) return Error(`${count} links found. Cant delete this document`);

        return await db.arango.query( `REMOVE "${key}" IN @@collection`, { '@collection': name });
    };
    const extGet = async ( name, options = {} ) => {
        if( !name || !Models[name] ) return Error( 'Model not found');

        const data = await get( name, options );
        if( data instanceof Error ) return data;
        const documentsCount = await count( name, options );
        if( documentsCount instanceof Error ) return documentsCount;
        return { data, count: documentsCount };
    };


    const testError = () => {
        return new Error('testError');
    };


    global.Model = name => {
        if(name === null) return Models;
        if(name) {
            return {
                get: ( options ) => get( name, options ),
                findOne: ( options ) => findOne( name, options ),
                findAll: ( options ) => findAll( name, options ),
                extGet: ( options ) => extGet( name, options ),
                update: ( key,data,merge,deleteForeignKey ) => update( name, key, data, merge, deleteForeignKey ),
                count: ( options ) => count( name, options ),
                delete: ( key ) => deleteDocument( name, key ),
                isRemovable: ( key ) => isRemovable( name, key ),
                insert: ( data ) => insert( name, data ),
                contain: ( key ) => contain( name, key ),
                testError: () => testError(),
            };
        } else return models => Models = models; // Замена модели
    };
})();
