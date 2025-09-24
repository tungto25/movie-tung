import React, { use, useContext, useEffect, useState } from 'react';
import { ContextPackages } from '../../../contexts/PackageProvider';
import { ContextPlans } from '../../../contexts/PlanProvider';
import { getOjectById } from '../../../services/reponsitory';
import { useParams } from 'react-router-dom';

function PackagesPay(props) {
    const { id } = useParams();
    const [selected, setSelected] = useState("1");

    const packages = useContext(ContextPackages);
    const plans = useContext(ContextPlans);
   
    return (
        <div className='w-full p-5 max-w-[50%]'>
            <div className="rounded-xl p-5 shadow-lg shadow-[0_0_10px_3px_rgba(255,255,255) bg-gray-800/20">
                <h2 className="text-lg font-semibold mb-4">Thời hạn Gói {getOjectById(plans,id)?.title}</h2>
                <div className="space-y-4">
                    {packages.filter(e => e.plan == id).sort((a, b) => a.time - b.time).map((e) => (
                        <label
                            className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition
                            ${selected === e.id ? "bg-gradient-to-r from-blue-800 via-blue-600 to-gray-400 " : "border-gray-300"}`}
                        >
                            <div className="flex items-start gap-3">
                                <input
                                    type="radio"
                                    name="plan"
                                    checked={selected === e.id}
                                    onChange={() => setSelected(e.id)}
                                    className="mt-1"
                                />
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">{e.time} tháng</span>
                                        {e.time === "1" && (
                                            <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded">
                                                Phổ Biến
                                            </span>
                                        )}
                                    </div>
                                    {e.discount && (
                                        <p className="text-gray-500 text-sm">Tiết kiệm {e.discount}%</p>
                                    )}
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold">{Number((getOjectById(plans, e.plan)?.price)-((getOjectById(plans, e.plan)?.price) * e.discount/100)).toLocaleString("vi-VN")}đ</p>
                                {e.discount && (
                                    <p className="text-sm text-gray-200 line-through">
                                        {Number(getOjectById(plans, e.plan)?.price).toLocaleString("vi-VN")}đ
                                    </p>
                                )}
                            </div>
                        </label>
                    ))}
                </div>
            </div>
            <div className="mt-5 bg-gray-800/20 shadow rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">THÔNG TIN THANH TOÁN</h2>
                    <button className="text-blue-500 text-sm">Thay đổi gói</button>
                </div>

                <div className="flex mb-4">
                    <div className="w-22 h-30 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                        <img
                            src="https://png.pngtree.com/png-clipart/20190520/original/pngtree-online-payment-icon-designed-creatively-and-simple-for-freshness-for-application-png-image_3754332.jpg"
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
                            <span className="text-gray-600">Tên gói</span>
                            <span className="font-medium">Gói {getOjectById(plans,id)?.title}</span>
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

export default PackagesPay;