import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import {notFound,errorHandler} from './middleware/errorMiddleware.js'
import productRoutes from "./routes/productRoutes.js";
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import bidRoutes from './routes/bidRoutes.js';
import path from 'path';

dotenv.config();



connectDB();
const app = express();
app.use(express.json());




//routes
app.use('/api/orders', orderRoutes)
app.use("/api/products", productRoutes);
app.use("/api/users",userRoutes);
app.use('/api/upload', uploadRoutes)
app.use('/api/items',itemRoutes);
app.use('/api/bids',bidRoutes);
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)
//custom err middleware
app.use(notFound)
app.use(errorHandler)

//const __dirname = path.resolve()
//app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.use("/uploads", express.static("uploads"))
/*
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}*/
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "./frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "./frontend/build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
      .yellow.bold
  )
);
