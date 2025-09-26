import { useEffect, useState } from "react";
import { getAuth, applyActionCode } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";

function VerifyEmail() {
  const [message, setMessage] = useState("Verifying...");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const mode = params.get("mode");
    const oobCode = params.get("oobCode");
    const auth = getAuth();

    if (mode === "verifyEmail" && oobCode) {
      applyActionCode(auth, oobCode)
        .then(() => {
          setMessage("Your email has been verified! You can now log in.");
        })
        .catch((error) => {
          setMessage("Error verifying email: " + error.message);
        });
    } else {
      setMessage("Invalid link.");
    }
  }, [location.search]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#18230F]">
        <div className="flex flex-col text-center font-bold text-white space-y-4">
            <h2 className="text-2xl">Email Verification</h2>
            <p>{message}</p>
            <button
            onClick={() => navigate("/login")}
            className="bg-[#1F7D53] px-4 py-2 rounded-lg hover:bg-[#166b45] transition"
            >
                Go to Login
            </button>
        </div>
    </div>

  );
}

export default VerifyEmail;
