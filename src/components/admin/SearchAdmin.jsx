import { IoIosSearch } from "react-icons/io";

function SearchAdmin({ handleOpen }) {

    return (
        <div className="flex justify-between items-center mt-5 p-5">
            <h1 className="text-xl font-bold text-shadow-md">List Plans</h1>
            <div className="flex items-center w-full max-w-md mx-auto  rounded-lg shadow-md p-2 bg-gray-500">
                <IoIosSearch className="px-1 text-3xl text-white" />
                <input
                    type="text"
                    placeholder="Enter keyWords..."
                    className="w-full focus:outline-none"
                />
            </div>
            <button onClick={handleOpen} className="rounded-lg shadow-md py-3 px-4 bg-blue-500 hover:bg-blue-600">ADD PLAN</button>
        </div>
    );
}

export default SearchAdmin;