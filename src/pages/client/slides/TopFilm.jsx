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
        img: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/phim_batman_16_ce1c39a238.png",
        image: "https://m.media-amazon.com/images/M/MV5BMmU5NGJlMzAtMGNmOC00YjJjLTgyMzUtNjAyYmE4Njg5YWMyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        eps: 3,
        tm: 2,
    },
    {
        name: "Đèn Âm Hồn",
        subtitle: "Đèn Âm Hồn",
        img: "https://mihanoi.vn/wp-content/uploads/2025/02/phim-thang-2-1.jpg",
        image: "https://upload.wikimedia.org/wikipedia/vi/4/48/Den_am_hon.jpg",
        eps: 766,
    },
    {
        name: "Sát Thủ Vô Cùng Cực",
        subtitle: "Extreme Hitman",
        img: "https://baodongnai.com.vn/file/e7837c02876411cd0187645a2551379f/032025/14_3_20250313155941.jpg",
        image: "https://upload.wikimedia.org/wikipedia/vi/9/9e/Poster_Phim_S%C3%A1t_th%E1%BB%A7_v%C3%B4_c%C3%B9ng_c%E1%BB%B1c.jpg",
        eps: 766,
    },
    {
        name: "Em và Trịnh",
        subtitle: "Me and Trinh",
        img: "https://i0.wp.com/bloganchoi.com/wp-content/uploads/2022/06/review-phim-em-va-trinh.jpg",
        image: "https://thanhnien.mediacdn.vn/Uploaded/nhuvnq/2022_06_17/284550373-370852648356152-3746905122681766979-n-3012.jpg",
        eps: 766,
    },
    {
        name: "Iron Man",
        subtitle: "Iron Man",
        img: "https://genk.mediacdn.vn/139269124445442048/2020/5/2/1-1588392976198193860775.png",
        image: "https://rukminim2.flixcart.com/image/704/844/xif0q/poster/h/x/w/medium-poster-design-no-3323-ironman-poster-ironman-posters-for-original-imaggbycsxynxhak.jpeg?q=90&crop=false",
        eps: 766,
    },
    {
        name: "Thor: Tình Yêu và Sấm Sét",
        subtitle: "Thor: Love and Thunder",
        img: "https://i.ytimg.com/vi/tWPC7OTOulg/maxresdefault.jpg",
        image: "https://upload.wikimedia.org/wikipedia/vi/3/3b/Thor_T%C3%ACnh_y%C3%AAu_v%C3%A0_s%E1%BA%A5m_s%C3%A9t_poster.jpeg",
        eps: 766,
    },
    {
        name: "Captain America: Nội Chiến Siêu Anh Hùng",
        subtitle: "Captain America: Civil War",
        img: "https://cdn.moveek.com/storage/media/cache/large/b4ac92a0251ee0dc1d6115ff5a606b5afd6d6e2c.jpg",
        image: "https://cdn.galaxycine.vn/media/c/i/civil-doc.jpg",
        eps: 766,
    },
    {
        name: "Trò Chơi Con Mực",
        subtitle: "Squid Game",
        img: "https://cdnphoto.dantri.com.vn/bBhBBV-kI8eDuSIm4r0y0LraXQg=/thumb_w/990/2021/11/08/tro-choi-con-mucdocx-1636311032517.png",
        image: "https://www.techsignin.com/wp-content/uploads/2021/08/netflix-poster-squid-game-tro-choi-con-muc.jpeg",
        eps: 766,
    },
    {
        name: "Ngôi Đền Kỳ Quái",
        subtitle: "Pee Nak",
        img: "https://img-zlr1.tv360.vn/image1/2025/03/05/17/1741168825547/1ef6665eeacd_640_360.jpg",
        image: "https://thegioidienanh.vn/stores/news_dataimages/thanhtan/052019/05/09/in_article/4938_image_58.jpg",
        eps: 766,
    },
    {
        name: "Black Panther: Wakanda Bất Diệt",
        subtitle: "Black Panther: Wakanda Forever",
        img: "https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/image/1800x/71252117777b696995f01934522c402d/b/l/black-panther-2-poster-1.jpg",
        image: "https://duyendangvietnam.net.vn/public/uploads/file1s/PV_Truc_Dao/trailerphimbaodenblackpanther12.jpg",
        eps: 766,
    },
];

export default function TopFilm() {
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
                        {movieData.map((e, idx) => (
                            <SwiperSlide
                                key={idx}
                                style={{ perspective: "1000px" }}
                            >
                                <div
                                    className="relative p-2 transform "

                                    onMouseEnter={(ev) => handleMouseEnter(e, idx, ev)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <img
                                        src={e.img}
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
                                        src={e.image}
                                        alt=""
                                        className="hidden md:block md:w-[90px] md:h-[130px] rounded-md absolute top-1/2 translate-y-1/3 left-0 translate-x-1/3 shadow-2xl"
                                    />
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
