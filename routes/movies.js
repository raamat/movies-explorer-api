const movieRoutes = require('express').Router();
const auth = require('../middlewares/auth');

const { createMovie, getCurrentUserMovies, deleteCurrentUserMovies } = require('../controllers/movies');
const { validationCreateMovie, validationMovieId } = require('../middlewares/validations');

movieRoutes.post('/', auth, validationCreateMovie, createMovie);
movieRoutes.get('/', auth, getCurrentUserMovies);
movieRoutes.delete('/:movieId', auth, validationMovieId, deleteCurrentUserMovies);

module.exports = movieRoutes;
