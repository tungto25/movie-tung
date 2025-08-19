
import Actor from '../pages/admin/cast_crew/actors/Actor';
import Authors from '../pages/admin/cast_crew/authors/Authors';
import Characters from '../pages/admin/cast_crew/characters/Characters';
import DashBoard from '../pages/admin/dashboard/DashBoard';
import Episodes from '../pages/admin/media_management/episodes/Episodes';
import Movies from '../pages/admin/media_management/movies/Movies';
import Trailers from '../pages/admin/media_management/trailers/Trailers';
import Categories from '../pages/admin/metadata/categories/Categories';
import Countries from '../pages/admin/metadata/countries/Countries';
import MovieTypes from '../pages/admin/metadata/movie_types/MovieTypes';
import ProFile from '../pages/admin/profile/ProFile';
import UserManagement from '../pages/admin/user_management/UserManagement';
import UserPages from '../pages/admin/user_pages/UserPages';
import Features from '../pages/admin/vip/feature/Features';
import Packages from '../pages/admin/vip/packages/Packages';
import Plans from '../pages/admin/vip/plans/Plans';
import { Routes, Route } from 'react-router-dom';

function AdminRouters(props) {
    const routers = [
        {
            path: "/",
            element: <DashBoard />
        },
        {
            path: "/dashboards",
            element: <DashBoard />
        },
        {
            path: "media_management/Movie",
            element: <Movies />
        },
        {
            path: "media_management/Episode",
            element: <Episodes />
        },
        {
            path: "media_management/Trailer",
            element: <Trailers />
        },
        {
            path: "vip/packages",
            element: <Packages />
        },
        {
            path: "vip/features",
            element: <Features />
        },
        {
            path: "vip/plans",
            element: <Plans />
        },
        {
            path: "MetaData/Categories",
            element: < Categories />
        },
        {
            path: "MetaData/Movie_type",
            element: < MovieTypes />
        },
        {
            path: "MetaData/Countries",
            element: < Countries />
        },
        {
            path: "cast_crew/Author",
            element: < Authors />
        },
        {
            path: "cast_crew/Character",
            element: < Characters />
        },
        {
            path: "cast_crew/Actor",
            element: < Actor />
        },
        {
            path: "/user-pages",
            element: < UserPages />
        },
        {
            path: "/user-management",
            element: < UserManagement />
        },
        {
            path: "/profile",
            element: < ProFile />
        }
    ]
    return (
        <div>
            <div>
                <Routes>
                    {routers.map((e, i) =>
                        <Route key={i} path={e.path} element={e.element} />
                    )}
                </Routes>

            </div>
        </div>
    );
}

export default AdminRouters;