import { Router } from 'express';
import authRouter from "./authRoutes.js";
import userRoute from './userRoutes.js';
import vcardRouter from './vcardRoute.js';


const routers = Router();

routers.use('/users', userRoute);
routers.use('/auth', authRouter)
routers.use('/virtual-cards', vcardRouter);

export default routers;
