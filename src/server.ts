import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors, { CorsOptions } from "cors";
import { allowedOrigins } from "./constants";
import bodyParser from "body-parser";
import {
  signupValidationFunction,
  signupvalidatorChain,
} from "./middlewares/validators";

dotenv.config();

const app = express();

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    console.log(origin);
    //allow request from no origin
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

main().catch((err) => console.log(err));
async function main() {
  if (!process.env.MONGODB_URL) throw new Error("MONGODB_URL is not defined");
  await mongoose.connect(process.env.MONGODB_URL);
}

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.post(
  "/user/signup/withoutgoogle",
  signupvalidatorChain,
  signupValidationFunction,
  (req: Request, res: Response) => {
    res.status(201).json("hit signup not google button route");
  },
);

app.post(
  "/user/login/withusernameandpassword",
  (req: Request, res: Response) => {
    const body = req.body;
    console.log(body);
    res.send("logging in");
  },
);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
