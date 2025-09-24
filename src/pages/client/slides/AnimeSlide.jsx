import { useState, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import SwiperCore, { Navigation, Thumbs } from "swiper";
SwiperCore.use([Navigation, Thumbs]);

import { ContextMovies } from "../../../contexts/MovieProvider";
import { ContextCategories } from "../../../contexts/CategoryProvider";
import { getOjectById } from "../../../services/reponsitory";
import { FaPlay } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";
import { Description } from "./Description";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { ContextCountries } from "../../../contexts/CountryProvider";

function AnimeSlide(props) {
    const movies = useContext(ContextMovies);
    const categories = useContext(ContextCategories);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <>
            <div className="w-full relative mt-4 rounded-2xl">
                <Swiper
                    thumbs={{ swiper: thumbsSwiper }}
                    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                    className="w-full"
                >
                    {movies.filter(a => a.country === "Nhật Bản").filter(f => f.movieType === "phim lẻ").slice(0, 10).map((e, i) => (
                        <SwiperSlide key={e.id} className="relative flex justify-center ">
                            <img
                                src={e.imgUrl}
                                alt={e.name}
                                className="w-full h-[230px] md:h-[400px] lg:h-[400px] xl:h-[420px] object-cover rounded-2xl brightness-75"
                            />
                            {/* làm blur */}
                            <div className="absolute inset-0 flex justify-between pointer-events-none">
                                <div className="absolute max-md:hidden w-1/2 h-full bg-gradient-to-r from-gray-950 via-gray-950 to-transparent rounded-l-2xl">
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gray-900/60 to-transparent"></div>

                            <div className="absolute max-sm:bottom-1/4 max-sm:translate-y-1/4 left-1/2 -translate-x-1/2
                        md:top-1/2 md:-translate-y-1/2 md:left-1 md:translate-x-1
                        lg:top-2/3 lg:-translate-y-2/3 lg:ms-8 lg:left-1 lg:-translate-x-1
                         text-white font-bold ">
                                <h1 className=" text-2xl text-center md:text-start">{e.name}</h1>
                                <div className="flex items-center max-sm:justify-center mt-1 md:mt-3 text-[7px] md:text-xs lg:mt-5 gap-2">
                                    <div className="flex items-center justify-center border-1 rounded-md border-yellow-500 p-1">
                                        <h1 className="text-yellow-500">IMDB</h1>
                                        <span>7.0</span>
                                    </div>
                                    <div className="flex items-center justify-center rounded-sm p-1 text-black bg-yellow-400 bg-gradient-to-l from-yellow-500 to-yellow-200">4K</div>
                                    <div className="flex items-center justify-center rounded-sm p-1 bg-white text-black">K</div>
                                    <div className="flex items-center justify-center border-1 rounded-md border-white p-1">2025</div>
                                    <div className="flex items-center justify-center border-1 rounded-md border-white p-1">{e.duration}</div>
                                </div>
                                <div className="flex flex-wrap items-center max-sm:justify-center text-[6px] md:text-[10px] lg:text-sm gap-2 mt-1 md:mt-2 lg:mt-5">
                                    {e.listCate.map(f => (
                                        <div key={f} className="bg-white/30 p-1 md:p-2 rounded md:rounded-md">
                                            {getOjectById(categories, f)?.name || "Unknown"}
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-1 max-lg:text-center md:mt-2 font-medium text-[7px] md:text-[9px] lg:text-[14px] md:w-[65%]">
                                    <Description text={e.description} maxLength={200} />
                                </div>
                                <div className="items-center gap-5 mt-10 hidden md:flex ">
                                    <button
                                        type="button"
                                        className="h-13 w-13 lg:h-17 lg:w-17 rounded-full bg-gradient-to-l from-yellow-500 to-yellow-200 flex items-center justify-center shadow-lg transition-transform duration-100 active:scale-95"
                                    >
                                        <FaPlay className="text-xl text-black" />
                                    </button>
                                    <div className="inline-flex rounded-full overflow-hidden border-2 border-gray-300 bg-transparent">
                                        <button className="flex items-center justify-center px-4 py-2 lg:px-6 lg:py-4 transition-transform duration-100 active:scale-95">
                                            <FaHeart className="text-lg" />
                                        </button>
                                        <button className="flex items-center justify-center px-4 py-2 lg:px-6 lg:py-4 border-l border-gray-300 transition-transform duration-100 active:scale-95">
                                            <IoIosInformationCircle className="text-lg" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-3/4
            md:bottom-1/8 md:translate-y-1/2 md:right-1/2 md:-translate-x-1/2
             lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 z-50 lg:w-3/4 pointer-events-auto ">
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        slidesPerView="10"
                        breakpoints={{
                            320: { spaceBetween: 0 },   // mobile nhỏ
                            640: { spaceBetween: 10 },   // tablet
                            1024: { spaceBetween: 6 },  // PC vừa
                            1280: { spaceBetween: 8 },  // màn hình lớn
                        }}
                        watchSlidesProgress={true}
                        slideToClickedSlide={true}
                        className="h-20 w-50 md:w-90 lg:w-full"
                    >
                        {movies.filter(a => a.country === "Nhật Bản").filter(f => f.movieType === "phim lẻ").slice(0, 10).map((e, i) => (
                            <SwiperSlide
                                key={e.id}
                                className="flex-shrink-0 transition-transform duration-200 hover:scale-105 "
                                style={{
                                    width:
                                        window.innerWidth < 640
                                            ? "30px" // mobile
                                            : window.innerWidth < 1024
                                                ? "50px" // tablet
                                                : "60px", // pc
                                    height: "55px",
                                }}
                            >
                                <div className={`lg:h-20 lg:w-15 lg:rounded-md rounded-full h-4 w-4 md:h-8 md:w-8 overflow-hidden
                                            ${i === activeIndex ? 'border-2 border-white' : ''}`}>
                                    <img
                                        src={e.poster}
                                        alt={e.name}
                                        className="w-full lg:w-full h-full object-cover cursor-pointer"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </>
    );
}

export default AnimeSlide;
