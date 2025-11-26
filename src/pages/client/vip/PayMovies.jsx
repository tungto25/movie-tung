import React, { useContext, useEffect, useState } from 'react';
import { ContextMovies } from '../../../contexts/MovieProvider';
import { ContextPackages } from '../../../contexts/PackageProvider';
import { ContextAuth } from '../../../contexts/AuthProvider';
import { useParams } from 'react-router-dom';
import { ContextPlans } from '../../../contexts/PlanProvider';
import { ContextFeatures } from '../../../contexts/FeatureProvider';
import { TiTick } from 'react-icons/ti';
import { getOjectById } from '../../../services/reponsitory';

function PayMovies(props) {
    const { id } = useParams();
    const [movie, setMovie] = useState({})
    const { isLogin } = useContext(ContextAuth);
    const packages = useContext(ContextPackages);
    const movies = useContext(ContextMovies);
    const plans = useContext(ContextPlans);

    const features = useContext(ContextFeatures);
    const [select, setSelect] = useState(null);
    useEffect(() => {
        const movieShow = movies.find(e => e.id == id);
        setMovie(movieShow);
    }, [movies, id]);

    const movieLevel = getOjectById(plans, movie?.plan)?.level;

    return (
        <div className='mt-30 text-white'>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold m-auto">THÔNG TIN THANH TOÁN</h2>
            </div>
            <div className='w-70 m-auto'>
                <div className='p-4 flex items-center gap-3 justify-center flex-wrap'>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold m-auto text-blue-500">bạn đang chọn thuê</h2>
                    </div>
                    <div className={`flex items-center justify-between rounded-lg border p-3 `}>
                        <div>{movie?.name}</div>
                        <div>{movie?.rent}</div>
                    </div>
                    <h1 className='mt-5 text-center'>tiết kiệm hơn với gói combo</h1>

                    {plans.filter(g => g.level >= movieLevel).sort((a, b) => a.price - b.price).map(e => {
                        const planFeatures = features.filter(f => f.plan === e.id);
                        return (
                            <div
                                onClick={() => setSelect(e.id)}
                                className={`rounded-xl shadow-[0_0_10px_3px_rgba(255,255,255)] 
                                                    bg-gradient-to-b from-indigo-900 via-blue-500 to-cyan-300 py-4 px-10 shadow-lg w-full
                                                     transition-transform duration-200 ease-out hover:scale-102 hover:-translate-y-1
                                                    ${select === e.id ? "border-2 border-yellow-400" : ""}`}
                            >
                                <div className='flex items-center justify-between '>
                                    <h1 className='text-lg font-bold'>{e.title}</h1>
                                    <h2 className='text-sm'>{Number(e.price).toLocaleString("vi-VN")}/Tháng</h2>
                                </div>

                                <div className='space-y-2 mt-2'>
                                    {planFeatures.map(f => f.text?.split(",").map(line => (
                                        <p className='text-xs flex items-center gap-2'>
                                            <TiTick />{line.trim()}
                                        </p>
                                    ))
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <button className='bg-blue-500 rounded-full px-14 py-2 text-md w-full mt-3'>tiếp tục</button>
                <h1 className='my-3 text-center'>xem kho phim và thanh toán sau</h1>
            </div>

        </div>
    );
}

export default PayMovies;