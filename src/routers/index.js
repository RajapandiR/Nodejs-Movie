import UserController from '../controllers/user_controller';
import MovieController from '../controllers/movie_controller';
import AuthController from '../controllers/auth_controller';
import express from 'express'
import ForgotController from '../controllers/forgot_controller';
import ChangeController from '../controllers/change_controller';

const router = express.Router()

router.route('/login')
    .get(AuthController.logout)
    .post(AuthController.login)

router.route('/logout')
    .get(AuthController.logout)

router.route('/user')
    .get(UserController.getUser)
    .post(UserController.postUser)

router.route('/movie')
    .get(MovieController.getMovie)
    .post(MovieController.postMovie)
    .put(MovieController.putMovie)

router.route('/movie/:id')
    .delete(MovieController.deleteMovie)
    .get(MovieController.findByIdMovie)

router.route('/forgot')
    .post(ForgotController.postForgot)

router.route('/reset/:token')
    .post(ForgotController.postReset)

router.route('/change')
    .post(ChangeController.postChange)
export default router;