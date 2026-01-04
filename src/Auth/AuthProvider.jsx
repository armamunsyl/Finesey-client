import { createContext, useEffect, useState } from "react";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
    updateProfile,
} from "firebase/auth";
import app from "../../firebase.config";
const auth = getAuth(app);
export const AuthContext = createContext(null);
const baseUrl = import.meta.env.VITE_BaseURL?.replace(/\/+$/, "");

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState("user");
    const [roleLoading, setRoleLoading] = useState(true);
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        });
    };
    const refreshUser = () => {
        const currentUser = auth.currentUser;
        setUser({
            ...currentUser,
        });
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!baseUrl) return;
        let isMounted = true;

        const syncUser = async () => {
            if (!user?.email) {
                localStorage.removeItem("access-token");
                if (isMounted) {
                    setRole("user");
                    setRoleLoading(false);
                }
                return;
            }

            setRoleLoading(true);
            try {
                const jwtRes = await fetch(`${baseUrl}/jwt`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({ email: user.email }),
                });
                const jwtData = await jwtRes.json();
                const token = jwtData?.token;
                if (token) {
                    localStorage.setItem("access-token", token);
                }

                const authHeaders = token
                    ? { authorization: `Bearer ${token}` }
                    : {};

                await fetch(`${baseUrl}/users`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        ...authHeaders,
                    },
                    body: JSON.stringify({
                        email: user.email,
                        name: user.displayName,
                        photoURL: user.photoURL,
                    }),
                });

                const roleRes = await fetch(
                    `${baseUrl}/users/role?email=${user.email}`,
                    {
                        headers: {
                            ...authHeaders,
                        },
                    }
                );
                const roleData = await roleRes.json();
                if (isMounted) {
                    setRole(roleData?.role || "user");
                }
            } finally {
                if (isMounted) {
                    setRoleLoading(false);
                }
            }
        };

        syncUser();

        return () => {
            isMounted = false;
        };
    }, [user?.email]);

    const authInfo = {
        user,
        loading,
        role,
        roleLoading,
        createUser,
        loginUser,
        googleLogin,
        logOut,
        updateUserProfile,
        refreshUser,
    };

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
