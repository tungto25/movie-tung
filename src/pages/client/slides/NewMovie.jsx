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

import GradientText from "../../../components/client/GradientText";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

// Kích hoạt module
SwiperCore.use([Navigation, Thumbs]);

export default function NewMovie({ data, title }) {

    const [hoveredMovie, setHoveredMovie] = useState(null);
    const openTimer = useRef(null);
    const closeTimer = useRef(null);

    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const swiperRef = useRef(null);
    useEffect(() => {
        if (swiperRef.current && swiperRef.current.params) {
            swiperRef.current.params.navigation.prevEl = prevRef.current;
            swiperRef.current.params.navigation.nextEl = nextRef.current;
            swiperRef.current.navigation.init();
            swiperRef.current.navigation.update();
        }
    }, []);

    const handleMouseEnter = (movie, i, e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        clearTimeout(closeTimer.current);
        clearTimeout(openTimer.current);
        openTimer.current = setTimeout(() => {
            setHoveredMovie({ ...movie, i, rect });
        }, 700);
    };

    const handleMouseLeave = () => {
        clearTimeout(openTimer.current);
        clearTimeout(closeTimer.current);
        closeTimer.current = setTimeout(() => {
            setHoveredMovie(null);
        }, 150);
    };
    return (
        <div className="">

            <div className="flex gap-4 relative flex-col md:flex-row">
                <div className="flex flex-row md:flex-col items-center md:items-start justify-around md:justify-around gap-4">
                    <GradientText
                        animationSpeed={0.5}
                        showBorder={false}
                        className="custom-class text-lg md:text-xl lg:text-2xl"
                    >
                        Phim {title} mới
                    </GradientText>
                    <button className="text-sm text-gray-400 hover:underline flex items-center">
                        <span>Xem toàn bộ</span>
                        <MdOutlineKeyboardArrowRight />
                    </button>
                </div>
                <div className="relative flex-1">
                    <Swiper
                        breakpoints={{
                            // Mobile nhỏ
                            0: { slidesPerView: 2, spaceBetween: 8 },
                            // Mobile lớn
                            480: { slidesPerView: 3, spaceBetween: 10 },
                            // Tablet nhỏ
                            640: { slidesPerView: 3, spaceBetween: 12 },
                            // Tablet lớn
                            768: { slidesPerView: 3, spaceBetween: 12 },
                            // Laptop
                            1024: { slidesPerView: 4, spaceBetween: 14 },
                            // Desktop lớn
                            1280: { slidesPerView: 4, spaceBetween: 16 },
                        }}
                        spaceBetween={12}
                        modules={[Navigation]}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        className=" w-full max-w-[1000px] md:max-w-[620px] lg:max-w-[1000px]"
                    >
                        {data.map((e, i) => (
                            <SwiperSlide key={i}>
                                <div
                                    className="relative"
                                    onMouseEnter={(a) => handleMouseEnter(e, i, a)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <img src={e.imgUrl}
                                        alt={e.name}
                                        className="rounded-lg hover:scale-102 h-[140px] object-cover"
                                    />
                                    <h3 className="text-sm mt-2">{e.name}</h3>
                                </div>

                                {hoveredMovie?.i === i &&
                                    createPortal(
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
                                                position: "fixed",
                                                top: hoveredMovie.rect.top - 50,
                                                left: hoveredMovie.rect.left - 50,
                                                width: "auto",
                                                transformOrigin: "top left",
                                                zIndex: 9999,
                                            }}
                                            className="rounded-2xl overflow-hidden shadow-2xl bg-gray-950/90 text-white hidden lg:block"
                                        >
                                            <img
                                                src={hoveredMovie.imgUrl}
                                                className="w-full h-40 object-cover"
                                            />
                                            <div className="p-4">
                                                <h1 className="text-lg font-semibold">{hoveredMovie.name}</h1>
                                                <div className='flex items-center gap-2 mt-5'>
                                                    <Link
                                                        to={`/detail/${e.id}`}
                                                        className='px-4 py-2 bg-yellow-500 flex items-center rounded-lg text-sm gap-2
                                                         text-black active:scale-95 active:shadow-[0_0_10px_3px_rgba(249,215,87)]'
                                                    >
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
                        className="absolute top-1/3 -translate-y-1/3 left-0 -translate-x-1/2
                                    z-30 p-2 bg-white text-black rounded-full shadow hidden md:flex"
                    >
                        <MdOutlineArrowBackIos />
                    </button>

                    {/* Next Button */}
                    <button
                        ref={nextRef}
                        className="absolute top-1/3 -translate-y-1/3 right-0 translate-x-1/2
                                    z-30 p-2 bg-white text-black rounded-full shadow hidden md:flex"
                    >
                        <MdArrowForwardIos />
                    </button>
                </div>
            </div>
        </div >
    );
}