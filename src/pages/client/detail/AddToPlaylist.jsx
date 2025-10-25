import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { addDocument, deleteDocument } from "../../../services/FirebaseService";
import { Autocomplete, TextField } from "@mui/material";
import { ContextPlayLists } from "../../../contexts/PlayListProvider";

export default function AddToPlaylist({ isLogin, movieShow, openModal, setOpenModal }) {
    const playLists = useContext(ContextPlayLists);
    const [selectedList, setSelectedList] = useState(null);
    console.log(isLogin);

    const addPlayList = async () => {
        if (!isLogin) {
            alert("Vui lòng đăng nhập để thêm vào danh sách yêu thích!");
            return;
        }

        if (!selectedList) {
            alert("Vui lòng chọn playlist trước!");
            return;
        }
        const checkPlayList = playLists.find(
            e => e.idMovie === movieShow?.id && e.idUser === isLogin?.id
        )
        if (checkPlayList) {
            await deleteDocument("PlayListMovies", checkPlayList.id);
            alert("Đã xóa phim khỏi playlist!");
        } else {
            await addDocument("PlayListMovies", {
                idPlayList: selectedList.id,
                idMovie: movieShow.id,
                idUser: isLogin.id,
            });
            alert("Đã thêm phim vào playlist!");
        }

        setOpenModal(false);
        setSelectedList("");
    };

    return (
        <>
            <AnimatePresence>
                {openModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="bg-gray-900 text-white rounded-lg p-6 w-80 shadow-lg"
                        >
                            <Autocomplete
                                options={playLists}
                                getOptionLabel={(option) => option.name || ""}
                                value={selectedList}
                                onChange={(event, value) => setSelectedList(value)}
                                disablePortal
                                fullWidth
                                sx={{
                                    mt: 2,
                                    "& .MuiInputLabel-root": { color: "#ccc" },
                                    "& .MuiOutlinedInput-root": {
                                        color: "#fff", // màu chữ
                                        backgroundColor: "#1e293b", // 💡 màu nền (khung)
                                        "& fieldset": { borderColor: "#facc15" }, // viền mặc định vàng nhạt
                                        "&:hover fieldset": { borderColor: "#fde047" }, // viền hover sáng hơn
                                        "&.Mui-focused fieldset": { borderColor: "#fbbf24" }, // viền focus đậm hơn
                                    },
                                    "& .MuiSvgIcon-root": { color: "#facc15" },
                                }}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => (
                                    <TextField {...params} label="Find the play list" />
                                )}
                            />

                            <div className="flex justify-end gap-3 mt-3">
                                <button
                                    onClick={() => setOpenModal(false)}
                                    className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={addPlayList}
                                    className="px-3 py-1 rounded bg-yellow-500 hover:bg-yellow-400 text-black font-semibold"
                                >
                                    Add
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
