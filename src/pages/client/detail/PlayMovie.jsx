import { FaHeart } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { FaShare } from "react-icons/fa";
import { BiSolidCommentDetail } from "react-icons/bi";
import { FaFlag } from "react-icons/fa";

function PlayMovie(props) {
    return (
        <div className=''>
            <div className='bg-amber-700 w-[96%] h-96 m-auto rounded-xl'>
                <video
                    src=""
                    className=""
                >
                </video>
            </div>
            <div className="flex items-center justify-between bg-black p-2 rounded-b-xl  w-[96%] m-auto px-3">
                <div className="flex items-center gap-5">
                    <div className="text-white whitespace-nowrap flex items-center gap-1">
                        <FaHeart />
                        <p>Yêu thích</p>
                    </div>
                    <div className="text-white whitespace-nowrap flex items-center gap-1">
                        <IoMdAdd />
                        <p>Thêm vào</p>
                    </div>
                    <div className="text-white whitespace-nowrap flex items-center gap-1">
                        <FaShare />
                        <p>Chia sẻ</p>
                    </div>
                    <div className="text-white whitespace-nowrap flex items-center gap-1">
                        <BiSolidCommentDetail />
                        <p>Bình luận</p>
                    </div>
                </div>
                <div className="flex items-center text-white gap-2">
                    <FaFlag />
                    <p>Báo lỗi</p>
                </div>
            </div>
            <div className="flex items-center rounded-xl p-6">
                <img
                    src="https://upload.wikimedia.org/wikipedia/vi/b/b0/Avatar-Teaser-Poster.jpg"
                    alt=""
                    className="w-[150px] h-auto object-cover rounded-xl"
                />
                <div className="p-3 text-white mb-auto">
                    <p className="whitespace-nowrap text-2xl">Avatar</p>
                    <p className="text-xs text-gray-500 whitespace-nowrap">Avatar</p>
                    <div className='flex items-center gap-2 mt-4 whitespace-nowrap'>
                        <div className='flex items-center bg-white text-black rounded-md px-3 py-1 font-bold'>
                            T16
                        </div>
                        <div className='flex items-center bg-gray-400/30 text-white rounded-md px-3 py-1 font-bold'>
                            Phần 1
                        </div>
                        <div className='flex items-center bg-gray-400/30 text-white rounded-md px-3 py-1 font-bold'>
                            Phần 2
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="bg-white/20 text-center rounded p-1">Hành Động</div>
                        <div className="bg-white/20 text-center rounded p-1">Viễn Tưởng</div>
                        <div className="bg-white/20 text-center rounded p-1">Phiêu lưu</div>
                        <div className="bg-white/20 text-center rounded p-1">Khoa học</div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default PlayMovie;