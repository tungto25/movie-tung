import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Thumbs } from "swiper"; // Swiper 8
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { MdKeyboardArrowRight } from "react-icons/md";

const content = ["Marvel", "4K", "Sitcom", "Lồng Tiếng", "Xuyên Không", "Anime", "Cổ Trang", "Tiên Hiệp", "+4 chủ đề"];
const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-pink-500", "bg-yellow-500", "bg-indigo-500", "bg-orange-500", "bg-gray-600"];

function SectionSlide(props) {
    return (
        <div className=''>
            <h1 className='font-bold text-white text-sm md:text-lg lg:text-2xl'>Bạn đang quan tâm cái gì ?</h1>
            <Swiper
                modules={[Navigation]}
                breakpoints={{
                    // Mobile nhỏ
                    0: { slidesPerView: 2, spaceBetween: 1 },
                    // Mobile lớn
                    480: { slidesPerView: 3, spaceBetween: 0 },
                    // Tablet nhỏ
                    640: { slidesPerView: 4, spaceBetween: 0 },
                    // Tablet lớn
                    768: { slidesPerView: 4, spaceBetween: 1 },
                    // Laptop
                    1024: { slidesPerView: 5, spaceBetween: 1 },
                    // Desktop lớn
                    1280: { slidesPerView: 6, spaceBetween: 1 },
                }}
                spaceBetween={12}
            >
                {content.map((e, i) => (
                    <SwiperSlide className="mt-4 p-2">
                        <div className={`${colors[i % colors.length]} 
                        rounded-xl px-2 py-5 md:py-7 md:px-3 text-white transition-transform duration-200 ease-out hover:scale-102 hover:-translate-y-1`}>
                            <p className="text-lg md:text-xl font-bold">{e}</p>
                            <div className="text-[7px] md:text-sm flex items-center mt-4">
                                <span>Xem chủ đề</span>
                                <MdKeyboardArrowRight />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default SectionSlide;