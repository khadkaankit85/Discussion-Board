import { Request, Response, Router } from "express";
import {
  signupValidationFunction,
  signupvalidatorChain,
} from "../middlewares/validators";
const router = Router();

router.post(
  "/signup/withoutgoogle",
  signupvalidatorChain,
  signupValidationFunction,
  (req: Request, res: Response) => {
    res.status(201).json("hit signup not google button route");
  },
);

router.post("/login/withusernameandpassword", (req: Request, res: Response) => {
  const body = req.body;
  console.log(body);
  res.send("logging in");
});

router.post("/loginwithcookie", async (req: Request, res: Response) => {
  const cookie = req.cookies;
});

export default router;
