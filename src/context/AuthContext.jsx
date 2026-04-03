import { createContext, use, useContext, useEffect, useState } from "react";
import { whoAmI, logout } from "../usersFolder/users";

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [errorUser, setUserError] = useState('');
    const [loading, setLoading] = useState(true); // Alapból true legyen!

    async function load() {
        setLoading(true);
        const data = await whoAmI();
        if (!data.error) {
            setUser(data);
        } else {
            setUser(null); // Ha hiba van, biztosan null legyen
        }
        setLoading(false);
    }

    useEffect(() => {
        load();
    }, []);

    // EZ HIÁNYZIK: Bejelentkezés utáni azonnali state frissítés
    async function onLoginSuccess() {
        await load(); // Újra lekérjük a user infót az API-tól a friss token alapján
    }

    async function onLogout() {
        const data = await logout();
        if (data.error) {
            return setUserError(data.error);
        }
        setUser(null);
    }

    async function updateUserData() {
        const data = await whoAmI();
        if (!data.error) {
            setUser(data);
        }
    }

    return (
        <AuthContext.Provider value={{ user, setUser, errorUser, onLogout, loading, onLoginSuccess, updateUserData}}>
            {children}
        </AuthContext.Provider>
    );
}
export function useAuth() {
    return useContext(AuthContext)
}