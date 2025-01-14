import React from "react";
import { useForm } from "react-hook-form";
import styles from "../styles/Signuppage.module.css";
import { backendUrl } from "../../constants.ts";
import { errorToast } from "../toasts.ts";
import { useNavigate } from "react-router-dom";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async (data) => {
    const response = await fetch(
      `${backendUrl}/user/authentication/signup/withoutgoogle`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    const responseData = await response.json();

    if (!response.ok) {
      const errormsg = responseData?.errors?.[0]?.msg; // Optional chaining to safely access the first error message
      errorToast(errormsg || responseData || "An unknown error occurred.");
      return;
    } else if (response.status === 201) {
      const id = responseData._id;
      const username = responseData.email.split("@")[0];
      navigate(`/signup/otpverification/${username}/${id}`);
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Sign Up</h2>
        <form action="/user/signup/withoutgoogle" onSubmit={onSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="name">
              Name
            </label>
            <input
              {...register("name", {
                required: "Name is required",
              })}
              type="text"
              id="name"
              placeholder="Enter your name"
              className={styles.input}
            />
            {errors.name && (
              <p className={styles.error}>{errors.name.message}</p>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
              })}
              type="email"
              id="email"
              placeholder="Enter your email"
              className={styles.input}
            />
            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is required",
              })}
              type="password"
              id="password"
              placeholder="Enter your password"
              className={styles.input}
            />{" "}
            {errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className={`${styles.submitButton} ${isSubmitting || (!isValid && "opacity-50")}`}
            disabled={isSubmitting || !isValid}
          >
            Sign Up
          </button>
        </form>
        <div className={styles.divider}>OR</div>
        <button className={styles.googleButton}>
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            className={styles.googleIcon}
          />
          Sign Up with Google
        </button>
        <p className={styles.footerText}>
          Already have an account?{" "}
          <a href="/login" className={styles.loginLink}>
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
