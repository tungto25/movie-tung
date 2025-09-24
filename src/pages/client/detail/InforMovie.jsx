import { useContext } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { ContextMovies } from "../../../contexts/MovieProvider";
import { useParams } from "react-router-dom";
import { getOjectById } from "../../../services/reponsitory";
import { ContextCharacters } from "../../../contexts/CharacterProvider";
import { ContextActors } from "../../../contexts/ActorProvider";
import { ContextSections } from "../../../contexts/SectionProvider";
import { ContextAuthors } from "../../../contexts/AuthorProvider";


function InforMovie({ movieShow }) {
    const characters = useContext(ContextCharacters);
    const actors = useContext(ContextActors);
    const authors = useContext(ContextAuthors);
    const sections = useContext(ContextSections);
    return (
        <div className="text-white p-2">
            <img
                src={movieShow?.imgUrl}
                alt=""
                className="w-[150px] h-[210px] object-cover rounded-md"
            />
            <h1 className="text-2xl mt-2">{movieShow?.name}</h1>
            <div className="flex items-center gap-2 mt-5">
                {sections.map(e => (
                    <div className="bg-white border text-black text-center rounded p-1">Phần {e.season}</div>
                ))}
            </div>
            <div className="flex items-center gap-2 mt-2">
                {movieShow?.listCate?.map((e, i) => (
                    <div className="bg-white/20 text-center rounded p-1">{e}</div>
                ))}
            </div>
            <div className="bg-green-500/20 rounded-full px-5 py-2 w-fit mt-4 text-yellow-600 flex items-center gap-2">
                <IoMdCheckmarkCircleOutline />
                <p>Đã Chiếu</p>
            </div>
            <div className="mt-3">
                <h1 className="text-xl">Giới thiệu</h1>
                <p className="text-gray-500">
                    {movieShow?.description}
                </p>
            </div>
            <div className="flex items-center gap-2 mt-3">
                <h1>Thời lượng:</h1>
                <p>{movieShow?.duration}</p>
            </div>
            <div className="flex items-center gap-2 mt-3">
                <h1 >Quốc gia:</h1>
                <p>{movieShow?.country}</p>
            </div>
            <div className="flex items-center gap-2 mt-3">
                <h1 >Networks:</h1>
                <p>{getOjectById(authors, movieShow?.author)?.name}</p>
            </div>
            <div className="flex items-center gap-2 mt-3">
                <h1 >Sản xuất:</h1>
                <p>{getOjectById(authors, movieShow?.author)?.name}</p>
            </div>
            <div className="flex items-center gap-2 mt-3">
                <h1 >Đạo diễn:</h1>
                <p>{getOjectById(authors, movieShow?.author)?.name}</p>
            </div>
            <div className="mt-4">
                <h1 >Diễn viên</h1>
                <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center gap-3 mt-3">
                            {movieShow?.listActor?.map((e, i) => (
                                <div key={i} className="flex justify-center items-center flex-col gap-2">
                                    <img
                                        src=""
                                        alt={getOjectById(actors, e)?.imgUrl}
                                        className="w-20 h-20 object-cover rounded-full"
                                    />
                                    <p>{getOjectById(actors, e)?.name}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-3 mt-3">
                            {movieShow?.listCharacter?.map((e, i) => (
                                <div key={i} className="flex justify-center items-center flex-col gap-2">
                                    <img
                                        src={getOjectById(characters, e)?.imgUrl}
                                        alt={e.name}
                                        className="w-20 h-20 object-cover rounded-full"
                                    />
                                    <p>{getOjectById(characters, e)?.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default InforMovie;