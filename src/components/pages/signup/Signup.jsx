import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Squares } from "../../squares-background.tsx";
import MotionDiv from "../../MotionDiv.jsx";
import { doCreateUserWithEmailAndPassword } from "../../auth/authService.jsx";

import { getFirebaseAuthErrorMessage } from "../../auth/firebase.jsx";
import { sendEmailVerification } from "firebase/auth";



// TODO
// make sure to prompt all the needed information before this signup page (with email and password on last)



function Signup() {
    useEffect(() => {
        document.title = "Signup | BulSU Computer Science Society"
    }, []);

    const navigate = useNavigate();
    
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/");
        }, 5000); // 5 seconds

        return () => clearTimeout(timer); // cleanup on unmount
    }, [navigate]); // navigate -> run on navigate
        
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [success, setSuccessMessage] = useState("");

    const [isRegistering, setIsRegistering] = useState(false);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailErrors = validateField("email", email);
        const pwErrors = validateField("password", password);

        setErrors({ email: emailErrors, password: pwErrors })

        if (!emailErrors && !pwErrors) {
            if (!isRegistering) {
                setIsRegistering(true);

                try {
                    // email verification
                    const userCredential = await doCreateUserWithEmailAndPassword(email, password);

                    // custom email link
                    const actionCodeSettings = {
                        url: "https://drinaissante.github.io/CompSciety/verify", // should be changed when pushing to vercel
                        handleCodeInApp: true,
                    };

                    await sendEmailVerification(userCredential.user, actionCodeSettings);
                    
                    // make this to another page (?) // white cast overlay
                    setSuccessMessage("A verification link has been sent to your meail. Please verify before logging in.")

                    // redirect to home page after 5 seconds
                } catch (error) {
                    const errMessage = getFirebaseAuthErrorMessage(error);
                    setErrors((prev) => ({ ...prev, auth: errMessage }));
                } finally {
                    setIsRegistering(false);
                }
            }
        }
    }

    const validateField = (name, value) => {
        if (value.empty)
            return "";
        
        let error = "";

        if (name === "email") {
            if (!value?.trim()) {
                error = "Please enter your email address.";
            } else if (!emailRegex.test(value)) {
                error = "Please enter a valid email address.";
            }
        }

        if (name === "password") {
            if (!value?.trim()) {
                error = "Please enter your password.";
            } else if (value.length < 6) {
                error = "Password must at least be 6 characters.";
            }
        }

        return error;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (value.empty)
            return;

        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);

        // validate
        setErrors((prev) => ({
            ...prev,
            [name]: validateField(name, value),
        }));
    }

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-[#18230F] rounded-xl">
            {/* Animated squares background */}
            <Squares
                direction="diagonal"
                speed={0.1}
                squareSize={120}
                borderColor="darkgray"
                hoverFillColor="#1F7D53"
                className="absolute"
            />

            <MotionDiv className="flex flex-col mx-auto p-10 lg:py-15 lg:px-30 z-10 bg-white/40 rounded-3xl gap-10">
                
                <div className="font-bold text-2xl text-center">Signup</div>

                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col font-bold text-center gap-3">

                        Email
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={handleChange}
                            required
                            className="p-1 bg-white text-black rounded-md"
                        />
                        {/* MY IDEA HERE IS, nasa loob dapat nung input box yung icons. not sure how pa. TODOOOOOOO */}
                        {errors.email && <p className="text-red-500">{errors.email}</p>}

                        
                        Password
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            required
                            minLength={6}
                            onChange={handleChange}
                            className="p-1 bg-white text-black rounded-md"
                        />
                        {/* MY IDEA HERE IS, nasa loob dapat nung input box yung icons. not sure how pa. TODOOOOOOO */}
                        {errors.password && <p className="text-red-500">{errors.password}</p>}

                        
                    </div>
                
                    <div className="flex justify-center mt-10">
                        Forgot password? 
                        <h1 className="text-green-400 ml-4">Forgot password.</h1>
                        {/* TODO: make forgot password thing sa firebase */}  
                    </div>
                    
                    <div className="flex justify-center">
                        Already have an account?
                        <Link to="/login" className="text-green-400 ml-4">
                            Sign in
                        </Link>
                    </div>
                
                    <h4 className="flex justify-center">Terms of Service</h4>
                    {/* TODO: add terms of service */}

                    <div className="m-2 flex justify-around">
                        <Link to="/">
                            <button className="py-3 px-5 rounded-2xl bg-gray-600 cursor-pointer">
                                Cancel
                            </button>
                        </Link>

                        <button
                            type="submit"
                            className="py-3 px-5 rounded-2xl bg-green-600 cursor-pointer"
                            disabled={isRegistering}
                        >
                            {isRegistering ? "Registering..." : "Register"}
                        </button>
                    </div>
                    
                </form>

                {errors.auth && <p className="text-center text-red-500">{errors.auth}</p>}

                {success && (
                    <p className="text-green-300 w-[40ch]">{success}</p>
                    && 
                    <p>
                        Redirecting in 5 seconds... 
                        <button 
                            onClick={() => navigate("/")}
                            className="ml-1 text-green-400 underline"
                        >
                            Click here to be redirected immediately
                        </button>
                    </p>

                )}
            </MotionDiv>

        </div>
    );
}

export default Signup;