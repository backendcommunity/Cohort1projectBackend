import { Router } from 'express';
import userRoute from './userRoute';
import vcardRouter from './vcardRoute';

const routers = Router();
routers.route('/users', userRoute);
routers.route('/virtual-cards', vcardRouter);

export default routers;
