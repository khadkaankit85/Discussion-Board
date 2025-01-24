import { Request, Response, Router } from "express";
import {
  signupValidationFunction,
  signupvalidatorChain,
} from "../middlewares/validators";
import { verifyTokenAsync } from "../utils/jwtvalidation";
import { User } from "../schemas/schemas";
import passport from "passport";
import env from "dotenv";
import { frontendUrl } from "../constants";

env.config();

const router = Router();

/*
 * this router handles the main login with google page,
 * on success, user is redirected to the homescreen and on failure, user is redirected to the route /withgoogle/failuecallback
 */
router.get(
  "/withgoogle/callback",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/userinfo.profile"],
    failureRedirect: "/user/authentication/withgoogle/failurecallback",
  }),
  (req: Request, res: Response) => {
    if (req.user) {
      res.redirect(`${frontendUrl}/home`);
    } else {
      res.status(400).json({ message: "unable to login" });
    }
  },
);

/*
 *this router is called if a user is authenticated or not
 */
router.get("/authcheck", (req: Request, res: Response) => {
  console.log("you are authenticated so i was called");
  res.status(200).send("OK");
});

/*
 * this function is called when user is not authenticated after login with google oauthFlow
 */
router.get("/withgoogle/failurecallback", (req: Request, res: Response) => {
  console.log("failed so i was called");
});

router.post(
  "/signup/loginWithPassword",
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

router.post("/login/withcookie", async (req: Request, res: Response) => {
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
