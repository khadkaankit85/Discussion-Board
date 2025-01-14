import { Router, Request, Response } from "express";
import { User } from "../schemas/schemas";
import { sendOtp } from "../utils/sendOtp";
const router = Router();

router.get("/getotp/:userid", async (req: Request, res: Response) => {
  const userid = req.params.userid;

  if (!userid) {
    res.status(400).json("user id is not provided");
    return;
  }

  User.findById(userid).then((user) => {
    if (!user) {
      res.status(404).json("user not found");
      return;
    } else if (user.lastOtpRequest.getTime() + 1 * 60 * 1000 > Date.now()) {
      res.status(400).json("OTP request too frequent");
      return;
    } else {
      const otp = Math.floor(Math.random() * 900000 + 100000);
      try {
        sendOtp(otp, user.email);
      } catch (err) {
        res.status(500).json("Error sending OTP");
        return;
      }
      user.otp = otp;
      user.lastOtpRequest = new Date();
      user.save();
      res.status(200).json("OTP sent successfully");
    }
  });
});

router.post("/verifyotp", async (req: Request, res: Response) => {
  const { userId, otp } = req.body;
  console.log(userId, otp);
});

export default router;
