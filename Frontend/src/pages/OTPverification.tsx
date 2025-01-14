import React, { useEffect, useState } from "react";
import styles from "../styles/OTpverification.module.css";
import { useNavigate, useParams } from "react-router-dom";

const OTPVerification = () => {
  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const userId = params?.userid;
    if (!userId) {
      navigate("/signup");
      return;
    }
  }, [params]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/[^0-9]/.test(value)) return; // Only allow numbers in the OTP field
    setOtp(value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }

    setIsSubmitting(true);
    setError("");

    // Mock submission logic (replace with actual backend call)
    setTimeout(() => {
      setIsSubmitting(false);
      if (otp === "123456") {
        alert("OTP Verified!");
      } else {
        setError("Invalid OTP, please try again.");
      }
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2 className={styles.heading}>Enter OTP</h2>
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
            <a href="#" className={styles.resendLink}>
              Resend OTP
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
