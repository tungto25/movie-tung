import { useState, useContext } from "react";
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { addDocument, updateDocument } from "../../../services/FirebaseService";
import { ContextAccount } from "../../../contexts/AccountProvider";
import { ROLES } from "../../../untils/Constants";

const inner = {
    email: "",
    password: "",
    confirmPassword: "",
    roles: ROLES.USER
};

export default function RegisterModal({ setFormSign }) {
    const [form, setForm] = useState(inner);
    const [error, setError] = useState(inner);
    const accounts = useContext(ContextAccount);

    const validation = () => {
        const newError = {
            email: form.email ? "" : "Please enter email",
            password: form.password ? "" : "Please enter password",
            confirmPassword: form.confirmPassword === form.password ? "" : form.password ? "Passwords do not match" : ""
        };
        setError(newError);
        return Object.values(newError).every(e => e === "");
    };

    const handleAdd = async () => {
        if (!validation()) return;

        if (form.id) {
            await updateDocument("Accounts", form);
        } else {
            const { confirmPassword, ...newAccount } = form;
            await addDocument("Accounts", newAccount);
        }

        setForm(inner);
        setFormSign(false);
    };

    const handleChange = (e) => {
        if (e.target.name === "email") {
            const check = accounts.some(x => x.email === e.target.value);
            const emailError = check ? "Email đã được sử dụng" : "";
            setError({ ...error, email: emailError });
        }
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAdd();
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col text-center basis-2/3 m-auto max-sm:w-full w-2/3 p-6'>
            <h1 className="text-yellow-600 text-sm font-bold sm:text-4xl mb-3 sm:mb-6">Register</h1>

            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 mb-2 sm:mb-4 mt-3">
                <FaEnvelope className="text-gray-400 mr-3 text-[9px] sm:text-base" />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    error={!!error.password}
                    helperText={error.password}
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

            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 mb-4">
                <FaLock className="text-gray-400 mr-3 text-[9px] sm:text-base" />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="bg-transparent outline-none w-full text-[9px] sm:text-base"
                />
            </div>
            {error.confirmPassword && <p className="text-red-500 text-xs mb-2">{error.confirmPassword}</p>}

            <div className="flex items-center gap-2 m-auto mb-2 sm:mb-3">
                <span className="text-[7px] sm:text-base text-gray-400 border-gray-300">Already have account?</span>
                <button type="button" className="text-blue-500 text-[7px] sm:text-base" onClick={() => setFormSign(false)}>Login</button>
            </div>

            <button type="submit" className="bg-gradient-to-r from-yellow-600 to-yellow-400 text-white py-2 px-12 rounded-full shadow-lg hover:opacity-90 transition text-[8px] sm:text-base active:scale-98">
                REGISTER
            </button>
        </form>
    );
}
