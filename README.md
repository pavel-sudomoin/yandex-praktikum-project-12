﻿# Проектная работа №12 для Yandex.Praktikum

## Версия

Актуальная версия проекта: **v1.4.0**

Ссылка на репозиторий проекта: [https://github.com/pavel-sudomoin/yandex-praktikum-project-12/](https://github.com/pavel-sudomoin/yandex-praktikum-project-12/)

## Описание

Проект представляет собой заготовку серверной части (backend) для интерактивной страницы *Mesto*.

На данном этапе проекта не реализован весь требуемый функционал серверной части.

На дальнейших этапах разработки проекта функционал будет приведён в соответствие с требованиями.

Проект разработан в учебных целях как проектная работа №12 для **Yandex.Praktikum**.

### Параметры сервера

По-умолчанию сервер запускается на 3000 порту.

### Функционал

На данном (предварительном) этапе разработки сервер обладает следующим функционалом:

* Для клиентов открыт доступ к папке */public* в корне сервера.
  При запуске сервера и переходе на *localhost:3000* загружается страница *Mesto*.

* В ответ на GET-запрос *localhost:3000/users* возвращается JSON-список всех пользователей из базы данных.

* В ответ на GET-запрос *localhost:3000/cards* возвращается JSON-список всех карточек из базы данных.

* В ответ на GET-запрос *localhost:3000/users/8340d0ec33270a25f2413b69* (где переданные после *users/* параметры являются идентификатором пользователя) возвращается:
  - JSON-пользователя в случае, если пользователь с таким идентификатором в базе данных существует;
  - статус ответа 404 и JSON:{ "message": "Нет пользователя с таким id" }, если пользователя с таким идентификатором в базе данных не существует.

* В ответ на запрос по несуществующему адресу возвращается статус ответа 404 и JSON { "message": "Запрашиваемый ресурс не найден" }

В связи с ограничениями реализованного функционала корректная работа интерактивной страницы *Mesto* при использовании представленной серверной части невозможна.

При инциализации страницы *Mesto* происходит загрузка карточек из файла *cards.json*. Однако, дальнейшая работа с карточками на данном этапе разработки невозможна.

На дальнейших этапах разработки проекта функционал серверной части будет приведён в соответствие с требованиями.

### База данных

На данном этапе разработки данные по карточкам и пользователям берутся из заранее сформированных файлов *user.json* и *cards.json*.

Пример структуры файла *user.json*:

```json
[
  {
      "name": "Ada Lovelace",
      "about": "Mathematician, writer",
      "avatar": "https://www.biography.com/.image/t_share/MTE4MDAzNDEwODQwOTQ2MTkw/ada-lovelace-20825279-1-402.jpg",
      "_id": "dbfe53c3c4d568240378b0c6"
  }
]
```

Пример структуры файла *cards.json*:

```json
[
  {
      "likes": [
          {
              "name": "Tim Berners-Lee",
              "about": "Inventor, scientist",
              "avatar": "https://media.wired.com/photos/5c86f3dd67bf5c2d3c382474/4:3/w_2400,h_1800,c_limit/TBL-RTX6HE9J-(1).jpg",
              "_id": "d285e3dceed844f902650f40"
          }
      ],
      "_id": "5d208fb50fdbbf001ffdf72a",
      "name": "Иваново",
      "link": "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
      "owner": {
          "name": "Bret Victor",
          "about": "Designer, engineer",
          "avatar": "https://postlight.com/wp-content/uploads/2018/03/109TC-e1535047852633.jpg",
          "_id": "8340d0ec33270a25f2413b69"
      },
      "createdAt": "2019-07-06T12:10:29.149Z"
  }
]
```

Это временное решение, оно будет исправлено на дальнейших этапах разработки.

### Исходные файлы интерактивной страницы *Mesto*

Исходные файлы интерактивной страницы *Mesto* представлены в [https://github.com/pavel-sudomoin/yandex-praktikum-project-11/tree/develop-for-backend/](https://github.com/pavel-sudomoin/yandex-praktikum-project-11/tree/develop-for-backend/)

Ветка *develop-for-backend* отличается от основной ветки тем, что обращения страницы к серверу происходят не по адресу *https://praktikum.tk*, а по адресу *http://localhost:3000/*

Файлы собранной страницы *Mesto* размещены в папке */public* сервера.

## Используемые технологии

При разработке использован Node.js с фреймворком Express.

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
