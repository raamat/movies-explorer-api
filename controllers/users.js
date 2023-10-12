const { NODE_ENV, SECRET_KEY } = process.env;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  return bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name,
      email,
      password: hash,
    })
      .then((user) => res.status(201).send({
        name: user.name,
        email: user.email,
      }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          return next(new BadRequestError('Ошибка в введеных данных'));
        }
        if (err.code === 11000) {
          return next(
            new ConflictError('Пользователь с таким email уже зарегистрирован'),
          );
        }
        next(err);
      });
  });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const payload = { _id: user._id };
      const token = JWT.sign(
        payload,
        NODE_ENV === 'production' ? SECRET_KEY : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.status(200).send({ token });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => User.findById(req.user._id)
  .then((user) => {
    if (!user) {
      return next(new NotFoundError('Текущий пользователь не найден'));
    }
    res.status(200).send(user);
  })
  .catch(next);

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail()
    .then(() => {
      res.status(200).send({ name, email });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Ошибка в введеных данных'));
      } else
        if (err instanceof mongoose.Error.DocumentNotFoundError) {
          next(new NotFoundError('Нет пользователя с таким id'));
        } else { next(err); }
    });
};
