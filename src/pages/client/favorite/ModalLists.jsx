import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useContext, useEffect } from 'react';
import { ContextAuth } from '../../../contexts/AuthProvider';
import { addDocument, updateDocument } from '../../../services/FirebaseService';

function ModalLists({ open, handleClose, handleUpdate, editItem }) {
    const [playlistName, setPlaylistName] = useState('');
    const { isLogin } = useContext(ContextAuth);

    useEffect(() => {
        if (editItem) setPlaylistName(editItem.name);
        else setPlaylistName('');
    }, [editItem]);

    const addTask = async () => {
        if (!playlistName.trim()) return alert("Vui lòng nhập tên danh sách!");

        try {
            if (editItem?.id) {
                await updateDocument("PlayLists", {
                    ...editItem,
                    name: playlistName.trim(),
                });
            } else {
                await addDocument("PlayLists", {
                    name: playlistName.trim(),
                    idUser: isLogin?.id,
                    movies: [],
                });
            }

            handleClose();
            setPlaylistName('');
            handleUpdate();
        } catch (error) {
            console.error("Lỗi khi thêm/cập nhật playlist:", error);
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "#23283C",
                    color: "white",
                    p: 4,
                    borderRadius: 2,
                    width: 400,
                    boxShadow: 24,
                }}
            >
                <Typography variant="h6" sx={{ mb: 2 }}>
                    {editItem ? "Chỉnh sửa danh sách" : "Thêm danh sách mới"}
                </Typography>

                <TextField
                    label="Tên danh sách"
                    value={playlistName}
                    onChange={(e) => setPlaylistName(e.target.value)}
                    fullWidth
                    sx={{
                        "& .MuiInputBase-root": { color: "white" },
                        "& .MuiInputLabel-root": { color: "#aaa" },
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#555" },
                            "&:hover fieldset": { borderColor: "#999" },
                        },
                    }}
                />

                <Box sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "end" }}>
                    <Button onClick={handleClose} variant="contained" color="error">
                        Đóng
                    </Button>
                    <Button onClick={addTask} variant="contained" color="warning">
                        {editItem ? "Lưu" : "+ Thêm"}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default ModalLists;
