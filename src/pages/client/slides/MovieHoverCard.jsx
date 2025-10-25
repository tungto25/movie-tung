// MovieHoverCard.jsx
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { FaHeart, FaPlay } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { useContext } from "react";
import { ContextCategories } from "../../../contexts/CategoryProvider";
import { ContextMovies } from "../../../contexts/MovieProvider";
import { ContextSections } from "../../../contexts/SectionProvider";
import { getOjectById } from "../../../services/reponsitory";
import { ContextEpisodes } from "../../../contexts/EpisodeProvider";

export default function MovieHoverCard({hoveredMovie,closeTimer,setHoveredMovie,checkLike,addLike}) {
    if (!hoveredMovie) return null;

    const top = hoveredMovie.rect.top + window.scrollY - 50;
    const left = hoveredMovie.rect.left + window.scrollX - 50;
    const movies = useContext(ContextMovies);
    const sections = useContext(ContextSections);
    const episodes = useContext(ContextEpisodes);

    const movie = movies.find(m => m.id === hoveredMovie.id);
    const movieSections = sections.filter(s => s.idMovie === hoveredMovie.id);
    const movieEpisodes = episodes.filter(ep => ep.movieId === hoveredMovie.id);

    return createPortal(
        <motion.div
            onMouseEnter={() => clearTimeout(closeTimer.current)}
            onMouseLeave={() => {
                clearTimeout(closeTimer.current);
                closeTimer.current = setTimeout(() => setHoveredMovie(null), 100);
            }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1.08 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            style={{
                position: "absolute",
                top,
                left,
                transformOrigin: "top left",
                zIndex: 9999,
            }}
            className="rounded-2xl overflow-hidden shadow-2xl bg-gray-950/90 text-white hidden lg:block"
        >
            <img src={hoveredMovie.imgUrl} className="w-full h-40 object-cover" />
            <div className="p-4">
                <h1 className="text-lg font-semibold">{hoveredMovie.name}</h1>

                <div className="flex items-center gap-2 mt-5">
                    <Link
                        to={`/detail/${hoveredMovie.id}`}
                        className="px-4 py-2 bg-yellow-500 flex items-center rounded-lg text-sm gap-2
              text-black active:scale-95 active:shadow-[0_0_10px_3px_rgba(249,215,87)]"
                    >
                        <FaPlay />
                        <span className="whitespace-nowrap">Xem ngay</span>
                    </Link>

                    <div
                        onClick={addLike}
                        className={`flex items-center rounded-lg border px-4 py-2 text-sm gap-2 cursor-pointer
                hover:text-yellow-400 hover:bg-gray-800/50 ${checkLike ? "border-red-500" : ""
                            }`}
                    >
                        <FaHeart className={`${checkLike ? "text-red-500" : ""}`} />
                        <p className={`${checkLike ? "text-red-500" : ""}`}>Yêu thích</p>
                    </div>

                    <div className="flex items-center rounded-lg border px-4 py-2 text-sm gap-2">
                        <IoIosInformationCircle />
                        <span className="whitespace-nowrap">Chi tiết</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 mt-4 text-xs">
                    {movieEpisodes.length > 0 && (
                        <div className="flex items-center bg-white text-black rounded-md px-3 py-1 font-bold">
                            {movieEpisodes.length} tập
                        </div>
                    )}

                    {movie && (
                        <div className="flex items-center bg-gray-400/30 text-white rounded-md px-3 py-1 font-bold">
                            {movie.year}
                        </div>
                    )}

                    {movieSections.map((f) => (
                        <div
                            key={f.id}
                            className="flex items-center bg-gray-400/30 text-white rounded-md px-3 py-1 font-bold"
                        >
                            {f.season}
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-2 my-4 text-xs">
                    {movie.listCate.map((cate, i) => (
                        <div className="flex items-center gap-2">
                            <p>{cate}</p>
                            {i < movie.listCate.length - 1 && (
                                <span className="text-xs">
                                    <GoDotFill />
                                </span>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </motion.div>,
        document.body
    );
}
