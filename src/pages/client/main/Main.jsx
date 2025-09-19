import BannerSlide from "../slides/BannerSlide";
import MovieNetflix from "../slides/MovieNetflix";
import SectionSlide from "../slides/SectionSlide";
import TopFilm from "../slides/TopFilm";
import NewMovie from "../slides/NewMovie"
import TopSerie from "../slides/TopSerie"
import TopMovie from "../slides/TopMovie"
import { ContextMovies } from "../../../contexts/MovieProvider";
import { ContextCountries } from "../../../contexts/CountryProvider";
import { useContext } from "react";
import AnimeSlide from "../slides/AnimeSlide";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import SerieAnime from "../slides/SerieAnime";

function Main(props) {
    const movies = useContext(ContextMovies);
    const countries = useContext(ContextCountries);

    return (
        <div >
            <BannerSlide />
            <div className=" w-[380px] md:w-[800px] lg:w-[1220px] mx-auto ">
                <SectionSlide />
                <div className="space-y-10 p-6 bg-gray-800 from-gray-700 via-gray-700/30 to-gray-900 bg-gradient-to-b text-white w-full mt-5 rounded-2xl">
                    <NewMovie title={countries[3]?.name} data={movies.filter(e => e.country == countries[3].name)} />
                    <NewMovie title={countries[6]?.name} data={movies.filter(e => e.country == countries[6].name)} />
                    <NewMovie title={countries[0]?.name} data={movies.filter(e => e.country == countries[0].name)} />
                </div>
                <MovieNetflix />
                <TopSerie />
                <TopFilm />
                <TopMovie />
                <div className=" bg-green-700 from-green-300 via-gray-700/30 to-gray-900 bg-gradient-to-b p-4 rounded-2xl">
                    <div className="flex gap-4 items-center w-full rounded-t-2xl px-4 py-2 text-blue-900 ">
                        <div className="flex items-center">
                            <h1 className="font-bold text-base md:text-2xl lg:text-3xl ">Kho Tàng Anime Mới Nhất</h1>
                        </div>
                        <div className="flex items-center justify-center border rounded-2xl group p-1 transition-transform duration-150 active:scale-105">
                            <p className="hidden lg:group-hover:block">Xem thêm</p>
                            <MdOutlineKeyboardArrowRight />
                        </div>
                    </div>
                    <AnimeSlide />
                    <div className="p-4 rounded-2xl mt-10">
                        <SerieAnime />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;