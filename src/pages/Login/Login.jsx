import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useForm } from "react-hook-form";


const Login = () => {


    const { register, handleSubmit, reset } = useForm();
    const { login } = useContext(AuthContext)

    const onSubmit = async (data) => {
        login(data.email, data.password);
        reset()
    };


    return (
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
                                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-black">
                                        Password
                                    </label>
                                    <div className="text-sm">
                                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
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
                                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    // disabled={isPending}
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                > Login
                                    {/* {isPending ? 'Authenticating...' : 'Sign in'} */}
                                </button>
                            </div>
                        </form>


                    </div>
                </div>

            </div>

        </div>
    );
};

export default Login;