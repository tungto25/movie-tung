import { IoIosSearch } from "react-icons/io";
import StarBorder from './StarBorder '

function SearchAdmin({ handleOpen, search, handleSearch, setSearch, title, buttonText, handleFileUpload,addToExcel }) {

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
             <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
             <button onClick={addToExcel}>Add to Excel</button>
            <StarBorder
                onClick={handleOpen}
                as="button"
                className="custom-class"
                color="white"
                speed="5s"
            >
                ADD {buttonText}
            </StarBorder>
        </div>
    );
}

export default SearchAdmin;