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
import { Link } from "react-router-dom";

// Kích hoạt module
SwiperCore.use([Navigation, Thumbs]);

export default function SerieAnime() {
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
        <div className="space-y-10 text-white m-auto rounded-2xl  w-full">
            <div className="flex gap-4 items-center w-full rounded-t-2xl px-4 py-2">
                <div className="flex items-center">
                    <h1 className="font-bold text-base md:text-2xl lg:text-3xl">Những Bộ Anime Hot Nhất</h1>
                </div>
                <div className="flex items-center justify-center border rounded-2xl group p-1 transition-transform duration-150 active:scale-105">
                    <p className="hidden lg:group-hover:block">Xem thêm</p>
                    <MdOutlineKeyboardArrowRight />
                </div>
            </div>

            <div className=" gap-4 relative w-full px-6">
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
                        {movies.filter(a => a.country === "Nhật Bản").filter(f => f.movieType === "phim bộ").map((e, idx) => (
                            <SwiperSlide
                                key={idx}

                            >
                                <div
                                    className="relative"
                                    onMouseEnter={(ev) => handleMouseEnter(e, idx, ev)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <img
                                        src={e.poster}
                                        alt={e.name}
                                        className="rounded-lg hover:scale-102 h-[250px] md:h-[370px] lg:h-[330px]"
                                    />
                                    <h3 className="text-lg md:text-xl text-center mt-2">{e.name}</h3>
                                    <h3 className="text-[8px] md:text-sm text-center mt-1 text-gray-400">{e.subtitle}</h3>
                                </div>

                                {hoveredMovie?.idx === idx &&
                                    createPortal(
                                        <motion.div
                                            onMouseEnter={() => clearTimeout(closeTimer.current)}
                                            onMouseLeave={() => {
                                                clearTimeout(closeTimer.current);
                                                closeTimer.current = setTimeout(
                                                    () => setHoveredMovie(null),
                                                    100
                                                );
                                            }}
                                            initial={{ opacity: 0, scale: 0.96 }}
                                            animate={{ opacity: 1, scale: 1.08 }}
                                            exit={{ opacity: 0, scale: 0.96 }}
                                            transition={{ duration: 0.2 }}
                                            style={{
                                                position: "fixed",
                                                top: hoveredMovie.rect.top - 50,
                                                left: hoveredMovie.rect.left - 50,
                                                width: "auto",
                                                transformOrigin: "top left",
                                                zIndex: 9999,
                                            }}
                                            className="rounded-2xl overflow-hidden shadow-2xl bg-gray-950 text-white hidden lg:block"
                                        >
                                            <img
                                                src={hoveredMovie.movie.imgUrl}
                                                className="w-full h-40 object-cover"
                                            />
                                            <div className="p-4">
                                                <h1 className="text-lg font-semibold">
                                                    {hoveredMovie.movie.name}
                                                </h1>
                                            </div>
                                            <div className="p-4">
                                                <h1 className="text-lg font-semibold">{hoveredMovie.movie.name}</h1>
                                                <div className='flex items-center gap-2 mt-5'>
                                                    <Link to={`/detail/${e.id}`} className='px-4 py-2 bg-yellow-500 flex items-center rounded-lg text-sm gap-2 text-black'>
                                                        <FaPlay />
                                                        <span className='whitespace-nowrap'>Xem ngay</span>
                                                    </Link>
                                                    <div className='flex items-center rounded-lg border-1 px-4 py-2 text-sm gap-2'>
                                                        <FaHeart />
                                                        <span>Thích</span>
                                                    </div>
                                                    <div className='flex items-center rounded-lg border-1 px-4 py-2 text-sm gap-2'>
                                                        <IoIosInformationCircle />
                                                        <span className='whitespace-nowrap'>Chi tiết</span>
                                                    </div>
                                                </div>
                                                <div className='flex items-center gap-2 mt-4 text-xs'>
                                                    <div className='flex items-center bg-white text-black rounded-md px-3 py-1 font-bold'>
                                                        T16
                                                    </div>
                                                    <div className='flex items-center bg-gray-400/30 text-white rounded-md px-3 py-1 font-bold'>
                                                        2025
                                                    </div>
                                                    <div className='flex items-center bg-gray-400/30 text-white rounded-md px-3 py-1 font-bold'>
                                                        Phần 1
                                                    </div>
                                                    <div className='flex items-center bg-gray-400/30 text-white rounded-md px-3 py-1 font-bold'>
                                                        Phần 2
                                                    </div>
                                                </div>
                                                <div className='flex items-center gap-2 my-4'>
                                                    <p>Hoàng cung</p>
                                                    <span className='text-xs'><GoDotFill /></span>
                                                    <p>Tình cảm</p>
                                                    <span className='text-xs'><GoDotFill /></span>
                                                    <p>Hài</p>
                                                    <span className='text-xs'><GoDotFill /></span>
                                                    <p>Kỳ ảo</p>
                                                </div>
                                            </div>
                                        </motion.div>,
                                        document.body
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
