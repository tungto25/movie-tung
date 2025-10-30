import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Favorite from "./Favorite";
import { useState, useContext } from "react";
import ModalLists from "./ModalLists";
import { deleteDocument } from "../../../services/FirebaseService";
import { ContextPlayLists } from "../../../contexts/PlayListProvider";
import { ContextAuth } from "../../../contexts/AuthProvider";
import { ContextPlayListMovies } from "../../../contexts/PlayListMoviesProvider";
import { filterById, getOjectById } from "../../../services/reponsitory";
import { ContextMovies } from "../../../contexts/MovieProvider";
import { GiCancel } from "react-icons/gi";

function ListEpi() {
    const playLists = useContext(ContextPlayLists);
    const playListMovies = useContext(ContextPlayListMovies);
    const [open, setOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [selectedList, setSelectedList] = useState(null);
    const movies = useContext(ContextMovies);

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
    const selectMovies = selectedList && filterById(playListMovies, selectedList.id, "idPlayList");
    const handleDeleteMovieFromList = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa phim này khỏi danh sách không?")) {
            await deleteDocument("PlayListMovies", id);
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
                                onClick={() => setSelectedList(selectedList?.id === p.id ? null : p)}
                                className={`bg-[#2e3355] rounded-lg p-4 w-[200px] flex flex-col gap-1
                                             hover:bg-[#3b4066] transition-all ${selectedList?.id == p.id ? "bg-blue-700/50" : ""}`}
                            >
                                <span className="text-base">{p.name}</span>
                                <div className="flex items-center justify-between">
                                    <p>{filterById(playListMovies, p.id, "idPlayList").length} phim</p>
                                    <div className="flex gap-3 text-lg">
                                        <button onClick={() => handleEdit(p)}>
                                            <FaEdit className="text-yellow-400 hover:scale-110" />
                                        </button>
                                        <button onClick={() => handleDelete(p.id)}>
                                            <FaTrash className="text-red-500 hover:scale-110" />
                                        </button>
                                    </div>
                                </div>
                            </div>))
                    ) : (
                        <p className="text-gray-400 italic">Chưa có danh sách nào</p>
                    )}
                </div>
                {selectedList && (
                    <div className="flex items-center gap-5">
                        {selectMovies.map(e => (
                            <div className="bg-gray-700 rounded-md w-[200px] h-[320px] mt-5 hover:scale-102">
                                <div className="relative ">
                                    <img src={getOjectById(movies, e.idMovie)?.poster || getOjectById(movies, e.idMovie)?.imgUrl}
                                        alt=""
                                        className="rounded-lg  object-cover w-full h-[250px]"
                                    />
                                    <GiCancel
                                        onClick={() => handleDeleteMovieFromList(e.id)}
                                        className="text-red-500 text-2xl absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
                                    />
                                    <p className="text-sm absolute bottom-0 bg-green-500 rounded-tr-xl p-1">{getOjectById(movies, e.idMovie)?.movieType}</p>
                                </div>
                                <p className="text-sm mt-2 p-1">{getOjectById(movies, e.idMovie)?.name}</p>
                            </div>
                        ))
                        }
                    </div>
                )}
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
