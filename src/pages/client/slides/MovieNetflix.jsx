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

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";

// Kích hoạt module
SwiperCore.use([Navigation, Thumbs]);

const movieData = [
    {
        name: "Batman",
        subtitle: "Batman",
        img: "https://upload.wikimedia.org/wikipedia/vi/0/07/Batman_2022_CGV.jpg",
        eps: 3,
        tm: 2,
    },
    {
        name: "Thử Thách Thần Tượng",
        subtitle: "Dad, I'm Here",
        img: "https://i1-vnexpress.vnecdn.net/2022/03/17/the-godfather-1647495803.jpg?w=330&h=495&q=100&dpr=1&fit=crop&s=TCzVG9srALYqau5YfoBkpA",
        eps: 766,
    },
    {
        name: "Sát Thủ Vô Cùng Cực",
        subtitle: "Extreme Hitman",
        img: "https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/image/c5f0a1eff4c394a251036189ccddaacd/h/i/hit2-dub_poster-layered.jpg",
        eps: 766,
    },
    {
        name: "Em và Trịnh",
        subtitle: "Me and Trinh",
        img: "https://thanhnien.mediacdn.vn/Uploaded/nhuvnq/2022_06_17/284550373-370852648356152-3746905122681766979-n-3012.jpg",
        eps: 766,
    },
    {
        name: "Iron Man",
        subtitle: "Iron Man",
        img: "https://upload.wikimedia.org/wikipedia/en/0/02/Iron_Man_%282008_film%29_poster.jpg",
        eps: 766,
    },
    {
        name: "Thor: Tình Yêu và Sấm Sét",
        subtitle: "Thor: Love and Thunder",
        img: "https://upload.wikimedia.org/wikipedia/en/thumb/8/88/Thor_Love_and_Thunder_poster.jpeg/250px-Thor_Love_and_Thunder_poster.jpeg",
        eps: 766,
    },
    {
        name: "Captain America: Nội Chiến Siêu Anh Hùng",
        subtitle: "Captain America: Civil War",
        img: "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_FMjpg_UX1000_.jpg",
        eps: 766,
    },
    {
        name: "Trò Chơi Con Mực",
        subtitle: "Squid Game",
        img: "https://dnm.nflximg.net/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABWkngpyoPyufx7E05fGiyFFqYg2ONU0HEfKa6zBKeLy7sTlnBzCDw3PxBsl2fCTUoWegGBHIgPfN37sL8sOzlo1uSenk16JXbKVQEfCMYLnqyjHfnZ9zX7h5UMmjA3n_heFPfQ.jpg?r=609",
        eps: 766,
    },
    {
        name: "Ngôi Đền Kỳ Quái",
        subtitle: "Pee Nak",
        img: "https://m.media-amazon.com/images/M/MV5BMzg1NDBmYzQtN2I5Mi00NzYxLThkMmItZThjM2Q0NDNiM2M3XkEyXkFqcGc@._V1_.jpg",
        eps: 766,
    },
    {
        name: "Black Panther: Wakanda Bất Diệt",
        subtitle: "Black Panther: Wakanda Forever",
        img: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Black_Panther_Wakanda_Forever_poster.jpg/250px-Black_Panther_Wakanda_Forever_poster.jpg",
        eps: 766,
    },
];

export default function MovieNetflix() {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [hoveredMovie, setHoveredMovie] = useState(null);
    const openTimer = useRef(null);
    const closeTimer = useRef(null);

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
        <div className="space-y-10 text-white m-auto mt-5 rounded-2xl  w-[96%]
         bg-red-700 from-red-300 via-gray-700/30 to-gray-900 bg-gradient-to-b">
            <div className="flex gap-4 items-center w-full rounded-t-2xl px-4 py-2">
                <div className="flex items-center">
                    <h1 className="font-bold text-base md:text-2xl lg:text-3xl">Phim hot</h1>
                    <img
                        src="public/images/original-26e501e97684a115bfff294.png"
                        alt=""
                        className="w-15"
                    />
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
                        {movieData.map((e, idx) => (
                            <SwiperSlide
                                key={idx}

                            >
                                <div
                                    className="relative"
                                    onMouseEnter={(ev) => handleMouseEnter(e, idx, ev)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <img
                                        src={e.img}
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
                                                src={hoveredMovie.movie.img}
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
