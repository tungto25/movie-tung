import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useState, useContext } from "react";
import ModalLists from "./ModalLists";
import { deleteDocument } from "../../../services/FirebaseService";
import { ContextPlayLists } from "../../../contexts/PlayListProvider";
import { ContextAuth } from "../../../contexts/AuthProvider";
import { ContextPlayListMovies } from "../../../contexts/PlayListMoviesProvider";
import { filterById, getOjectById } from "../../../services/reponsitory";
import { ContextMovies } from "../../../contexts/MovieProvider";
import { CiMenuKebab } from "react-icons/ci";
import { RiArrowGoBackLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function ListEpi() {

    const [open, setOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [selectedList, setSelectedList] = useState(null);
    const [openMenu, setOpenMenu] = useState(null);
    const { isLogin } = useContext(ContextAuth);
    const playLists = useContext(ContextPlayLists);
    const playListMovies = useContext(ContextPlayListMovies);
    const movies = useContext(ContextMovies);
    const userPlayLists = playLists.filter(p => p.idUser === isLogin?.id);

    const navigate = useNavigate();
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
    const handleDeleteMovieFromList = async (id, e) => {
        e.stopPropagation();
        if (window.confirm("Bạn có chắc muốn xóa phim này khỏi danh sách không?")) {
            await deleteDocument("PlayListMovies", id);
        }
    };
    const handleShowMenu = (id) => {
        setOpenMenu(openMenu == id ? null : id)
    }
    const handleShowList = (id) => {
        setSelectedList(id);
    }

    return (
        <div className="w-full text-white">
            <div>
                <div className="flex justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <h1 className="text-xl">Danh sách</h1>
                        <button
                            onClick={() => setOpen(true)}
                            className="border py-1 px-2 rounded-full text-xs flex items-center gap-2 hover:scale-95 active:scale-95"
                        >
                            <FaPlus /> Thêm mới
                        </button>
                    </div>
                    {
                        selectedList && <button
                            onClick={() => setSelectedList(null)}
                            className="py-1 px-2 text-md flex items-center gap-2 hover:scale-95 active:scale-95"
                        >
                            <RiArrowGoBackLine /> quay lại
                        </button>
                    }
                </div>

                <div className={`flex items-center gap-4 mt-5 ${selectedList ? "hidden" : ""}`}>
                    {userPlayLists?.length > 0 ? (
                        userPlayLists.map((p) => (
                            <div
                                onClick={() => handleShowList(p.id)}
                                className={`bg-[#2e3355] rounded-lg p-4 w-[200px] flex flex-col gap-1
                                             hover:bg-[#3b4066] transition-all ${selectedList?.id == p.id ? "bg-blue-700/50 " : ""}`}
                            >

                                <div className="flex items-center justify-between">
                                    <span className="text-base">{p.name}</span>

                                    <div className="flex gap-3 text-lg relative">
                                        <CiMenuKebab onClick={(e) => { e.stopPropagation(); handleShowMenu(p.id) }} className="" />
                                        {openMenu === p.id && (
                                            <div className="absolute bg-gray-600 top-5 z-10 p-2 rounded">
                                                <p onClick={() => handleEdit(p)} className="text-yellow-500 flex items-center gap-2">Edit <FaEdit /></p>
                                                <p onClick={() => handleDelete(p.id)} className="text-red-500 flex items-center gap-2">Delete <FaTrash /></p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <p>{filterById(playListMovies, p.id, "idPlayList").length} phim</p>
                            </div>))
                    ) : (
                        <p className="text-gray-400 italic">Chưa có danh sách nào</p>
                    )}
                </div>
                {selectedList && (
                    <div className="flex items-center gap-5">
                        {filterById(playListMovies, selectedList, "idPlayList").map(e => (
                            <div className="bg-gray-700 rounded-md w-[200px] h-[310px] mt-5 hover:scale-102">
                                <div
                                    onClick={() => navigate(`/detail/${e.idMovie}`)}
                                    className="relative "
                                >
                                    <img src={getOjectById(movies, e.idMovie)?.poster || getOjectById(movies, e.idMovie)?.imgUrl}
                                        alt=""
                                        className="rounded-lg  object-cover w-full h-[250px]"
                                    />
                                    <FaTrash
                                        onClick={(e) => handleDeleteMovieFromList(e.id, e)}
                                        className="text-red-500 text-md absolute top-0 right-0 p-1 text-2xl"
                                    />
                                    <p className="text-sm absolute bottom-0 bg-green-500 rounded-tr-xl p-1">{getOjectById(movies, e.idMovie)?.movieType}</p>
                                </div>
                                <p className="text-sm mt-2 px-1 text-center">{getOjectById(movies, e.idMovie)?.name}</p>
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
