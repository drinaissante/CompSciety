import useStore from "../../state/store.jsx";

function FinalSignup({ handleSubmit, email, setEmail, password, setPassword, errors, success, setErrors, validateField }) {
    const update = useStore((state) => state.update);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (value.empty)
            return;

        if (name === "email") {
            setEmail(value);
            update("creds", "email", value);
        } 
        
        if (name === "password")
            setPassword(value);

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