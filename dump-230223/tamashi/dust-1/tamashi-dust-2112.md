# brume-0 

[Names of large numbers](https://en.wikipedia.org/wiki/Names_of_large_numbers)

```
Mil,Bil,Tril,Quad,Quint,Sext,Sept,Oct,Non,Dec,Undec,Duod,Tredec,Quatt,Quind,Sexdec

Мил,Бил,Трил,Квад,Квинт,Секст,Септ,Окт,Нон,Дец,Унд,Дуод,Тред,Кват,Квин

K,M,B,T,AA,AB,AC,AD,AE,AF,AG,AH,AI,AJ,AK,AL,AM
```

# dust-0

# r1
- [Таски от Константина на 211126](tamashi-dust-211126.md)
- [Dungeon inc., общие механики](tamashi-DungeonInc-decompose-0.md) #tamashi-itd 
- [tamashi-ue-position-211204](tamashi-ue-position-211204.md)

`# r2`
- Логика таймеров
- Логика ачивок
- Логика сундуков
- Логика диалогов
- Инвентарь
- Триггеры

**Поддерживать одинаковую семантику сущностей в коде и документе**
- Источник дохода: сущность по генерации денег
- Валюта: gold, gems, coffee. Для gold поддерживаются числа более 2^1024 
- Карточки: то что игрок коллекционирует, содержит уровень и количество. Менеджеры и оборудование (в коде - гаджеты)
- Инвентарь: содержит источники дохода, карточки, локации
# dust-1

# dump-0
- [log 21.11.12](tamashi-itd-log-211112.md)
- [log 21.10-21.11](tamashi-itd-log-2110_2111.md)

## 211118
А. Решить проблемы дизайна
	[UI: Финализировать стили, подготовить страницу с шаблонами](https://redmine.tamashi.games/issues/6409)
	- Визуально. Проработать стили элементов
	- Юнификация. Выделить основные виды элементов
	- [Документация: описание элементов UI](https://redmine.tamashi.games/issues/6413)
Б. Документация
	https://redmine.tamashi.games/issues/6395
	- Текущего кода 
	- Высокоуровневых концепций
	- Планирования
В. Сопровождение
	- [Настроить CI](https://redmine.tamashi.games/issues/6411)
Г. Разное
	- [Добавить графику: вписываемые в текст иконки](https://redmine.tamashi.games/issues/6392)
	- [Ошибки отображения размеров элементов](https://redmine.tamashi.games/issues/6391)
Д. Хвосты
	- [Подключить клиент к серверу, добавить загрузку сохранений](https://redmine.tamashi.games/issues/6410)
	- [Загрузка конфига игры из стороннего источника](https://redmine.tamashi.games/issues/6412)
	- Добавить корректные отступы для твич


# 211215 Фидбек по билду
(часть моментов не смог протестировать, т.к есть блокеры - 
в частности состояние кнопки buy/upgrade при недостатке денег никак не проверить, т.к денег всегда много;
апгрейд менеджеров проверять сложно, т.к в списке "склада" они появляются по неясным правилам;
клики по таскам в спринтах не могу проверить, т.к бой слишком быстрый, а таск висит так, что его хп загораживает спрайт менеджера).

1. Кор, этажи:
- все этажи локации, в т.ч с самого начала должны быть видны (в т.ч все не купленные тоже, покупать конечно все так же можно только ближайший не разблоченый этаж)
- ранг этажа не меняется на 150-м уровне; через какое-то время изменился сам (после клика по этажу?)
- денег всегда больше чем надо (надо настроить чтобы для апгрейда (или покупки следующего) этажа приходилось хоть немного подождать накопления суммы).

Мелочи:
- кнопка buy/upgrade этажа не нажимается, пока не проскроллишь ее ниже надписи "локация"
- с какого-то момента вместо порядка денег выводится undefined, предлагаю использовать латинские обозначения порядков (см. где-то в прототипе айдлера есть список); И убрать дробную часть из отображаемого значения.
- все еще нет инерционной прокрутки этажей (дернул-отпустил-скроллится с затуханием скорости, настраиваемо)

2. Кор, юниты:
- после боя с таском получил сундук, в нем был менеджер. Менеджер появился в окне выбора при установке на этаж, но не появился в списке менеджеров (на "складе")
- на "складе" все еще нет полного списка менеджеров с разбивкой на доступных/недоступных, есть только некие Card (1/1)

3. Спринты:
- бой протекает слишком быстро, не успеваю кликнуть по таску. Надо настроить параметры чтобы бой протекал хотя бы секунд 5

# 211220 Повод к увольнению
Прогулялся немного в направлении, на которое намекал @Alexander Gladysh в последней ветке.  
Нашлось следующее:  
В одном предложении тред "Это не игра": Наш продукт либо должен обеспечивать интерфейс взаимодействия между стримером и зрителем, либо быть поводом для устного общения стримера и зрителя. Разумеется, через игровые механики.  
  
В случае интерфейса взаимодействия, например:  
- Окно обнуления добавляет глобальную валюту и стримеру, и тот покупает улучшения для всех своих зрителей (Те же реликвии из данжона)  
- "Спринты", "проверки" отправляются стримером  
- Какие-то проценты от дохода игроков падают и стримеру, он чота за них делает. Например, может открывать новых "легендарных" сотрудников для всех зрителей.  
- Или, например, для всех доступна только одна локация, пока сам стример не накопит на вторую.  
  
Обобщенно: где-то в игровом лупе заложить легкое пересечение между игроком и игроком-хостом.  
  
В случае повода общения:  
- Предоставлять только стримеру какую-то информацию, которая может быть как-то ценна игрокам (без понятия что это может быть)  
- Давать какой-то повод называть ники игроков  
- Давать повод игрокам писать в чат стримеру (чота просить, тож не знаю)  
  
Возможно, самое простое и надежное - это добавить давно проверенную механику донатов, только в игровых деньгах.  
  
@Konstantin Vladimirov да, мультиплеер. Нет, не совсем синхронный. Да, сложностей добавит. Нет, не настолько. И по ТЗ вряд ли удастся избежать.  
  
@Андрей Х, @Valeria Nechai не призыв к действию, просто к размышлению. Примеры от балды.  
Минимальные вводные - это:  
- "панель стримера", которая возможно и не нужна.  
- "Реализованный экран настроек стримера;", он уже как требование в ТЗ. Любой экран, который доступен только стримеру, сюда подойдет  
- Панель с какой-то игровой информацией, интегрированная в трансляцию - тоже в ТЗ.

