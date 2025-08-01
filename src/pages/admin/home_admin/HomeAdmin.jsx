import React, { useState } from 'react';
import MenuAdmin from '../../../components/admin/MenuAdmin';
import HeaderAdmin from '../../../components/admin/HeaderAdmin';
import Categries from '../categories/Categries';

function HomeAdmin(props) {

    return (
        <div className='flex flex-col md:flex-row min-h-max'>
            <MenuAdmin />
            <div className="flex-1 p-3 bg-gray-600 text-white min-h-max">
                <HeaderAdmin />
                <Categries />
            </div>
        </div>
    );
}

export default HomeAdmin;