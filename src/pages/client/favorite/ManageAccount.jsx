import React from 'react';
import Favorite from './Favorite';
import { Outlet } from 'react-router-dom';

function ManageAccount(props) {
    return (
        <div className='w-full flex mt-20 p-10 gap-10 items-start'>
            <Favorite/>
            <div className='mb-auto'>
                <Outlet/>
            </div>
        </div>
    );
}

export default ManageAccount;