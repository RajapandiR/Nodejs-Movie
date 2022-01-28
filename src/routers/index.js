import UserController from '../controllers/user_controller';
import MovieController from '../controllers/movie_controller';
import AuthController from '../controllers/auth_controller';
import express from 'express'
const router = express.Router()

router.route('/login')
    .get(AuthController.logout)
    .post(AuthController.login)

    router.route('/logout')
    .get(AuthController.logout)

router.route('/user')
    // .get(UserController.getUser)
    .post(UserController.postUser)

router.route('/movie')
    .get(MovieController.getMovie)
    .post(MovieController.postMovie)
    .put(MovieController.putMovie)

router.route('/movie/:id')
    .delete(MovieController.deleteMovie)
    .get(MovieController.findByIdMovie)

export default router;