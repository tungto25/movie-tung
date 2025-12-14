import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { initialOptions } from '../../../untils/ConstantsClient';
import { Modal, Box } from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";

const payment = [
    {
        name: "Thẻ tín dụng",
        img: "https://as2.ftcdn.net/jpg/04/07/39/35/1000_F_407393539_vn134IDVdg6UkULr4CJgZjshgImuGve1.jpg"
    },
    {
        name: "Ví MoMo",
        img: "https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
    },
    {
        name: "Ví ZaloPay",
        img: "https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-Square.png"
    },
    {
        name: "Ví ShopeePay",
        img: "https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ShopeePay-V.png"
    },
    {
        name: "VNPAY",
        img: "https://vnpay.vn/s1/statics.vnpay.vn/2023/6/0oxhzjmxbksr1686814746087.png"
    },
]
function Paymentmethod({ selectedPlan }) {
    const [selected, setSelected] = useState("");
    const [openQR, setOpenQR] = useState(false);
    const [qrValue, setQrValue] = useState("");

    const handlePayment = () => {
        if (!selected) {
            alert("Bạn chưa chọn phương thức thanh toán!");
            return;
        }

        // ---- QR cho từng loại thanh toán ----
        let qr = "";

        if (selected === "Thẻ tín dụng") {
            qr = "public/images/25f4ea2f-a520-46af-9c26-8efe1aae25c5.jpg";
        } else if (selected === "Ví MoMo") {
            qr = "https://qr.momo.vn/YOUR_MOMO_QR";
        } else if (selected === "Ví ZaloPay") {
            qr = "https://your-zalopay-qr.com/xyz";
        } else if (selected === "VNPAY") {
            qr = "https://img.vietqr.io/YOUR_VNPAY_QR.png";
        }

        setQrValue(qr);
        setOpenQR(true);
    };
    // const handlePaymentSuccess = async () => {
    //     const transactionId = uuidv4().replaceAll("-", "").slice(0, 16).toUpperCase();

    //     const startDate = new Date();
    //     const expiryDate = new Date(startDate);
    //     expiryDate.setMonth(expiryDate.getMonth() + 1);

    //     const rentData = {
    //         transactionId,
    //         movieId: movie.id,
    //         isUser: isLogin.email,
    //         paymentMethod: selected,
    //         price: selectedPlan.finalPrice.toString(),
    //         startDate,
    //         expiryDate
    //     };

    //     await createRentMovie(rentData);

    //     alert("Thanh toán thành công!");
    // };
    return (
        <div className='p-5 max-w-[50%]'>
            <div className='text-white w-full bg-gray-800/20 shadow-lg rounded-xl p-5'>
                <div className='flex flex-wrap justify-start gap-3'>
                    {payment.map(e => (
                        <div
                            onClick={() => setSelected(e.name)}
                            className={`border rounded-xl flex flex-col items-center justify-center w-35 h-25 gap-3 ${selected === e.name ? "border-blue-900 border-3 bg-blue-700" : ""}`}
                        >
                            <h1>{e.name}</h1>
                            <img src={e.img} alt={e.name} className='w-10 h-10 rounded-xl' />
                        </div>
                    ))}
                </div>

                {/* PAYPAL */}
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <PayPalScriptProvider options={initialOptions}>
                        <PayPalButtons
                            style={{ layout: "vertical" }}
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [{
                                        amount: {
                                            value: selectedPlan.finalPrice.toString()
                                        }
                                    }]
                                });
                            }}
                        />
                    </PayPalScriptProvider>
                </div>

                <button
                    onClick={handlePayment}
                    className="mt-5 bg-blue-600 w-full py-2 rounded-lg text-white active:scale-95"
                >
                    Thanh toán bằng QR
                </button>

                {/* QR Modal */}
                <Modal open={openQR} onClose={() => setOpenQR(false)}>
                    <Box sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "white",
                        p: 4,
                        borderRadius: "15px",
                        textAlign: "center"
                    }}>
                        <h2>Quét mã để thanh toán</h2>
                        <QRCodeCanvas value={qrValue} size={200} includeMargin={true} />
                        <p style={{ marginTop: 10 }}>Phương thức: {selected}</p>
                        <p>Số tiền: {selectedPlan?.finalPrice?.toLocaleString("vi-VN")}₫</p>
                    </Box>
                </Modal>
            </div>
        </div>
    );
}

export default Paymentmethod;