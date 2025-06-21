import express from 'express'
import { verifyToken } from '../utils/verifyToken.js'
import { addProduct, enquireProduct, getProduct } from '../controllers/product.controller.js'

const router = express.Router();

router.get('/', getProduct);
router.post('/add', verifyToken, addProduct);
router.post('/enquire/:productId', enquireProduct);

export default router