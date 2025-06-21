import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser';
import cors from 'cors'

import { connectDB } from './utils/connectDB.js'
import userRouter from './routes/user.route.js'
import productRouter from './routes/product.route.js'

const app = express();
const PORT = process.env.PORT;

app.use(express.json({ limit: '10mb' }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);

app.listen(PORT, () => {
    connectDB();
    console.log('Server is Listening to PORT:', PORT);
})