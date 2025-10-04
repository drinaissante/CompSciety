import { useState } from "react";
import useStore from "../../state/store.jsx";

function FinalSignup({ handleSubmit, email, setEmail, password, setPassword, errors, success, setErrors, validateField }) {
    const creds = useStore((state) => state.creds);

    const update = useStore((state) => state.update);

    const [discord, setDiscord] = useState(creds.discord || "");

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (value.empty)
            return;

        if (name === "discord") {
            setDiscord(value);
            update("creds", "discord", value);
        }

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
                <div className="flex flex-col font-bold text-center gap-y-10">
                    
                    {/* TODO: make sure na kapag nagt-type, papakita yung avatar (use CSS Bot) */}
                    <div className="mt-5">
                        Discord <span className="text-red-500">*</span>
                        <input
                            type="text"
                            name="discord"
                            placeholder="(Ex. .shinnn_9)"
                            value={discord}
                            onChange={handleChange}
                            required
                            className="flex mx-auto p-1 bg-white text-black rounded-md"
                        />
                    </div>

                    <div>
                        Email <span className="text-red-500">*</span>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={handleChange}
                            required
                            className="flex mx-auto p-1 bg-white text-black rounded-md"
                        />
                    {errors.email && <p className="text-red-500">{errors.email}</p>}
                    </div>

                    <div>
                        Password<span className="text-red-500"> *</span>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            required
                            minLength={6}
                            onChange={handleChange}
                            className="flex mx-auto p-1 bg-white text-black rounded-md"
                        />
                        {errors.password && <p className="text-red-500">{errors.password}</p>}
                    </div>

                    
                </div>
                
            </form>

            {success && (
                <p className="text-green-300 w-[40ch]">{success}</p>
                && 
                <p className="flex">
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