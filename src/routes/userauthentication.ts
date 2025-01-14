import { CookieOptions, Request, Response, Router } from "express";
import {
  signupValidationFunction,
  signupvalidatorChain,
} from "../middlewares/validators";
import { verifyTokenAsync } from "../utils/jwtvalidation";
import { User } from "../schemas/schemas";
const router = Router();

router.post(
  "/signup/withoutgoogle",
  signupvalidatorChain,
  signupValidationFunction,
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
      const user = await User.create({
        name: name,
        email: email,
        password: password,
        role: "unverified",
      });
      res.status(201).json(user);
    } catch {
      res
        .status(400)
        .json(
          "couldnt create a new user, maybe you have already used this email",
        );
    }
  },
);

router.post(
  "/login/withusernameandpassword",
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    if (!user) {
      res.status(200).json("invalid credentials");
    } else {
      res.send({ data: JSON.stringify(user) });
    }
  },
);

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
