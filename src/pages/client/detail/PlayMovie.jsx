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
                    <video
                        src={movieShow?.videoUrl}
                        alt=""
                        className="w-full h-[550px] object-cover"
                    />
                </div>
                <div className="p-5 flex ">
                    <InforMovie movieShow={movieShow} />
                    <div className="flex-1 ">
                        <div className="flex items-center justify-between w-full">
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