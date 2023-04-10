# build 8
- [Feature #6410](https://redmine.tamashi.games/issues/6410): Подключить клиент к серверу, добавить загрузку сохранений. ET: 8/12/16=12. Spent: 13.08 h
- [Support #6795](https://redmine.tamashi.games/issues/6795): Добавить подгрузку конфига из локального файла, описать инструкцию по работе с конфигом. ET: 1/2/3=2. Spent: 2.83h
- [Feature #6803](https://redmine.tamashi.games/issues/6803): Сюжетные менеджеры по ГДД r1.5. ET: 10/12/14=12h. Spent: 10.17 h
- [Feature #6829](https://redmine.tamashi.games/issues/6829): "Реликвии" по ГДД r1.5. ET: 10/14/18=14h. Spent: 11.92 h

## 7.1
### Клиент-сервер
- Добавлена возможность входа по OAuth твича
- Поправлен вход в твитч в режиме расширения
- Добавлена возможность сохранять и загружать пользовательские данные на сервере
### Конфиг
- Добавлена опция загрузки сохранения из файла на компьютере
### devpanel
- Добавлена кнопка входа через твитч
- Добавлено поле отображения статуса подключения к серверу
- Добавлена кнопка сброса сохранения
- Добавлена кнопка загрузки файла конфига с компьютера
### доки
- Добавлено описание всех полей конфига [tamashi-itd-doc-1](tamashi-itd-doc-1.md)
- Добавлена инструкция генерации и загрузки конфигурации [tamashi-itd-doc-0](tamashi-itd-doc-0.md)

## 7.2 "Сюжетные менеджеры"
### Конфигурации
- Добавлено поле `ranksLevels`. Массив чисел. Для несюжетных оставлять пустым.
- Добавлено поле `rankNames`. Массив строк. Индексы привязываются к `ranksLevels`
- Добавлено поле `storylineLevels`. Массив чисел.
- Добавлено поле `storylineIds`. Массив строк. Индексы привязываются к `storylineIds`.
- Добавлен раздел `storylines`
### Клиент
- Добавлено отображение ранка менеджера в соотсветствии `ranksLevels` и `rankNames`
- Для сюжетных менеджеров добавлено отслеживание получения уровней (по `storylineLevels`) и отображения диалоговых окон (по `storylineIds`)
- Добавлена логика отображения текста из раздела `storylines`
## 7.3 "Реликвии"
### Конфигурации
- Добавлен раздел конфигураций `relics`
	- `cost` - стоимость
	- `name` - отображаемое имя
	- `icon` - отображаемая иконка
	- `description` - текстовое описание
	- `effectScope`. Доступные значения - `psource`, `employee`, `coffee`, `gadget`
	- `effectFilter`.
		- Для `psource` - id локации
		- Для `employee` - индекс редкости (`rarity`)
		- Для `gadget` - тип оборудования (`narrativeType`)
	- `effectType`.
		- Для `psource` - `profit_bonus`, `upgrade_bonus`, `threshold_bonus`
		- Для для `employee` и `gadget` - название поля
		- Для `coffee` - `cost_bonus`, `duration_bonus`  
### Клиент
- Добавлена вкладка "реликвии" в магазине. Отображает все реликвии в игре

- Для `effectScope: psource` добавлен эффект `effectType: profit_bonus`, умножающий доход с источников.
- Для `effectScope: psource` добавлен эффект `effectType: upgrade_bonus`, умножающий стоимость улучшения.
- Для `effectScope: psource` добавлен эффект `effectType: threshold_bonus`, умножающий промежуток между сбором дохода
- Для `effectFilter: psource` добавлен фильтр по stage id.
- Для `effectScope: employee` доступны `effectType`: `healthMax`, `healthRegen`, `attackRate`, `attackDamage`
- Для `effectScope: gadget` доступны `effectType`: `effectValue`, `chargesMax`, `regenRate`
### Исправления
- Поправлена ошибка дублирования событий при сбросе игры и загрузке конфига через панель разработчика
