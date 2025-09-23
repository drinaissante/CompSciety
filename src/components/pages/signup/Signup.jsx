
import { Squares } from "../../squares-background.tsx";
import MotionDiv from "../../MotionDiv.jsx";
import { useState } from "react";

import { Link } from "react-router-dom";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit() {
        print("submit");
    }

    function handleChange() {
        print("change");
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
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={handleChange}
                            required
                            className="p-1 bg-white text-black rounded-md"
                        />
                        {/* MY IDEA HERE IS, nasa loob dapat nung input box yung icons. not sure how pa. TODOOOOOOO */}
                        {/* {errors.email && <p className="text-red-500">{errors.email}</p>} */}

                        
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
                        {/* {errors.password && <p className="text-red-500">{errors.password}</p>} */}

                        
                    </div>
                
                    <div className="flex justify-center mt-10">
                        Forgot password? 
                        <h1 className="text-blue ml-4">Forgot password.</h1>
                        {/* TODO: make forgot password thing sa firebase */}  

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
                            Login
                        </button>
                    </div>
                    
                </form>

            </MotionDiv>

        </div>
    );
}

export default Signup;