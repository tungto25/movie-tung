import { Route, Routes } from 'react-router-dom';
import Episodes from '../pages/client/detail/Episodes';
import Trailer from '../pages/client/detail/Trailer';
import Recommend from '../pages/client/detail/Recommend';
import MovieActors from '../pages/client/detail/MovieActors';

function MovieRouters(props) {
    const routers = [

        {
            path: "/detail/:id/episode",
            element: <Episodes />
        },
        {
            path: "/detail/:id/trailer",
            element: <Trailer />
        },
        {
            path: "/detail/:id/movieactors",
            element: <MovieActors />
        },
        {
            path: "/detail/:id/recommend",
            element: <Recommend />
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

export default MovieRouters;