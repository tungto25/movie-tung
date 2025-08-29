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
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { debounce } from 'lodash';
// Kích hoạt module
SwiperCore.use([Navigation, Thumbs]);

const movieData = [
    {
        category: "Phim Hàn Quốc mới",
        movies: [
            {
                name: "Ngôi Sao Rắc Rối của Tôi",
                subtitle: "My Troublesome Star",
                img: "https://vnpt.com.vn/Media/Images/20012021/2020012001.jpg",
                eps: 3,
                tm: 2,
            },
            {
                name: "Thử Thách Thần Tượng",
                subtitle: "Running Man",
                img: "https://vnpt.com.vn/Media/Images/20012021/2020012001.jpg",
                eps: 766,
            },
            {
                name: "Thử Thách Thần Tượng",
                subtitle: "Running Man",
                img: "https://vnpt.com.vn/Media/Images/20012021/2020012001.jpg",
                eps: 766,
            },
            {
                name: "Thử Thách Thần Tượng",
                subtitle: "Running Man",
                img: "https://vnpt.com.vn/Media/Images/20012021/2020012001.jpg",
                eps: 766,
            },
            {
                name: "Thử Thách Thần Tượng",
                subtitle: "Running Man",
                img: "https://vnpt.com.vn/Media/Images/20012021/2020012001.jpg",
                eps: 766,
            },
            {
                name: "Thử Thách Thần Tượng",
                subtitle: "Running Man",
                img: "https://vnpt.com.vn/Media/Images/20012021/2020012001.jpg",
                eps: 766,
            },
            {
                name: "Thử Thách Thần Tượng",
                subtitle: "Running Man",
                img: "https://vnpt.com.vn/Media/Images/20012021/2020012001.jpg",
                eps: 766,
            },
            {
                name: "Thử Thách Thần Tượng",
                subtitle: "Running Man",
                img: "https://vnpt.com.vn/Media/Images/20012021/2020012001.jpg",
                eps: 766,
            },
        ],
    },
    {
        category: "Phim Trung Quốc mới",
        movies: [
            {
                name: "Minh Nguyệt Nhập Khanh Hoài",
                subtitle: "A Forbidden Marriage",
                img: "https://cdn.9pay.vn/tin-tuc/dai-chua-te-hoat-hinh-trung-quoc-3d-1696405633.jpg",
                eps: 24,
                tm: 24,
            },
            {
                name: "Minh Nguyệt Nhập Khanh Hoài",
                subtitle: "A Forbidden Marriage",
                img: "https://cdn.9pay.vn/tin-tuc/dai-chua-te-hoat-hinh-trung-quoc-3d-1696405633.jpg",
                eps: 24,
                tm: 24,
            },
            {
                name: "Minh Nguyệt Nhập Khanh Hoài",
                subtitle: "A Forbidden Marriage",
                img: "https://cdn.9pay.vn/tin-tuc/dai-chua-te-hoat-hinh-trung-quoc-3d-1696405633.jpg",
                eps: 24,
                tm: 24,
            },
            {
                name: "Minh Nguyệt Nhập Khanh Hoài",
                subtitle: "A Forbidden Marriage",
                img: "https://cdn.9pay.vn/tin-tuc/dai-chua-te-hoat-hinh-trung-quoc-3d-1696405633.jpg",
                eps: 24,
                tm: 24,
            },
            {
                name: "Minh Nguyệt Nhập Khanh Hoài",
                subtitle: "A Forbidden Marriage",
                img: "https://cdn.9pay.vn/tin-tuc/dai-chua-te-hoat-hinh-trung-quoc-3d-1696405633.jpg",
                eps: 24,
                tm: 24,
            },
            {
                name: "Minh Nguyệt Nhập Khanh Hoài",
                subtitle: "A Forbidden Marriage",
                img: "https://cdn.9pay.vn/tin-tuc/dai-chua-te-hoat-hinh-trung-quoc-3d-1696405633.jpg",
                eps: 24,
                tm: 24,
            },
            {
                name: "Minh Nguyệt Nhập Khanh Hoài",
                subtitle: "A Forbidden Marriage",
                img: "https://cdn.9pay.vn/tin-tuc/dai-chua-te-hoat-hinh-trung-quoc-3d-1696405633.jpg",
                eps: 24,
                tm: 24,
            },
            {
                name: "Minh Nguyệt Nhập Khanh Hoài",
                subtitle: "A Forbidden Marriage",
                img: "https://cdn.9pay.vn/tin-tuc/dai-chua-te-hoat-hinh-trung-quoc-3d-1696405633.jpg",
                eps: 24,
                tm: 24,
            },
            {
                name: "Minh Nguyệt Nhập Khanh Hoài",
                subtitle: "A Forbidden Marriage",
                img: "https://cdn.9pay.vn/tin-tuc/dai-chua-te-hoat-hinh-trung-quoc-3d-1696405633.jpg",
                eps: 24,
                tm: 24,
            },
        ],
    },
    {
        category: "Phim US-UK mới",
        movies: [
            {
                name: "Minh Nguyệt Nhập Khanh Hoài",
                subtitle: "A Forbidden Marriage",
                img: "https://cdn.9pay.vn/tin-tuc/dai-chua-te-hoat-hinh-trung-quoc-3d-1696405633.jpg",
                eps: 24,
                tm: 24,
            },
            {
                name: "Minh Nguyệt Nhập Khanh Hoài",
                subtitle: "A Forbidden Marriage",
                img: "https://cdn.9pay.vn/tin-tuc/dai-chua-te-hoat-hinh-trung-quoc-3d-1696405633.jpg",
                eps: 24,
                tm: 24,
            },
            {
                name: "Minh Nguyệt Nhập Khanh Hoài",
                subtitle: "A Forbidden Marriage",
                img: "https://cdn.9pay.vn/tin-tuc/dai-chua-te-hoat-hinh-trung-quoc-3d-1696405633.jpg",
                eps: 24,
                tm: 24,
            },
            {
                name: "Minh Nguyệt Nhập Khanh Hoài",
                subtitle: "A Forbidden Marriage",
                img: "https://cdn.9pay.vn/tin-tuc/dai-chua-te-hoat-hinh-trung-quoc-3d-1696405633.jpg",
                eps: 24,
                tm: 24,
            },
            {
                name: "Minh Nguyệt Nhập Khanh Hoài",
                subtitle: "A Forbidden Marriage",
                img: "https://cdn.9pay.vn/tin-tuc/dai-chua-te-hoat-hinh-trung-quoc-3d-1696405633.jpg",
                eps: 24,
                tm: 24,
            },
            {
                name: "Minh Nguyệt Nhập Khanh Hoài",
                subtitle: "A Forbidden Marriage",
                img: "https://cdn.9pay.vn/tin-tuc/dai-chua-te-hoat-hinh-trung-quoc-3d-1696405633.jpg",
                eps: 24,
                tm: 24,
            },
            {
                name: "Minh Nguyệt Nhập Khanh Hoài",
                subtitle: "A Forbidden Marriage",
                img: "https://cdn.9pay.vn/tin-tuc/dai-chua-te-hoat-hinh-trung-quoc-3d-1696405633.jpg",
                eps: 24,
                tm: 24,
            },
            {
                name: "Minh Nguyệt Nhập Khanh Hoài",
                subtitle: "A Forbidden Marriage",
                img: "https://cdn.9pay.vn/tin-tuc/dai-chua-te-hoat-hinh-trung-quoc-3d-1696405633.jpg",
                eps: 24,
                tm: 24,
            },
            {
                name: "Minh Nguyệt Nhập Khanh Hoài",
                subtitle: "A Forbidden Marriage",
                img: "https://cdn.9pay.vn/tin-tuc/dai-chua-te-hoat-hinh-trung-quoc-3d-1696405633.jpg",
                eps: 24,
                tm: 24,
            },
        ],
    },
];
export default function MovieCarousel() {
    const prevRefs = useRef([]);
    const nextRefs = useRef([]);
    const [hoveredMovie, setHoveredMovie] = useState(null);
    const hoverTimeout = useRef(null);

    const handleMouseEnter = (movie, e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        clearTimeout(hoverTimeout.current);

        hoverTimeout.current = setTimeout(() => {
            setHoveredMovie({
                movie,
                top: rect.top + window.scrollY, // cộng scroll
                left: rect.left,
                width: rect.width,
                height: rect.height,
            });
        }, 500); // delay 0.5s
    };

    const handleMouseLeave = () => {
        clearTimeout(hoverTimeout.current);
        setHoveredMovie(null);
    };
    return (
        <div className="space-y-10 p-6 bg-gray-800 from-gray-700 via-gray-700/30 to-gray-900 bg-gradient-to-b text-white w-[96%] m-auto mt-5 rounded-2xl">
            {movieData.map((e, i) => (
                <div key={i} className="flex gap-4 relative flex-col md:flex-row">
                    <div className="flex flex-row md:flex-col items-center md:items-start justify-center md:justify-around gap-4">
                        <GradientText
                            animationSpeed={0.5}
                            showBorder={false}
                            className="custom-class text-2xl"
                        >
                            {e.category}
                        </GradientText>
                        <button className="text-sm text-gray-400 hover:underline flex items-center">
                            <span>Xem toàn bộ</span>
                            <MdOutlineKeyboardArrowRight />
                        </button>
                    </div>
                    <div className="relative flex-1">
                        <Swiper
                            modules={[Navigation]}
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
                                1280: { slidesPerView: 5, spaceBetween: 16 },
                            }}
                            spaceBetween={12}
                            navigation={{
                                prevEl: prevRefs.current[i],
                                nextEl: nextRefs.current[i],
                            }}
                            onBeforeInit={(swiper) => {
                                swiper.params.navigation.prevEl = prevRefs.current[i];
                                swiper.params.navigation.nextEl = nextRefs.current[i];
                            }}
                            className="flex-1 w-full max-w-[1000px] md:max-w-[620px] lg:max-w-[1000px]"
                        >
                            {e.movies.map((a, idx) => (
                                <SwiperSlide key={idx}>
                                    <div
                                        className="relative text-white"
                                        onMouseEnter={(e) => handleMouseEnter(a, e)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <img
                                            src={a.img}
                                            alt={a.name}
                                            className="rounded-lg w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                                        />
                                        <div className="mt-2 ">
                                            <h3 className="text-sm font-semibold ">{a.name}</h3>
                                            <p className="text-xs text-gray-400">{a.subtitle}</p>
                                        </div>
                                        {hoveredMovie &&
                                            createPortal(
                                                <motion.div
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    exit={{ scale: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    style={{
                                                        position: "absolute",
                                                        top: hoveredMovie.top,
                                                        left: hoveredMovie.left,
                                                        width: "auto",
                                                        height: "auto",
                                                        transformOrigin: "top left",
                                                        zIndex: 9999,
                                                    }}
                                                    className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden text-white"
                                                >
                                                    <div className="relative w-full h-40 rounded-t-2xl overflow-hidden">
                                                        <img
                                                            src={hoveredMovie.movie.img}
                                                            alt={hoveredMovie.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-gray-800 to-transparent pointer-events-none"></div>
                                                    </div>
                                                    <div className='p-4'>
                                                        <h1 className='text-xl mt-5'>{hoveredMovie.name}</h1>
                                                        <div className='flex items-center gap-2 mt-5'>
                                                            <button className='px-4 py-2 bg-yellow-500 flex items-center rounded-lg text-sm gap-2 text-black'>
                                                                <FaPlay />
                                                                <span className='whitespace-nowrap'>Xem ngay</span>
                                                            </button>
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
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Custom Buttons */}
                        <button
                            ref={(el) => (prevRefs.current[i] = el)}
                            className="absolute top-1/4 left-0 -translate-x-1/2 -translate-y-1 z-30 p-2 bg-white text-black rounded-full shadow"
                        >
                            <MdOutlineArrowBackIos />
                        </button>
                        <button
                            ref={(el) => (nextRefs.current[i] = el)}
                            className="absolute top-1/4 right-0 translate-x-1/2 -translate-y-1 z-10 p-2 bg-white text-black rounded-full shadow"
                        >
                            <MdArrowForwardIos />
                        </button>
                    </div>
                </div>
            ))
            }
        </div >
    );
}
