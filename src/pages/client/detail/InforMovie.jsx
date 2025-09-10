import { IoMdCheckmarkCircleOutline } from "react-icons/io";

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
function InforMovie({ movieShow }) {
    return (
        <div className="text-white w-[35%] p-2">
            <img
                src={movieShow?.imgUrl}
                alt=""
                className="w-[150px] h-[210px] object-cover rounded-md"
            />
            <h1 className="text-2xl mt-2">{movieShow?.name}</h1>
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

        </div>
    );
}

export default InforMovie;