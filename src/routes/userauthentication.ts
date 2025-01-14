import { CookieOptions, Request, Response, Router } from "express";
import {
  signupValidationFunction,
  signupvalidatorChain,
} from "../middlewares/validators";
import { verifyTokenAsync } from "../utils/jwtvalidation";
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
  if (!cookie || !cookie.gimmeMycookie) {
    res.status(400).json("cookie not found");
  } else {
    const mycookie = cookie.gimmemycookie;

    try {
      const decoded = await verifyTokenAsync(mycookie);
      res.status(200).json("logged in with cookie");
      return;
    } catch (err) {
      console.log("cookie verification error");
      res.status(200).json("logged in with cookie");
    }
  }
});

export default router;
