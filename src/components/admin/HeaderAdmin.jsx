import React from 'react';
import { MdOutlineSearch } from "react-icons/md";
import { IoIosMail } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';

function HeaderAdmin(props) {
    return (
        <div>
            <div className='p-3'>
                <div className='flex justify-between items-center'>
                    <div>
                        <div className='flex'>
                            <h1 className='text-3xl text-gray-300'>GOOD MORNING,</h1>
                            <h1 className='text-3xl font-bold'>John Doe</h1>
                        </div>
                        <h1 className='text-gray-300'>Your performance summary this week</h1>
                    </div>
                    <div className='flex justify-center items-center gap-2'>
                        <MdOutlineSearch /><IoIosMail /><FaBell />
                        <div className='bg-amber-300 rounded-full h-10 w-10'>
                            <Avatar sx={{ bgcolor: deepOrange[500] }}>T</Avatar>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default HeaderAdmin;