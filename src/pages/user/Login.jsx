import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function LoginModal() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Đăng nhập:", email, password);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-[#1B1B3A] w-full max-w-4xl rounded-2xl flex overflow-hidden shadow-lg">
                {/* Left image + logo */}
                <div className="relative w-1/2 hidden md:block">
                    <img
                        src="/images/login-bg.png"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-6 left-6 flex items-center gap-2">
                        <div className="text-white text-3xl font-bold">TFILM</div>
                        <span className="text-yellow-400 text-sm">Phim hay mỗi ngày</span>
                    </div>
                </div>

                {/* Right form */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center relative">
                    <button className="absolute top-4 right-4 text-white text-xl">&times;</button>
                    <h2 className="text-2xl font-bold text-white mb-2">Đăng nhập</h2>
                    <p className="text-gray-400 text-sm mb-6">
                        Nếu bạn chưa có tài khoản, <span className="text-yellow-400 cursor-pointer">đăng ký ngay</span>
                    </p>

                    <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="Email"
                            className="p-3 rounded-lg bg-[#2A2A50] text-white placeholder-gray-400 focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Mật khẩu"
                            className="p-3 rounded-lg bg-[#2A2A50] text-white placeholder-gray-400 focus:outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <div className="flex items-center justify-center p-3 bg-[#1F1F3B] rounded-lg text-gray-300">
                            Đang xác minh... <span className="ml-2 text-xs text-gray-500">Cloudflare</span>
                        </div>

                        <button
                            type="submit"
                            className="p-3 rounded-lg bg-yellow-400 text-black font-bold mt-2"
                        >
                            Đăng nhập
                        </button>
                    </form>

                    <div className="mt-4 text-center text-gray-400 text-sm">Quên mật khẩu?</div>

                    <button className="mt-4 flex items-center justify-center gap-2 w-full p-3 rounded-lg bg-white text-black font-bold">
                        <FcGoogle /> Đăng nhập bằng Google
                    </button>
                </div>
            </div>
        </div>
    );
}
