import express from 'express'
import cors from 'cors'
import helmet from 'helmet';
import dotenv from 'dotenv'
import morgan from 'morgan';

dotenv.config();
const app = express()
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Product store is running');
//   console.log(res.getHeaders());
})

app.listen(port, () => {
  console.log(`Product store is running on port ${port}`)
})