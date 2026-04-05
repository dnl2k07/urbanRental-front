import { createContext, useContext, useEffect, useState } from "react";
import { whoAmI, logout } from "../usersFolder/users";

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [errorUser, setUserError] = useState('');
    const [loading, setLoading] = useState(true);

    async function load() {
        setLoading(true);
        const data = await whoAmI();
        if (!data.error) {
            setUser(data);
        } else {
            setUser(null); // nullos hiba legyen
        }
        setLoading(false);
    }

    useEffect(() => {
        load();
    }, []);

    async function onLoginSuccess() {
        await load(); // User info lekeres by token
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