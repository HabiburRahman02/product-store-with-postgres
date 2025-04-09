import express from 'express'
import cors from 'cors'
import helmet from 'helmet';
import dotenv from 'dotenv'
import morgan from 'morgan';

import productRoutes from './routes/productRoutes.js'

dotenv.config();
const app = express()
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use("/api/products", productRoutes)

app.listen(port, () => {
  console.log(`Product store is running on port ${port}`)
})