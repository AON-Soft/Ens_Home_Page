import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";


const Home = () => {
    const {logout} = useContext(AuthContext)

    // handlelogout
    const handleLogout = () => {
        logout()
    };
    return (
        <div>
            <h2>This is Home</h2>
            <button onClick={handleLogout} className="btn btn-secondary">Log out</button>
        </div>
    );
};

export default Home;