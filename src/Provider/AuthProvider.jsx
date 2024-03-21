import { createContext, useState, useEffect } from "react";

import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic()

  

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setUser(userData);
        }
        setLoading(false);
    }, []); // Empty dependency array to run only once on mount

    const login = async (email, password) => {
        try {
            const response = await axiosPublic.post('/login', { email, password });
            setUser(response.data.user);
            localStorage.setItem('access-token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
           
            // Swal.fire({
            //     position: "center",
            //     icon: "success",
            //     title: "User logged in successfully",
            //     showConfirmButton: false,
            //     timer: 1500
            // });
            return response.data.user;
        } catch (error) {
            // Swal.fire({
            //     position: "center",
            //     icon: "error",
            //     title: "Something went wrong",
            //     showConfirmButton: false,
            //     timer: 1500
            // });
            console.log(error.message);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('access-token');
        localStorage.removeItem('user');
    };

    const authContextValue = {
        user,
        loading,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};


export default AuthProvider;