import MenuAdmin from '../../../components/admin/MenuAdmin';
import HeaderAdmin from '../../../components/admin/HeaderAdmin';
import { Outlet } from 'react-router-dom';
import HomeRouters from '../../../routers/HomeRouters';

function HomeAdmin(props) {

    return (
        <div className='flex flex-col md:flex-row min-h-max'>
            <MenuAdmin />
            <div className="flex-1 p-3 bg-gray-600 text-white min-h-max">
                <HeaderAdmin />
            </div>
        </div>
    );
}

export default HomeAdmin;