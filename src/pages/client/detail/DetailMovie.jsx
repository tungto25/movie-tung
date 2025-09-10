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

function DetailMovie() {
    const { id } = useParams();
    const [currentChoose, setCurrentChoose] = useState(1);
    const [movieShow, setMovieShow] = useState({});
    const movies = useContext(ContextMovies);
    useEffect(() => {
        console.log(movies);
        console.log("id", id);
        const movieFound = movies.find(e => e.id === id);
        setMovieShow(movieFound);
    }, [movies, id]);
    console.log(movieShow);

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
                    <InforMovie movieShow={movieShow} />
                    <div className="flex-1 ">
                        <div className="flex items-center justify-between w-full">
                            <button
                                type="button"
                                className="rounded-full px-8 py-4 gap-2 bg-gradient-to-l
                                 from-yellow-500 to-yellow-200 flex items-center justify-center shadow-lg transition-transform duration-100
                                 active:scale-95 active:shadow-[0_0_10px_3px_rgba(249,215,87)]"
                            >
                                <FaPlay className="text-sm text-black" />
                                <span className="whitespace-nowrap text-xl">Xem ngay</span>
                            </button>
                            <div className="text-white whitespace-nowrap flex flex-col items-center gap-1 hover:text-yellow-400 hover:bg-gray-800/50 hover:shadow hover:rounded-md hover:p-2">
                                <FaHeart />
                                <p>Yêu thích</p>
                            </div>
                            <div className="text-white whitespace-nowrap flex flex-col items-center gap-1 hover:text-yellow-400 hover:bg-gray-800/50 hover:shadow hover:rounded-md hover:p-2">
                                <IoMdAdd />
                                <p>Thêm vào</p>
                            </div>
                            <div className="text-white whitespace-nowrap flex flex-col items-center gap-1 hover:text-yellow-400 hover:bg-gray-800/50 hover:shadow hover:rounded-md hover:p-2">
                                <FaShare />
                                <p>Chia sẻ</p>
                            </div>
                            <div className="text-white whitespace-nowrap flex flex-col items-center gap-1 hover:text-yellow-400 hover:bg-gray-800/50 hover:shadow hover:rounded-md hover:p-2">
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
                        <Comment />

                    </div>
                </div>
            </div>
        </div >
    );
}

export default DetailMovie;