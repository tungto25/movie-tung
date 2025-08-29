
import { FaHeart, FaPlay } from 'react-icons/fa';
import CircularGallery from '../../../components/client/Circular Gallery';
import { IoIosInformationCircle } from 'react-icons/io';
import { GoDotFill } from 'react-icons/go';
import { useState } from "react";

const items = [
    { image: "https://vcdn1-giaitri.vnecdn.net/2025/03/29/ngoi-sao-adolescence-owen-coop-6078-1541-1743219937.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=jivpOweXrGf6Lt8RyukBzg", text: "Adolescence" },
    { image: "https://static01.nyt.com/images/2025/04/13/fashion/10PITT-FANDOM-01-wljh/10PITT-FANDOM-01-wljh-articleLarge.jpg?quality=75&auto=webp&disable=upscale", text: "The Pitt" },
    { image: "https://m.media-amazon.com/images/M/MV5BMWVlODM4YmYtMThjZC00YjkxLThjZjYtOTYxNzgzM2YwNGM3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", text: "The Legend of Zang Hai" },
    { image: "https://cdn.tienphong.vn/images/e0d1b23c321a0919e24693a0d86fb2708f79570d4a8d585d1df6b99a5138d77de1e388df77a9331a886f4d408a7fe16c8268a294256761743e489c0bb3950aa1a1b63793f54f7b0eb78af4f6afda3eef86851b216559226a6a34940d2254e183d5928268ec0a9f46e33da6f9301ef95b/mv5bodvlyjy0yjutzmvlys00y2rilwiyzmutodrjnji3zmqzmzlkxkeyxkfqcgc-v1.jpg", text: "S Line" },
    { image: "https://m.media-amazon.com/images/M/MV5BNGRhZjkxNmMtMGI0Ny00N2M1LTkzM2ItNzg2YWIwYjcwNzE0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", text: "The First Frost" },
    { image: "https://i1-vnexpress.vnecdn.net/2025/04/24/karma-1745493969.jpg?w=330&h=495&q=100&dpr=1&fit=crop&s=ljVU4YPLhEigJnZ2rYKhqw", text: " Karma" },

];
export default function TopSeries() {

    const [hoveredItem, setHoveredItem] = useState(null);

    return (
        <div className="p-6 text-white rounded-2xl w-[96%] m-auto">
            <h2 className="text-3xl font-bold mb-4 ">Top 10 phim bộ hôm nay</h2>
            <div className='group h-[600px] relative'>
                <CircularGallery
                    items={items}
                    bend={3}
                    textColor="#ffffff"
                    borderRadius={0.05}
                    scrollEase={0.02}
                    scrollSpeed={2}
                    font="bold 30px Figtree"
                />
                {/* {items.map(a => (
                    <div
                        className="hidden group-hover:block bg-gray-800 rounded-2xl w-fit absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
                    >
                        <div className="relative w-full h-40 rounded-t-2xl overflow-hidden">
                            <img src={a.image} alt={a.name} className="w-full h-full object-cover" />
                            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-gray-800 to-transparent pointer-events-none"></div>
                        </div>
                        <div className='p-4'>
                            <h1 className='text-xl mt-5'>{a.text}</h1>
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
                ))} */}
            </div>
        </div>
    );
}
