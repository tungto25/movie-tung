import React from 'react';
import Auth from '../pages/client/auth/Auth';
import Search from '../pages/client/search/Search';
import { Route, Routes } from 'react-router-dom';
import Main from '../pages/client/main/Main';

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
        }
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