# iStorage
Вариант сочетания возможностей IndexedDB с простотой LocalStorage 
Демонстрация:
https://dictz.github.io/iStorage_demo.html

Функции iStorage (асинхронны) :
<pre>
  • obj = await iStorage('Имя хранилища')
    Создаёт или открывает хранилище. В случае ошибки вернёт true ;

  • obj.setItem('имя данных', данные)
    Сохраняет данные (допустимые для IndexedDB) ;
  • obj.getItem('имя данных')
    Возвращает данные или undefined ;
  • obj.removeItem('имя данных')
    Удаляет данные ;
  • obj.clear()
    Очищает хранилище ;
  • obj.delete()
    Удаляет хранилище ;

  • obj.err
    Хранит состояние последнего обращения к indexedDB:
    true - была ошибка; false - ошибки небыло.
    Это значение возвращается всеми obj.функция(ми) кроме getItem.
</pre>
