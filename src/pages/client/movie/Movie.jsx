import { useContext } from "react";
import { useState } from "react";
import { FaFilter, FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { ContextCountries } from "../../../contexts/CountryProvider";
import { ContextMovieTypes } from "../../../contexts/MovieTypeProvider";
import { ContextCategories } from "../../../contexts/CategoryProvider";
import { ContextMovies } from "../../../contexts/MovieProvider";

const version = ["Tất cả", "Phụ đề", "Lồng tiếng", "Thuyết minh"];
const type = ["Tất cả", "Phim lẻ", "phim bộ"];
function Movie(props) {
    const [openFilter, setOpenFilter] = useState(false);

    const [selected, setSelected] = useState({
        country: null,
        type: "Tất cả",
        category: null,
        version: "Tất cả",
        year: null,
    });

    const handleSelect = (key, value) => {
        setSelected(prev => ({
            ...prev,
            [key]: prev[key] === value ? null : value,
        }));
    };

    const countries = useContext(ContextCountries);
    const movieType = useContext(ContextMovieTypes);
    const categories = useContext(ContextCategories);
    const movies = useContext(ContextMovies);
    const [filteredMovies, setFilteredMovies] = useState(movies);

    const [page, setPage] = useState(1);
    const rowsPerPage = 18;

    // Phân trang
    const moviesPhimLe = filteredMovies.filter(f => f.movieType === "phim lẻ");
    const paginatedData = moviesPhimLe.slice((page - 1) * rowsPerPage, page * rowsPerPage);
    const totalPages = Math.ceil(moviesPhimLe.length / rowsPerPage);

    const handleFilter = () => {
        const filtered = movies.filter(movie => {
            return (
                (!selected.country || movie.country === selected.country) &&
                (selected.type === "Tất cả" || movie.movieType === selected.type) &&
                (!selected.category || movie.listCate.some(c => c.id === selected.category.id)) &&
                (selected.version === "Tất cả" || movie.version === selected.version) &&
                (!selected.year || movie.year === selected.year)
            );
        });
        setFilteredMovies(filtered);
        setPage(1);
    }

    return (
        <div className='mt-30 text-white p-5 relative'>
            <h1 className='font-bold text-2xl'>Phim lẻ</h1>
            <div className="relative mt-3">
                <div
                    onClick={() => setOpenFilter(!openFilter)}
                    className="inline-flex items-center gap-2 z-50 bg-gray-900 absolute pr-3 pb-1"
                >
                    <FaFilter className="text-yellow-500" />
                    <p>Bộ lọc</p>
                </div>
                {openFilter && (
                    <div className="border border-gray-500 rounded-lg top-4 whitespace-nowrap">
                        <div className="flex items-center gap-8 py-5 px-10">
                            <h1 className="w-[110px] text-end">Quốc gia:</h1>
                            <div className="flex items-center gap-5 ">
                                {countries.map(e => (
                                    <div
                                        onClick={() => handleSelect("country", e)}
                                        className={`${selected.country === e ? "text-yellow-500 border p-1.5 rounded-md" : ""}`}
                                    >
                                        {e.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="border-t-1 w-full border-dashed text-gray-500"></div>
                        <div className="flex items-center gap-8 py-5 px-10">
                            <h1 className="w-[110px] text-end">Loại phim:</h1>
                            <div className="flex items-center gap-5">
                                {type.map(e => (
                                    <div
                                        onClick={() => handleSelect("type", e)}
                                        className={`${selected.type === e ? "text-yellow-500 border p-1.5 rounded-md" : ""}`}
                                    >
                                        {e}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="border-t-1 w-full border-dashed text-gray-500"></div>
                        <div className="flex items-start gap-8 py-5 px-10">
                            <h1 className="w-[110px] shrink-0 text-end">Thể loại:</h1>
                            <div className="flex items-center gap-5 flex-wrap justify-start">
                                {categories.map(e => (
                                    <div
                                        onClick={() => handleSelect("category", e)}
                                        className={`${selected.category === e ? "text-yellow-500 border p-1.5 rounded-md" : ""}`}
                                    >
                                        {e.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="border-t-1 w-full border-dashed text-gray-500"></div>
                        <div className="flex items-center gap-8 py-5 px-10">
                            <h1 className="w-[110px] text-end">Phiên bản:</h1>
                            <div className="flex items-center gap-5">
                                {version.map(e => (
                                    <div
                                        onClick={() => handleSelect("version", e)}
                                        className={`${selected.version === e ? "text-yellow-500 border p-1.5 rounded-md" : ""}`}
                                    >
                                        {e}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="border-t-1 w-full border-dashed text-gray-500"></div>
                        <div className="flex items-center gap-8 py-5 px-10">
                            <h1 className="w-[110px] text-end mb-auto">Năm sản xuất:</h1>
                            <div className="flex items-center gap-5 flex-wrap">
                                {[...new Set(movies.map(e => e.year))]
                                    .sort((a, b) => a - b)
                                    .map(year => (
                                        <div
                                            onClick={() => handleSelect("year", year)}
                                            className={`${selected.year === year ? "text-yellow-500 border p-1.5 rounded-md" : ""}`}
                                        >
                                            {year}
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <button
                            onClick={handleFilter}
                            className="rounded-full px-8 py-2 gap-2 bg-yellow-500 my-3 ms-40
                                                flex items-center justify-center shadow-lg transition-transform duration-100
                                                active:scale-95 active:shadow-[0_0_10px_3px_rgba(249,215,87)]">
                            Lọc kết quả
                        </button>
                    </div>
                )}
            </div>
            <div className="grid grid-cols-6 gap-2 mt-15">
                {paginatedData.map((e, i) => (
                    <div className="relative" key={i}>
                        <img
                            src={e?.imgUrl}
                            alt={e?.name}
                            className="rounded-lg hover:scale-102 w-40 h-60 object-cover"
                        />
                        <h3
                            className="text-center mt-2 truncate hover:overflow-visible hover:whitespace-normal hover:text-white hover:rounded p-1 transition-all duration-200"
                            title={e?.name}
                        >
                            {e.name}
                        </h3>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-center gap-3 mt-5">
                {/* Nút Prev */}
                <button
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 transition"
                >
                    <FaLongArrowAltLeft />
                </button>

                {/* Input số trang */}
                <div className="flex items-center bg-gray-800 rounded px-3 py-2 gap-2">
                    <span>Trang</span>
                    <input
                        type="number"
                        min={1}
                        max={totalPages}
                        value={page}
                        onChange={(e) => {
                            const val = Number(e.target.value);
                            if (val >= 1 && val <= totalPages) setPage(val);
                        }}
                        className="w-12 text-center bg-gray-700 rounded border-none focus:ring-0"
                    />
                    <span>/ {totalPages}</span>
                </div>

                {/* Nút Next */}
                <button
                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                    className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 transition"
                >
                    <FaLongArrowAltRight />
                </button>
            </div>
        </div>
    );
}

export default Movie;