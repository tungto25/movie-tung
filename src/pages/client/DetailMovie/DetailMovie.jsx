import { FaPlay } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { PiShootingStarBold } from "react-icons/pi";
import { FaHeart } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { FaShare } from "react-icons/fa";
import { BiSolidCommentDetail } from "react-icons/bi";

const actor = [
    {
        name: "Sam Worthington",
        img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR4NZrfjLuXKzWv2fTCnmo_CXtXPHA7yQfHYA9Q80M1hJvwRkPhxliBh6J7hj-urMDxh0Gj5SbpoxCvhjawxT5m9V399pB8gYyS4cM87A"
    },
    {
        name: "Zoe Saldaña",
        img: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTXjYizU8iPr28znx-4JVG3h2GqdP1NKIypVFrBdcc9K4oxYXfVw4EWciK0I1h6DFjJAnwETLTbf2Da9cXlipUMH9dI45UqHDtnqzgxVw"
    },
    {
        name: "Stephen Lang",
        img: "https://i.redd.it/have-yall-appreciate-col-miles-stephen-lang-lately-dudes-72-v0-z9iat14tx0od1.jpg?width=452&format=pjpg&auto=webp&s=53024cc02ba4c46384fb7a66135d9b2af0d9bf39"
    },
]
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
function DetailMovie(props) {
    return (
        <div>
            <div className="w-full">
                <img
                    src="https://cdnmedia.baotintuc.vn/Upload/DmtgOUlHWBO5POIHzIwr1A/files/2022/12/26/review-avatar-2-26122022.jpg"
                    alt=""
                    className="w-full h-auto ma object-contain"
                />
                <div className="p-5 flex ">
                    <div className="text-white w-1/3">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/vi/e/e0/Avatar_D%C3%B2ng_ch%E1%BA%A3y_c%E1%BB%A7a_n%C6%B0%E1%BB%9Bc_-_Poster_ch%C3%ADnh_th%E1%BB%A9c.jpg"
                            alt=""
                            className="w-[150px] h-auto object-contain rounded-md"
                        />
                        <h1 className="text-2xl mt-2">Avatar</h1>
                        <p className="text-yellow-400">Avatar</p>
                        <div className="flex items-center gap-2 mt-5">
                            <div className="bg-white text-black text-center rounded p-1">Phần 1</div>
                            <div className="border text-center rounded p-1">Phần 2</div>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="bg-white/20 text-center rounded p-1">Hành Động</div>
                            <div className="bg-white/20 text-center rounded p-1">Viễn Tưởng</div>
                            <div className="bg-white/20 text-center rounded p-1">Phiêu lưu</div>
                            <div className="bg-white/20 text-center rounded p-1">Khoa học</div>
                        </div>
                        <div className="bg-green-500/20 rounded-full px-5 py-2 w-fit mt-4 text-yellow-600 flex items-center gap-2">
                            <IoMdCheckmarkCircleOutline />
                            <p>Đã Chiếu</p>
                        </div>
                        <div className="mt-3">
                            <h1 className="text-xl">Giới thiệu</h1>
                            <p className="text-gray-500">
                                Avatar: Dòng chảy của nước (tựa gốc tiếng Anh: Avatar: The Way of Water)
                                là một bộ phim khoa học viễn tưởng sử thi của Mỹ năm 2022 do James Cameron
                                đạo diễn, người đồng viết kịch bản với Rick Jaffa và Amanda Silver từ một
                                câu chuyện mà bộ ba viết cùng Josh Friedman và Shane Salerno.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                            <h1 className="text-xl">Thời lượng:</h1>
                            <p>3h20m</p>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                            <h1 className="text-xl">Quốc gia:</h1>
                            <p>Hoa Kỳ</p>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                            <h1 className="text-xl">Networks:</h1>
                            <p>James Cameron</p>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                            <h1 className="text-xl">Sản xuất:</h1>
                            <p>James Cameron</p>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                            <h1 className="text-xl">Đạo diễn:</h1>
                            <p>James Cameron</p>
                        </div>
                        <div className="mt-4">
                            <h1 className="text-xl">Diễn viên</h1>
                            <div className="flex items-center gap-3 mt-3">
                                {actor.map((e, i) => (
                                    <div className="flex justify-center items-center flex-col gap-2">
                                        <img
                                            src={e.img}
                                            alt=""
                                            className="w-20 h-20 object-cover rounded-full"
                                        />
                                        <p>{e.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-6">
                            <div className="flex items-center gap-2 text-2xl">
                                <PiShootingStarBold />
                                <p>Top Phim Tuần Này</p>
                            </div>
                            {movieData.map((e, i) => (
                                <div className="flex items-center gap-3 mt-4">
                                    <div className="text-center">
                                        <p class="text-7xl font-bold text-transparent [-webkit-text-stroke:2px_white]">
                                            {i + 1}
                                        </p>
                                    </div>
                                    <div className="bg-gray-500/20 flex items-center rounded-xl">
                                        <img
                                            src={e.img}
                                            alt=""
                                            className="w-[80px] h-auto object-cover rounded-xl"
                                        />
                                        <div className="p-3">
                                            <p className="whitespace-nowrap">{e.name}</p>
                                            <p className="text-xs text-gray-500 whitespace-nowrap">{e.subtitle}</p>
                                            <div className='flex items-center gap-2 mt-4 text-xs whitespace-nowrap'>
                                                <div className='flex items-center bg-white text-black rounded-md px-3 py-1 font-bold'>
                                                    T16
                                                </div>
                                                <div className='flex items-center bg-gray-400/30 text-white rounded-md px-3 py-1 font-bold'>
                                                    Phần 1
                                                </div>
                                                <div className='flex items-center bg-gray-400/30 text-white rounded-md px-3 py-1 font-bold'>
                                                    Phần 2
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 ">
                        <div className="flex items-center justify-between w-full">
                            <button
                                type="button"
                                className="rounded-full px-5 py-3 gap-2 bg-gradient-to-l from-yellow-500 to-yellow-200 flex items-center justify-center shadow-lg transition-transform duration-100 active:scale-95"
                            >
                                <FaPlay className="text-sm text-black" />
                                <span className="whitespace-nowrap">Xem ngay</span>
                            </button>
                            <div className="text-white whitespace-nowrap flex flex-col items-center gap-1">
                                <FaHeart />
                                <p>Yêu thích</p>
                            </div>
                            <div className="text-white whitespace-nowrap flex flex-col items-center gap-1">
                                <IoMdAdd />
                                <p>Thêm vào</p>
                            </div>
                            <div className="text-white whitespace-nowrap flex flex-col items-center gap-1">
                                <FaShare />
                                <p>Chia sẻ</p>
                            </div>
                            <div className="text-white whitespace-nowrap flex flex-col items-center gap-1">
                                <BiSolidCommentDetail />
                                <p>Bình luận</p>
                            </div>
                            <div className="rounded-full px-3 py-1 text-white bg-blue-800 whitespace-nowrap gap-2 flex items-center">
                                9.0
                                <span className="text-xs">Đánh giá</span>
                            </div>
                        </div>
                        <div className="text-white mt-8  flex items-center gap-5 text-lg border-b-1">
                            <p className="hover:text-yellow-500">
                                Tập Phim
                            </p>
                            <p className="hover:text-yellow-500">
                                Gallery
                            </p>
                            <p className="hover:text-yellow-500">
                                Diễn viên
                            </p>
                            <p className="hover:text-yellow-500">
                                Đề xuất
                            </p>
                        </div>
                        <div className="text-white mt-4">
                            tập phim
                        </div>
                        <div className="mt-8">
                            <div className="flex items-center text-white text-2xl gap-2 ">
                                <BiSolidCommentDetail />
                                <p>Bình luận (50)</p>
                                <div className="border flex items-center rounded-lg text-sm">
                                    <p className="rounded-lg bg-white text-black p-1">Bình Luận</p>
                                    <p className="p-1">Đánh giá</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailMovie;