import React, { useContext, useState } from 'react';
import { FaBell, FaUserCog, FaWallet } from "react-icons/fa";
import { Link, Outlet } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { MdReplayCircleFilled } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { Avatar } from '@mui/material';
import { FaMoneyBill1Wave } from 'react-icons/fa6';
import { ContextAuth } from '../../../contexts/AuthProvider';

const list = [
    {
        name: "Yêu thích",
        icon: <FaHeart />,
        path: "/manageAccount/likeEpi"
    },
    {
        name: "Danh sách",
        icon: <FaPlus />,
        path: "/manageAccount/listEpi"
    },
    {
        name: "Xem tiếp",
        icon: <MdReplayCircleFilled />,
        path: "/manageAccount/seeMore"
    },
    {
        name: "Thông báo",
        icon: <FaBell />,
        path: "/manageAccount/notice"
    },
    {
        name: "Tài khoản",
        icon: <FaUser />,
        path: "/manageAccount/account"
    },
]
function Favorite(props) {
    const { isLogin } = useContext(ContextAuth);
    const [selected, setSelected] = useState("");
    return (
        <div className='text-white flex'>
            <div className='p-5 px-8 bg-gray-800 w-fit h-[600px] rounded-xl flex flex-col'>
                <h1 className='text-2xl whitespace-nowrap'>Quản lý tài khoản</h1>
                <div className=" gap-4 grid grid-cols-2 md:grid-cols-1 mt-10">
                    {list.map(e => (
                        <Link to={e.path} onClick={() => setSelected(e.name)} className={`flex items-center gap-2 max-md:border max-md:px-4 max-md:py-2 max-md:rounded-md 
                                                        border-b-1 border-gray-500 pb-3 hover:text-yellow-500 ${selected === e.name ? "text-yellow-500" : ""}`}>
                            {e.icon} {e.name}
                        </Link>
                    ))}
                </div>
                <div className='mt-auto gap-5'>
                    <Avatar
                        src={isLogin?.imgUrl && isLogin?.imgUrl}
                        sx={{ width: 50, height: 50, background: "red" }}
                    />
                    <div>
                        <div className="flex items-center gap-3">
                            <p>{isLogin?.email?.split("@")[0].replace(/[0-9]/g, "")}</p>
                            <FaUserCog className="text-yellow-500" />
                        </div>
                        <div>{isLogin?.email}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Favorite;