import { IoIosMenu } from "react-icons/io";
import { LuSquareMenu } from "react-icons/lu";
import { CgMenuGridR } from "react-icons/cg";
import { IoMdArrowDropright } from "react-icons/io";
import { useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { GoFileMedia } from "react-icons/go";
import { RiVipCrownFill } from "react-icons/ri";
import { GiEngagementRing } from "react-icons/gi";
import { TbCast } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";
import { TbPasswordUser } from "react-icons/tb";
import { ImProfile } from "react-icons/im";


function MenuAdmin(props) {
    const [dropbox, setdropbox] = useState(null);
    const openDrop = (name) => setdropbox(dropbox == name ? null : name);
    return (
        <div className='p-5 bg-gray-950  min-h-max'>
            <div className='flex justify-center items-center gap-5 ms-auto'>
                <IoIosMenu className='text-2xl text-white' />
                <div className='flex'>
                    <h1 className='font-bold text-2xl text-white'> WatchTV</h1>
                    <h1 className='font-bold text-2xl text-yellow-400'>Admin</h1>
                </div>
            </div>
            <div className='flex gap-3 items-center mt-4 rounded-xl p-2  bg-gray-200 hover:bg-green-500 hover:text-yellow-400'>
                <LuSquareMenu className='text-xl ' />
                <h1 className=' text-xl'> Dashboars</h1>
            </div>
            <h1 className='mt-4  text-white'>UI ELEMENT</h1>
            <div>
                <div onClick={() => openDrop("cate")}
                    className='flex gap-3 items-center mt-4 rounded-xl p-2  bg-gray-200 hover:bg-green-500 hover:text-yellow-400'>
                    <CgMenuGridR className='text-xl ' />
                    <h1 className=' text-xl'> Categories</h1>
                    {dropbox == "cate" ? (
                        <TiArrowSortedDown className='text-xl ml-auto' />
                    ) : (
                        <IoMdArrowDropright className='text-xl ml-auto' />
                    )}
                </div>
                {dropbox == "cate" ? (<ul className="text-center rounded-2xl bg-white">
                    <li className=" mt-2 pb-2 border-b-1 w-3/4 mx-auto">Action</li>
                    <li className=" mt-2 pb-2 border-b-1 w-3/4 mx-auto">Adventure</li>
                    <li className=" mt-2 pb-2 border-b-1 w-3/4 mx-auto">Comedy</li>
                    <li className=" mt-2 pb-2 border-b-1 w-3/4 mx-auto">Drama</li>
                    <li className=" mt-2 pb-2 border-b-1 w-3/4 mx-auto">Comedy</li>
                    <li className=" mt-2 pb-2 border-b-1 w-3/4 mx-auto">Romance</li>
                    <li className=" mt-2 pb-2 border-b-1 w-3/4 mx-auto">Thriller</li>
                    <li className=" mt-2 pb-2 border-b-1 w-3/4 mx-auto">Horror</li>
                    <li className=" mt-2 pb-2 border-b-1 w-3/4 mx-auto">Mystery</li>
                    <li className=" mt-2 pb-2 border-b-1 w-3/4 mx-auto">Crime</li>
                    <li className=" mt-2 pb-2 border-b-1 w-3/4 mx-auto">Fantasy</li>
                    <li className=" mt-2 pb-2 border-b-1 w-3/4 mx-auto">Sci-Fi</li>
                    <li className=" mt-2 pb-2 border-b-1 w-3/4 mx-auto">War/Historical</li>
                </ul>) : ""}
            </div>
            <h1 className='mt-4  text-white'>FORM AND DATA</h1>
            <div>
                <div onClick={() => openDrop("Media")}
                    className='flex gap-3 items-center mt-4 rounded-xl p-2  bg-gray-200 hover:bg-green-500 hover:text-yellow-400'>
                    <GoFileMedia className='text-xl ' />
                    <h1 className=' text-xl'> Media_management</h1>
                    {dropbox == "Media" ? (
                        <TiArrowSortedDown className='text-xl ml-auto' />
                    ) : (
                        <IoMdArrowDropright className='text-xl ml-auto' />
                    )}
                </div>
                {dropbox == "Media" ? (<ul className="text-center rounded-2xl bg-white">
                    <li className=" mt-2 pb-2 border-b-1 w-3/4 mx-auto">Movies</li>
                    <li className=" mt-2 pb-2 border-b-1 w-3/4 mx-auto">Episodes</li>
                    <li className=" mt-2 pb-2 border-b-1 w-3/4 mx-auto">Trailer</li>
                </ul>) : ""}
            </div>
            <div>
                <div className='flex gap-3 items-center mt-4 rounded-xl p-2  bg-gray-200 hover:bg-green-500 hover:text-yellow-400'>
                    <RiVipCrownFill className='text-xl ' />
                    <h1 className=' text-xl'> Vip</h1>
                    <IoMdArrowDropright className='text-xl ml-auto' />
                </div>

            </div>
            <div className='flex gap-3 items-center mt-4 rounded-xl p-2  bg-gray-200 hover:bg-green-500 hover:text-yellow-400'>
                <CgMenuGridR className='text-xl ' />
                <h1 className=' text-xl'> Categories</h1>
                <IoMdArrowDropright className='text-xl ml-auto' />
            </div>
            <div className='flex gap-3 items-center mt-4 rounded-xl p-2  bg-gray-200 hover:bg-green-500 hover:text-yellow-400'>
                <GiEngagementRing className='text-xl ' />
                <h1 className=' text-xl'> Engagement Pages</h1>
                <IoMdArrowDropright className='text-xl ml-auto' />
            </div>
            <div className='flex gap-3 items-center mt-4 rounded-xl p-2  bg-gray-200 hover:bg-green-500 hover:text-yellow-400'>
                <TbCast className='text-xl ' />
                <h1 className=' text-xl'> Cast & Crew</h1>
                <IoMdArrowDropright className='text-xl ml-auto' />
            </div>
            <h1 className='mt-4  text-white'>Pages</h1>
            <div className='flex gap-3 items-center mt-4 rounded-xl p-2  bg-gray-200 hover:bg-green-500 hover:text-yellow-400'>
                <TbPasswordUser className='text-xl ' />
                <h1 className=' text-xl'> User Pages</h1>
                <IoMdArrowDropright className='text-xl ml-auto' />
            </div>
            <h1 className='mt-4  text-white'>User Managemnent</h1>
            <div className='flex gap-3 items-center mt-4 rounded-xl py-2  bg-gray-200 hover:bg-green-500 hover:text-yellow-400'>
                <FaUsers className='text-xl ms-1' />
                <h1 className=' text-xl'> User Managemnent</h1>
                <IoMdArrowDropright className='text-xl ml-auto' />
            </div>
            <h1 className='mt-4  text-white'>Help</h1>
            <div className='flex gap-3 items-center mt-4 rounded-xl p-2  bg-gray-200 hover:bg-green-500 hover:text-yellow-400'>
                <ImProfile className='text-xl ' />
                <h1 className=' text-xl'> Profile</h1>
                <IoMdArrowDropright className='text-xl ml-auto' />
            </div>
        </div>
    );
}

export default MenuAdmin;