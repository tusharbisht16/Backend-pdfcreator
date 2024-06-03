import express from "express"
import { config } from "dotenv";
import { connectDb } from "./src/config/db.js";
import authRoutes from "./src/Routes/Authroutes.js";
import bookroutes from "./src/Routes/bookroutes.js";
import cors from 'cors';
config();
let app = express();
app.use(cors({credentials: true}))
app.use(express.json());
let port = process.env.PORT ||9090;
let uri = process.env.MONGO_DB || null;
app.use("/auth", authRoutes);

app.use("/book",bookroutes)
app.listen(port,async()=>{
    try{
        await connectDb(uri)
        console.log(`Server is connected at ${port}`)
    }catch(err){
  console.log(err)
    }
})