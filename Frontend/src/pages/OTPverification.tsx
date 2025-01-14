import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { backendUrl } from "../../constants";
import styles from "../styles/OTpverification.module.css";

const OTPVerification = () => {
  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isRequestingOtp, setIsRequestingOtp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const userId = params?.userid;
    const username = params?.username;
    if (!userId || !username) {
      navigate("/signup");
      return;
    }
    setEmail(`${username}@gmail.com`);
  }, [params, navigate]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/[^0-9]/.test(value)) return; // Only allow numbers in the OTP field
    setOtp(value);
  };

  const handleRequestOtp = async () => {
    const userId = params?.userid;
    if (!userId) {
      setError("User ID is missing");
      return;
    }

    setIsRequestingOtp(true);
    setError("");
    try {
      const response = await fetch(`${backendUrl}/user/verification/getotp`, {
        method: "POST",
        body: JSON.stringify({ userId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const mydata = await response.json();
      if (!mydata.ok) {
        throw new Error("Failed to request OTP");
      }
      alert(`OTP has been sent to ${email}`);
    } catch (err) {
      setError("Failed to request OTP. Please try again.");
      console.error(err);
    } finally {
      setIsRequestingOtp(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }

    setIsSubmitting(true);
    setError("");
    try {
      const response = await fetch(
        `${backendUrl}/user/verification/verifyotp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: params.userid, otp }),
        },
      );
      if (!response.ok) {
        throw new Error("OTP verification failed");
      }
      alert("OTP verified successfully!");
      // Navigate to the next page if needed
    } catch (err) {
      setError("Failed to verify OTP. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2 className={styles.heading}>Enter OTP</h2>
        <p className={styles.info}>
          OTP will be sent to your email: <strong>{email}</strong>
        </p>
        <button
          onClick={handleRequestOtp}
          disabled={isRequestingOtp}
          className={styles.requestButton}
        >
          {isRequestingOtp ? "Requesting OTP..." : "Request OTP"}
        </button>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={handleChange}
            className={styles.input}
            placeholder="Enter OTP"
            disabled={isSubmitting}
          />
          {error && <p className={styles.error}>{error}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.button}
          >
            {isSubmitting ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
        <div className={styles.resendWrapper}>
          <p className={styles.resendText}>
            Didn't receive the code?{" "}
            <button onClick={handleRequestOtp} className={styles.resendLink}>
              Resend OTP
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
