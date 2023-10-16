const { celebrate, Joi } = require('celebrate');

const REGULAR_EXPRESSION = /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/i;

const validationCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  }),
});

const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  }),
});

const validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required(),
  }),
});

const validationCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string()
      .required()
      .regex(REGULAR_EXPRESSION)
      .message('Недопустимый URL ссылки на постер'),
    trailerLink: Joi.string()
      .required()
      .regex(REGULAR_EXPRESSION)
      .message('Недопустимый URL ссылки на трейлер фильма'),
    thumbnail: Joi.string()
      .required()
      .regex(REGULAR_EXPRESSION)
      .message('Недопустимый URL ссылки на миниатюру постера к фильму'),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validationMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string()
      .hex()
      .message('Идентификатор фильма должен быть в 16-ричной системе')
      .length(24)
      .message('Длина идентификатора фильма должна быть 24 символа')
      .required(),
  }),
});

module.exports = {
  validationCreateUser,
  validationLogin,
  validationUpdateUser,
  validationCreateMovie,
  validationMovieId,
};
