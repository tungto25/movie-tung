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
import MovieHoverCard from "./MovieHoverCard";

// Kích hoạt module
SwiperCore.use([Navigation, Thumbs]);

export default function TopFilm() {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [hoveredMovie, setHoveredMovie] = useState(null);
    const openTimer = useRef(null);
    const closeTimer = useRef(null);
    const movies = useContext(ContextMovies);

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


    return (
        <div className="space-y-10 p-6 text-white m-auto mt-5 rounded-2xl">
            <div className="flex gap-4 items-center">
                <h1 className="font-bold text-base text-xl lg:text-2xl">Top Phim Đang Chiếu Rạp</h1>
                <div className="flex items-center justify-center border rounded-2xl group p-1 transition-transform duration-150 active:scale-105">
                    <span className="hidden lg:group-hover:block">Xem thêm</span>
                    <MdOutlineKeyboardArrowRight />
                </div>
            </div>
            <div className=" gap-4 relative w-full">
                <div className="relative">
                    <Swiper
                        modules={[Navigation]}
                        breakpoints={{
                            0: { slidesPerView: 1, spaceBetween: 8 },
                            480: { slidesPerView: 1, spaceBetween: 9 },
                            640: { slidesPerView: 2, spaceBetween: 8 },
                            768: { slidesPerView: 2, spaceBetween: 8 },
                            1024: { slidesPerView: 3, spaceBetween: 12 },
                            1280: { slidesPerView: 3, spaceBetween: 16 },
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
                        {movies.filter(m => m.movieType === "phim lẻ").map((e, i) => (
                            <SwiperSlide
                                key={i}
                                style={{ perspective: "1000px" }}
                            >
                                <div
                                    className="relative p-2 transform "

                                    onMouseEnter={(ev) => handleMouseEnter(e, i, ev)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <img
                                        src={e.imgUrl}
                                        alt={e.name}
                                        className={`rounded-xl hover:scale-102 h-[230px] md:h-[250px] lg:h-[250px] m-auto w-full`}
                                    />

                                    <div className="text-center mx-auto md:text-start w-[60%] md:ml-auto">
                                        <h3 className="text-lg md:text-base lg:text-xl mt-1 break-words md:break-normal">{e.name}</h3>
                                        <h3 className="text-[10px] md:text-sm mt-1 text-gray-400">{e.subtitle}</h3>
                                        <div className='flex items-center md:gap-2 mt-2 text-[10px] md:text-xs text-gray-400'>
                                            <div className='rounded-md px-3 py-1 font-bold'>
                                                T16
                                            </div>
                                            <div className='flex items-center rounded-md px-3 py-1 font-bold gap-1'>
                                                <GoDotFill className="" />
                                                2025
                                            </div>
                                            <div className='flex items-center rounded-md px-3 py-1 font-bold gap-1'>
                                                <GoDotFill />
                                                Phần 1
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <img
                                        src={e.poster || e.imgUrl}
                                        alt=""
                                        className="hidden md:block md:w-[90px] md:h-[130px] rounded-md absolute top-1/2 translate-y-1/3 left-0 translate-x-1/3 shadow-2xl object-cover"
                                    />
                                </div>
                                {hoveredMovie?.i === i && (
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
                        className="absolute top-1/3 -translate-y-1/12  left-0 -translate-x-1/2 z-30 p-2 text-white text-3xl hidden lg:block"
                    >
                        <MdOutlineArrowBackIos />
                    </button>
                    <button
                        ref={nextRef}
                        className="absolute top-1/3 -translate-y-1/12 right-0 translate-x-1/2 z-30 p-2 text-white text-3xl hidden lg:block"
                    >
                        <MdArrowForwardIos />
                    </button>
                </div>
            </div>
        </div >
    );
}
