import { Modal, Box } from "@mui/material";
import { useState } from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { RiCloseLargeLine } from "react-icons/ri";

export default function AuthModal({ openLogin, handleCloseLogin }) {
    const [formSign, setFormSign] = useState(false);

    return (
        <Modal
            open={openLogin}
            onClose={handleCloseLogin}
            aria-labelledby="auth-modal"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { xs: "95%", sm: "90%", md: "80%" },
                    height: { xs: "80%", sm: "80%", md: "85%" },
                    bgcolor: "transparent",
                    borderRadius: 2,
                    boxShadow: 24,
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div className="relative flex justify-center items-center bg-gray-800 h-[550px] w-[900px] rounded-3xl overflow-hidden">
                    {/* <div
                        className={`absolute h-full w-full inset-0 z-10 transition-transform duration-1000 ease-in-out ${formSign ? "translate-x-full" : "translate-x-0"
                            }`}
                    >
                        <div className="text-white relative w-full h-full">
                            <img
                                src="public/images/inna.png"
                                alt=""
                                className={`h-full w-full object-cover `}
                            />
                            <div className="absolute top-1/2 -translate-y-1/2 right-2/3 translate-x-1/4 text-center">
                                <h1 className="text-sm font-bold mb-3 sm:text-5xl">
                                    Welcome Back
                                </h1>
                                <h2 className="text-[7px] font-bold sm:text-base">
                                    To keep connected with us please
                                    <br /> login with your personal info
                                </h2>
                                <button
                                    onClick={() => setFormSign(true)}
                                    type="button"
                                    className="mt-6 border-2 px-3 py-1 text-[10px] rounded-full hover:bg-blue-500 sm:px-16 sm:py-3 sm:text-base"
                                >
                                    SIGN IN
                                </button>
                            </div>
                        </div>
                    </div> */}
                    <div
                        onClick={handleCloseLogin}
                        className="text-white text-2xl absolute right-2 top-2 -translate-x-2 translate-y-2"
                    >
                        <RiCloseLargeLine />
                    </div>
                    <div className="flex flex-row h-full w-full justify-center items-center">
                        <div className="flex-1 relative z-20">
                            {formSign ? (
                                <LoginModal setFormSign={setFormSign} />
                            ) : (
                                <RegisterModal setFormSign={setFormSign} />
                            )}
                        </div>

                        <div className="flex flex-col basis-1/3 h-full">
                            <img
                                src="/images/vang.png"
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </Box>
        </Modal>
    );
}
