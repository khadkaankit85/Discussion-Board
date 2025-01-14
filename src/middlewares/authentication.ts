import { NextFunction, Request, Response } from "express";

/**
 * checks if the user is logged in
 */
export function authenticate(req: Request, res: Response, next: NextFunction) {}

/**
 * checks if the user has the required role, if not then further request handling is stopped
 */
export function authorize(role: "user" | "admin" | "unverified") {}
