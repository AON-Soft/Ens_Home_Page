import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";



const Login = () => {
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()
    const [isPending, setIsPending] = useState(false)


    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        setIsPending(true);
        try {
            await login(data?.email, data?.password);
            const myInfo = await axiosPublic.get('/me');
            if (myInfo?.data?.user?.role === 'agent') {
                navigate('/home');
                reset()
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error('Error logging in:', error);
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
            alignItems: 'center',
            padding: "20px",
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
                        <h2 className="text-black text-center text-2xl font-semibold mt-5">EnSellers</h2>
                    </div>
                    <h2 className="mt-5 text-black text-center text-md font-medium">
                    Sign in to your account
                    </h2>
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
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-black">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="/forgotPassword" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    {...register("password", { required: true })}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block px-3 w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="pb-5">
                            <button
                                disabled={isPending}
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            > {isPending ? 'Authenticating...' : 'Sign in'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;