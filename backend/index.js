import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import AuthRoute from "./Routes/Auth.js";
import RideRoute from "./Routes/Rides.js";
dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_URL, () => {
  console.log("connected to mongo db  ");
});

app.use(express.json());
app.use(cors());
app.use("/auth", AuthRoute);
app.use("/ride", RideRoute);

app.listen(5001, () => {
  console.log(`server started on port ${process.env.PORT || 5001}`);
});
