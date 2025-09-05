import BannerSlide from "../slides/BannerSlide";
import MovieNetflix from "../slides/MovieNetflix";
import SectionSlide from "../slides/SectionSlide";
import TopFilm from "../slides/TopFilm";
import NewMovie from "../slides/NewMovie"
import TopSerie from "../slides/TopSerie"
import TopMovie from "../slides/TopMovie"

function Main(props) {
    return (
        <div>
            <BannerSlide />
            <SectionSlide />
            <NewMovie />
            <MovieNetflix />
            <TopSerie />
            <TopFilm />
            <TopMovie />
        </div>
    );
}

export default Main;