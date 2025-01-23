import Router, { Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({
    getOtp: "/user/verification/getotp",
    verifyOtp: "/user/verification/verifyotp",
    loginwithGoogleOAuth: "/user/authentication/login/withgoogle",
    loginWithPassword: "/user/authentication/signup/loginWithPassword",
  });
});

export default router;
