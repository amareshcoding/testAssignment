import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoConnect from './config/db.js';
import userRoute from './routers/userRouter.js';
import authRoute from './routers/authRouter.js';
import postRoute from './routers/postRouter.js';
import commentRouter from './routers/commentRouter.js';

// Configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

//Home Route
app.get('/', (req, res) => {
  res.send('Home Route!');
});

//General Routes
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/post', postRoute);
app.use('/api/comment', commentRouter);

//Port
const PORT = process.env.PORT || 6001;

//Server Listening
app.listen(PORT, async () => {
  try {
    //connect with mongodb
    await mongoConnect();
    console.log(`server listening on port ${PORT}`);
  } catch (err) {
    console.log('err: ', err);
  }
});
