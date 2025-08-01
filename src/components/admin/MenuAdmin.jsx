import { IoIosMenu, IoMdArrowDropdown, IoMdArrowDroprightCircle } from "react-icons/io";
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
import { menus } from "../../untils/Constants";
import { MdDashboard } from "react-icons/md";

function MenuAdmin(props) {
    const [dropbox, setdropbox] = useState(null);

  const handleClick  = (id) => {
     if(id == dropbox) {
        setdropbox(null)
     }else {
        setdropbox(id)
     }
  }
    return (
        <div className='p-5 bg-gray-950  md:h-screen'>
            <div className='flex justify-center items-center gap-5 ms-auto'>
                <IoIosMenu className='text-2xl text-white' />
                <div className='flex'>
                    <h1 className='font-bold text-2xl text-white'> WatchTV</h1>
                    <h1 className='font-bold text-2xl text-yellow-400'>Admin</h1>
                </div>
            </div>
            <div className='flex gap-3 items-center mt-4 rounded-xl p-2 hover:text-yellow-500  bg-gray-200 hover:bg-gray-600 hover:text-white'>
                <MdDashboard className='text-xl ' />
                <h1 className=' text-xl'> Dashboars</h1>
            </div>
            <h1 className='mt-4  text-white'>FORM AND DATA</h1>
            {menus.map((e, i) => (
                <div>
                    <div onClick={() => handleClick(e.id)}
                        className='flex gap-3 items-center mt-4 rounded-xl p-2 hover:text-yellow-500  bg-gray-200 hover:bg-gray-600 hover:text-white'>
                        <div className='text-xl'>{e.icon}</div>
                        <h1 className=' text-xl'> {e.title}</h1>
                        {dropbox==e.id?<IoMdArrowDropdown className='text-xl ml-auto'/>:<IoMdArrowDropright className='text-xl ml-auto' />}
                        
                    </div>
                    <ul className={dropbox == e.id ? "" : "hidden"}>
                        {e.items.map((b, i) => (
                            <li className="rounded-2xl bg-white mt-2 p-2 hover:text-yellow-500 border-b-1 mx-auto">{b.title}</li>
                        ))}
                    </ul>
                </div>
            ))}
            <h1 className='mt-4  text-white'>Pages</h1>
            <div className='flex gap-3 items-center mt-4 rounded-xl p-2 hover:text-yellow-500  bg-gray-200 hover:bg-gray-600 hover:text-white'>
                <TbPasswordUser className='text-xl ' />
                <h1 className=' text-xl'> User Pages</h1>
                <IoMdArrowDropright className='text-xl ml-auto' />
            </div>
            <h1 className='mt-4  text-white'>User Managemnent</h1>
            <div className='flex gap-3 items-center mt-4 rounded-xl py-2  bg-gray-200 hover:bg-gray-600 hover:text-white'>
                <FaUsers className='text-xl ms-1' />
                <h1 className=' text-xl'> User Managemnent</h1>
                <IoMdArrowDropright className='text-xl ml-auto' />
            </div>
            <h1 className='mt-4  text-white'>Help</h1>
            <div className='flex gap-3 items-center mt-4 rounded-xl p-2 hover:text-yellow-500  bg-gray-200 hover:bg-gray-600 hover:text-white'>
                <ImProfile className='text-xl ' />
                <h1 className=' text-xl'> Profile</h1>
                <IoMdArrowDropright className='text-xl ml-auto' />
            </div>
        </div>
    );
}

export default MenuAdmin;