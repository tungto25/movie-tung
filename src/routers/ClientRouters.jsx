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

function ClientRouters(props) {
    const routers = [
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
            path: "/detail/:id/*",
            element: <DetailMovie />
        },
    ]
    return (
        <div>
            <Routes>
                {routers.map((e, i) =>
                    <Route key={i} path={e.path} element={e.element} />
                )}
            </Routes>
        </div>

    );
}

export default ClientRouters;