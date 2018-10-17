import express from 'express';
const router = express.Router({ strict: true });

import dataApi from './routes/dataApi';

router.get('/items', dataApi);


export default (router);