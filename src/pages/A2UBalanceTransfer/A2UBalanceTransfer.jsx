import { useForm } from "react-hook-form";
import Navbar from "../../components/Navbar/Navbar";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";



const A2UBalanceTransfer = () => {
    const { user } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()


    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const cashIndata = {
                receiverEmail: data.receiverEmail,
                amount: data.amount
            };
            console.log(cashIndata);

            // send Data to server
            const res = await axiosPublic.post('/agent/user/sendPoints', cashIndata);
            console.log("cash in", res.data);
            reset();
        } catch (error) {
            console.error('Error sending data to server:', error);
            // Handle error gracefully (e.g., show a message to the user)
        }
    };



    return (
        <div>
            <Navbar></Navbar>
            <div className='flex justify-center mt-10'>
                <div style={{ minWidth: "30%" }}>
                    <div className="flex rounded-lg min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white shadow-lg">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <div className='flex justify-center'>
                                {/* <Image src={"/login.gif"} width={100} height={100} alt='logo' /> */}
                            </div>
                            <h2 className="mt-5 text-black text-center text-2xl font-bold leading-9 tracking-tight">
                                Sign in to your account
                            </h2>
                        </div>
                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-black">
                                        Sender Email
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            {...register("email", { required: true })}
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            defaultValue={user?.email}
                                            readOnly
                                            className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-black">
                                        Receiver Email
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            {...register("receiverEmail", { required: true })}
                                            id="receiverEmail"
                                            name="receiverEmail"
                                            type="email"
                                            autoComplete="receiverEmail"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-black">
                                            amount
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            {...register("amount", { required: true })}
                                            id="amount"
                                            name="amount"
                                            type="text"
                                            autoComplete="amount"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        // disabled={isPending}
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    > Send Points
                                        {/* {isPending ? 'Authenticating...' : 'Sign in'} */}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default A2UBalanceTransfer;