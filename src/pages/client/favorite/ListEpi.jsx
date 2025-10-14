import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Favorite from "./Favorite";
import { useState, useContext } from "react";
import ModalLists from "./ModalLists";
import { ContextPlayList } from "../../../contexts/PlayListProvider";
import { deleteDocument } from "../../../services/FirebaseService";

function ListEpi() {
    const playLists = useContext(ContextPlayList);
    const [open, setOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);

    const handleClose = () => {
        setOpen(false);
        setEditItem(null);
    };

    const handleUpdate = () => {
        console.log("Playlist updated");
    };

    const handleEdit = (playlist) => {
        setEditItem(playlist);
        setOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa danh sách này không?")) {
            await deleteDocument("PlayLists", id);
        }
    };

    return (
        <div className="w-full text-white">
            <div>
                <div className="flex items-center gap-3">
                    <h1 className="text-xl">Danh sách</h1>
                    <button
                        onClick={() => setOpen(true)}
                        className="border py-1 px-2 rounded-full text-xs flex items-center gap-2 hover:scale-95 active:scale-95"
                    >
                        <FaPlus /> Thêm mới
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                    {playLists?.length > 0 ? (
                        playLists.map((p) => (
                            <div
                                className="bg-[#2e3355] rounded-lg p-4 w-[200px] flex flex-col gap-1 hover:bg-[#3b4066] transition-all"
                            >
                                <span className="text-base">{p.name}</span>
                                <div className="flex items-center justify-between">
                                    <p>0 phim</p>
                                    <div className="flex gap-3 text-lg">
                                        <button onClick={() => handleEdit(p)}>
                                            <FaEdit className="text-yellow-400 hover:scale-110" />
                                        </button>
                                        <button onClick={() => handleDelete(p.id)}>
                                            <FaTrash className="text-red-500 hover:scale-110" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400 italic">Chưa có danh sách nào</p>
                    )}
                </div>
            </div>
            <ModalLists
                open={open}
                handleClose={handleClose}
                handleUpdate={handleUpdate}
                editItem={editItem}
            />
        </div>
    );
}

export default ListEpi;
