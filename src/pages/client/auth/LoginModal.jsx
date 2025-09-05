import { useState, useContext } from "react";
import { FaFacebookF, FaGooglePlusG, FaTwitter, FaEnvelope, FaLock } from 'react-icons/fa';
import { addDocument, updateDocument } from "../../../services/FirebaseService";
import { ContextAccount } from "../../../contexts/AccountProvider";

const inner = {
    email: "",
    password: "",
};

export default function LoginModal({ openLogin, handleCloseLogin, setFormSign }) {
    const [form, setForm] = useState(inner);
    const [error, setError] = useState(inner);
    const accounts = useContext(ContextAccount);

    const validation = () => {
        const newError = {
            email: form.email ? "" : "Please enter email",
            password: form.password ? "" : "Please enter password"
        };
        setError(newError);
        return Object.values(newError).every(e => e === "");
    };

    const handleAdd = async () => {
        if (!validation()) return;

        if (form.id) {
            await updateDocument("Accounts", form);
        } else {
            await addDocument("Accounts", form);
        }

        handleCloseLogin();
        setForm(inner);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validation()) return;

        const account = accounts.find(a => a.email === form.email);

        if (!account) {
            setError({ ...error, email: "Email không tồn tại" });
            return;
        }

        if (account.password !== form.password) {
            setError({ ...error, password: "Mật khẩu sai" });
            return;
        }

        console.log("Đăng nhập thành công", account);
        handleCloseLogin();
        setForm(inner);
    };

    return (
        <div className="flex items-center justify-center">
            <div className="relative rounded-2xl z-10 w-2/3 p-6">
                <form onSubmit={handleSubmit} className='flex flex-col text-center'>
                    <h1 className="text-yellow-600 text-sm font-bold sm:text-4xl mb-3 sm:mb-6">Sign in use</h1>

                    <div className="flex justify-center gap-4 mb-3 sm:mb-6">
                        <div className="bg-blue-600 text-white w-6 h-6 sm:w-10 sm:h-10 flex items-center justify-center rounded-full cursor-pointer hover:scale-110 transition">
                            <FaFacebookF />
                        </div>
                        <div className="bg-red-600 text-white w-6 h-6 sm:w-10 sm:h-10 flex items-center justify-center rounded-full cursor-pointer hover:scale-110 transition">
                            <FaGooglePlusG />
                        </div>
                        <div className="bg-sky-400 text-white w-6 h-6 sm:w-10 sm:h-10 flex items-center justify-center rounded-full cursor-pointer hover:scale-110 transition">
                            <FaTwitter />
                        </div>
                    </div>

                    <p className="text-gray-500 text-[7px] sm:text-base mb-3 sm:mb-6">or use your email account:</p>

                    <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 mb-2 sm:mb-4">
                        <FaEnvelope className="text-gray-400 mr-3 text-[9px] sm:text-base" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            className="bg-transparent outline-none w-full text-[9px] sm:text-base"
                        />
                    </div>
                    {error.email && <p className="text-red-500 text-xs mb-2">{error.email}</p>}

                    <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 mb-4">
                        <FaLock className="text-gray-400 mr-3 text-[9px] sm:text-base" />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            className="bg-transparent outline-none w-full text-[9px] sm:text-base"
                        />
                    </div>
                    {error.password && <p className="text-red-500 text-xs mb-2">{error.password}</p>}

                    <p className="text-[7px] sm:text-base text-gray-400 mb-3 sm:mb-6 border-b border-gray-300 w-fit mx-auto">Forget your password?</p>

                    <div className="flex items-center gap-2 m-auto mb-2 sm:mb-3">
                        <span className="text-[7px] sm:text-base text-gray-400 border-b border-gray-300">Don't have account?</span>
                        <button type="button" className="text-blue-500 text-[7px] sm:text-base" onClick={() => setFormSign(false)}>Register</button>
                    </div>

                    <button type="submit" className="bg-gradient-to-r from-yellow-600 to-yellow-400 text-white py-2 px-12 rounded-full shadow-lg hover:opacity-90 transition text-[8px] sm:text-base active:scale-98">
                        SIGN IN
                    </button>
                </form>
            </div>
        </div>
    );
}
