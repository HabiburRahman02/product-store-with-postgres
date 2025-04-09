import express from 'express'
import cors from 'cors'
import helmet from 'helmet';
import dotenv from 'dotenv'
import morgan from 'morgan';

import productRoutes from './routes/productRoutes.js'
import sql from './config/db.js';

dotenv.config();
const app = express()
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use("/api/products", productRoutes)

async function initDB() {
  try {
    await sql`
  CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;
    console.log('Database init successfully');
  } catch (error) {
    console.log('Error initDB', error);
  }
}

initDB().then(() => {
  app.listen(port, () => {
    console.log(`Product store is running on port ${port}`)
  })
})



