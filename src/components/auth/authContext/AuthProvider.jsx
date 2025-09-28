import { useEffect, useState } from "react";
import { auth } from "../firebase.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./auth.jsx";
import { doSignOut } from "../authService.jsx";

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
            if (user.emailVerified) {
                setCurrentUser({ ...user });
                setUserLoggedIn(true);
            } else {
                await doSignOut();
                setCurrentUser(null);
                setUserLoggedIn(false);
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