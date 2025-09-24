import { Avatar } from '@mui/material';
import React, { useContext, useState } from 'react';
import { ContextAuth } from '../../../contexts/AuthProvider';
import { FaUserCog, FaWallet } from 'react-icons/fa';
import { FaMoneyBill1Wave } from 'react-icons/fa6';
import { ContextPackages } from '../../../contexts/PackageProvider';
import { ContextPlans } from '../../../contexts/PlanProvider';
import { ContextFeatures } from '../../../contexts/FeatureProvider';
import { TiTick } from "react-icons/ti";
import { Link } from 'react-router-dom';

function Packages(props) {
    const { isLogin } = useContext(ContextAuth);
    const plans = useContext(ContextPlans);
    const features = useContext(ContextFeatures);
    const [select, setSelect] = useState(null);

    return (
        <div className='mt-30 text-white '>
            <h1 className='text-5xl text-center font-bold'>Tài Khoản VIP</h1>
            <p className='text-center'>Sở hữu tà khoản vip để có trãi nghiệm xem phim tốt hơn</p>
            <div className='mt-10 flex items-center justify-center gap-5'>
                <Avatar
                    src={isLogin?.imgUrl && isLogin?.imgUrl}
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
            <div className='p-4 flex items-center gap-3 justify-center '>
                {plans.map(e => {
                    const planFeatures = features.filter(f => f.plan === e.id);
                    return (
                        <div onClick={() => setSelect(e.id)} className={`rounded-xl shadow-[0_0_10px_3px_rgba(255,255,255)] 
                                bg-gradient-to-b from-indigo-900 via-blue-500 to-cyan-300 p-4 shadow-lg w-64 h-80
                                 transition-transform duration-200 ease-out hover:scale-102 hover:-translate-y-1
                                ${select === e.id ? "border-2 border-yellow-400" : ""}`}>
                            <h1 className='text-xl font-bold'>{e.title}</h1>
                            <h2 className='text-lg'>{Number(e.price).toLocaleString("vi-VN")}/Tháng</h2>

                            <div className='border-t w-[90%] my-4'></div>

                            <div className='space-y-2'>
                                {planFeatures.map((f, idx) =>
                                    f.text
                                        ?.split(",")
                                        .map((line, i) => (
                                            <p key={`${idx}-${i}`} className='text-xs flex items-center gap-2'>
                                                <TiTick />{line.trim()}
                                            </p>
                                        ))
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className='text-center'>
                <Link to={`/paymentPage/${select}`} type='button' className='bg-blue-600 rounded-full py-2 px-30 active:scale-95'>Tiếp tục</Link>
                <p className='text-gray-500 mt-2'>Xem kho phim và đăng kí sau</p>
            </div>
        </div>
    );
}

export default Packages;