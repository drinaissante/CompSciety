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

import { MotionDivExit } from "../../MotionDiv.jsx";
import useStore from "../../state/store.jsx";

import { createUserDocument } from "../../db/database.jsx"

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function Signup() {
    useEffect(() => {
        document.title = "Signup | BulSU Computer Science Society"
    }, []);


    const navigate = useNavigate();
        
    const [errors, setErrors] = useState({});
    const [success, setSuccessMessage] = useState("");

    const creds = useStore((state) => state.creds);
    const profile = useStore((state) => state.profile);
    const student = useStore((state) => state.student);
    const questions = useStore((state) => state.questions);
    
    const clear = useStore((state) => state.clearResponses);

    const [email, setEmail] = useState(creds.email || "");
    const [password, setPassword] = useState("");

    const [isRegistering, setIsRegistering] = useState(false);
    
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isRegistering) {
            setIsRegistering(true);

            try {
                // email verification
                const userCredential = await doCreateUserWithEmailAndPassword(email, password);
                const user = userCredential.user;

                // custom email link
                const actionCodeSettings = {
                    url: "https://drinaissante.github.io/CompSciety/verify", // should be changed when pushing to vercel
                    handleCodeInApp: true,
                };
                
                const profileData = {
                    email: creds.email,
                    name: profile.name, 
                    middle_initial: profile.middle_ini, 
                    last_name: profile.last_name, 
                    college: student.college, 
                    year_level: student.year_level, 
                    section: student.section,
                    question_1: questions.question_1, 
                    question_2: questions.question_2, 
                    question_3: questions.question_3,
                }

                await createUserDocument(profileData, setErrors);

                await sendEmailVerification(user, actionCodeSettings);
                
                // make this to another page (?) // white cast overlay
                setSuccessMessage("A verification link has been sent to your email. Please verify before logging in.")
                
                clear();

                // redirect to home page after 5 seconds
                const timer = setTimeout(() => {
                    navigate("/");
                }, 5000); // 5 seconds

                return () => clearTimeout(timer); // cleanup on unmount
            } catch (error) {
                const errMessage = getFirebaseAuthErrorMessage(error);
                setErrors({auth: errMessage});
            } finally {
                setIsRegistering(false);
            }
        }
    }

    const [page, setPage] = useState(0);
    const [viewedPages, setViewedPages] = useState(new Set());
    const [isValid, setIsValid] = useState(false);
    
    useEffect(() => {
        setViewedPages((prev) => new Set(prev).add(page));
    }, [page]); // run after setPage()

    const pages = [
        <Profile hasViewed={viewedPages.has(1)} setIsValid={setIsValid} setErrors={setErrors}/>,
        <Student hasViewed={viewedPages.has(2)} setIsValid={setIsValid} setErrors={setErrors}/>,
        <Questions hasViewed={viewedPages.has(3)} setIsValid={setIsValid} setErrors={setErrors}/>,
        <FinalSignup handleSubmit={handleSubmit} email={email} setEmail={setEmail} 
            password={password} setPassword={setPassword} errors={errors} success={success} setErrors={setErrors} validateField={validateField}/>        
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

            <MotionDivExit className="flex flex-col p-5 mt-20 mb-20 mx-auto my-auto z-10 min-w-max bg-white/40 rounded-3xl gap-3">
                
                <div className="font-bold text-5xl text-center">Signup</div>
                
                
                {pages[page]}
                {errors.auth && (<p className="flex justify-center mt-5 text-red-500">{errors.auth}</p>)}
                
                <div className="m-3 flex justify-center">
                    Already have an account?
                    <Link to="/login" className="text-green-400 ml-4 underline">
                        Sign in
                    </Link>
                </div>

                <h4 className="flex justify-center underline">Terms of Service</h4>
                {/* TODO: add terms of service */}

                {/* TODO: buttons should be bottom right */}
                <div className="flex gap-2">
                    {/* previous */}
                    {page >= 1 && (
                    <button
                        type="button"
                        className="py-3 px-5 rounded-2xl bg-green-500 cursor-pointer shadow-md shadow-yellow-100 transform duration-100 hover:-translate-y-1 hover:bg-green-600"
                        disabled={isRegistering}
                        onClick={() => setPage((p) => p - 1)}
                    >
                        Previous
                    </button>
                    )}

                    {/* cancel */}
                    <Link to="/">
                        <button 
                            type="button"
                            className="py-3 px-5 rounded-2xl bg-gray-600 cursor-pointer shadow-md transform duration-100 hover:-translate-y-1 hover:bg-gray-500"
                            onClick={(e) => {
                                setPage(0);
                            }}
                        >
                            Cancel
                        </button>
                    </Link>

                    {/* next */}
                    <button
                        type="submit"
                        className={`py-3 px-5 rounded-2xl bg-green-900 shadow-md shadow-cyan-100
                            ${isValid ? "transform duration-100 hover:-translate-y-1 hover:bg-green-800 cursor-pointer" : "cursor-not-allowed"}`
                        }
                        onClick={(e) => {
                            if (!isValid) {
                                return;
                            }

                            // last page na
                            if (page === pages.length - 1) {
                                handleSubmit(e);
                            } else {
                                setPage((p) => p + 1);
                            }
                        }}
                    >
                        {page === pages.length - 1 ? "Register" : "Next"}
                    </button>
                    
                </div>

            </MotionDivExit>
        </div>
    );
}

export default Signup;