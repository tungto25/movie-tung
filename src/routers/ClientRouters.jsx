import Auth from '../pages/client/auth/Auth';
import Search from '../pages/client/search/Search';
import { Route, Routes } from 'react-router-dom';
import Main from '../pages/client/main/Main';
import Movie from '../pages/client/movie/Movie';
import TvSeries from '../pages/client/tv series/TvSeries';
import Actor from '../pages/client/actor/Actor';
import ShowTime from '../pages/client/showtime/ShowTime';
import Topics from '../pages/client/topic/Topics';
import DetailMovie from '../pages/client/detail/DetailMovie';
import Episodes from '../pages/admin/media_management/episodes/Episodes';
import Trailer from '../pages/client/detail/Trailer';
import MovieActors from '../pages/client/detail/MovieActors';
import Recommend from '../pages/client/detail/Recommend';
import EpisodeMovie from '../pages/client/detail/EpisodeMovie';
import PlayMovie from '../pages/client/detail/PlayMovie';
import Packages from '../pages/client/vip/Packages';
import PaymentPage from '../pages/client/vip/PaymentPage';

function ClientRouters({ handleOpenLogin }) {
    const routes = [
        {
            path: "/",
            element: <Main />
        },
        {
            path: "/auth",
            element: <Auth />
        },
        {
            path: "/search",
            element: <Search />
        },
        {
            path: "/movie",
            element: <Movie />
        },
        {
            path: "/tvseries",
            element: <TvSeries />
        },
        {
            path: "/actors",
            element: <Actor />
        },
        {
            path: "/showtimes",
            element: <ShowTime />
        },
        {
            path: "/topics",
            element: <Topics />
        },
        {
            path: "/detail/:id",
            element: <DetailMovie handleOpenLogin={handleOpenLogin} />,
            subRoutes: [
                {
                    path: "",
                    element: <EpisodeMovie />
                },
                {
                    path: "trailer",
                    element: <Trailer />
                },
                {
                    path: "movieactors",
                    element: <MovieActors />
                },
                {
                    path: "recommend",
                    element: <Recommend />
                },
            ]
        },
        {
            path: "/playmovie/:id",
            element: <PlayMovie handleOpenLogin={handleOpenLogin} />
        },
        {
            path: "/packages",
            element: <Packages />
        },
        {
            path: "/paymentPage",
            element: <PaymentPage />
        },
    ]
    // Recursive function to render both top-level and nested routes
    function renderRoutes(routeArray) {
        return routeArray.map((route, index) => (
            <Route key={index} path={route.path} element={route.element}>
                {route.subRoutes && renderRoutes(route.subRoutes)}
            </Route>
        ));
    }
    return (
        <div>
            <Routes>
                {renderRoutes(routes)}
            </Routes>
        </div>

    );
}

export default ClientRouters;