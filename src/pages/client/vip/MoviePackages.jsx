import React, { useContext, useEffect, useState } from 'react';
import { ContextPackages } from '../../../contexts/PackageProvider';
import { ContextPlans } from '../../../contexts/PlanProvider';
import { getOjectById } from '../../../services/reponsitory';
import { useParams } from 'react-router-dom';
import { ContextAuth } from '../../../contexts/AuthProvider';
import { ContextMovies } from '../../../contexts/MovieProvider';
import { Button, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { style } from '../../../untils/styleContants';


function MoviePackages({movie,setMovie,price}) {
    const { id } = useParams();
    
    const { isLogin } = useContext(ContextAuth);
    const packages = useContext(ContextPackages);
    const movies = useContext(ContextMovies);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const pack = packages.find(p => p.id == id);

    // useEffect => id => getOjectById('movies', id) => setMovie
    useEffect(() => {
        const movieShow = movies.find(e => e.id == id);
        setMovie(movieShow);
    }, [movies, id]);

    const today = new Date();
    const formattedDate = today.toLocaleDateString("vi-VN");

    const expire = new Date();
    expire.setMonth(expire.getMonth() + (pack?.time || 0));
    const expireDate = expire.toLocaleDateString("vi-VN");
    

    
    return (
        < div className='w-full p-5 max-w-[50%]' >
            <div className="mt-5 bg-gray-800/20 shadow rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">THÔNG TIN THANH TOÁN</h2>
                </div>

                <div className="flex mb-4">

                    <div className="w-22 h-30 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                        <img
                            src={movie?.imgUrl || movie?.poster}
                            alt=""
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between mb-1">
                            <span className="text-gray-600">Tài khoản</span>
                            <span className="font-medium">{isLogin?.email?.split("@")[0].replace(/[0-9]/g, "")}</span>
                        </div>
                        <div className="flex justify-between mb-1">
                            <span className="text-gray-600">Thời hạn *</span>
                            <span className="text-blue-500 font-medium">{pack?.time} tháng</span>
                        </div>
                        <div className="flex justify-between mb-1">
                            <span className="text-gray-600">Ngày hiệu lực</span>
                            <span className="font-medium">{formattedDate}</span>
                        </div>
                        <div className="flex justify-between mb-1">
                            <span className="text-gray-600">Tự động gia hạn</span>
                            <span className="font-medium">{expireDate}</span>
                        </div>
                        <div className="flex justify-between mb-1">
                            <span className="text-gray-600">Đơn giá</span>
                            <span className="text-blue-500 font-medium">{movie?.rent}</span>
                        </div>
                        <div className="flex justify-between mb-1">
                            <span className="text-gray-600">Khuyến mãi</span>
                            <span className="font-medium">0đ</span>
                        </div>
                        <div className="flex justify-between mt-2 pt-2 border-t font-semibold text-blue-600">
                            <span>Tổng cộng</span>
                            <span>{price}</span>
                        </div>
                    </div>
                </div>

                <p className="text-xs text-gray-500 mb-2">
                    * Thuê bao tự động gia hạn hàng tháng trừ phí bạn hủy thuê bao ít nhất 24 giờ trước khi hết hạn.
                </p>
                <button onClick={handleOpen} className="text-blue-500 text-sm font-medium flex items-center">
                    Áp dụng ưu đãi
                </button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    slotProps={{
                        backdrop: {
                            sx: {
                                backgroundColor: "rgba(0,0,0,0.5)",
                                backdropFilter: "blur(2px)"
                            }
                        }
                    }}
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Text in a modal
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            aloalo
                        </Typography>
                    </Box>
                </Modal>
            </div>
        </div >
    );
}

export default MoviePackages;