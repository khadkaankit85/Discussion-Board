import React from "react";
import { useForm } from "react-hook-form";
import styles from "../styles/Signuppage.module.css";
import { toast } from "react-toastify";
import { backendUrl } from "../../constants";

type FormData = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async (data) => {
    const response = await fetch(
      `${backendUrl}/user/authentication/login/withusernameandpassword`,
      {
        body: JSON.stringify(data),
        method: "POST",
        credentials: "include",
      },
    );
    const mydata = await response.json();

    if (mydata.ok) {
      toast.success("Login Successful");
    } else {
      toast.error("Please Check Your Email and Password and Retry");
    }
  });

  const handleLoginWithGoogle = async () => {
    window.location.href = `${backendUrl}/user/authentication/`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Log In</h2>
        <form action="/user/login" onSubmit={onSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="email">
              Username / Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
              })}
              type="text"
              id="email"
              placeholder="Enter your username/email"
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
            />
            {errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className={`${styles.submitButton} ${isSubmitting || (!isValid && "opacity-50")}`}
            disabled={isSubmitting || !isValid}
          >
            Log In
          </button>
        </form>
        <div className={styles.divider}>OR</div>
        <button
          className={styles.googleButton}
          onClick={() => {
            handleLoginWithGoogle;
          }}
          type="button"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            className={styles.googleIcon}
          />
          Log In with Google
        </button>
        <p className={styles.footerText}>
          Don't have an account?{" "}
          <a href="/signup" className={styles.signupLink}>
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
