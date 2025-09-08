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
                <div className="relative flex justify-center items-center bg-gray-800 h-auto max-sm:w-[280px] w-auto rounded-3xl overflow-hidden">
                    
                    <div
                        onClick={handleCloseLogin}
                        className="text-white text-2xl absolute right-2 top-2 -translate-x-2 translate-y-2"
                    >
                        <RiCloseLargeLine />
                    </div>
                    <div className="flex flex-row h-full w-full justify-center items-center">
                        <div className="flex-1 relative z-20">
                            {!formSign ? (
                                <LoginModal setFormSign={setFormSign} handleCloseLogin={handleCloseLogin} />
                            ) : (
                                <RegisterModal setFormSign={setFormSign} />
                            )}
                        </div>

                        <div className="flex flex-col basis-1/3 h-full max-sm:hidden">
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

