﻿# Проектная работа №13 для Yandex.Praktikum

## Версия

Актуальная версия проекта: **v2.5.0**

Ссылка на репозиторий проекта: [https://github.com/pavel-sudomoin/yandex-praktikum-project-12/](https://github.com/pavel-sudomoin/yandex-praktikum-project-12/)

## Описание

Проект представляет собой заготовку серверной части (backend) для интерактивной страницы *Mesto*.

На данном этапе проекта не реализован весь требуемый функционал серверной части.

На дальнейших этапах разработки проекта функционал будет приведён в соответствие с требованиями.

Проект разработан в учебных целях как проектная работа №13 для **Yandex.Praktikum**.

### Параметры сервера

По-умолчанию сервер запускается на 3000 порту.

### Функционал

На данном (предварительном) этапе разработки сервер обладает следующим функционалом:

* GET-запрос *localhost:3000/users* возвращает JSON-список всех пользователей из базы данных.

* GET-запрос *localhost:3000/users/id* (где *id* - идентификатор пользователя) возвращает JSON указанного пользователя.

* POST-запрос *localhost:3000/users* создаёт пользователя и возвращает его JSON.
  В теле запроса должен быть передан следующий JSON:
  ```json
  {
    "name": "TEST",
    "about": "TEST",
    "avatar": "https://www.biography.com/.image/t_share/MTE4MDAzNDEwODQwOTQ2MTkw/ada-lovelace-20825279-1-402.jpg"
  }
  ```

* PATCH-запрос *localhost:3000/users/me* обновляет профиль пользователя и возвращает JSON с обновленным пользователем.
  В теле запроса должен быть передан следующий JSON:
  ```json
  {
    "name": "TEST",
    "about": "TEST"
  }
  ```
 
* PATCH-запрос *localhost:3000/users/me/avatar* обновляет аватар пользователя и возвращает JSON с обновленным пользователем.
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

* DELETE-запрос *localhost:3000/cards/cardId* (где *cardId* - идентификатор карточки) удаляет карточку и возвращает JSON удалённой карточки.

* PUT-запрос *localhost:3000/cards/:cardId/likes* (где *cardId* - идентификатор карточки) ставит лайк карточке и возвращает JSON этой карточки.

* DELETE-запрос *localhost:3000/cards/:cardId/likes* (где *cardId* - идентификатор карточки) удаляет лайк с карточки и возвращает JSON этой карточки.

### Сообщения об ошибках

Если переданный идентификатор пользователя не является валидным, то возвращается статус ответа 404 и JSON { message: 'Некорректный id пользователя/карточки' }.

Если не удалось найти пользователя или карточку с указанным идентификатором, то возвращается статус ответа 404 и JSON { message: 'Пользователя/карточки с таким id не существует' }.

В ответ на запрос по несуществующему адресу возвращается статус ответа 404 и JSON { "message": "Запрашиваемый ресурс не найден" }.

При записи данных в базу данных производится валидация полей. При непрохождении валидации выводится соответствующая ошибка валидации.

При любой иной ошибке, которая возникла во время обработки запроса, возвращается сообщение с этой ошибкой.

### База данных

При разработке использована база данных нереляционная база данных MongoDB.

### Схемы используемых в БД моделей

*Поля схемы пользователя:*

* name — имя пользователя, строка от 2 до 30 символов, обязательное поле;

* about — информация о пользователе, строка от 2 до 30 символов, обязательное поле;

* avatar — ссылка на аватарку, строка, обязательно поле.

*Поля схемы карточки:*

* name — имя карточки, строка от 2 до 30 символов, обязательное поле;

* link — ссылка на картинку, строка, обязательно поле;

* owner — ссылка на модель автора карточки, тип ObjectId, обязательное поле;

* likes — список лайкнувших пост пользователей, массив ObjectId, по умолчанию — пустой массив (поле default).

* createdAt — дата создания, тип Date, значение по умолчанию Date.now.

### Исходные файлы интерактивной страницы *Mesto*

Исходные файлы интерактивной страницы *Mesto* представлены в [https://github.com/pavel-sudomoin/yandex-praktikum-project-11/tree/develop-for-backend/](https://github.com/pavel-sudomoin/yandex-praktikum-project-11/tree/develop-for-backend/)

Ветка *develop-for-backend* отличается от основной ветки тем, что обращения страницы к серверу происходят не по адресу *https://praktikum.tk*, а по адресу *http://localhost:3000/*

## Используемые технологии

При разработке использован Node.js с фреймворком Express и базой данных MongoDB.

Код написан в соответствии со стайлгайдом Airbnb с применением линтера ESLint.

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
