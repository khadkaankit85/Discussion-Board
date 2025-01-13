import express, { Request, Response } from "express";
import mongoose from "mongoose";

const app = express();

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/discussionboard");
}

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.post("/createaccount", (req: Request, res: Response) => {
  res.send("created");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
