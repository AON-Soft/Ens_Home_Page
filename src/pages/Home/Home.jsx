import Navbar from "../../components/Navbar/Navbar";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Skeleton } from "antd";
import moment from "moment";


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
                            <h2>User Name : {myInfo?.user?.name}</h2>
                            <h2>User Email : {myInfo?.user?.email}</h2>
                            <h2>User mobile : {myInfo?.user?.mobile}</h2>
                            <h2>User Status : {myInfo?.user?.status}</h2>
                            <h2>User Role : {myInfo?.user?.role}</h2>
                        </div>
                    </div>
                </div>
                <div className="md:w-6/12 w-full mt-10 md:mt-0 bg-[#EEE] px-5 py-5 rounded-lg shadow-xl">
                    <h2 className="text-2xl font-semibold text-center mb-5">Account Information</h2>
                    <div className="px-5">
                        <h2>Balance : {myInfo?.user?.balance}</h2>
                        <h2>Bonus Balance : {myInfo?.user?.bonusBalance}</h2>
                        <h2>Due Balance : {myInfo?.user?.dueBalance}</h2>
                        <h2>Account Created : {formattedDate}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;