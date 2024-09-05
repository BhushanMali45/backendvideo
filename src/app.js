import express from "express";
import dotenv from 'dotenv';
dotenv.config();

import { createServer } from "http";
import mongoose from "mongoose";

// ggg
import cors from "cors";
import userRoutes from "./routes/users.routes.js";
import { connectToSocket } from "./controllers/socketManager.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

const start = async () => {
    const connectionDb = await mongoose.connect(process.env.MONGO_URI);



    // const start = async () => {
    //     try {
    //       const connectionDb = await mongoose.connect(process.env.MONGO_URI);
    //       console.log('Database connected successfully');
    //     } catch (error) {
    //       console.error('Error connecting to the database:', error.message);
    //       process.exit(1);  
    //     }
    //   };
      

  


    console.log(`MONGO Connected DB Host: ${connectionDb.connection.host}`);







    server.listen(app.get("port"), () => {
        console.log("LISTENING ON PORT 8000");
    });
};

start();
