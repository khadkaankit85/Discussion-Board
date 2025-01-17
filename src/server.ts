import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors, { CorsOptions } from "cors";
import { allowedOrigins } from "./constants";
import bodyParser from "body-parser";
import otpRouter from "./routes/otpverification";
import userAuthenticationRouter from "./routes/userauthentication";
import userActionRouter from "./routes/useractions";

//configurations for passport
import "./configs/google-passport-config.ts";
dotenv.config();

const app = express();

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    //allow request from no origin
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

main().catch((err) => console.log(err));
async function main() {
  if (!process.env.MONGODB_URL) throw new Error("MONGODB_URL is not defined");
  await mongoose.connect(process.env.MONGODB_URL);
}

app.use("/user/verification", otpRouter);
app.use("/user/authentication", userAuthenticationRouter);
app.use("/user/actions/", userActionRouter);

app.get("/", (_req, res) => {
  res.send("Hello from the server!");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
