import { useState } from "react";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function FinalSignup({ handleSubmit, errors,  success, setErrors }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
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
                        className="mx-auto p-1 bg-white text-black rounded-md"
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
                        className="mx-auto p-1 bg-white text-black rounded-md"
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
                        className="ml-1 text-green-400 underline cursor-pointer max-w-xl"
                    >
                        Click here to be redirected immediately
                    </button>
                </p>

            )}
        </>
    );
}

export default FinalSignup;