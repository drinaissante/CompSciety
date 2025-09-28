import MotionDiv from "../../MotionDiv.jsx";

import { Link } from "react-router-dom";

function FinalSignup({ handleSubmit, handleChange, errors, email, password, isRegistering, success, }) {
    return (
        <>
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
                    {errors.password && <p className="text-red-500">{errors.password}</p>}

                    
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
                        className="ml-1 text-green-400 underline cursor-pointer"
                    >
                        Click here to be redirected immediately
                    </button>
                </p>

            )}
        </>
    );
}

export default FinalSignup;