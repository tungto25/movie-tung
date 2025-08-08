import { useState } from "react";
import { IoIosSearch } from "react-icons/io";

function SearchAdmin({ handleOpen, search, handleSearch, setSearch, title, buttonText }) {

    const inputValue = (e) => {
        const value = e.target.value;
        setSearch(value);
        handleSearch(value);
    }

    return (
        <div className="flex justify-between items-center mt-5 p-5 flex-col md:flex-row gap-3">
            <h1 className="text-xl font-bold text-shadow-md">List {title}</h1>
            <div className="flex items-center w-full max-w-md mx-auto  rounded-lg shadow-md p-2 bg-gray-500">
                <IoIosSearch className="px-1 text-3xl text-white" />
                <input
                    value={search}
                    onChange={inputValue}
                    type="text"
                    placeholder="Enter keyWords..."
                    className="w-full focus:outline-none"
                />
            </div>
            <button onClick={handleOpen} className="rounded-lg shadow-md py-3 px-4 bg-blue-500 hover:bg-blue-600">ADD {buttonText}</button>
        </div>
    );
}

export default SearchAdmin;