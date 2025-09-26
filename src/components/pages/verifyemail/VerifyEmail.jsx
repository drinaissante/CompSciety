import { useEffect, useState } from "react";
import { getAuth, applyActionCode } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";

    
function VerifyEmail() {
    const [message, setMessage] = useState("Verifying...");
    const location = useLocation();
    const navigate = useNavigate();

    const [seconds, setSeconds] = useState(5); // 5 seconds

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const mode = params.get("mode");
        const oobCode = params.get("oobCode");
        const auth = getAuth();

        if (mode === "verifyEmail" && oobCode) {
            applyActionCode(auth, oobCode)
                .then(() => {
                    setMessage("Your email has been verified! You may now log in.");
                })
                .catch((error) => {
                    setMessage("Error verifying email: " + error.message);
                });
        } else {
            setMessage("Invalid link.");
        }
    }, [location.search]);
  
    useEffect(() => {
        if (seconds <= 0) {
            navigate("/");
            return;
        }

        const timer = setTimeout(() => {
            setSeconds((prev) => prev - 1);
        }, 1000); // every second

        return () => clearTimeout(timer); // cleanup on unmount
    }, [seconds, navigate]); // navigate -> run on navigate

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#18230F]">
            <div className="flex flex-col text-center font-bold text-white space-y-4">

                <h2 className="text-2xl">Email Verification</h2>
                <p>{message}</p>

                <p>
                    Redirecting in <span className="font-bold">{seconds}</span> seconds... 
                    <button 
                        onClick={() => navigate("/")}
                        className="ml-1 text-green-400 underline"
                    >
                        Click here to be redirected immediately
                    </button>
                </p>

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
