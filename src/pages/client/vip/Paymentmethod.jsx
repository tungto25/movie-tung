import { TextField } from '@mui/material';
import React, { useState } from 'react';

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
function Paymentmethod(props) {
    const [value, setValue] = useState("");
    const [selected, setSelected] = useState("")
    const handleChange = (e) => {
        let input = e.target.value.replace(/\D/g, ""); // bỏ ký tự ko phải số
        if (input.length > 4) input = input.slice(0, 4);

        // format thành MM/YY
        if (input.length >= 3) {
            input = input.slice(0, 2) + "/" + input.slice(2);
        }

        setValue(input);
    };
    return (
        <div className='p-5 max-w-[50%]'>
            <div className='text-white w-full bg-gray-800/20 shadow-lg rounded-xl shadow-[0_0_10px_3px_rgba(255,255,255) p-5'>
                <h1 className='text-lg font-bold py-4'>Chọn phương thức thanh toán</h1>
                <div className='flex flex-wrap justify-start gap-3'>
                    {payment.map(e => (
                        <div
                            onClick={() => setSelected(e.name)}
                            className={`border rounded-xl flex flex-col items-center justify-center w-35 h-25 gap-3 ${selected === e.name ? "border-yellow-500 bg-gradient-to-bl from-gray-800 via-gray-600 to-gray-400" : ""}`}
                        >
                            <h1>{e.name}</h1>
                            <img
                                src={e.img}
                                alt={e.name}
                                className='w-10 h-10 rounded-xl'
                            />
                        </div>
                    ))}
                </div>
                <div className='mt-5'>
                    <TextField
                        id="outlined-basic"
                        label="Tên in trên thẻ"
                        variant="outlined"
                        fullWidth
                        sx={{
                            "& .MuiInputBase-input": { color: "white" }, // màu chữ nhập
                            "& .MuiInputLabel-root": { color: "white" },  // màu label
                            "& .MuiInputLabel-root.Mui-focused": { color: "white" }, // label khi focus
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "white", // viền mặc định
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "white", // viền khi hover
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "white", // viền khi focus
                            },
                        }}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Số thẻ"
                        variant="outlined"
                        fullWidth
                        sx={{
                            "& .MuiInputBase-input": { color: "white" }, // màu chữ nhập
                            "& .MuiInputLabel-root": { color: "white" },  // màu label
                            "& .MuiInputLabel-root.Mui-focused": { color: "white" }, // label khi focus
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "white", // viền mặc định
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "white", // viền khi hover
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "white", // viền khi focus
                            },
                            marginY: 2
                        }}
                    />
                    <div className='flex items-center w-full gap-3'>
                        <div className='flex-1'>
                            <p>Ngày hết hạn</p>
                            <TextField
                                label="MM/YY"
                                variant="outlined"
                                value={value}
                                onChange={handleChange}
                                placeholder="MM/YY"
                                fullWidth
                                inputProps={{ maxLength: 5 }}
                                sx={{
                                    "& .MuiInputBase-input": { color: "white" },
                                    "& .MuiInputLabel-root": { color: "white" },
                                    "& .MuiInputLabel-root.Mui-focused": { color: "white" },
                                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                                    marginY: 2
                                }}
                            />
                        </div>
                        <div className='flex-1'>
                            <p>Mã bảo mật</p>
                            <TextField
                                id="outlined-basic"
                                label="CVV"
                                type='number'
                                variant="outlined"
                                fullWidth
                                sx={{
                                    "& .MuiInputBase-input": { color: "white" }, // màu chữ nhập
                                    "& .MuiInputLabel-root": { color: "white" },  // màu label
                                    "& .MuiInputLabel-root.Mui-focused": { color: "white" }, // label khi focus
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "white", // viền mặc định
                                    },
                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "white", // viền khi hover
                                    },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "white", // viền khi focus
                                    },
                                    marginY: 2
                                }}
                            />
                        </div>
                    </div>
                    <p className='text-gray-500 py-5'>Bằng việc thanh toán,Quý Khách đã đồng ý với <span className='text-blue-600'>Quy chế sữ dụng dịch vụ </span>
                        của Tfilm và ủy quyền cho Tfilm tự động gia hạn khi hết hạn sữ dụng,cho đến khi bạn hủy tự động gia hạn.</p>
                    <button className='mt-5 bg-blue-700 w-full py-2 rounded-full active:scale-98'>Thanh toán</button>
                    <p className='text-center text-blue-500 mt-3'>xem kho phim và thanh toán sau</p>
                </div>
            </div>
        </div>
    );
}

export default Paymentmethod;