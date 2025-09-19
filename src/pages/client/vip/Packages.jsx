import { Avatar } from '@mui/material';
import React, { useContext } from 'react';
import { ContextAuth } from '../../../contexts/AuthProvider';
import { FaUserCog, FaWallet } from 'react-icons/fa';
import { FaMoneyBill1Wave } from 'react-icons/fa6';
import { ContextPlans } from '../../../contexts/PlanProvider';

function Packages(props) {
    const { isLogin } = useContext(ContextAuth);
    const plans = useContext(ContextPlans);
    console.log(plans);

    return (
        <div className='mt-50 text-white'>
            <h1 className='text-5xl text-center font-bold'>Tài Khoản VIP</h1>
            <p className='text-center'>Sở hữu tà khoản vip để có trãi nghiệm xem phim tốt hơn</p>
            <div className='mt-10 flex items-center justify-center gap-5'>
                <Avatar
                    sx={{ width: 80, height: 80, background: "red" }}
                />
                <div>
                    <div className="flex items-center gap-3">
                        <p>{isLogin?.email?.split("@")[0].replace(/[0-9]/g, "")}</p>
                        <FaUserCog className="text-yellow-500" />
                    </div>
                    <p className='text-gray-500 '>Bạn là thành viên miễn phí</p>
                    <div className="flex justify-between items-center gap-4 p-3">
                        <div className="flex items-center gap-1">
                            <FaWallet />
                            <span>Số Dư</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <p>0</p>
                            <FaMoneyBill1Wave />
                        </div>
                        <div className="bg-white text-black rounded-sm px-2 py-0.5 flex justify-center items-center">
                            + nạp
                        </div>
                    </div>
                </div>
            </div>
            <p className='text-4xl text-center font-bold my-10'>Nâng cấp tài khoản VIP ngay</p>
            <div className='p-4  flex items-center gap-3 justify-center'>
                {plans.map(e => (
                    <div className='rounded-xl bg-blue-800 p-4 shadow-2xl'>
                        <h1>{e.title}</h1>
                        <h1>{e.price}</h1>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Packages;