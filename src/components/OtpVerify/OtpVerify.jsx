import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useState } from "react";
import toast from "react-hot-toast";


const OtpVerify = () => {
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const [isPending, setIsPending] = useState(false);

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        setIsPending(true); 
        const verifyData = {
            email: data.email,
            otp: data.otp
        };

        try {
            // post data to server
            const res = await axiosPublic.post('/password/verify-otp', verifyData);
            console.log(res.data);

            if (res.data.success === true) {
                console.log('otp verified');
                reset();
                navigate('/resetPassword');
                toast.success("OTP verified successfully")
            }
        } catch (error) {
            // Handle errors
            console.error(error);
            toast.error("Something went wrong")
        } finally {
            setIsPending(false); 
        }
    };

    return (
        <div style={{
            backgroundImage: 'url(https://i.postimg.cc/pX1jkrGb/8722687.jpg)',
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{
                minWidth: "30%",
                background: "rgba(255, 255, 255, 0.3)",
                borderRadius: "20px",
                padding: "20px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
            }}>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className='flex justify-center'>
                        <h2 className="text-black text-center text-2xl font-semibold mt-5">Otp Verification</h2>
                    </div>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-black">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register("email", { required: true })}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block px-3 w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="otp" className="block text-sm font-medium leading-6 text-black">
                                Enter Otp Code
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register("otp", { required: true })}
                                    id="otp"
                                    name="otp"
                                    type="text"
                                    autoComplete="otp"
                                    required
                                    className="block px-3 w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={isPending}
                                className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {isPending ? 'Verifying....' : 'Verify'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OtpVerify;
