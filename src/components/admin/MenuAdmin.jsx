import React from 'react';
import { IoIosMenu } from "react-icons/io";
import { LuSquareMenu } from "react-icons/lu";
import { CgMenuGridR } from "react-icons/cg";
import { IoMdArrowDropright } from "react-icons/io";

function MenuAdmin(props) {
    return (
        <div className='p-5 bg-sky-100 h-screen'>
            <div className='flex justify-center items-center gap-5'>
                <IoIosMenu className='text-2xl' />
                <div className='flex'>
                    <h1 className='font-bold text-2xl'> WatchTV</h1>
                    <h1 className='font-bold text-2xl text-green-500'>Admin</h1>
                </div>
            </div>
            <div className='flex gap-3 items-center mt-4 bg-slate-200 rounded-xl p-2 hover:bg-slate-400'>
                <LuSquareMenu className='text-xl ' />
                <h1 className=' text-xl'> Dashboars</h1>
                <IoMdArrowDropright className='text-xl ml-auto'/>
            </div>
            <h1 className='mt-4 '>UI ELEMENT</h1>
            <div className='flex gap-3 items-center mt-4 bg-slate-200 rounded-xl p-2 hover:bg-slate-400'>
                <CgMenuGridR className='text-xl ' />
                <h1 className=' text-xl'> Categories</h1>
                <IoMdArrowDropright className='text-xl ml-auto'/>
            </div>
            <h1 className='mt-4 '>FORM AND DATA</h1>
            <div className='flex gap-3 items-center mt-4 bg-slate-200 rounded-xl p-2 hover:bg-slate-400'>
                <CgMenuGridR className='text-xl ' />
                <h1 className=' text-xl'> Media_management</h1>
                <IoMdArrowDropright className='text-xl ml-auto'/>
            </div>
            <div className='flex gap-3 items-center mt-4 bg-slate-200 rounded-xl p-2 hover:bg-slate-400'>
                <CgMenuGridR className='text-xl ' />
                <h1 className=' text-xl'> Vip</h1>
                <IoMdArrowDropright className='text-xl ml-auto'/>
            </div>
            <div className='flex gap-3 items-center mt-4 bg-slate-200 rounded-xl p-2 hover:bg-slate-400'>
                <CgMenuGridR className='text-xl ' />
                <h1 className=' text-xl'> Categories</h1>
                <IoMdArrowDropright className='text-xl ml-auto'/>
            </div>
            <div className='flex gap-3 items-center mt-4 bg-slate-200 rounded-xl p-2 hover:bg-slate-400'>
                <CgMenuGridR className='text-xl ' />
                <h1 className=' text-xl'> Engagement Pages</h1>
                <IoMdArrowDropright className='text-xl ml-auto'/>
            </div>
            <div className='flex gap-3 items-center mt-4 bg-slate-200 rounded-xl p-2 hover:bg-slate-400'>
                <CgMenuGridR className='text-xl ' />
                <h1 className=' text-xl'> Cast & Crew</h1>
                <IoMdArrowDropright className='text-xl ml-auto'/>
            </div>
            <h1 className='mt-4 '>Pages</h1>
            <div className='flex gap-3 items-center mt-4 bg-slate-200 rounded-xl p-2 hover:bg-slate-400'>
                <CgMenuGridR className='text-xl ' />
                <h1 className=' text-xl'> User Pages</h1>
                <IoMdArrowDropright className='text-xl ml-auto'/>
            </div>
            <h1 className='mt-4 '>User Managemnent</h1>
            <div className='flex gap-3 items-center mt-4 bg-slate-200 rounded-xl py-2 hover:bg-slate-400'>
                <CgMenuGridR className='text-xl ' />
                <h1 className=' text-xl'> User Managemnent</h1>
                <IoMdArrowDropright className='text-xl ml-auto'/>
            </div>
            <h1 className='mt-4 '>Help</h1>
            <div className='flex gap-3 items-center mt-4 bg-slate-200 rounded-xl p-2 hover:bg-slate-400'>
                <CgMenuGridR className='text-xl ' />
                <h1 className=' text-xl'> Profile</h1>
                <IoMdArrowDropright className='text-xl ml-auto'/>
            </div>
        </div>
    );
}

export default MenuAdmin;