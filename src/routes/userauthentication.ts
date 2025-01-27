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
    scope: ["profile", "email"],
    failureRedirect: "/user/authentication/withgoogle/failurecallback",
  }),
  (req: Request, res: Response) => {
    //Todo: come back later to change its type
    const { user } = req as unknown as {
      user: {
        token: string;
      };
    };
    const token = user?.token;
    if (user && token) {
      res.cookie("gimmemycookie", token, {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: "strict",
      });
      res.redirect(`${frontendUrl}/home`);
    } else {
      res.status(400).json({ message: "unable to login" });
    }
  },
);

/*
 *this router is called if a user is authenticated or not
 */
router.get("/authcheck", (req: Request, res: Response) => {});

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
    try {
      const user = await User.findOne({ email, password });
      if (!user) {
        res.status(200).json("invalid credentials");
      } else {
        res.send({ data: JSON.stringify(user) });
      }
    } catch {
      res.status(500).json({ message: " internal server error: db" });
    }
  },
);

router.post("/login/withcookie", async (req: Request, res: Response) => {
  const cookie = req.cookies;
  if (!cookie || !cookie.gimmemycookie) {
    res.status(400).json("cookie not found");
  } else {
    const mycookie = cookie.gimmemycookie;
    try {
      const decoded = await verifyTokenAsync(mycookie);

      const user = await User.findById(decoded.id);
      //if the user doesn't exist but we have the token decoded
      if (!user) {
        res.status(400).json({
          message: "couldnt fetch the user data in ther server",
        });
      } else {
        res.json({
          name: user.name,
          email: user.email,
          image: user?.image,
          role: user.role,
        });
      }
    } catch (err) {
      console.log("cookie verification error");
      res.status(403).json("expired token ! please relogin");
    }
  }
});

export default router;
