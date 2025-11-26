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
import Favorite from '../pages/client/favorite/Favorite';
import LikeEpi from '../pages/client/favorite/LikeEpi';
import ListEpi from '../pages/client/favorite/ListEpi';
import SeeMore from '../pages/client/favorite/SeeMore';
import Notice from '../pages/client/favorite/Notice';
import Account from '../pages/client/favorite/Account';
import ManageAccount from '../pages/client/favorite/ManageAccount';
import MoviePayment from '../pages/client/vip/MoviePayment';
import PayMovies from '../pages/client/vip/PayMovies';

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
            path: "/paymentPage/:id",
            element: <PaymentPage />
        },
        {
            path: "/moviePayment/:id",
            element: <MoviePayment />
        },
        {
            path: "/payMovies/:id",
            element: <PayMovies />
        },
        {
            path: "/manageAccount",
            element: <ManageAccount />,
            subRoutes: [
                {
                    path: "likeEpi",
                    element: <LikeEpi />
                },
                {
                    path: "listEpi",
                    element: <ListEpi />
                },
                {
                    path: "seeMore",
                    element: <SeeMore />
                },
                {
                    path: "notice",
                    element: <Notice />
                },
                {
                    path: "account",
                    element: <Account />
                },
            ]
        },


    ]

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