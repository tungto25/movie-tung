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
    { img: "https://i1-vnexpress.vnecdn.net/2025/04/24/karma-1745493969.jpg?w=330&h=495&q=100&dpr=1&fit=crop&s=ljVU4YPLhEigJnZ2rYKhqw", text: "Karma" },
    { img: "https://bazaarvietnam.vn/wp-content/uploads/2022/03/Harpers-Bazaar-Phim-chieu-rap-thang-4-2022-BATMAN-scaled.jpg", text: "Batman" },
    { img: "https://m.yodycdn.com/blog/mv5by2exmdiwyzatowe4ys00zthkltk1mdqtztq4yjvinznlodk5xkeyxkfqcgdeqxvyndc0njc1nty-compressed.jpg", text: "Bố Già" },
    { img: "https://image.plo.vn/w1000/Uploaded/2025/vocgmvpi/2025_02_27/le-duong-bao-lam-3812-6159.jpg.webp", text: "Sát Thủ Vô Cùng Cực" },
    { img: "https://cmsposter.cdn.mytvnet.vn/vimages/25/5c/ce/e8/81/1e/25ce8-p1emvatrinhvoinhungcauchuyentinhyeutuoitretrongsangdepdenhungdaytiecnuoijpeg-unkn-unkn.jpeg", text: "Em và Trịnh" },
    { img: "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/4/15/1034450/Peenak3-Main_Poster_.jpg", text: " Ngôi Đền Kỳ Quái" },
];
export default function SectionSlide() {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
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
            <div className="flex items-center gap-4">
                <h1>Phim Hot hôm nay</h1>
                <button className="relative flex justify-center items-center text-sm text-gray-400 flex items-center group bg-gray-600 h-5 w-5 rounded-full ">
                    <span className="group-hover:block hidden whitespace-nowrap absolute left-0 bg-gray-600 px-2 py-1 rounded-md">Xem toàn bộ</span>
                    <MdOutlineKeyboardArrowRight />
                </button>
            </div>
            <div className=" gap-4 relative">
                <div className="relative flex-1 flex">
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
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        onBeforeInit={(swiper) => {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                        }}
                        className="flex-1 w-full "
                    >
                        {movieData.map((e, i) => (

                            <SwiperSlide key={i}>
                                <div
                                    className="relative text-white"
                                    onMouseEnter={(e) => handleMouseEnter(movie, e)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <img
                                        src={e.img}
                                        alt={e.text}
                                        className="rounded-lg w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                    <div className="mt-2 ">
                                        <h3 className="text-sm font-semibold ">{e.text}</h3>
                                        <p className="text-xs text-gray-400"></p>
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
                                                        src={hoveredMovie.img}
                                                        alt={hoveredMovie.text}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-gray-800 to-transparent pointer-events-none"></div>
                                                </div>
                                                <div className='p-4'>
                                                    <h1 className='text-xl mt-5'>{hoveredMovie.text}</h1>
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
                        ref={nextRef}
                        className="absolute top-1/4 left-0 -translate-x-1/2 -translate-y-1 z-30 p-2 bg-white text-black rounded-full shadow"
                    >
                        <MdOutlineArrowBackIos />
                    </button>
                    <button
                        ref={prevRef}
                        className="absolute top-1/4 right-0 translate-x-1/2 -translate-y-1 z-10 p-2 bg-white text-black rounded-full shadow"
                    >
                        <MdArrowForwardIos />
                    </button>
                </div>
            </div>

        </div >
    );
}
