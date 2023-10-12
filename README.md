# API для проекта Movie Explorer

## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и фильма   
`/models` — папка с файлами описания схем пользователя и фильма 
  
Остальные директории вспомогательные, создаются при необходимости разработчиком

## Клонирование проекта

1. git clone https://github.com/raamat/movies-explorer-api.git (команда клонирования)
2. npm i (установка зависимостей)

## Запуск проекта

`npm run start` — запускает сервер на localhost:3000  
`npm run dev` — запускает сервер на localhost:3000 с hot reload
`npm run lint` — выполняется проверка проекта, в результате работы которой должны отсутствовать ошибки линтинга

## Ссылка на репозиторий

https://github.com/raamat/movies-explorer-api.git

## Ссылка API

https://api.movies.raamat.pw

## Роуты API

POST `/signup` - создаёт пользователя с переданными в теле email, password и name
POST `/signin` - проверяет переданные в теле почту и пароль и возвращает JWT

GET `/users/me` - возвращает информацию о пользователе (email и имя)
PATCH `/users/me` - обновляет информацию о пользователе (email и имя)
GET `/movies` - возвращает все сохранённые текущим пользователем фильмы
POST `/movies` - создаёт фильм с переданными в теле: country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
DELETE `/movies/_id` - удаляет сохранённый фильм по id
