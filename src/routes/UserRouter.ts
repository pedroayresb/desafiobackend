import { Router } from 'express';
import UserController from '../controllers/UserController';
import UserFactory from '../factory/UserFactory';

const router = Router();

const userService = UserFactory.create();

router.post('/', (req, res, next) => new UserController(req, res, next, userService).createUser());

export default router;
