import { NextFunction, Request, Response } from "express";
import { verifyTokenAsync } from "../utils/jwtvalidation";

/**
 * checks if the user is logged in
 */
export function authenticate(req: Request, res: Response, next: NextFunction) {
  const cookie = req.cookies;
  if (!cookie) {
    res.status(401).json("unauthorized");
    return;
  }

  const usertoken = cookie?.mycookie;
  if (!usertoken) {
    res.status(401).json("unauthorized");
    return;
  }

  verifyTokenAsync(usertoken).then((cookie) => {
    console.log("cookie verified");
    next();
  });
}

/**
 * checks if the user has the required role, if not then further request handling is stopped
 */
export function authorize(role: "user" | "admin" | "unverified") {}
