import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { FaPlay, FaHeart } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";
import { GoDotFill } from "react-icons/go";

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

function Recommend() {
    const [hoveredMovie, setHoveredMovie] = useState(null);
    const openTimer = useRef(null);
    const closeTimer = useRef(null);

    const handleMouseEnter = (movie, i, e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        clearTimeout(closeTimer.current);
        clearTimeout(openTimer.current);
        openTimer.current = setTimeout(() => {
            setHoveredMovie({ movie, i, rect });
        }, 700);
    };

    const handleMouseLeave = () => {
        clearTimeout(openTimer.current);
        clearTimeout(closeTimer.current);
        closeTimer.current = setTimeout(() => setHoveredMovie(null), 150);
    };

    return (
        <div className="mt-5">
            <p className="text-lg">Có thể bạn sẽ thích</p>
            <div className="flex flex-wrap items-center gap-3 pb-20 pt-5">
                {movieData.map((e, i) => (
                    <div
                        key={i}
                        onMouseEnter={(ev) => handleMouseEnter(e, i, ev)}
                        onMouseLeave={handleMouseLeave}
                        className="h-[230px]"
                    >
                        <img src={e.img} alt="" className="h-[180px] w-[130px] rounded-xl"/>
                        <div className="text-center max-w-[130px]">
                            <p className="text-sm">{e.name}</p>
                            <p className="text-xs">{e.subtitle}</p>
                        </div>

                        {hoveredMovie?.i === i &&
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
                                        <h1 className="text-lg font-semibold">
                                            {hoveredMovie.movie.name}
                                        </h1>
                                        <div className="flex items-center gap-2 mt-5">
                                            <button className="px-4 py-2 bg-yellow-500 flex items-center rounded-lg text-sm gap-2 text-black">
                                                <FaPlay />
                                                <span className="whitespace-nowrap">Xem ngay</span>
                                            </button>
                                            <div className="flex items-center rounded-lg border px-4 py-2 text-sm gap-2">
                                                <FaHeart />
                                                <span>Thích</span>
                                            </div>
                                            <div className="flex items-center rounded-lg border px-4 py-2 text-sm gap-2">
                                                <IoIosInformationCircle />
                                                <span className="whitespace-nowrap">Chi tiết</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 mt-4 text-xs">
                                            <div className="flex items-center bg-white text-black rounded-md px-3 py-1 font-bold">
                                                T16
                                            </div>
                                            <div className="flex items-center bg-gray-400/30 text-white rounded-md px-3 py-1 font-bold">
                                                2025
                                            </div>
                                            <div className="flex items-center bg-gray-400/30 text-white rounded-md px-3 py-1 font-bold">
                                                Phần 1
                                            </div>
                                            <div className="flex items-center bg-gray-400/30 text-white rounded-md px-3 py-1 font-bold">
                                                Phần 2
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 my-4">
                                            <p>Hoàng cung</p>
                                            <span className="text-xs">
                                                <GoDotFill />
                                            </span>
                                            <p>Tình cảm</p>
                                            <span className="text-xs">
                                                <GoDotFill />
                                            </span>
                                            <p>Hài</p>
                                            <span className="text-xs">
                                                <GoDotFill />
                                            </span>
                                            <p>Kỳ ảo</p>
                                        </div>
                                    </div>
                                </motion.div>,
                                document.body
                            )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Recommend;
