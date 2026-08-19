import express from 'express';
import { createService, getServiceInfo, getServices, closeService } from '../controller/service.controller.js';
import { authenticationToken, roleMiddleware } from '../middleware/authMiddleware.js';

export const serviceRouter = express.Router();

const AT = authenticationToken;
const role = roleMiddleware;

serviceRouter.post('/createService', AT, role('LECTURER'), createService);
serviceRouter.get('/services', getServices);
serviceRouter.get('/getServiceInfo/:id', AT, getServiceInfo);
serviceRouter.delete('/closeService/:id', AT, role('LECTURER'), closeService);
