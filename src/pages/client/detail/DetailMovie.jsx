import { FaPlay } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { FaShare } from "react-icons/fa";
import { BiSolidCommentDetail } from "react-icons/bi";
import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { lists } from "../../../untils/ConstantsClient";
import InforMovie from "./InforMovie";
import Comment from "./Comment";
import { useContext } from "react";
import { ContextMovies } from "../../../contexts/MovieProvider";
import { ContextEpisodes } from "../../../contexts/EpisodeProvider";
import { ContextLikeMovie } from "../../../contexts/LikeMovieProvider";
import { ContextAuth } from "../../../contexts/AuthProvider";
import { addDocument, deleteDocument } from "../../../services/FirebaseService";
import { ContextPlayLists } from "../../../contexts/PlayListProvider";
import AddToPlaylist from "./AddToPlaylist";
import { ContextPlans } from "../../../contexts/PlanProvider";
import { getOjectById } from "../../../services/reponsitory";
import { useNavigate } from "react-router-dom";

function DetailMovie({ handleOpenLogin }) {
    const { id } = useParams();
    const [currentChoose, setCurrentChoose] = useState(1);
    const [movieShow, setMovieShow] = useState({});
    const movies = useContext(ContextMovies);
    const episodes = useContext(ContextEpisodes);
    const likeMovies = useContext(ContextLikeMovie);
    const { isLogin } = useContext(ContextAuth);
    const plans = useContext(ContextPlans);
    const navigate = useNavigate();

    const [openModal, setOpenModal] = useState(false);
    const firstEpisode = movieShow && episodes ? episodes.find(e => e.movieId === movieShow.id) : null;
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        const movieFound = movies.find(e => e.id === id);
        setMovieShow(movieFound);
    }, [movies, id]);

    const checkLike = likeMovies.find(
        e => e.idMovie === movieShow?.id && e.idUser === isLogin?.id
    );

    const addLike = async () => {
        if (!isLogin) {
            handleOpenLogin();
            return;
        }
        if (checkLike) {
            await deleteDocument("LikeMovies", checkLike.id);
        } else {
            await addDocument("LikeMovies", { idMovie: movieShow.id, idUser: isLogin.id });
        }
    };


    const handleMovie = (movie) => {
        // dang nhap chua 
        // getOjectByid => thuoc plane nao
        // neu >= 4 thi qua trang thue duoi qua trang dang ky goi
        if (!isLogin) {
            handleOpenLogin();
            return;
        }
        const plan = getOjectById(plans, movie.plan);
        if (!plan) {
            console.log("Không tìm thấy plan với id:", movie.plan);
            return;
        }
        console.log("Plan:", plan);
        if (plan.level <= 2) {
            navigate(`/packages`);
        } else {
            navigate(`/payMovies/${movie.id}`);
            console.log("payMovies", movie);
        }

    }
    return (
        <div>
            <div className="w-full">
                <div className="relative">
                    <img
                        src={movieShow?.imgUrl}
                        alt=""
                        className="w-full h-[550px] object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gray-900 to-transparent"></div>                </div>
                <div className="p-5 flex ">
                    <div className="w-[35%]">
                        <InforMovie movieShow={movieShow} />
                    </div>
                    <div className="flex-1 ">
                        <div className="flex items-center justify-between w-full">
                            {firstEpisode && (
                                <button
                                    onClick={() => handleMovie(movieShow)}
                                    className="rounded-full px-8 py-4 gap-2 bg-gradient-to-l
                                              from-yellow-500 to-yellow-200 flex items-center justify-center shadow-lg transition-transform duration-100
                                                active:scale-95 active:shadow-[0_0_10px_3px_rgba(249,215,87)]"
                                >
                                    <FaPlay className="text-sm text-black" />
                                    <span className="whitespace-nowrap text-xl">Xem ngay</span>
                                </button>
                            )}
                            <div
                                onClick={addLike}
                                className="text-white whitespace-nowrap flex flex-col items-center gap-1 hover:text-yellow-400 hover:bg-gray-800/50 rounded-md p-2 cursor-pointer"
                            >
                                <FaHeart className={`${checkLike ? "text-red-500" : ""}`} />
                                <p className={`${checkLike ? "text-red-500" : ""}`}>Yêu thích</p>
                            </div>
                            <div onClick={() => setOpenModal(true)} className="text-white whitespace-nowrap flex flex-col items-center gap-1 hover:text-yellow-400  hover:bg-gray-800/50 rounded-md p-2">
                                <IoMdAdd />
                                <p>Thêm vào</p>
                            </div>
                            <div className="text-white whitespace-nowrap flex flex-col items-center gap-1 hover:text-yellow-400  hover:bg-gray-800/50 rounded-md p-2">
                                <FaShare />
                                <p>Chia sẻ</p>
                            </div>
                            <div className="text-white whitespace-nowrap flex flex-col items-center gap-1 hover:text-yellow-400  hover:bg-gray-800/50 rounded-md p-2">
                                <BiSolidCommentDetail />
                                <p>Bình luận</p>
                            </div>
                            <div className="rounded-full px-3 py-1 text-white bg-blue-800 whitespace-nowrap gap-2 flex items-center ">
                                9.0
                                <span className="text-xs">Đánh giá</span>
                            </div>
                        </div>
                        {/* phần chia router */}
                        <div className="text-white mt-8 flex items-center gap-5 text-lg relative">
                            {lists.map(e => (
                                <Link
                                    key={e.id}
                                    to={`/detail/${id}/${e.path}`}
                                    onClick={() => setCurrentChoose(e.id)}
                                    className={`hover:text-yellow-500 ${currentChoose === e.id ?
                                        "text-yellow-500 border-b-2 border-yellow-500 pb-2" : "hover:text-yellow-500"}`}
                                >
                                    {e.title}
                                </Link>
                            ))}
                        </div>
                        <hr className="text-gray-600" />

                        <div className="text-white ">
                            <Outlet />
                        </div>
                        <Comment handleOpenLogin={handleOpenLogin} />

                    </div>
                </div>
            </div>
            <AddToPlaylist openModal={openModal} setOpenModal={setOpenModal} isLogin={isLogin} movieShow={movieShow} />
        </div >
    );
}

export default DetailMovie;