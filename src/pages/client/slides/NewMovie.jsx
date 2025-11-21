// MovieCarousel.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Thumbs } from "swiper"; // Swiper 8
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { MdArrowForwardIos, MdOutlineArrowBackIos, MdOutlineKeyboardArrowRight } from "react-icons/md";
import GradientText from "../../../components/client/GradientText";
import { useContext, useEffect, useRef, useState } from "react";
import { ContextLikeMovie } from "../../../contexts/LikeMovieProvider";
import { addDocument, deleteDocument } from "../../../services/FirebaseService";
import { ContextAuth } from "../../../contexts/AuthProvider";
import MovieHoverCard from "./MovieHoverCard";
import { ContextMovies } from "../../../contexts/MovieProvider";
import { getOjectById } from "../../../services/reponsitory";
import { ContextPackages } from "../../../contexts/PackageProvider";
import { ContextPlans } from "../../../contexts/PlanProvider";

SwiperCore.use([Navigation, Thumbs]);

export default function NewMovie({ data, title }) {
console.log(data);

    const [hoveredMovie, setHoveredMovie] = useState(null);
    const openTimer = useRef(null);
    const closeTimer = useRef(null);
    const { isLogin } = useContext(ContextAuth);
    const [movieShow, setMovieShow] = useState({});
    const likeMovies = useContext(ContextLikeMovie);
    const plans = useContext(ContextPlans)

    
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
        if (hoveredMovie?.i === i) return;
        const rect = e.currentTarget.getBoundingClientRect();
        clearTimeout(closeTimer.current);
        clearTimeout(openTimer.current);
        openTimer.current = setTimeout(() => {
            setHoveredMovie({ ...movie, i, rect });
        }, 700);
        setMovieShow(movie);
    };

    const handleMouseLeave = () => {
        clearTimeout(openTimer.current);
        clearTimeout(closeTimer.current);
        closeTimer.current = setTimeout(() => {
            setHoveredMovie(null);
        }, 150);

    };
    const checkLike = likeMovies.find(e => e.idMovie === movieShow?.id && e.idUser === isLogin?.id);
    const addLike = async () => {
        if (!isLogin) {
            alert("Vui lòng đăng nhập để thêm vào danh sách yêu thích!");
            return;
        }
        if (checkLike) {
            await deleteDocument("LikeMovies", checkLike.id);
        } else {
            await addDocument("LikeMovies", { idMovie: movieShow.id, idUser: isLogin.id });
        }
    };


    return (
        <div className="">

            <div className="flex gap-4 relative flex-col md:flex-row ">
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
                            0: { slidesPerView: 2, spaceBetween: 4 },
                            // Mobile lớn
                            480: { slidesPerView: 3, spaceBetween: 8 },
                            // Tablet nhỏ
                            640: { slidesPerView: 3, spaceBetween: 8 },
                            // Tablet lớn
                            768: { slidesPerView: 3, spaceBetween: 4 },
                            // Laptop
                            1024: { slidesPerView: 4, spaceBetween: 5 },
                            // Desktop lớn
                            1280: { slidesPerView: 4, spaceBetween: 6 },
                        }}
                        spaceBetween={12}
                        modules={[Navigation]}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        className=" w-full md:w-[600px] lg:w-[1000px]"
                    >
                        {data.map((e, i) => (
                            <SwiperSlide key={i}>
                                <div
                                    className="relative"
                                    onMouseEnter={(a) => handleMouseEnter(e, i, a)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <div className="relative">
                                        <img src={e.imgUrl}
                                            alt={e.name}
                                            className="rounded-lg hover:scale-102 h-[100px] md:h-[120px] lg:h-[140px] w-full object-cover"
                                        />
                                        <div className="absolute top-0 right-0 px-2 bg-red-500/50 rounded-bl-lg">{getOjectById(plans,e.plan)?.title}</div>
                                        <div className="absolute bottom-0 left-0 bg-green-500/50 text-xs px-2 py-1 rounded-tr-lg">
                                            {e.movieType || "Không rõ"}
                                        </div>
                                    </div>
                                    <h3 className="text-sm mt-2">{e.name}</h3>
                                </div>

                                {hoveredMovie?.id === e.id && (
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