import React, { useContext, useEffect, useState } from 'react';
import { ContextLikeMovie } from '../../../contexts/LikeMovieProvider';
import { ContextMovies } from '../../../contexts/MovieProvider';
import Favorite from './Favorite';
import { ContextAuth } from '../../../contexts/AuthProvider';

const list = [
    {
        name: "Phim",
        path: ""
    },
    {
        name: "Diễn viên",
        path: ""
    }
]
function LikeEpi(props) {
    const likeMovies = useContext(ContextLikeMovie);
    const [likeLists, setLikeLists] = useState([]);
    const movies = useContext(ContextMovies);
    const { isLogin } = useContext(ContextAuth);

    useEffect(() => {
        const likeUser = likeMovies.filter(e => e.idUser === isLogin?.id);
        const likedIds = likeUser.map(e => e.idMovie);
        const listLikes = movies.filter(e => likedIds.includes(e.id));
        setLikeLists(listLikes);
    }, [isLogin,likeMovies,movies]);

    return (
        <div className='w-full'>
            <div className='text-white'>
                <h1 className='text-xl'>Yêu thích</h1>
                <div className='flex gap-2 items-center mt-6'>
                    {list.map(e => (
                        <button className='bg-gray-600 w-30 h-10 rounded-full '>{e.name}</button>
                    ))}
                </div>
                <div className='mt-5'>
                    {likeLists.length === 0 ? (
                        <p className='text-gray-400 italic'>Bạn chưa thích phim nào.</p>
                    ) : (
                        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                            {likeLists.map(e => (
                                <div
                                    className='bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform'
                                >
                                    <img
                                        src={e.imgUrl}
                                        alt={e.name}
                                        className='w-full h-40 object-cover'
                                    />
                                    <div className='p-3'>
                                        <p className='font-semibold'>{e.name}</p>
                                        <p className='text-sm text-gray-400 line-clamp-2'>{e.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LikeEpi;