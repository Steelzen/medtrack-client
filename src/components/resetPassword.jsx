import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");

  const auth = getAuth();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      setEmailSent(true);
      setError("");
    } catch (error) {
      setEmailSent(false);
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      {emailSent ? (
        <p>Email sent! Check your inbox for further instructions.</p>
      ) : (
        <form onSubmit={handleResetPassword}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Reset Password</button>
          {error && <p>{error}</p>}
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
