import { IoIosMenu, IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { TbPasswordUser } from "react-icons/tb";
import { ImProfile } from "react-icons/im";
import { menus } from "../../untils/Constants";
import { MdDashboard } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { RiMenuUnfold3Line } from "react-icons/ri";

function MenuAdmin(props) {
    const [dropbox, setdropbox] = useState(null);
    const [open, setOpen] = useState(false);
    const handleClick = (id) => {
        if (id == dropbox) {
            setdropbox(null)
        } else {
            setdropbox(id)
        }
    }
    const location = useLocation();
    const currentPath = location.pathname;
    return (
        <div className='p-5 bg-gray-950  md:h-screen'>
            <div className='flex justify-center items-center gap-5 ms-auto'>
                <RiMenuUnfold3Line onClick={(e) => setOpen(!open)} className={`text-2xl text-white 
                    ${open ? "" : "rotate-90"} transition-transform duration-200 hover:scale-120`} />
                {open && (
                    <div className='flex'>
                        <h1 className='font-bold text-2xl text-white'>Tfilm</h1>
                        <h1 className='font-bold text-2xl text-yellow-400'>Admin</h1>
                    </div>
                )}
            </div>
            <div className={`${open ? "block" : "hidden"} md:block`}>
                <Link to={"/"} className={`flex gap-3 items-center mt-4 rounded-xl p-2 hover:text-yellow-500
                     bg-gray-200 hover:bg-gray-600 hover:text-white
                      ${currentPath === "/" ? "text-yellow-500 bg-gray-500 shadow-md shadow-gray-200" : ""}`}>
                    <MdDashboard className='text-xl ' />
                    {open && (<p>Dash board</p>)}
                </Link>
                {open && (<h1 className='mt-4  text-white'>Form and Data</h1>)}
                {menus.map((e, i) => {
                    const isParentActive = e.items.some(b => `/${b.path}` === currentPath);

                    return (
                        <div key={e.id}>
                            <div
                                onClick={() => handleClick(e.id)}
                                className={`flex gap-3 items-center mt-4 rounded-xl p-2
                    ${isParentActive ? "text-yellow-500 bg-gray-500 shadow-md shadow-gray-200" : "bg-gray-200 hover:bg-gray-600 hover:text-white"}`}
                            >
                                <div className='text-xl'>{e.icon}</div>
                                {open && (
                                    <div className="flex flex-1 items-center">
                                        <h1 className=' text-xl'>{e.title}</h1>
                                        {dropbox === e.id
                                            ? <IoMdArrowDropdown className='text-xl ml-auto' />
                                            : <IoMdArrowDropright className='text-xl ml-auto' />}
                                    </div>
                                )}
                            </div>

                            <ul className={dropbox === e.id ? "" : "hidden"}>
                                {e.items.map((b, i) => (
                                    <Link
                                        key={b.path}
                                        className={`rounded-2xl block mt-2 p-2 border-b-1
                            ${currentPath === `/${b.path}`
                                                ? "text-yellow-500 bg-gray-500 shadow-md shadow-gray-200"
                                                : "bg-white hover:text-yellow-500"}`}
                                        to={`/${b.path}`}
                                    >
                                        {b.title}
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    );
                })}

                {open && (<h1 className='mt-4  text-white'>pages</h1>)}
                <Link to={"/user-pages"} className={`flex gap-3 items-center mt-4 rounded-xl p-2 hover:text-yellow-500  bg-gray-200 hover:bg-gray-600 hover:text-white 
                    ${currentPath === "/user-pages" ? "text-yellow-500 bg-gray-500 shadow-md shadow-gray-200" : ""}`}>
                    <TbPasswordUser className='text-xl ' />
                    {open && (
                        <div to={"/user-pages"} className=" flex-1">
                            <div className="flex items-center">
                                <h1 className=' text-xl'> User Pages</h1>

                            </div>
                        </div >
                    )}
                </Link>
                {open && (<h1 className='mt-4  text-white'>User Managemnent</h1>)}
                <Link to={"/user-management"} className={`flex gap-3 items-center mt-4 rounded-xl p-2  bg-gray-200 hover:bg-gray-600 hover:text-white 
                    ${currentPath === "/user-management" ? "text-yellow-500 bg-gray-500 shadow-md shadow-gray-200" : ""}`}>
                    <FaUsers className='text-xl' />
                    {open && (
                        <div className=" flex-1">
                            <div className="flex items-center">
                                <h1 className=' text-xl'> User Managemnent</h1>

                            </div>
                        </div >
                    )}
                </Link>
                {open && (<h1 className='mt-4  text-white'>Help</h1>)}
                <Link to={"/profile"} className={`flex gap-3 items-center mt-4 rounded-xl p-2 hover:text-yellow-500  bg-gray-200 hover:bg-gray-600 hover:text-white ${currentPath === "/profile" ? "text-yellow-500 bg-gray-500 shadow-md shadow-gray-200" : ""}`}>
                    <ImProfile className='text-xl ' />
                    {open && (
                        <div className=" flex-1">
                            <div className="flex items-center">
                                <h1 className=' text-xl'>Profile</h1>

                            </div>
                        </div >
                    )}
                </Link>
            </div>
        </div >
    );
}

export default MenuAdmin;