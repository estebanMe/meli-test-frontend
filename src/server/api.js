import express from 'express';
const router = express.Router({ strict: true });

import listSearch from './routes/listSearch';
import detailProduct from './routes/detailProduct';


router.get('/items', listSearch);
router.get('/items/:id', detailProduct);

export default (router);