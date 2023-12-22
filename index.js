import express  from "express";
import mongoose from "mongoose";

import authRouter from "./route/auth.js";

const app = express()
app.use(express.json())
const Port = 9000;


//  routes 
app.use("/api", authRouter)





const MONGO_URL = 'mongodb+srv://abrar:3NUfKV42ivL3fxNm@cluster0.ekd31bu.mongodb.net/practice2?retryWrites=true&w=majority'


app.listen(Port, async() => {
     console.log('Server is running');

    try {
        await mongoose.connect(MONGO_URL);
        console.log("Database Is Connected")
    } catch (error) {
         console.log("Database is not Connected : " ,error)
    }

})