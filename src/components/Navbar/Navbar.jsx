import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import toast from "react-hot-toast";



const Navbar = () => {
    const { user, logout } = useContext(AuthContext)

    const navlink = <>
        <li><NavLink to={'/agentTranHistory'}>Agent Transection history</NavLink></li>
        <li><NavLink to={'/u2aCashOutHistory'}>User to Agent Cash Out History</NavLink></li>
        <li><NavLink to={'/a2uBalanceTransfer'}>Agent to User Balance Cash In</NavLink></li>
    </>

const handleLogout = () => {
    logout()
    toast.success('Successfully Logged Out!')
};


    return (
        <div className="navbar bg-[#EEE] md:mb-10 md:px-5 px-0">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navlink}
                    </ul>
                </div>
                <a className="text-xl">
                    <NavLink to={'/home'}>
                        {/* <img className="md:w-[200px] w-[100px] md:h-[100px] lg:h-[120px]" src="https://i.postimg.cc/7YNVY1pr/Food-Thrive-logos-1.jpg" alt="" /> */}
                        <h2 className="text-indigo-600 text-3xl font-semibold">EnSellers</h2>
                    </NavLink>
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu font-bold space-x- text-md menu-horizontal px-1">
                    {
                        navlink
                    }
                </ul>
            </div>
            {
                user?.email ? <div className="navbar-end">
                    <div className="flex">
                        <h2 className="mr-2">{user.name}</h2>
                    </div>
                    <a onClick={handleLogout} className="btn bg-indigo-600 font-bold text-lg text-white hover:bg-white hover:text-purple-500">Log Out</a>

                </div> :
                    <div className="navbar-end">
                        <NavLink to={'/'}>
                            <a className="btn font-bold text-lg">login</a>
                        </NavLink>
                    </div>
            }
        </div>
    );
};

export default Navbar;