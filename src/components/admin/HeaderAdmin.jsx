import { useState } from 'react';
import { MdOutlineSearch } from "react-icons/md";
import { IoIosMail } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';

function HeaderAdmin(props) {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <div className='p-3'>
                <div className='flex justify-between items-center '>
                    <div>
                        <div className='flex'>
                            <h1 className='text-3xl text-gray-300'>GOOD MORNING,</h1>
                            <h1 className='text-3xl font-bold'>Tan Tung</h1>
                        </div>
                        <h1 className='text-gray-300'>Your performance summary this week</h1>
                    </div>
                    <div className='flex justify-center items-center gap-3 relative '>
                        <MdOutlineSearch className='text-xl transition-transform duration-150 hover:scale-120' />
                        <IoIosMail className='text-xl transition-transform duration-150 hover:scale-120' />
                        <FaBell className='text-xl transition-transform duration-150 hover:scale-120' />
                        <div onClick={(e) => setOpen(!open)} className='bg-amber-300 rounded-full h-10 w-10 transition-transform duration-150 hover:scale-110'>
                            <Avatar sx={{ bgcolor: deepOrange[500] }}>T</Avatar>
                        </div>
                        {open &&
                            (<div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-50 top-9 right-1 ">
                                <ul className="py-2 text-black ">
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">👤 Profile</li>
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">⚙️ Settings</li>
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500">🚪 Logout</li>
                                </ul>
                            </div>)}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default HeaderAdmin;