import { useState, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { ContextMovies } from "../../../contexts/MovieProvider";
import { ContextCategories } from "../../../contexts/CategoryProvider";
import { getOjectById } from "../../../services/reponsitory";
import { FaPlay } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";

function BannerSlide(props) {
    const movies = useContext(ContextMovies);
    const categories = useContext(ContextCategories);
    console.log(movies);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="w-full relative">
            {/* Swiper lớn */}
            <Swiper
                thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                className="w-full"
            >
                {movies.map((e) => (
                    <SwiperSlide key={e.id} className="relative flex justify-center">
                        <img
                            src={e.imgUrl}
                            alt={e.name}
                            className="w-full h-auto object-contain"
                        />
                        {/* Overlay gradient 2 bên */}
                        <div className="absolute inset-0 flex justify-between pointer-events-none">
                            <div className="w-1/3 h-full bg-gradient-to-r from-gray-900/95 to-transparent blur-md"></div>
                            <div className="w-1/3 h-full bg-gradient-to-l from-gray-900/95 to-transparent blur-md"></div>
                        </div>
                        {/* Nội dung overlay */}
                        <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold">
                            <img
                                src="public/images/logo-thanh-guom-diet-quy.png"
                                alt="Banner"
                                className="w-40"
                            />
                            <div className="flex items-center mt-3 text-xs gap-2">
                                <div className="flex items-center justify-center border-1 rounded-md border-yellow-500 p-1">
                                    <h1 className="text-yellow-500">IMDB</h1>
                                    <span>7.0</span>
                                </div>
                                <div className="flex items-center justify-center rounded-sm p-1 text-black bg-yellow-400 bg-gradient-to-l from-yellow-500 to-yellow-200">4K</div>
                                <div className="flex items-center justify-center rounded-sm p-1 bg-white text-black">K</div>
                                <div className="flex items-center justify-center border-1 rounded-md border-white p-1">2025</div>
                                <div className="flex items-center justify-center border-1 rounded-md border-white p-1">{e.duration}</div>
                            </div>
                            <div className="flex flex-wrap items-center text-xs gap-2 mt-2">
                                {e.listCate.map(f => (
                                    <div key={f} className="bg-white/30 p-2 rounded-md">
                                        {getOjectById(categories, f)?.name || "Unknown"}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-2 font-medium text-xs">
                                {e.description}
                            </div>
                            <div className="flex items-center gap-5 mt-6">
                                <button
                                    type="button"
                                    className="h-13 w-13 rounded-full bg-gradient-to-l from-yellow-500 to-yellow-200 flex items-center justify-center shadow-lg transition-transform duration-100 active:scale-95"
                                >
                                    <FaPlay className="text-xl text-black" />
                                </button>
                                <div className="inline-flex rounded-full overflow-hidden border-2 border-gray-600 bg-transparent">
                                    <button className="flex items-center justify-center px-4 py-2 transition-transform duration-100 active:scale-95">
                                        <FaHeart className="text-lg" />
                                    </button>
                                    <button className="flex items-center justify-center px-4 py-2 border-l border-gray-600 transition-transform duration-100 active:scale-95">
                                        <IoIosInformationCircle className="text-lg" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Thumbnails overlay */}
            <div className="absolute bottom-1/4 right-1/4 translate-x-3/4 transform z-50 w-3/4 pointer-events-auto">
                <Swiper
                    onSwiper={setThumbsSwiper}
                    slidesPerView="auto"
                    spaceBetween={8}
                    watchSlidesProgress
                    className="h-20"
                >
                    {movies.map((e, i) => (
                        <SwiperSlide
                            key={e.id}
                            className="flex-shrink-0 transition-transform duration-200 hover:scale-105"
                            style={{ width: "85px", height: "55px" }}
                        >
                            <div className={`w-full h-full rounded-md overflow-hidden
      ${i === activeIndex ? 'border-2 border-white' : ''}`}>
                                <img
                                    src={e.imgUrl}
                                    alt={e.name}
                                    className="w-full h-full object-cover cursor-pointer"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default BannerSlide;
