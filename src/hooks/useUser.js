import { useEffect, useState } from "react";
import { json } from "react-router-dom";

export const useUser = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const userStore = window.localStorage.getItem("user");
        if (userStore) {
            const userBan = JSON.parse(userStore);
            if (userBan.isBan) {
                setUser(null);
            } else {
                setUser(userBan);
            }
        }
    }, []);

    return [user, setUser];
};
