// MovieCarousel.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Thumbs } from "swiper"; // Swiper 8
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { MdArrowForwardIos, MdOutlineArrowBackIos, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaHeart, FaPlay } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";
import { GoDotFill } from "react-icons/go";

import { useContext, useRef, useState } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { ContextMovies } from "../../../contexts/MovieProvider";
import { getOjectById } from "../../../services/reponsitory";
import { ContextCountries } from "../../../contexts/CountryProvider";
import MovieHoverCard from "./MovieHoverCard";
import { ContextLikeMovie } from "../../../contexts/LikeMovieProvider";
import { ContextAuth } from "../../../contexts/AuthProvider";

// Kích hoạt module
SwiperCore.use([Navigation, Thumbs]);


export default function MovieNetflix() {
    const { isLogin } = useContext(ContextAuth);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [hoveredMovie, setHoveredMovie] = useState(null);
    const openTimer = useRef(null);
    const closeTimer = useRef(null);
    const movies = useContext(ContextMovies);
    const likeMovies = useContext(ContextLikeMovie);

    const handleMouseEnter = (movie, idx, e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        clearTimeout(closeTimer.current);
        clearTimeout(openTimer.current);
        openTimer.current = setTimeout(() => {
            setHoveredMovie({ movie, idx, rect });
        }, 700);
    };

    const handleMouseLeave = () => {
        clearTimeout(openTimer.current);
        clearTimeout(closeTimer.current);
        closeTimer.current = setTimeout(() => setHoveredMovie(null), 150);
    };
    const checkLike = hoveredMovie ? likeMovies.find(e => e.idMovie === hoveredMovie.movie.id && e.idUser === isLogin?.id) : null;

    const addLike = async () => {
        if (!isLogin) {
            alert("Vui lòng đăng nhập để thêm vào danh sách yêu thích!");
            return;
        }
        if (!hoveredMovie) return;
        const movie = hoveredMovie.movie;
        if (checkLike) {
            await deleteDocument("LikeMovies", checkLike.id);
        } else {
            await addDocument("LikeMovies", { idMovie: movie.id, idUser: isLogin.id });
        }
    };
    return (
        <div className="space-y-10 text-white m-auto mt-5 rounded-2xl  w-full
         bg-red-700 from-red-300 via-gray-700/30 to-gray-900 bg-gradient-to-b">
            <div className="flex gap-4 items-center w-full rounded-t-2xl px-4 py-2">
                <div className="flex items-center">
                    <h1 className="font-bold text-base md:text-2xl lg:text-3xl">Phim hot</h1>
                </div>
                <div className="flex items-center justify-center border rounded-2xl group p-1 transition-transform duration-150 active:scale-105">
                    <p className="hidden lg:group-hover:block">Xem thêm</p>
                    <MdOutlineKeyboardArrowRight />
                </div>
            </div>

            <div className=" gap-4 relative w-full p-6">
                <div className="relative">
                    <Swiper
                        modules={[Navigation]}
                        breakpoints={{
                            0: { slidesPerView: 2, spaceBetween: 8 },
                            480: { slidesPerView: 2, spaceBetween: 10 },
                            640: { slidesPerView: 3, spaceBetween: 12 },
                            768: { slidesPerView: 3, spaceBetween: 12 },
                            1024: { slidesPerView: 5, spaceBetween: 14 },
                            1280: { slidesPerView: 5, spaceBetween: 16 },
                        }}
                        spaceBetween={12}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        onBeforeInit={(swiper) => {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                        }}
                        className="w-full max-w-[1200px] mx-auto"
                    >
                        {movies.filter(m => m.country === "US/UK").map((e, i) => (
                            <SwiperSlide key={i}>
                                <div
                                    className="relative"
                                    onMouseEnter={(ev) => handleMouseEnter(e, i, ev)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <img
                                        src={e.imgUrl}
                                        alt={e.name}
                                        className="rounded-lg hover:scale-102 h-[250px] md:h-[370px] lg:h-[330px] object-cover"
                                    />
                                    <h3 className="text-lg md:text-xl text-center mt-2">{e.name}</h3>
                                    <h3 className="text-[8px] md:text-sm text-center mt-1 text-gray-400">
                                        {e.subtitle}
                                    </h3>
                                </div>

                                {hoveredMovie?.idx === i && (
                                    <MovieHoverCard
                                        hoveredMovie={hoveredMovie}
                                        closeTimer={closeTimer}
                                        setHoveredMovie={setHoveredMovie}
                                        checkLike={checkLike}
                                        addLike={addLike}
                                    />
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Buttons */}
                    <button
                        ref={prevRef}
                        className="absolute top-1/3 -translate-y-1/12 -left-5 -translate-5 text-sm
                        lg:-left-5 lg:-translate-x-5 lg:text-xl border bg-black rounded-full z-30 p-2 text-white hidden md:block"
                    >
                        <MdOutlineArrowBackIos />
                    </button>
                    <button
                        ref={nextRef}
                        className="absolute top-1/3 -translate-y-1/12 -right-5 translate-5 text-sm
                        lg:-right-5 lg:translate-x-5 lg:text-xl border bg-black rounded-full z-30 p-2 text-white hidden md:block"
                    >
                        <MdArrowForwardIos />
                    </button>
                </div>
            </div>
        </div>
    );
}
