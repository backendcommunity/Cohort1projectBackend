import { Router } from 'express';
import { createCard } from '../controller/vcardController.js';
import { isAuth } from '../middleware/isAuth.js';

const router = Router();
router.post('/', isAuth, createCard);

export default router;
