import { FaHeart } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { FaShare } from "react-icons/fa";
import { BiSolidCommentDetail } from "react-icons/bi";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import InforMovie from "./InforMovie";
import Comment from "./Comment";
import { useContext } from "react";
import { ContextEpisodes } from "../../../contexts/EpisodeProvider";
import { GiPsychicWaves } from "react-icons/gi";
import { FaFlag } from "react-icons/fa";
import { ContextMovies } from "../../../contexts/MovieProvider";
import { IoIosArrowForward } from "react-icons/io";
import { Description } from "../slides/Description";
import { FaStar } from "react-icons/fa";
import { getOjectById } from "../../../services/reponsitory";
import { ContextCharacters } from "../../../contexts/CharacterProvider";
import Recommend from "./Recommend";
import { ContextSections } from "../../../contexts/SectionProvider";
import { ContextLikeMovie } from "../../../contexts/LikeMovieProvider";
import { ContextAuth } from "../../../contexts/AuthProvider";
import { addDocument, deleteDocument } from "../../../services/FirebaseService";
import AddToPlaylist from "./AddToPlaylist";

function PlayMovie({ handleOpenLogin }) {
    const { id } = useParams();
    const episodes = useContext(ContextEpisodes);
    const movies = useContext(ContextMovies);
    const [currentEpisode, setCurrentEpisode] = useState(null);
    const [movieShow, setMovieShow] = useState(null);
    const [episodeList, setEpisodeList] = useState([]);
    const characters = useContext(ContextCharacters);
    const sections = useContext(ContextSections);
    const [isOn, setIsOn] = useState(false);
    const likeMovies = useContext(ContextLikeMovie);
    const { isLogin } = useContext(ContextAuth);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const episodeFound = episodes.find(ep => ep.id === id);
        setCurrentEpisode(episodeFound);

        if (episodeFound) {
            const movieFound = movies.find(m => m.id === episodeFound.movieId);
            setMovieShow(movieFound);

            const list = episodes.filter(ep => ep.movieId === episodeFound.movieId);
            setEpisodeList(list);
        }
    }, [episodes, movies, id]);

    const checkLike = likeMovies.find(e => e.idMovie === movieShow?.id && e.idUser === isLogin?.id);

    const addLike = async () => {

        const like = { idMovie: movieShow.id, idUser: isLogin?.id };
        if (!isLogin) {
            console.log("need login");
            handleOpenLogin();
            return;
        }
        if (checkLike) {
            await deleteDocument("LikeMovies", checkLike.id);
        } else {
            await addDocument("LikeMovies", like);
        }
    }

    return (
        <div>
            <div className="w-full mt-30 p-5">
                {isOn && (
                    <div className="fixed inset-0 bg-black/90 z-40"></div>
                )}
                <div className="text-white bg-gray-950 w-full m-auto rounded-xl relative z-50">
                    <iframe
                        src={`https://player.phimapi.com/player/?url=${currentEpisode?.videoUrl}`}
                        title=""
                        className="w-full h-[650px] rounded-xl"
                    ></iframe>
                    <div className="flex items-center justify-between py-5 px-8">
                        <div className="bg-black flex items-center gap-5">
                            <div
                                onClick={addLike}
                                className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-700/50`}
                            >
                                <FaHeart className={`${checkLike ? "text-red-500" : ""}`} />
                                <p className={`${checkLike ? "text-red-500" : ""}`}>Yêu thích</p>
                            </div>
                            <div onClick={() => setOpenModal(true)} className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-700/50">
                                <IoMdAdd />
                                <p>Thêm vào</p>
                            </div>
                            <div
                                onClick={() => setIsOn(!isOn)}
                                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-700/50"
                            >
                                <p>Rạp phim</p>
                                <button className={`border px-1.5 py-0.5 rounded text-xs ${isOn ? "bg-green-600 " : "bg-gray-700"}`}>{isOn ? "on" : "off"}</button>
                            </div>
                            <div className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-700/50">
                                <FaShare />
                                <p>Chia sẻ</p>
                            </div>
                            <div className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-700/50">
                                <GiPsychicWaves />
                                <p>Xem chung</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-700/50">
                            <FaFlag />
                            <p>Báo lỗi</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-white flex items-center">
                    <div className="flex flex-col gap-10 mb-auto w-[80%]">
                        <div className="flex items-center gap-5 px-2">
                            <img
                                src={movieShow?.imgUrl}
                                alt=""
                                className="w-[150px] h-[210px] object-cover rounded-md"
                            />
                            <div className="mb-auto">
                                <h1 className="text-2xl">{movieShow?.name}</h1>
                                <div className="flex items-center gap-2 mt-5 text-xs">
                                    {sections.filter(e => e.movieId === movieShow?.id).map(e => (
                                        <div key={e.id} className="bg-white border text-black text-center rounded p-1">
                                            {e.season}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center gap-2 mt-2 whitespace-nowrap flex-wrap text-xs">
                                    {movieShow?.listCate?.map((e, i) => (
                                        <div className="bg-white/20 text-center rounded p-1">{e}</div>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-auto w-[40%] ml-auto">
                                <div className="text-gray-500 text-sm">
                                    <Description text={movieShow?.description} maxLength={200} />
                                </div>
                                <Link to={`/detail/${movieShow?.id}`} className="flex items-center gap-2 text-yellow-400 w-[35%] mt-4 whitespace-nowrap">
                                    Thông tin phim
                                    <IoIosArrowForward />
                                </Link>
                            </div>
                        </div>
                        <div className="border-b border-gray-700 px-2 w-[98%]"></div>
                        <div className="px-2">
                            <Comment id={id} handleOpenLogin={handleOpenLogin} />
                        </div>
                    </div>
                    <div className="border-l border-gray-700 px-2 self-stretch"></div>
                    <div className="flex flex-col items-center mb-auto gap-7 ">
                        <div className="flex items-center gap-4 ">
                            <div className="flex items-center flex-col gap-2 whitespace-nowrap">
                                <FaStar />
                                <span>Đánh giá</span>
                            </div>
                            <div className="border-l border-gray-700 px-2 h-10"></div>
                            <a href="#comment" className="flex items-center flex-col gap-2 whitespace-nowrap">
                                <BiSolidCommentDetail />
                                <span>Bình luận</span>
                            </a>
                        </div>
                        <div className="border-b border-gray-700 px-2 w-50 "></div>
                        <h1 className="">Diễn viên</h1>
                        {movieShow?.listCharacter.map(e => (
                            <img
                                src={getOjectById(characters, e)?.imgUrl}
                                className="w-20 h-20 object-cover rounded-full"
                            />
                        ))}
                        <div className="border-b border-gray-700 px-2 w-[98%]"></div>
                        <Recommend />
                    </div>
                </div>
                <AddToPlaylist openModal={openModal} setOpenModal={setOpenModal} isLogin={isLogin} movieShow={movieShow} />
            </div>
        </div >
    );
}

export default PlayMovie;