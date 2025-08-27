// MovieCarousel.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Thumbs } from "swiper"; // Swiper 8
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaHeart, FaPlay } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";
import { GoDotFill } from "react-icons/go";

import GradientText from "../../../components/client/GradientText";

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
    return (
        <div className="space-y-10 p-6 bg-gray-800 from-gray-700 via-gray-700/30 to-gray-900 bg-gradient-to-b text-white w-[96vw] m-auto mt-5 rounded-2xl ">
            {movieData.map((e, i) => (
                <div key={i} className="flex items-center gap-4">
                    <div className="flex flex-col items-start justify-start w-32">
                        <GradientText
                            animationSpeed={8}
                            showBorder={false}
                            className="custom-class text-2xl"
                        >
                            {e.category}
                        </GradientText>
                        <button className="text-sm text-gray-400 hover:underline mt-6 flex items-center">
                            <span>Xem toàn bộ</span> <MdOutlineKeyboardArrowRight />
                        </button>
                    </div>
                    <Swiper
                        modules={[Navigation]}
                        navigation
                        spaceBetween={12}
                        slidesPerView={5}
                        className="flex-1"
                    >
                        {e.movies.map((a, idx) => (
                            <SwiperSlide key={idx}>
                                <div className="relative group">
                                    <img
                                        src={a.img}
                                        alt={a.name}
                                        className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute top-2 left-2 text-xs flex gap-1">
                                        {a.eps && <span className="bg-gray-700 text-white px-1 rounded">PĐ. {a.eps}</span>}
                                        {a.tm && <span className="bg-green-600 text-white px-1 rounded">TM. {a.tm}</span>}
                                    </div>
                                    <div className="mt-2">
                                        <h3 className="text-sm font-semibold">{a.name}</h3>
                                        <p className="text-xs text-gray-400">{a.subtitle}</p>
                                    </div>
                                    <div className="hidden group-hover:block bg-gray-800 rounded-2xl w-fit absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
                                        <div className="relative w-full h-40 rounded-t-2xl overflow-hidden">
                                            <img src={a.img} alt={a.name} className="w-full h-full object-cover" />
                                            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-gray-800 to-transparent pointer-events-none"></div>
                                        </div>
                                        <div className='p-4'>
                                            <h1 className='text-xl mt-5'>{a.name}</h1>
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
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            ))}
        </div>
    );
}
