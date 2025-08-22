import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const movies = [
  { id: 1, title: "Movie 1", poster: "https://static.nutscdn.com/vimg/400-0/5aa2ac6609882a1ecd6a8b9cc7b9b2db.jpg" },
  { id: 2, title: "Movie 2", poster: "https://static.nutscdn.com/vimg/400-0/06ee38c19440a773ac8f97f3018a1697.jpg" },
  { id: 3, title: "Movie 3", poster: "https://static.nutscdn.com/vimg/400-0/68f581b9dd359b7a70aeb64e76ab5ed5.jpg" },
  { id: 4, title: "Movie 4", poster: "https://static.nutscdn.com/vimg/400-0/b9b43745c5286ce94419405ebbcd4f48.jpg" },
  { id: 5, title: "Movie 5", poster: "https://static.nutscdn.com/vimg/400-0/f88962fb248e6ddf5d2f472ae09e1d3e.jpg" },
  { id: 6, title: "Movie 6", poster: "https://static.nutscdn.com/vimg/400-0/5aa2ac6609882a1ecd6a8b9cc7b9b2db.jpg" },
  { id: 7, title: "Movie 7", poster: "https://static.nutscdn.com/vimg/400-0/5aa2ac6609882a1ecd6a8b9cc7b9b2db.jpg" },
  { id: 8, title: "Movie 8", poster: "https://static.nutscdn.com/vimg/400-0/5aa2ac6609882a1ecd6a8b9cc7b9b2db.jpg" },
];

export default function MovieSlider() {
  return (
      <Swiper
                className=""
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={10} // Khoảng cách giữa các slide
                slidesPerView={2}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                breakpoints={{
                    640: { // Tablet (640px - 1023px)
                        slidesPerView: 3, // Hiển thị 3 hình trên tablet
                    },
                    1024: { // Desktop (>= 1024px)
                        slidesPerView: 5, // Hiển thị 5 hình trên desktop/laptop
                    },
                }}
            >
                {movies.map((element, index) => (
                    <SwiperSlide key={index} className="bg-black">
                        <div className="relative group">
                            <div className="overflow-hidden w-full h-full">
                                <img
                                    className="object-cover rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-110"
                                    src={element.poster}
                                    alt="#"
                                />
                            </div>
                            <div className=" absolute z-10 top-0 hidden group-hover:block">
                                <h1>sdfhdfsjfdh</h1>
                                <h1>cbksdjcdcdjk</h1>
                            </div>          
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
  );
}
