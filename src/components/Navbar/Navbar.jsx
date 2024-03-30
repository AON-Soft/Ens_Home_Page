import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import toast from "react-hot-toast";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    const navlinkItems = [
        { to: '/agentTranHistory', text: 'Agent Transection history' },
        { to: '/u2aCashOutHistory', text: 'User to Agent Cash Out History' },
        { to: '/a2uBalanceTransfer', text: 'Agent to User Balance Cash In' }
    ];

    const handleLogout = () => {
        logout();
        toast.success('Successfully Logged Out!');
    };

    return (
        <div>
            {/* Navbar for desktop */}
            <div className="navbar hidden md:flex bg-[#EEE] md:mb-10 md:px-5 px-0">
                {/* Left section */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navlinkItems.map((item, index) => (
                                <li key={index}><NavLink to={item.to}>{item.text}</NavLink></li>
                            ))}
                        </ul>
                    </div>
                    <NavLink to={'/home'} className="text-xl">
                        <h2 className="text-indigo-600 text-3xl font-semibold">EnSellers</h2>
                    </NavLink>
                </div>

                {/* Center section */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu font-bold space-x- text-md menu-horizontal px-1">
                        {navlinkItems.map((item, index) => (
                            <li key={index}><NavLink to={item.to}>{item.text}</NavLink></li>
                        ))}
                    </ul>
                </div>

                {/* Right section */}
                {user?.email ? (
                    <div className="navbar-end">
                        <div className="flex">
                            <h2 className="mr-2">{user.name}</h2>
                        </div>
                        <button onClick={handleLogout} className="btn bg-indigo-600 font-bold text-lg text-white hover:bg-white hover:text-purple-500">Log Out</button>
                    </div>
                ) : (
                    <div className="navbar-end">
                        <NavLink to={'/'}>
                            <button className="btn font-bold text-lg">login</button>
                        </NavLink>
                    </div>
                )}
            </div>

            {/* Navbar for mobile devices */}
            <div className="md:hidden mt-5 px-5">
                <div className="flex justify-between gap-10 items-center">
                    <div>
                        <NavLink to={'/home'} className="text-xl">
                            <h2 className="text-indigo-600 text-2xl font-semibold">EnSellers</h2>
                        </NavLink>
                    </div>
                    {/* Right section */}
                    <div className="flex justify-end items-center">
                        <h2 className="text-sm">{user.name}</h2>
                        <button onClick={handleLogout} className="btn text-white bg-indigo-600">Log Out</button>
                    </div>
                </div>
                <div className="flex gap-5 overflow-x-auto mt-3">
                    {navlinkItems.map((item, index) => (
                        <div key={index}>
                            <button className="btn text-white bg-indigo-600"><NavLink to={item.to} className="whitespace-nowrap">{item.text}</NavLink></button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
