import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();

main().catch((err) => console.log(err));
async function main() {
  if (!process.env.MONGODB_URL) throw new Error("MONGODB_URL is not defined");
  await mongoose.connect(process.env.MONGODB_URL);
}

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.post("/user/signup/withoutgoogle", (req: Request, res: Response) => {
  res.send("created");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
