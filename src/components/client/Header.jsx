import { IoIosSearch } from "react-icons/io";
import { menus } from "../../untils/ConstantsClient";
import { Link, useLocation } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { use, useContext, useState } from "react";
import { ContextCategories } from "../../contexts/CategoryProvider";
import { ContextCountries } from "../../contexts/CountryProvider";
import { FaUser } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { ContextAuth } from "../../contexts/AuthProvider";
import Avatar from "@mui/material/Avatar";

function Header({ handleOpenLogin }) {
    const [openAva, setOpenAva] = useState(false);
    const [openSearch, setOpenSearch] = useState(false)
    const [openDrop, setOpenDrop] = useState(null);
    const categories = useContext(ContextCategories);
    const countries = useContext(ContextCountries);
    const [openMenu, setOpenMenu] = useState(false);
    const handleOpenDrop = (item) => {
        setOpenDrop(openDrop === item ? null : item)
    }
    const location = useLocation();
    const currentPath = location.pathname;
    const { isLogin, handleLogout } = useContext(ContextAuth);

    return (
        <div className="flex items-center bg-gray-900/20 text-white p-2 py-3 gap-2 text-sm justify-between 2xl:text-xl">
            {/* nút moblie */}
            <div className=" lg:hidden">
                <button onClick={() => setOpenMenu(!openMenu)}>
                    {openMenu ? <HiX size={28} /> : <HiMenu size={28} />}
                </button>
            </div>
            {/* logo tfilm */}
            <Link className='flex items-center w-fit mr-auto lg:mr-0 lg:ms-2' to="/">
                <img src="/images/logo.png" alt="Tfilm" className='h-8 2xl:h-15' />
                <div className='flex flex-col bg-gradient-to-r from-blue-500 via-blue-700 to-purple-600 bg-clip-text text-transparent'>
                    <h1 className='font-bold font-serif text-lg 2xl:text-3xl'>TFILM</h1>
                    <span className='text-[7px] 2xl:text-[12px]'>Phim hay mỗi ngày</span>
                </div>
            </Link>
            {/* nút search */}

            <div className={` items-center gap-1 bg-gray-700 px-3 py-1 rounded-md w-full md:max-w-xs 2xl:max-w-xl 2xl ms-2 shadow-2xl
                 ${openSearch ? "flex absolute top-3 right-50 translate-x-1/2 w-full max-w-[350px] mx-2" : "hidden lg:flex lg:max-w-xs ms-2"} `}>
                <IoIosSearch />
                <input
                    className="p-1  bg-transparent outline-none w-full"
                    placeholder="Tìm tên phim,diễn viên"
                    type="text"
                />
            </div>
            <div className="text-xl block lg:hidden cursor-pointer z-50 relative"
                onClick={() => setOpenSearch(!openSearch)}>
                {openSearch ? <HiX size={22} /> : <IoIosSearch size={22} />}
            </div>
            <div className={`min-sm:flex p-3 items-center rounded-xl gap-3 ml-5 max-sm:grid max-sm:grid-cols-2 max-sm:absolute max-sm: top-[62px] max-sm:w-[70vw] max-sm:bg-gray-700 ${openMenu ? "" : "max-sm:hidden"}`}>
                { !isLogin ? (
                    <button className="col-span-2 min-sm:order-1 flex items-center gap-1 rounded-full bg-white text-black px-3 py-2 transition-transform duration-100 active:scale-95">
                        <FaUser />
                        <span onClick={handleOpenLogin} className="whitespace-nowrap">Thành Viên</span>
                    </button>
                ) : (
                    <>
                        <div onClick={(e) => setOpenAva(!openAva)} className='bg-amber-300 rounded-full h-10 w-10 transition-transform duration-150 hover:scale-110 min-sm:order-1'>
                            <Avatar sx={{ bgcolor:"red" }}></Avatar>
                        </div>
                        {openAva && (
                            <div className="absolute mt-8 w-48 bg-gray-600 rounded-md shadow-lg z-50 top-9 right-1 ">
                                <ul className="p-3 text-white ">
                                    <p>{isLogin?.name}</p>
                                    <li className="py-2 hover:text-yellow-400 cursor-pointer">👤 Profile</li>
                                    <li className="py-2 hover:text-yellow-400 cursor-pointer">⚙️ Settings</li>
                                    <li onClick={handleLogout} className="py-2 hover:text-yellow-400 cursor-pointer text-red-500">🚪 Logout</li>
                                </ul>
                            </div>
                        )}
                    </>
                )}


                {menus.map((e, id) => (
                    <div className="relative group">
                        {(e.title == "Thể Loại" || e.title == "Quốc Gia") ? (
                            <div onClick={() => handleOpenDrop(e.title)}>
                                <div className="hover:text-yellow-500 flex items-center ">
                                    {e.title}
                                    <IoMdArrowDropdown className="ml-1" />
                                </div>
                                {openDrop == e.title && (
                                    <div className="absolute bg-gray-800/80  top-4 gap-2  w-max rounded-2xl p-2 shadow-xl z-100">
                                        {openDrop === "Thể Loại" && (
                                            <div className="grid grid-cols-4 ">
                                                {categories.map((a) => (
                                                    <div className="p-2 hover:text-yellow-500 hover:text-shadow-md ">
                                                        {a.name}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {openDrop === "Quốc Gia" && (
                                            <div className="grid grid-cols-2">
                                                {countries.map((a) => (
                                                    <div className="p-2 hover:text-yellow-500 hover:text-shadow-md ">
                                                        {a.name}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                            </div>

                        ) : (
                            <Link
                                onClick={() => setOpenDrop(null)}
                                to={e.path}
                                className={`flex items-center hover:text-yellow-500 
                                    ${currentPath === e.path ? "text-yellow-500 shadow-gray-200" : ""}`}
                            >
                                {e.title}
                            </Link>
                        )}

                    </div>
                ))}
            </div>
        </div >

    );
}
export default Header;
