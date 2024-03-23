import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate } from "react-router-dom";




const PrivateRouts = ({children}) => {
    const {user, loading} = useContext(AuthContext)

    if(loading){
        return <progress className="progress w-56 justify-center"></progress>
    }

    if(user?.email){
        return children
    }
    return <Navigate to={"/"}></Navigate>
};


export default PrivateRouts;