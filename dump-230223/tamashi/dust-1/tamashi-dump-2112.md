
## Реализация редкости и процедуры генерации контента лутбоксов

```
[doc](https://docs.google.com/document/d/1rx-AP-ZLk6CTjJkR9AvyyB7hS1f8IcYJ7rUd675Vjxw/edit#heading=h.u9ld8lnwlkd4)
## Таска по сундукам
- У сундука два списка генерации: **100% дроп и вероятностный дроп**.
- 100% дроп выдается всегда. вероятностный дроп выдается в остаток
- Вес сундука и предметов оставляем
- Нужно ввести понятие pools: группы объектов. Их указывать в дропе сундука, и рандомно выбирать оттуда один (Несколько?) предметов
## Комменты по доке:
- предположение: не хватает описания конкретного результата, исходного состояния
- Примеры нужно разбивать на несколько категорий, от простейшего к сложному. Не перемешивать. 
- Каждый пример - простейшей формулой:
	- ex: `(Сундук "легендарный" содержит [список])` -> `На выходе выпадет обязательно что-то из `
- Ко всем названиям (вес, таск, нужны внятные пояснения - в сноске или словаре

## items
| rarity | weight |
| ------ | ------ |
| 0-10   | 0+ |

## lootpacks

| pool                 | header |
| ------               | ------ |
| id1:0.5, id2:1 , ... | cell   |
```

## 211214
- Закончить [Таски от Константина на 211126](tamashi-dust-211126.md)
	- ✔Типы и уровни тасков - в конфиг
	-✔ Генерацию уровней сложности тасков - проработать
	- ✔"Редкость сундука и объём бюджета зависит от количества спринтов, выполнявшихся одновременно (1-3 — деревянный, 4 — серебряный, 5 — золотой)."
	- ✔Выбор до 5 тасков, повышение сложности при прохождении уровня
- Отображать менеджера с idle через пикси
	-✔ 2 кадра анимации
	- ✔System для отрисовки менеджеров: анимация, статы
- Рисовать список тасков через html
	- ✔Тексты тасков в конфиг
	- html тасков
	- систему отрисовки списка тасков
- ✔ Проработать бой до нормальных скоростей
	- 


![Есть сложная метааналитическая проблема категории "Чо за херню он несет"](https://media.discordapp.net/attachments/952998570494136432/953239721943904266/yaOVPrSJVTI.png?width=618&height=632)

```
## Сбагрить:
- Визуал спринтов: как таски отображаются на экране. (Отображение списка задач текстом, напротив каждого - время выполнения?)
```

```
# 211221
## Задачи
[Диздок](https://docs.google.com/document/d/1RLvMIvd5woufQTq9CwOIIhLySp3LezsCi50GzKTzWiI/edit)
- Обновление [менеджеров](https://docs.google.com/document/d/1RLvMIvd5woufQTq9CwOIIhLySp3LezsCi50GzKTzWiI/edit#heading=h.xfhk6c6ojlhj)
- Обновление спринтов
- Обновление обнуления

# 211223
## На обсуждение
- Нужно разграничить типы информации в диздоке и в техдоке, и кто занимается этой работой. Типы и виды данных, алгоритмы - точно должны идти в техдок и не описываться загодя, до реализации.
- Про глубину кроличьей норы: в "сюжетных менеджерах" введено:
	- "Задания". Задание есть в глоссарии, но описано только как часть механики менеджеров
	- "Сценарий". Абсолютно новое понятие
- Алгоритм *"Затемнение убирается. Аватарка менеджера пропадает. В заданиях игрока данное задание перечёркивается как выполненное. Игрок получает награду."* - полезен. Алгоритм *"1.  Блокируются все элементы интерфейса. Клик по любой части экрана: текущий баббл закрывается, производится проверка, есть ли дальнейшие реплики.  
    4.1 Если да - появляется новый баббл, переход к пункту 4.  
    4.2 Если нет - переход к пункту 5."* излишен.
- .

```
# r0
Подключение клиента:
1. Запрос данных сохранения.

Доступ к странице игры:
1. Сервис ограничения доступа к приложению - session
2. bearer токена нет. Генерируем новый id и токен.
3. Сервис логина по твитч аккаунту - bearer приходит сразу
4. 
- Два режима входа - по

# r1
По какой логике:
- Считается и повышается урон кликами
- Повышаются статы персонажей при увеличении уровня
- Задается время и стоимость перезарадки менеджеров

## Считается и повышается урон кликами
- Урон зависит от уровня этажа напрямую? `(level * damage)`
- Есть ли базовый урон? `(level * damage + baseDamage)`
- Или повышается каждые X уровней на N?
- Зависимость N от уровня линейная или по формуле?
- Или на каждые X уровней задается напрямую через конфиг?

@tynrare 💡: r2 был повышен до [пыли-2112](tamashi-dust-2112.md)

# r3
- Открыть "магазин" -> вкладка "сундуки"
- Будет доступно 3 кнопки: 
	- "открыть сундук А" 
	- "открыть сундук Б" 
	- "открыть сундук С"
- При нажатии на любую высвечивается попап, в котором перечислены выпавшые предметы и их количество
- Из "сундука" выпадает несколько предметов, задаваемых статичным списком. Каждый предмет может выпасть `-|.`



# 211120+

1. Решить проблемы текущей архитектуры - перенести рендер различных элементов игры на ECS 
2. Для всех кнопок нужен класс управления этими кнопками. Включение/выключение, отслеживание условий вроде стоимости покупки
3. В игре два типа данных по работе с числами, нужно сделать вокруг них большую обертку `На 220315 - работает`

#dust-f Выделить систему дропа и пулов в *систему/логику* формирования через аналог query запросов - на вход получаем необходимые требования, на выходе список полученных предметов

`## time-travel ✈️ 220315`

1. Не-а. Анимаций в итоге не завезли, картинка вся на css. `..-|`
2. Да, Тим, нужен.
3. Вроде math.js автоматически решает проблему конвертации между Nuber и Decimal