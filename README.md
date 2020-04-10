﻿# Проектная работа №14 для Yandex.Praktikum

## Версия

Актуальная версия проекта: **v4.6.0**

Ссылка на репозиторий проекта: [https://github.com/pavel-sudomoin/yandex-praktikum-project-12/](https://github.com/pavel-sudomoin/yandex-praktikum-project-12/)

## Описание

Проект представляет собой серверную часть (backend) для интерактивной страницы *Mesto*.

Проект разработан в учебных целях как проектная работа №14 для **Yandex.Praktikum**.

### Параметры сервера

По-умолчанию сервер запускается на 3000 порту.

### Функционал

Серверная часть обладает следующим функционалом:

* POST-запрос *localhost:3000/signup* создаёт пользователя и возвращает его JSON.
  В теле запроса должен быть передан следующий JSON:
  ```json
  {
    "name": "TEST",
    "about": "TEST",
    "avatar": "https://www.biography.com/.image/t_share/MTE4MDAzNDEwODQwOTQ2MTkw/ada-lovelace-20825279-1-402.jpg",
    "email": "email@ya.ru",
    "password": "12345678"
  }
  ```

* POST-запрос *localhost:3000/signin* позволяет пользователю зарегистрироваться.
  В ответ вернётся JWT-токен (сроком на неделю), записанный в httpOnly куку.
  Для регистрации в теле запроса должен быть передан следующий JSON:
  ```json
  {
    "email": "email@ya.ru",
    "password": "12345678"
  }
  ```

* GET-запрос *localhost:3000/users* возвращает JSON-список всех пользователей из базы данных.

* GET-запрос *localhost:3000/users/id* (где *id* - идентификатор пользователя) возвращает JSON указанного пользователя.

* POST-запрос *localhost:3000/users* создаёт пользователя и возвращает его JSON.
  В теле запроса должен быть передан следующий JSON:
  ```json
  {
    "name": "TEST",
    "about": "TEST",
    "avatar": "https://www.biography.com/.image/t_share/MTE4MDAzNDEwODQwOTQ2MTkw/ada-lovelace-20825279-1-402.jpg",
    "email": "email@ya.ru",
    "password": "12345678"
  }
  ```

* PATCH-запрос *localhost:3000/users/me* обновляет профиль зарегистрированного пользователя и возвращает JSON с обновленным пользователем.
  В теле запроса должен быть передан следующий JSON:
  ```json
  {
    "name": "TEST",
    "about": "TEST"
  }
  ```
 
* PATCH-запрос *localhost:3000/users/me/avatar* обновляет аватар зарегистрированного пользователя и возвращает JSON с обновленным пользователем.
  В теле запроса должен быть передан следующий JSON:
  ```json
  {
    "avatar": "https://www.biography.com/.image/t_share/MTE4MDAzNDEwODQwOTQ2MTkw/ada-lovelace-20825279-1-402.jpg"
  }
  ```

* GET-запрос *localhost:3000/cards* возвращается JSON-список всех карточек из базы данных.

* POST-запрос *localhost:3000/cards* создаёт карточку и возвращает её JSON.
  В теле запроса должен быть передан следующий JSON:
  ```json
  {
    "name": "Иваново",
    "link": "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"
  }
  ```

* DELETE-запрос *localhost:3000/cards/cardId* (где *cardId* - идентификатор карточки) удаляет карточку (если зарегистрированный пользователь является её создателем) и возвращает JSON удалённой карточки.

* PUT-запрос *localhost:3000/cards/:cardId/likes* (где *cardId* - идентификатор карточки) ставит лайк пользователя карточке и возвращает JSON этой карточки.

* DELETE-запрос *localhost:3000/cards/:cardId/likes* (где *cardId* - идентификатор карточки) удаляет лайк пользователя с карточки и возвращает JSON этой карточки.

### Сообщения об ошибках

Если пользователь не прошёл регистрацию, то на любой валидный запрос, за исключением создания нового пользователя и регистрации, будет возвращаться статус ответа 401 и JSON { message: 'Необходима авторизация' }.

Если при регистрации пользователь передал неверную почту или пароль, то возвращается статус ответа 401 и JSON { message: 'Неправильные почта или пароль' }.

Если переданный идентификатор пользователя/карточки не является валидным, то возвращается статус ответа 404 и JSON { message: 'Некорректный id пользователя/карточки' }.

Если не удалось найти пользователя или карточку с указанным идентификатором, то возвращается статус ответа 404 и JSON { message: 'Пользователя/карточки с таким id не существует' }.

Если пользователя пытается удалить карточку, которую создал не он, то возвращается статус ответа 401 и JSON { message: 'Недостаточно прав для удаления данной карточки' }.

В ответ на запрос по несуществующему адресу возвращается статус ответа 404 и JSON { "message": "Запрашиваемый ресурс не найден" }.

При записи данных в базу данных производится валидация полей. При непрохождении валидации выводится соответствующая ошибка валидации.

При любой иной ошибке, которая возникла во время обработки запроса, возвращается сообщение с этой ошибкой.

### База данных

При разработке использована нереляционная база данных MongoDB.

### Схемы используемых в БД моделей

*Поля схемы пользователя:*

* name — имя пользователя, строка от 2 до 30 символов, обязательное поле;

* about — информация о пользователе, строка от 2 до 30 символов, обязательное поле;

* avatar — ссылка на аватарку, строка, обязательно поле.

* email — почта пользователя, строка, обязательно поле.

* password — пароль, строка не менее 8 символов, обязательно поле.

*Поля схемы карточки:*

* name — имя карточки, строка от 2 до 30 символов, обязательное поле;

* link — ссылка на картинку, строка, обязательно поле;

* owner — ссылка на модель автора карточки, тип ObjectId, проставляется автоматически;

* likes — список лайкнувших пост пользователей, массив ObjectId, проставляется автоматически, по умолчанию — пустой массив (поле default).

* createdAt — дата создания, тип Date, проставляется автоматически, значение по умолчанию Date.now.

### Регистрация

Пароли хранятся в базе данных в хешированном виде, для чего используется модуль bcryptjs. API не возвращает хеш пароля при любых запросах.

После регистрации пользователю направляется JWT-токен (сроком на неделю), записанный в httpOnly куку.

## Используемые технологии

При разработке использован Node.js с фреймворком Express и базой данных MongoDB.

Код написан в соответствии со стайлгайдом Airbnb с применением линтера ESLint.

Пароли хешируются модулем bcryptjs. Токен с данными о пользователе соответствует стандарту JWT.

## Установка

Для работы необходимо иметь установленный Node.js.

Для установки требуется:

* Cкопировать все файлы из ветки *develop* к себе в директорию.

* Запустить консоль и перейти в папку с проектом.

* Командой *npm i* установить все потребные плагины и пакеты.

После этого станут доступны два режима запуска сервера:

* команда *npm run start* запускает сервер на localhost:3000;

* команда *npm run dev* запускает сервер на localhost:3000 с хот релоудом;

## Планы по развитию

Функциональность проекта будет доработана на дальнейших этапах разработки.

## Авторы

* [Yandex.Praktikum](https://praktikum.yandex.ru/)

* Судомоин Павел
