const mongoose = require('mongoose');
const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  return Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Ошибка в введеных данных'));
      }
      next(err);
    });
};

module.exports.getCurrentUserMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

module.exports.deleteCurrentUserMovies = (req, res, next) => {
  const { movieId } = req.params;

  return Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError('Нет фильма с указанным id'));
      }
      if (String(movie.owner) !== req.user._id) {
        return next(new ForbiddenError('Запрещено удалять чужие фильмы'));
      }

      return Movie.deleteOne(movie).then(() => {
        res.status(200).send({ message: 'Фильм успешно удален' });
      });
    })
    .catch((err) => {
      if (err instanceof mongoose.CastError) {
        return next(new BadRequestError('Ошибка в введенных данных'));
      }
      next(err);
    });
};
