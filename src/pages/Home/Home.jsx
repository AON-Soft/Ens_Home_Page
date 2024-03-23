import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Navbar from "../../components/Navbar/Navbar";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Skeleton } from "antd";


const Home = () => {
    const { logout } = useContext(AuthContext)

    const { data, isPending } = useQuery({
        queryKey: ['userInfo'],
        queryFn: async () => {
            const res = await useAxiosPublic.get('/me');
            return res.data;
        }
    });

    console.log("home",data);

    if (isPending) {
		return (
			<div className="bg-gray-100 border rounded py-5 px-2">
				<Skeleton active />
				<Skeleton active className="mt-4" />
			</div>
		);
	}



    // handlelogout
    const handleLogout = () => {
        logout()
    };
    return (
        <div>
            <Navbar></Navbar>
            <h2>This is Home</h2>
            <button onClick={handleLogout} className="btn btn-secondary">Log out</button>
        </div>
    );
};

export default Home;