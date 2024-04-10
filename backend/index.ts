
import dotenv from 'dotenv';
dotenv.config(); 
import express from "express";
import cors from "cors";
import FoodRouter from './src/router/food.router'
import UserRouter from './src/router/user.router'
import orderRouter from './src/router/order.router'
import {dbConnect} from './src/configs/database.config'
dbConnect()




const app = express();
app.use(express.json())
app.use(
  cors({
    credentials: true,
    // origin:["http://localhost:4200"],
    origin:["https://gofood-sepia.vercel.app"]
   
    
  })
);


app.use("/api/food",FoodRouter);
app.use("/api/users",UserRouter);
app.use("/api/orders",orderRouter)




const port = 5000;

app.listen(port, () => {
  console.log("your website is working on http://localhost:5000");
});

