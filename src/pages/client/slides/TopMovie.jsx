import { FaHeart, FaPlay } from 'react-icons/fa';
import CircularGallery from '../../../components/client/Circular Gallery';
import { IoIosInformationCircle } from 'react-icons/io';
import { GoDotFill } from 'react-icons/go';


export default function TopMoviesCarousel() {
    const items = [
        { image: "https://i.ytimg.com/vi/Thb4rBHK2Bw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDNF94cDRa8BS206erLIhzdAVIOHQ", text: "Ám Dạ Tuần Sứ" },
        { image: "https://bazaarvietnam.vn/wp-content/uploads/2022/03/Harpers-Bazaar-Phim-chieu-rap-thang-4-2022-BATMAN-scaled.jpg", text: "Batman" },
        { image: "https://m.yodycdn.com/blog/mv5by2exmdiwyzatowe4ys00zthkltk1mdqtztq4yjvinznlodk5xkeyxkfqcgdeqxvyndc0njc1nty-compressed.jpg", text: "Bố Già" },
        { image: "https://image.plo.vn/w1000/Uploaded/2025/vocgmvpi/2025_02_27/le-duong-bao-lam-3812-6159.jpg.webp", text: "Sát Thủ Vô Cùng Cực" },
        { image: "https://cmsposter.cdn.mytvnet.vn/vimages/25/5c/ce/e8/81/1e/25ce8-p1emvatrinhvoinhungcauchuyentinhyeutuoitretrongsangdepdenhungdaytiecnuoijpeg-unkn-unkn.jpeg", text: "Em và Trịnh" },
        { image: "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/4/15/1034450/Peenak3-Main_Poster_.jpg", text: " Ngôi Đền Kỳ Quái" },

    ];
    return (
        <div className="p-6 bg-gray-900 text-white rounded-2xl">
            <h2 className="text-xl font-bold mb-4">Top 10 phim lẻ hôm nay</h2>
            <div style={{ height: '600px', position: 'relative' }} className='group'>
                <CircularGallery
                    items={items}
                    bend={3}
                    textColor="#ffffff"
                    borderRadius={0.05}
                    scrollEase={0.02}
                    scrollSpeed={2}
                    font="bold 30px Figtree"
                />
                {items.map(a => (
                    <div className="hidden group-hover:block bg-gray-800 rounded-2xl w-fit absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
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
                ))}
            </div>
        </div>
    );
}
