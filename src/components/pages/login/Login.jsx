import { useState, useEffect } from "react";
import MotionDiv from "../../MotionDiv.jsx";
import { Squares } from "../../squares-background.tsx";

import { Link, useNavigate } from "react-router-dom";

import { CiCircleCheck } from "react-icons/ci";
import { FaExclamationCircle } from "react-icons/fa";
import { useAuth } from "../../auth/authContext/auth.jsx";
import { doSignInWithEmailAndPassword, doSignInWithGoogle, doSignOut } from "../../auth/authService.jsx";

import { auth, getFirebaseAuthErrorMessage } from "../../auth/firebase.jsx";

// add "forget password"
// add "register now if no account"

// add make sure to save the url before pressing "Join Now" add "redirect?<URL HERE>"

function Login() {
    useEffect(() => {
        document.title = "Login | BulSU Computer Science Society"
    }, []);

    const { currentUser, userLoggedIn, loading } = useAuth(); // TODO

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const [isSigningIn, setIsSigningIn] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailErrors = validateField("email", email);
        const pwErrors = validateField("password", password);

        setErrors({ email: emailErrors, password: pwErrors })

        if (!emailErrors && !pwErrors) {
            // TODO: submit to firebase (NO ERRORS)

            // uncomment once done
            e.preventDefault();

            if (!isSigningIn) {
                setIsSigningIn(true);

                try {
                    const userCredential = await doSignInWithEmailAndPassword(email, password);

                    if (!userCredential.user.emailVerified) {
                        // sign out since not verified yet
                        await doSignOut();

                        setErrors((prev) => (
                            {
                                ...prev,
                                auth: "Please verify your email before logging in."
                            }
                        ));

                        return;
                    }

                    navigate("/");
                } catch (error) {
                    const errMessage = getFirebaseAuthErrorMessage(error);
                    setErrors((prev) => ({ ...prev, auth: errMessage }));
                } finally {
                    setIsSigningIn(false);
                }

            }
        }
    }

    const handleGoogleSignIn = (e) => {
        e.preventDefault();
        
        if (!isSigningIn) {
            setIsSigningIn(true);
            doSignInWithGoogle().catch(error => {
                setIsSigningIn(false);
            })
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
                
                <div className="font-bold text-2xl text-center">Login</div>

                <form onSubmit={handleSubmit} noValidate>
                    <div className="flex flex-col font-bold text-center gap-3">

                        Email
                        <input
                            type="email"
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
                        <h1 className="text-blue ml-4">Forgot password.</h1>
                        {/* TODO: make forgot password thing sa firebase */}  
                    </div>
                    
                    <div className="flex justify-center">
                        No account yet?
                        <Link to="/signup" className="text-blue ml-4">
                            Create account.
                        </Link>
                    </div>
                
                    <h4 className="flex justify-center">Terms of Service</h4>
                    {/* TODO: add terms of service */}

                    <div className="m-2 flex justify-around">
                        <Link to="/">
                            <button
                                className="py-3 px-5 rounded-2xl bg-gray-600 cursor-pointer"
                            >
                                Cancel
                            </button>
                        </Link>

                        <button
                            type="submit"
                            className="py-3 px-5 rounded-2xl bg-green-600 cursor-pointer"
                        >
                            {isSigningIn ? "Signing in..." : "Login"}
                        </button>
                        
                    </div>
                    
                </form>

                {errors.auth && <p className="text-center text-red-500">{errors.auth}</p>}

            </MotionDiv>

        </div>
    );
}

export default Login;