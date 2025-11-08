import { useEffect, useRef, useState } from "react";

import { motion, AnimatePresence} from "framer-motion"
import { fetchAvatarURL } from "../../db/database.jsx";
import { useNavigate } from "react-router-dom";
import useStore from "@/components/state/store.jsx";

// blur everything and add <Loading> in the middle so it waits

function FinalSignup({ handleSubmit, email, setEmail, password, setPassword, errors, success, setErrors, validateField }) {
    const creds = useStore((state) => state.creds);
    const update = useStore((state) => state.update);

    const navigate = useNavigate();

    const [discord, setDiscord] = useState(creds.discord || "");
    const [avatarURL, setAvatarURL] = useState(null);
    const [isLoadingAvatar, setIsLoadingAvatar] = useState(false);
    const [error, setError] = useState(null);

    const avatarCache = useRef({});
    const debounceTimer = useRef(null);

    const fetchAvatar = async (username) => {
        if (!username) {
            setAvatarURL(null);
            return;
        }

        if (avatarCache.current[username]) {
            setAvatarURL(avatarCache.current[username]);
            return;
        }

        try {
            setIsLoadingAvatar(true);
            setError(null);

            const url = await fetchAvatarURL(username, {setError});
            
            if (url !== "N/A") {
                avatarCache.current[username] = url;
                setAvatarURL(url);
            } else {
                setAvatarURL(null);
                avatarCache.current[username] = null;
            }
        } catch (error) {
            console.error(error);
            setError(error.message);
            setAvatarURL(null);
        } finally {
            setIsLoadingAvatar(false);
        }
    }

    useEffect(() => {
        return () => clearTimeout(debounceTimer);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (value.empty)
            return;

        if (name === "discord") {
            setDiscord(value);
            update("creds", "discord", value);

            if (value.trim() === "") {
                setAvatarURL(null);
                avatarCache.current[value] = null;
                return;
            }

            if (debounceTimer.current) clearTimeout(debounceTimer.current);

            debounceTimer.current = setTimeout(() => {
                if (value) 
                    fetchAvatar(value);
            }, 700);
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
                    <AnimatePresence mode="wait">
                        {isLoadingAvatar ? (
                            // skeleton loader (animated pulsing circle)
                            <motion.div
                                key="skeleton"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 1 }}
                                className="rounded-full h-14 w-14 bg-gray-300 animate-pulse"
                            >
                            </motion.div>
                        ) : avatarURL ? (
                            // fade-in avatar
                            <motion.img
                                key="avatar"
                                src={avatarURL}
                                alt={`Discord avatar`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="rounded-full h-14 w-14 object-cover shadow-md"
                                draggable="false"
                            />
                        ): (
                            // empty placeholder (when nothing typed)
                            <div
                                key="empty"
                                className="rounded-full h-14 w-14 bg-gray-200 border border-gray-400"
                            />
                        )}
                    </AnimatePresence>

                    {isLoadingAvatar && 
                                <p className="text-gray-400">Fetching avatar...</p>}

                    {error && <p className="text-red-400 text-sm mt-2 w-[38ch]">{error}</p>}
                    
                    {!isLoadingAvatar && !avatarURL && discord && (
                        <p className="text-red-400 text-sm mt-2 w-[38ch]">
                            Discord User not in the Discord Server.
                        </p>
                    )}
                    
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