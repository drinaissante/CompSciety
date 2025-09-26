import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { auth } from "../../auth/firebase.jsx";

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const oobCode = searchParams.get("oobCode");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkCode = async () => {
            try {
                await verifyPasswordResetCode(auth, oobCode);
                setLoading(false);
            } catch (err) {
                setError("Invalid or expired reset link.");
                setLoading(false);
            }
        };

        if (oobCode) 
            checkCode();

    }, [oobCode]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            await confirmPasswordReset(auth, oobCode, newPassword);
            setMessage("Password reset successful! Redirecting...");
            setError("");

            const timer = setTimeout(() => navigate("/login"), 3000);
            return () => clearTimeout(timer); // cleanup on unmount
        } catch (err) {
            setError("Failed to reset password. Please request a new link.");
            const timer = setTimeout(() => navigate("/login"), 3000);
            return () => clearTimeout(timer); // cleanup on unmount
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-black">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80">
                <h2 className="text-xl font-bold mb-4">Reset Password</h2>
                
                <input
                    type="password"
                    placeholder="New Password"
                    className="w-full border p-2 rounded mb-3"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirm New Password"
                    className="w-full border p-2 rounded mb-3"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button type="submit" className="bg-green-500 text-white p-2 rounded-md w-full cursor-pointer">
                    Reset Password
                </button>

                {message && <p className="text-green-600 mt-3">{message}</p>}
                {error && <p className="text-red-600 mt-3">{error}</p>}
            </form>
        </div>
    );
}

export default ResetPassword;
