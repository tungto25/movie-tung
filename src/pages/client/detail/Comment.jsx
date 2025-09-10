import React from 'react';
import { BiSolidCommentDetail } from 'react-icons/bi';

function Comment(handleOpenLogin) {
    return (
        <div>
            <div className="mt-8">
                <div className="flex items-center text-white text-2xl gap-2 ">
                    <BiSolidCommentDetail />
                    <p>Bình luận (50)</p>
                    <div className="border flex items-center rounded-lg text-sm">
                        <p className="rounded-lg bg-white text-black p-1">Bình Luận</p>
                        <p className="p-1">Đánh giá</p>
                    </div>
                </div>
            </div>
            <div className="text-white mt-2 ">
                <p>Vui lòng đăng nhập để
                    <span
                        onClick={handleOpenLogin}
                        className="text-yellow-400 mx-1"
                    >
                        tham gia
                    </span>
                    bình luận.
                </p>
            </div>
            <div className="bg-gray-600/50 h-auto w-full rounded-xl mt-5 p-2">
                <textarea
                    className="bg-gray-900 h-[120px] w-full rounded-lg text-white p-2 resize-none"
                    placeholder="Viết bình luận..."
                ></textarea>
                <div className="flex items-center gap-2 my-2">
                    <label className="relative inline-block w-10 h-6">
                        <input
                            type="checkbox"
                            className="peer hidden"
                        />
                        <span className="absolute inset-0 rounded-full bg-gray-300 transition-colors duration-200 peer-checked:bg-indigo-600 peer-hover:bg-gray-400 peer-checked:peer-hover:bg-indigo-700"></span>
                        <span className="absolute top-1/2 -translate-y-1/2  left-1 h-3 w-3 rounded-full bg-white transition-all duration-200 peer-checked:left-6"></span>
                    </label>
                    <p className="text-white">Ẩn danh?</p>
                </div>
            </div>
        </div>
    );
}

export default Comment;