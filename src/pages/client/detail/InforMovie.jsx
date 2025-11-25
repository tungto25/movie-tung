import { useContext } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { ContextMovies } from "../../../contexts/MovieProvider";
import { useParams } from "react-router-dom";
import { getOjectById } from "../../../services/reponsitory";
import { ContextCharacters } from "../../../contexts/CharacterProvider";
import { ContextActors } from "../../../contexts/ActorProvider";
import { ContextSections } from "../../../contexts/SectionProvider";
import { ContextAuthors } from "../../../contexts/AuthorProvider";
import { ContextCategories } from "../../../contexts/CategoryProvider";
import { ContextPlans } from "../../../contexts/PlanProvider";


function InforMovie({ movieShow }) {

    const characters = useContext(ContextCharacters);
    const actors = useContext(ContextActors);
    const authors = useContext(ContextAuthors);
    const sections = useContext(ContextSections);
    const categories = useContext(ContextCategories);
    const plans = useContext(ContextPlans)
    const movies = useContext(ContextMovies)
    return (
        <div className="text-white p-2">
            <div className="relative w-[150px] h-[210px]">
                <img
                    src={movieShow?.imgUrl}
                    alt=""
                    className="w-full h-full object-cover rounded-md"
                />
                <div className=" bg-red-500/50 text-white text-center rounded flex items-center p-1 absolute top-0">{getOjectById(plans, movieShow?.plan)?.title}</div>
            </div>
            <h1 className="text-2xl mt-2">{movieShow?.name}</h1>
            <div className="flex item-center gap-3 mt-5">
                <div className="flex items-center gap-2 flex-wrap">
                    {sections.filter(e => e.movieId === movieShow?.id).sort((a, b) => a.season - b.season).map(e => (
                        <div key={e.id} className="bg-white border text-black text-center rounded p-1">
                            Phần {e.season}
                        </div>
                    ))}
                </div>


            </div>
            <div className="flex items-center gap-2 mt-2  whitespace-nowrap flex-wrap">
                {movieShow?.listCate?.map((e, i) => (
                    <div className="bg-white/20 text-center rounded p-1">{getOjectById(categories, e)?.name}</div>
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
                                        src={getOjectById(actors, e)?.imgUrl || "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png"}
                                        alt={getOjectById(actors, e)?.name}
                                        className="w-20 h-20 object-cover rounded-full"
                                        onError={(e) => e.currentTarget.src = "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png"}
                                    />
                                    <p>{getOjectById(actors, e)?.name}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-3 mt-3 flex-wrap">
                            {movieShow?.listCharacter?.map((e, i) => (
                                <div key={i} className="flex justify-center items-center flex-col gap-2">
                                    <img
                                        src={getOjectById(characters, e)?.imgUrl || "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png"}
                                        alt={getOjectById(characters, e)?.name}
                                        className="w-20 h-20 object-cover rounded-full"
                                        onError={(e) => e.currentTarget.src = "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png"}
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