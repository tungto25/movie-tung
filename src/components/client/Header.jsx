import { IoIosSearch } from "react-icons/io";
import { menus } from "../../untils/ConstantsClient";
import { Link, useLocation } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { use, useContext, useEffect, useRef, useState } from "react";
import { ContextCategories } from "../../contexts/CategoryProvider";
import { ContextCountries } from "../../contexts/CountryProvider";
import { FaUser } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { ContextAuth } from "../../contexts/AuthProvider";
import Avatar from "@mui/material/Avatar";
import { FaUserCog } from "react-icons/fa";
import { RxDoubleArrowUp } from "react-icons/rx";
import { FaWallet } from "react-icons/fa";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { MdReplayCircleFilled } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import useClickOutside from "../../services/UseClickOutside";
import { Stack } from "@mui/system";
import { Autocomplete, TextField } from "@mui/material";
import { ContextMovies } from "../../contexts/MovieProvider";
import { ContextEpisodes } from "../../contexts/EpisodeProvider";
import { getOjectById, removeVietnameseTones } from "../../services/reponsitory";
import { ContextSections } from "../../contexts/SectionProvider";
import { GoDotFill } from "react-icons/go";

function Header({ handleOpenLogin }) {
    const [openAva, setOpenAva] = useState(false);
    const [openSearch, setOpenSearch] = useState(false)
    const [openDrop, setOpenDrop] = useState(null);
    const categories = useContext(ContextCategories);
    const countries = useContext(ContextCountries);
    const [openMenu, setOpenMenu] = useState(false);
    const location = useLocation();
    const currentPath = location.pathname;
    const { isLogin, handleLogout } = useContext(ContextAuth);
    const movies = useContext(ContextMovies);
    const episodes = useContext(ContextEpisodes);
    const sections = useContext(ContextSections);

    const containerRef = useRef(null);
    useClickOutside(containerRef, () => {
        setOpenDrop(null);
        setOpenAva(false);
    });

    const handleOpenDrop = (item) => {
        setOpenDrop(openDrop === item ? null : item);
    };
    const [value, setValue] = useState(null);

    return (
        <div className="flex items-center bg-gray-900/20 text-white p-2 py-3 gap-2 text-sm justify-between 2xl:text-xl">
            <div className=" lg:hidden">
                <button onClick={() => setOpenMenu(!openMenu)}>
                    {openMenu ? <HiX size={28} /> : <HiMenu size={28} />}
                </button>
            </div>
            <Link className='flex items-center w-fit mr-auto lg:mr-0 lg:ms-2' to="/">
                <img src="/images/logo.png" alt="Tfilm" className='h-8 2xl:h-15' />
                <div className='flex flex-col bg-gradient-to-r from-blue-500 via-blue-700 to-purple-600 bg-clip-text text-transparent'>
                    <h1 className='font-bold font-serif text-lg 2xl:text-3xl'>TFILM</h1>
                    <span className='text-[7px] 2xl:text-[12px]'>Phim hay mỗi ngày</span>
                </div>
            </Link>

            <div
                className={`flex items-center gap-1 bg-gray-700 px-2 rounded-md ms-2 shadow-2xl
                        ${openSearch ? "absolute top-3 max-sm:left-0 max-sm:right-0 right-10 mx-2 w-[380px] " : "hidden lg:flex lg:w-[450px]"}`}
            >
                <IoIosSearch className="text-white" />

                <Autocomplete
                    openOnFocus={false}
                    fullWidth
                    freeSolo
                    disableClearable
                    options={movies}
                    getOptionLabel={(option) => option.name}
                    value={value}
                    onChange={(_, newValue) => setValue(newValue)}
                    filterOptions={(options, { inputValue }) => {
                        if (inputValue === "") return [];
                        const query = removeVietnameseTones(inputValue.toLowerCase());

                        return options.filter((opt) =>
                            removeVietnameseTones(opt.name.toLowerCase()).includes(query)
                        );
                    }}
                    sx={{
                        flex: 1,
                        "& .MuiInputBase-root": { color: "white" },
                        "& .MuiAutocomplete-paper": { backgroundColor: "#364153", color: "gray" },
                        "& .MuiAutocomplete-option": {
                            "&[aria-selected='true']": { backgroundColor: "#4B5563" },
                            "&.Mui-focused": { backgroundColor: "#4B5563" },
                        },
                    }}
                    slotProps={{
                        popper: {
                            sx: {
                                "& .MuiAutocomplete-paper": {
                                    backgroundColor: "rgba(17, 24, 39, 0.7)", // màu tối trong suốt (70%)
                                    backdropFilter: "blur(8px)", // làm mờ nền phía sau
                                    WebkitBackdropFilter: "blur(8px)", // để hỗ trợ Safari
                                    borderRadius: "0.75rem", // bo góc mềm hơn
                                    color: "white",
                                },
                                "& .MuiAutocomplete-option": {
                                    "&[aria-selected='true']": { backgroundColor: "rgba(75, 85, 99, 0.6)" },
                                    "&.Mui-focused": { backgroundColor: "rgba(75, 85, 99, 0.4)" },
                                },
                            },
                        },
                    }}
                    renderOption={(props, e) => (
                        <li {...props} key={e.id} className="flex items-center gap-3 p-2 w-18 h-25 whitespace-nowrap ">
                            <img
                                src={e.imgUrl}
                                alt={e.name}
                                className="w-full h-full object-cover rounded"
                            />
                            <div className="text-start mb-auto">
                                <p className="font-bold text-lg">{e.name}</p>
                                <div className="flex items-center gap-3 text-gray-400 text-sm py-1">
                                    <p>{episodes.filter(ep => ep.movieId === e.id).length} tập</p>
                                    {sections.filter(f => f.movieId === e.id).map(f => (
                                        <div className="flex items-center gap-1">
                                            <GoDotFill className="text-xs text-green-600" />
                                            <p key={f.id}>Phần {f.season}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center text-xs gap-2">
                                    <p className="bg-green-600 p-1 rounded">vietsub</p>
                                    <p className="bg-blue-600 p-1 rounded">Thuyết minh</p>
                                </div>
                            </div>
                        </li>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            fullWidth
                            placeholder="Tìm tên phim, diễn viên"
                            variant="standard"
                            InputProps={{
                                ...params.InputProps,
                                disableUnderline: true,
                                className: "text-white bg-transparent outline-none p-1 w-full",
                                type: "search",
                            }}
                        />
                    )}
                />

            </div>


            <div className="text-xl block lg:hidden cursor-pointer z-50 relative"
                onClick={() => setOpenSearch(!openSearch)}>
                {openSearch ? <HiX size={22} /> : <IoIosSearch size={22} />}
            </div>
            <div ref={containerRef} className={`min-lg:flex p-3 items-center rounded-xl gap-3 ml-5 max-lg:grid max-lg:grid-cols-2 max-lg:absolute 
                top-[60px] left-0 max-lg:w-[70vw] max-lg:bg-gray-800 ${openMenu ? "" : "max-lg:hidden"}`}>
                {!isLogin ? (
                    <button className="col-span-2 min-lg:order-1 flex items-center gap-1 rounded-full bg-white text-black px-3 py-2 transition-transform duration-100 active:scale-95">
                        <FaUser />
                        <span onClick={handleOpenLogin} className="whitespace-nowrap">Thành Viên</span>
                    </button>
                ) : (
                    <>
                        <div
                            onClick={() => setOpenAva(!openAva)}
                            className="rounded-full h-10 w-10 transition-transform duration-150 hover:scale-110 min-lg:order-1"
                        >
                            {isLogin?.imgUrl ? 
                            <Avatar
                                src={isLogin?.imgUrl && isLogin?.imgUrl}
                                sx={{}}
                            />:<Avatar
                                sx={{ bgcolor: "red" }}
                            />}
                            
                        </div>

                        <div className={`col-span-2 lg:${openAva ? "block" : "hidden"}  sm:block md:block `}>
                            <div className="p-3 text-white lg:absolute top-[65px] bg-gray-800 rounded-xl right-5">
                                <div className="flex items-center gap-3">
                                    <p>{isLogin?.email?.split("@")[0].replace(/[0-9]/g, "")}</p>
                                    <FaUserCog className="text-yellow-500" />
                                </div>
                                <p className="text-xs py-2 text-gray-400">
                                    Nâng cấp tài khoản VIP để có trải nghiệm đẳng cấp hơn
                                </p>
                                <Link to="/packages" className="w-full bg-yellow-500 px-2 py-1 rounded text-black flex items-center justify-center gap-1 mt-3 active:scale-98">
                                    <span>Nâng Cấp Ngay</span>
                                    <RxDoubleArrowUp />
                                </Link>
                                <hr className="my-2 text-gray-600 max-md:hidden" />
                                <div className="flex justify-between items-center p-3">
                                    <div className="flex items-center gap-1">
                                        <FaWallet />
                                        <span>Số Dư</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <p>0</p>
                                        <FaMoneyBill1Wave />
                                    </div>
                                    <div className="bg-white text-black rounded-2xl text-center px-2 py-0.5">
                                        + nạp
                                    </div>
                                </div>
                                <hr className="my-2 text-gray-600 max-md:hidden" />
                                <div className=" gap-4 grid grid-cols-2 md:grid-cols-1">
                                    <Link to='/manageAccount/likeEpi' className="flex items-center gap-2 max-md:border max-md:px-4 max-md:py-2 max-md:rounded-md">
                                        <FaHeart />
                                        <span className="whitespace-nowrap">Yêu Thích</span>
                                    </Link>
                                    <Link to='/manageAccount/listEpi' className="flex items-center gap-2 max-md:border max-md:px-4 max-md:py-2 max-md:rounded-md">
                                        <FaPlus />
                                        <span className="whitespace-nowrap">Danh sách</span>
                                    </Link>
                                    <Link to="/manageAccount/seeMore" className="flex items-center gap-2 max-md:border max-md:px-4 max-md:py-2 max-md:rounded-md">
                                        <MdReplayCircleFilled />
                                        <span className="whitespace-nowrap">Xem tiếp</span>
                                    </Link>
                                    <Link to="/manageAccount/account" className="flex items-center gap-2 max-md:border max-md:px-4 max-md:py-2 max-md:rounded-md">
                                        <FaUser />
                                        <span className="whitespace-nowrap">Tài khoản</span>
                                    </Link>
                                </div>
                                <hr className="my-2 text-gray-600 max-md:hidden" />
                                <div onClick={handleLogout} className="p-2 hover:text-yellow-400 cursor-pointer text-red-500 flex items-center gap-2 max-md:border max-md:px-4 max-md:py-2 max-md:rounded-md max-md:mt-3">
                                    <FaSignOutAlt /> Logout
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {menus.map((e, id) => (
                    <div className="relative group" >
                        {(e.title == "Thể Loại" || e.title == "Quốc Gia") ? (
                            <div onClick={() => handleOpenDrop(e.title)}>
                                <div className="hover:text-yellow-500 flex items-center ">
                                    {e.title}
                                    <IoMdArrowDropdown className="ml-1" />
                                </div>
                                {openDrop == e.title && (
                                    <div className="absolute bg-gray-800/80 left-1/2 -translate-x-1/2 top-4 translate-y-4 gap-2  w-max rounded-2xl p-2 shadow-xl z-100">
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
