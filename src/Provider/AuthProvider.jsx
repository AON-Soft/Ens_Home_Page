import { createContext, useState, useEffect } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import toast from "react-hot-toast";





export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();
    // const navigate = useNavigate()
    
   


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
            console.log("local...", response.data.user);
            if (response.data.user.role === 'agent') {
                localStorage.setItem('access-token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                toast.success("Agent logged successfully")
                return response.data.user;
            }
            else {
                toast.error("Only agent can access this app")
            }
            // return response.data.user;
        } catch (error) {
            toast.error("Something went wrong")
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





