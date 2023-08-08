import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cors from 'cors';

//configure .env
dotenv.config();

// database config
connectDB();

// rest objects
const app = express()


//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//Routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoutes)


// rest api
app.get('/', (req, res) => {
   res.send("<h1>Prime Picks!</h1>")
})

//PORT
// env file is used to maintain security so that no one can see our sensitive information
// after 2 bars 8080 is also given to tell if there is any issue in env file so use 8080 port by default
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
   console.log(`Server listening at port ${PORT}`)
})