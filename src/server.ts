import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors, { CorsOptions } from "cors";
import { allowedOrigins } from "./constants";
import {
  signupValidationFunction,
  signupvalidatorChain,
} from "./middlewares/validators";

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
};

app.use(express.json());
app.use(cors(corsOptions));

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
    console.log(req.body);
    res.status(400).send("hit signup not google button route");
  },
);

app.post("/login/withusernameandpassword", (req: Request, res: Response) => {
  const body = req.body;
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
