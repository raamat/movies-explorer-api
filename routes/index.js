const router = require('express').Router();

const userRoutes = require('./users');
const movieRoutes = require('./movies');
const NotFoundError = require('../errors/NotFoundError');
const { createUser, login } = require('../controllers/users');
const { validationCreateUser, validationLogin } = require('../middlewares/validations');

router.post('/signin', validationLogin, login);
router.post('/signup', validationCreateUser, createUser);

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Неправильный путь'));
});

module.exports = router;
