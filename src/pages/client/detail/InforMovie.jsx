import { useContext } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { ContextMovies } from "../../../contexts/MovieProvider";
import { useParams } from "react-router-dom";


function InforMovie({ movieShow }) {
    const movies = useContext(ContextMovies);
    const { id } = useParams();
    const movie = movies.find(m => m.id === id);
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
                    <div className="flex items-center gap-3 mt-3">
                        {movie?.listActor && (
                            <div className="flex items-center gap-3 mt-3">
                                {movie.listActor.map((e, i) => (
                                    <div key={i} className="flex justify-center items-center flex-col gap-2">
                                        <img
                                            src={e.imgUrl}
                                            alt={e.name}
                                            className="w-20 h-20 object-cover rounded-full"
                                        />
                                        <p>{e.name}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                        {movie?.listCharacter && (
                            <div className="flex items-center gap-3 mt-3">
                                {movie.listCharacter.map((e, i) => (
                                    <div key={i} className="flex justify-center items-center flex-col gap-2">
                                        <img
                                            src={e.imgUrl}
                                            alt={e.name}
                                            className="w-20 h-20 object-cover rounded-full"
                                        />
                                        <p>{e.name}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default InforMovie;