import React, { useContext, useEffect, useState } from 'react';
import { ContextMovies } from '../../../contexts/MovieProvider';
import { ContextPackages } from '../../../contexts/PackageProvider';
import { ContextAuth } from '../../../contexts/AuthProvider';
import { Link, useParams } from 'react-router-dom';
import { ContextPlans } from '../../../contexts/PlanProvider';
import { ContextFeatures } from '../../../contexts/FeatureProvider';
import { TiTick } from 'react-icons/ti';
import { getOjectById } from '../../../services/reponsitory';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
    return (
        <div className='mt-30 text-white '>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold m-auto">THÔNG TIN THANH TOÁN</h2>
            </div>
            <div className='w-[400px] m-auto'>
                <div className=' flex items-center gap-3 justify-center flex-wrap'>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold m-auto text-blue-500">bạn đang chọn thuê</h2>
                    </div>
                    <div
                        onClick={() => setSelect("thue")}
                        className={`flex items-center justify-between rounded-lg border p-3 w-full ${select === "thue" ? "border-2 border-yellow-400" : ""}`}
                    >
                        <div className='whitespace-nowrap'>{movie?.name}</div>
                        <div>{movie?.rent}</div>
                    </div>
                    <h1 className='mt-5 text-center'>tiết kiệm hơn với gói combo</h1>

                    {plans.filter(g => g.level >= movieLevel).sort((a, b) => a.price - b.price).map(e => {
                        const planFeatures = features.filter(f => f.plan === e.id);
                        console.log(planFeatures);

                        return (
                            <div
                                onClick={() => setSelect(e.id)}
                                className={`rounded-xl shadow-[0_0_10px_3px_rgba(255,255,255)] 
                                                    bg-blue-950/40  py-4 px-10 shadow-lg
                                                     transition-transform duration-200 ease-out hover:scale-102 hover:-translate-y-1
                                                    ${select === e.id ? "border-2 border-yellow-400" : ""}`}
                            >
                                <div className='flex items-center justify-between '>
                                    <h1 className='text-lg font-bold'>{e.title}</h1>
                                    <h2 className='text-sm'>{Number(e.price).toLocaleString("vi-VN")}/Tháng</h2>
                                </div>

                                <div className='space-y-2 mt-2'>
                                    {planFeatures.flatMap(f =>
                                        f.text
                                            ?.split(",")
                                            .map((line, i) => (
                                                <p className="text-md flex items-start gap-2 leading-6 w-80">
                                                    <TiTick className="text-base min-w-4 min-h-4 mt-1" />
                                                    {line.trim()}
                                                </p>
                                            ))
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <button
                    onClick={() => {
                        if (select === "thue") {
                            navigate(`/moviePayment/${movie?.id}`);
                        } else {
                            navigate(`/packages/${select}`);
                        }
                    }}
                    className='bg-blue-500 rounded-full px-14 py-2 text-md w-full mt-10 active:scale-98 active:bg-blue-700'
                >tiếp tục
                </button>
                <Link to="/" className='my-3 flex justify-center hover:text-blue-400'>xem kho phim và thanh toán sau</Link>
            </div>

        </div>
    );
}

export default PayMovies;