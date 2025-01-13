import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";

export const signupvalidatorChain = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 4, max: 20 })
    .withMessage("Name must be between 4 and 20 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name must contain only letters and spaces"),

  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("email is not valid")
    .normalizeEmail(),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    )
    .withMessage(
      "Password must include uppercase, lowercase, number, and special character",
    ),
];

export function signupValidationFunction(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(req.body);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
}
