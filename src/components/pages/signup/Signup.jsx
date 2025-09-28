import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Squares } from "../../squares-background.tsx";
import { doCreateUserWithEmailAndPassword } from "../../auth/authService.jsx";

import { getFirebaseAuthErrorMessage } from "../../auth/firebase.jsx";
import { sendEmailVerification } from "firebase/auth";

import { Link } from "react-router-dom";

import Profile from "./Profile.jsx";
import Student from "./Student.jsx";
import Questions from "./Questions.jsx";
import FinalSignup from "./FinalPage.jsx";

import MotionDiv from "../../MotionDiv.jsx";

// TODO
// make sure to prompt all the needed information before this signup page (with email and password on last)
// ORRR
// after signing in, fill up the forms


function Signup() {
    useEffect(() => {
        document.title = "Signup | BulSU Computer Science Society"
    }, []);


    const navigate = useNavigate();
        
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
                    setSuccessMessage("A verification link has been sent to your email. Please verify before logging in.")

                    // redirect to home page after 5 seconds
                    const timer = setTimeout(() => {
                        navigate("/");
                    }, 5000); // 5 seconds

                    return () => clearTimeout(timer); // cleanup on unmount
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

    const [page, setPage] = useState(0);
    const [viewedPages, setViewedPages] = useState(new Set());
    
    useEffect(() => {
        setViewedPages((prev) => new Set(prev).add(page));
    }, [page]); // run after setPage()

    const pages = [
        <Profile hasViewed={viewedPages.has(1)}/>,
        <Student hasViewed={viewedPages.has(2)}/>,
        <Questions hasViewed={viewedPages.has(3)}/>,
        <FinalSignup handleSubmit={handleSubmit} handleChange={handleChange} errors={errors}  email={email} password={password} isRegistering={isRegistering} success={success} />        
    ]

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

            <MotionDiv className="flex flex-col p-5 mt-20 mb-20 mx-auto my-auto z-10  bg-white/40 rounded-3xl gap-3">
                
                <div className="font-bold text-5xl text-center">Signup</div>
                
                {pages[page]}
                
                <div className="m-3 mt-10 flex justify-center">
                    Already have an account?
                    <Link to="/login" className="text-green-400 ml-4">
                        Sign in
                    </Link>
                </div>

                <h4 className="flex justify-center underline">Terms of Service</h4>
                {/* TODO: add terms of service */}


                {/* buttons bottom right */}
                <div className="flex gap-2">
                    {page >= 1 && (
                    <button
                        type="button"
                        className="py-3 px-5 rounded-2xl bg-green-500 cursor-pointer"
                        disabled={isRegistering}
                        onClick={() => setPage((p) => p - 1)}
                    >
                        Previous
                    </button>
                    )}

                    <Link to="/">
                        <button className="py-3 px-5 rounded-2xl bg-gray-600 cursor-pointer" onClick={(e) => {
                            setPage(0);
                        }}>
                            Cancel
                        </button>
                    </Link>

                    <button
                        type="button"
                        className="py-3 px-5 rounded-2xl bg-green-900 cursor-pointer"
                        disabled={isRegistering}
                        onClick={() => {
                            if (page === pages.length - 1) {
                                // handle registration
                            } else {
                                setPage((p) => p + 1);
                            }
                        }}
                    >
                        {page === pages.length - 1 ? "Register" : "Next"}
                    </button>
                    
                </div>

            </MotionDiv>
        </div>
    );
}

export default Signup;