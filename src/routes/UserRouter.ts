import { Router } from 'express';
import UserController from '../controllers/UserController';
import UserFactory from '../factory/UserFactory';

const router = Router();

const userService = UserFactory.create();

router
  .post('/', (req, res, next) => new UserController(req, res, next, userService).createUser())
  .get('/', (req, res, next) => new UserController(req, res, next, userService).findAllUsers())
  .get('/:cpf', (req, res, next) => new UserController(req, res, next, userService).findUser())
  .delete(
    '/:cpf',
    (req, res, next) => new UserController(req, res, next, userService).deleteUser(),
  );

export default router;
