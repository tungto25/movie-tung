import React, { useContext, useState } from 'react';
import { ContextPackages } from '../../../contexts/PackageProvider';
import { ContextPlans } from '../../../contexts/PlanProvider';
import { getOjectById } from '../../../services/reponsitory';


function MoviePackages(props) {

    return (
        <div className='w-full p-5 max-w-[50%]'>
            <div className="mt-5 bg-gray-800/20 shadow rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">THÔNG TIN THANH TOÁN</h2>
                    <button className="text-blue-500 text-sm">Thay đổi gói</button>
                </div>

                <div className="flex mb-4">
                    <div className="w-22 h-30 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/vi/d/d2/Poster_phim_Black_Adam.jpg"
                            alt=""
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between mb-1">
                            <span className="text-gray-600">Tài khoản</span>
                            <span className="font-medium">0378 486 992</span>
                        </div>
                        <div className="flex justify-between mb-1">
                            <span className="text-gray-600">Thời hạn *</span>
                            <span className="text-blue-500 font-medium">12 tháng</span>
                        </div>
                        <div className="flex justify-between mb-1">
                            <span className="text-gray-600">Ngày hiệu lực</span>
                            <span className="font-medium">19/09/2025</span>
                        </div>
                        <div className="flex justify-between mb-1">
                            <span className="text-gray-600">Tự động gia hạn</span>
                            <span className="font-medium">19/09/2026</span>
                        </div>
                        <div className="flex justify-between mb-1">
                            <span className="text-gray-600">Đơn giá</span>
                            <span className="text-blue-500 font-medium">888.000đ</span>
                        </div>
                        <div className="flex justify-between mb-1">
                            <span className="text-gray-600">Khuyến mãi</span>
                            <span className="font-medium">0đ</span>
                        </div>
                        <div className="flex justify-between mt-2 pt-2 border-t font-semibold text-blue-600">
                            <span>Tổng cộng</span>
                            <span>888.000đ</span>
                        </div>
                    </div>
                </div>

                <p className="text-xs text-gray-500 mb-2">
                    * Thuê bao tự động gia hạn hàng tháng trừ phí bạn hủy thuê bao ít nhất 24 giờ trước khi hết hạn.
                </p>
                <button className="text-blue-500 text-sm font-medium flex items-center">
                    Áp dụng ưu đãi
                </button>
            </div>
        </div>
    );
}

export default MoviePackages;