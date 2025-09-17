import { IoCloseSharp } from "react-icons/io5";

export default function ExcelUpload({ openExcel, setOpenExcel, setFile, file, handleFileUpload, addToExcel }) {

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && (droppedFile.type.includes("sheet") || droppedFile.name.endsWith(".xls") || droppedFile.name.endsWith(".xlsx"))) {
            setFile(droppedFile);
            handleFileUpload({ target: { files: [droppedFile] } }); // gọi đọc file
        }
    };
    const handleCloseExcel = () => {
        setOpenExcel(false);
        setFile(null);
        setRows([]);
    };
    return (
        <>
            {openExcel && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div
                        className="relative bg-white w-96 h-60 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-gray-400"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                    >
                        <p className="text-gray-600">Kéo & thả file Excel vào đây</p>
                        <p className="text-sm text-gray-400 mt-2">(.xls, .xlsx)</p>

                        <input
                            type="file"
                            accept=".xlsx, .xls"
                            className="hidden"
                            id="excelInput"
                            onChange={(e) => {
                                setFile(e.target.files[0]);
                                handleFileUpload(e); // đọc file luôn
                            }}
                        />
                        <label
                            htmlFor="excelInput"
                            className="mt-4 px-4 py-2 bg-green-500 text-white rounded cursor-pointer"
                        >
                            Hoặc chọn file
                        </label>
                        <div
                            className="absolute text-xl text-red-700 top-1 right-1 -translate-x-1 translate-y-1 cursor-pointer"
                            onClick={handleCloseExcel}

                        >
                            <IoCloseSharp />
                        </div>
                        <div className="flex items-center gap-2">
                            {file && (
                                <div className="mt-3 text-sm text-gray-700 ">
                                    File đã chọn: <span className="font-semibold">{file.name}</span>
                                </div>
                            )}
                            <button
                                disabled={!file}
                                onClick={addToExcel}
                                className={`px-2 py-1 rounded-sm mt-4 ${file ? "bg-green-600 text-white" : "bg-gray-400 text-gray-200 cursor-not-allowed"
                                    }`}
                            >
                                Add
                            </button>
                        </div>
                    </div>

                </div>
            )}


        </>
    );
}
