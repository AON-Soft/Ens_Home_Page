import Navbar from "../../components/Navbar/Navbar";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Skeleton } from "antd";
import moment from "moment";
import { FaDollarSign } from "react-icons/fa";


const Home = () => {
    const axiosPublic = useAxiosPublic()

    const { data: myInfo = { info: [] }, isPending } = useQuery({
        queryKey: ['myInfo'],
        queryFn: async () => {
            const res = await axiosPublic.get('/me');
            return res.data;
        }
    });

    console.log("home", myInfo);

    if (isPending) {
        return (
            <div className="bg-gray-100 border rounded py-5 px-2">
                <Skeleton active />
                <Skeleton active className="mt-4" />
            </div>
        );
    }
    // date formet
    const formattedDate = moment(myInfo?.user?.createdAt).format('DD-MM-YYYY');


    return (
        <div>
            <Navbar></Navbar>
            <div className="md:flex gap-10 md:px-10 px-5 mt-10">
                <div className="md:w-6/12 w-full bg-[#EEE] px-5 py-5 rounded-lg shadow-xl">
                    <h2 className="text-2xl font-semibold text-center mb-5">Personal Information</h2>
                    <div className="md:flex gap-5 justify-evenly items-center">
                        <div className="flex justify-center items-center">
                            {myInfo?.avatar?.url ? <img className="w-[200px]" src={myInfo?.avatar?.url} alt="self Image" /> : <img className="w-[200px]" src={"https://i.postimg.cc/gjW7PqPL/user.png"} alt="self Image" />}
                        </div>
                        <div className="mt-8 md:mt-0">
                            <h2>Name : <span className="font-semibold">{myInfo?.user?.name}</span></h2>
                            <h2>Email : <span className="font-semibold">{myInfo?.user?.email}</span></h2>
                            <h2>mobile : <span className="font-semibold">{myInfo?.user?.mobile}</span></h2>
                            <h2>Status : <span className="font-semibold">{myInfo?.user?.status}</span></h2>
                            <h2>Role : <span className="font-semibold">{myInfo?.user?.role}</span></h2>
                        </div>
                    </div>
                </div>
                <div className="md:w-6/12 w-full mt-10 md:mt-0 bg-[#EEE] px-5 py-5 rounded-lg shadow-xl">
                    <h2 className="text-2xl font-semibold text-center mb-5">Account Information</h2>
                    <div className="px-5 mt-14">
                        <h2 className="flex justify-start items-center">Balance :<span><FaDollarSign /></span> {myInfo?.user?.balance}</h2>
                        <h2 className="flex justify-start items-center">Bonus Balance :<span><FaDollarSign /></span> {myInfo?.user?.bonusBalance}</h2>
                        <h2 className="flex justify-start items-center">Due Balance :<span><FaDollarSign /></span> {myInfo?.user?.dueBalance}</h2>
                        <h2>Account Created : {formattedDate}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;