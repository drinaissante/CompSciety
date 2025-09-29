import { useEffect, useState } from "react";
import { auth } from "../firebase.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./auth.jsx";

function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);  
        return unsubscribe;
    }, []);

    async function initializeUser(user) {
        if (user) {
                setCurrentUser({ ...user });
                setUserLoggedIn(true);

                if (!user.emailVerified) {
                    console.log("Email not verified - but allowing profile creation");
                }
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
        }

        setLoading(false);
    }

    const value = { currentUser, userLoggedIn, loading }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;