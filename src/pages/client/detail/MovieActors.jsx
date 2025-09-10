import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Thumbs } from "swiper"; // Swiper 8
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { MdArrowForwardIos, MdOutlineArrowBackIos, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useRef } from "react";

const cast = [
    {
        actorName: "Robert Downey Jr.",
        characterName: "Tony Stark / Iron Man",
        image: "https://resizing.flixster.com/ow9yFonG_bqWdnu8JA9NxsO2xl8=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/67369_v9_bd.jpg"
    },
    {
        actorName: "Chris Evans",
        characterName: "Steve Rogers / Captain America",
        image: "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcSIhw2uVbWhTmCjGa2YuIUal7luSe9M_qGnj82mIiXu7FW15aFnieJLOBOWxxVz7LkxSr1AIgDrM2aPIXQ"
    },
    {
        actorName: "Scarlett Johansson",
        characterName: "Natasha Romanoff / Black Widow",
        image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTAs2SHdshQeEUvevwUzJQ1KVlWzQHj3mgGwLmX3UDwL0j2wpOEF-kkdmukSXvZRlk1iqx5ilgEehQoEfXZcx5Mg4kDKp7lWJK05vhbxWg"
    },
    {
        actorName: "Chris Hemsworth",
        characterName: "Thor",
        image: "https://resizing.flixster.com/RyMVge-LRF7p-UXqXHXdq3Y_Z3U=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/GNLZZGG002293R9.jpg"
    },
    {
        actorName: "Mark Ruffalo",
        characterName: "Bruce Banner / Hulk",
        image: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcSTnUoIMu_wxKjPNFEBmUZKMj1KsE9rphjKa97LCJ1TOjJi5Cfq2TQJJPeFfQJPzwqAAHoN5JFvKeiBzvg"
    },
    {
        actorName: "Tom Hiddleston",
        characterName: "Loki",
        image: "https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcQyl_5r_-N0J3XokqiNssikEFxMp5L3pXAghm87o3l3xUuVr-r3EItJnl8NgXCl1AydjzdhnFhbS_BRm8E"
    }
];
function MovieActors(props) {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    return (
        <>
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
                className="w-full max-w-[800px] mx-auto"
            >
                {cast.map((e, idx) => (
                    <SwiperSlide
                        key={idx}

                    >
                        <div className="mt-5 rounded-xl relative h-[330px]">
                            <img
                                src={e.image}
                                alt=""
                                className="w-80 h-70 rounded-t-xl object-cover"
                            />
                            <div className="absolute z-10 bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gray-900 to-transparent"></div>
                            <p className="absolute text-center whitespace-nowrap bottom-7 -translate-y-7 left-1/2 -translate-x-1/2 z-20">{e.actorName}</p>
                            <p className="absolute text-center text-[rgb(200,145,151)] z-30 left-1/2 -translate-x-1/2">{e.characterName}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
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
        </>
    );
}

export default MovieActors;