import { IoIosSearch } from "react-icons/io";
import StarBorder from './StarBorder '
import ExcelUpload from "./AddExcelModal";
import { useState } from "react";

function SearchAdmin({ handleOpen, search, handleSearch, setSearch, title, buttonText, handleFileUpload, addToExcel, openExcel, setOpenExcel }) {

    const inputValue = (e) => {
        const value = e.target.value;
        setSearch(value);
        handleSearch(value);
    }
    const [file, setFile] = useState(null);

    return (
        <div className="flex justify-between items-center mt-5 p-4 flex-col md:flex-row gap-3">
            <h1 className="text-xl font-bold text-shadow-md">List {title}</h1>
            <div className="flex items-center w-full max-w-sm mx-auto  rounded-lg shadow-md p-2 bg-gray-500">
                <IoIosSearch className="px-1 text-3xl text-white" />
                <input
                    value={search}
                    onChange={inputValue}
                    type="text"
                    placeholder="Enter keyWords..."
                    className="w-full focus:outline-none"
                />
            </div>
            <StarBorder
                onClick={() => setOpenExcel(true)}
                as="button"
                className="custom-class whitespace-nowrap bg-gradient-to-b from-gray-900 to-green-900 border border-green-700"
                color="white"
                speed="5s"
            >
                Add Excel
            </StarBorder>
            <StarBorder
                onClick={handleOpen}
                as="button"
                className="custom-class whitespace-nowrap bg-gradient-to-b from-gray-900 to-blue-900 border border-blue-700"
                color="white"
                speed="5s"
            >
                ADD {buttonText}
            </StarBorder>
            <ExcelUpload
                openExcel={openExcel}
                setOpenExcel={setOpenExcel}
                file={file}
                setFile={setFile}
                handleFileUpload={handleFileUpload}
                addToExcel={addToExcel}
            />
        </div>
    );
}

export default SearchAdmin;