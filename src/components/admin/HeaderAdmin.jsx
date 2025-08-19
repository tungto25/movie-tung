import { useState } from 'react';
import { MdOutlineSearch } from "react-icons/md";
import { IoIosMail } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import SplitText from "./Text";

function HeaderAdmin(props) {
    const [open, setOpen] = useState(false);
    const handleAnimationComplete = () => {
        console.log('All letters have animated!');
    };
    return (
        <div>
            <div className='p-3'>
                <div className='flex justify-between items-center '>
                    <div className="flex flex-col">
                        <SplitText
                            text="Good Morning, Tung"
                            className=" text-2xl font-semibold"
                            delay={100}
                            duration={0.6}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            onLetterAnimationComplete={handleAnimationComplete}
                        />

                        <SplitText
                            text="Your performance summary this week"
                            className=" text-xl font-medium"
                            delay={200}
                            duration={0.6}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            onLetterAnimationComplete={handleAnimationComplete}
                        />
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