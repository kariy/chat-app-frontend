import { createContext, useEffect, useState } from "react";
import { TUser } from "../types/user";

interface TUserContext {
    current: TUser | null;
    set: (user: TUser) => void;
    logout: () => void;
}

export const UserContext = createContext<TUserContext | null>(null);

const UserProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<TUser | null>(null);

    // useEffect(() => {
    //     console.log("current user : ", user);
    // }, [user]);

    function set(user: TUser) {
        setUser(user);
    }

    function logout() {
        setUser(null);
    }

    return (
        <UserContext.Provider value={{ current: user, set, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
