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

function Main(props) {
     const movies = useContext(ContextMovies);
     const countries = useContext(ContextCountries);

    return (
        <div>
            <BannerSlide />
            <SectionSlide />
            <NewMovie title={countries[4]?.name} data={movies.filter(e => e.country == countries[4].id)} />
            <NewMovie title={countries[3]?.name} data={movies.filter(e => e.country == countries[3].id)} />
            <MovieNetflix />
            <TopSerie />
            <TopFilm />
            <TopMovie />
        </div>
    );
}

export default Main;