import React, { useContext, useState } from 'react';
import { BiSolidCommentDetail } from 'react-icons/bi';
import { IoSend } from "react-icons/io5";
import { ContextAuth } from '../../../contexts/AuthProvider';
import { ContextAccount } from '../../../contexts/AccountProvider';
import Avatar from '@mui/material/Avatar';
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import { FaFlag, FaReply } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { ContextComments } from '../../../contexts/CommentProvider';
import { addDocument } from '../../../services/FirebaseService';

function Comment({ handleOpenLogin, id }) {
    const [comment, setComment] = useState("");

    const { isLogin } = useContext(ContextAuth);
    const comments = useContext(ContextComments);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const addComment = async () => {
        await addDocument("Comments", { idMovie: id, idUser: isLogin?.id, content: comment, creatAt: new Date() });
    }
    return (
        <>
            <div id="comment" className="mt-8">
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
                    placeholder={`${isLogin ? "Viết bình luận..." : "Đăng nhập để bình luận 😊"}`}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <div className='flex justify-between items-center px-3'>
                    <div className="flex items-center gap-2 my-2">
                        {/* <label className="relative inline-block w-10 h-6">
                            <input
                                type="checkbox"
                                className="peer hidden"
                            />
                            <span className="absolute inset-0 rounded-full bg-gray-300 transition-colors duration-200 peer-checked:bg-indigo-600 peer-hover:bg-gray-400 peer-checked:peer-hover:bg-indigo-700"></span>
                            <span className="absolute top-1/2 -translate-y-1/2  left-1 h-3 w-3 rounded-full bg-white transition-all duration-200 peer-checked:left-6"></span>
                        </label>
                        <p className="text-white">Ẩn danh?</p> */}
                    </div>
                    {isLogin && (<button onClick={addComment} type='button' className='flex items-center gap-3 active:scale-95'>
                        <p>Gửi</p>
                        <IoSend />
                    </button>)}
                </div>
            </div>
            <div className='text-white py-8'>
                {comments.map(e => (
                    <div className='flex items-start gap-5'>
                        <Avatar
                            src={isLogin?.imgUrl}
                            alt=""
                            sx={{ height: "60px", width: "60px" }}
                        />
                        <div className='text-gray-500'>
                            <p className='font-bold text-white'>{isLogin?.email?.split("@")[0].replace(/[0-9]/g, "")}</p>
                            {comments.map(e => (
                                <div className='text-gray-400'>
                                    {e.content}
                                </div>
                            ))}
                            <div className='flex items-center gap-6'>
                                <AiFillLike />
                                <AiFillDislike />
                                <div className='flex items-center gap-1'>
                                    <FaReply />
                                    <p>Trả lời</p>
                                </div>
                                <div className="">
                                    <div onClick={handleClick} className='flex items-center gap-1'>
                                        <span >...</span>thêm
                                    </div>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        disableScrollLock={true}
                                    >
                                        <MenuItem onClick={handleClose} className='flex items-center gap-1'><FaFlag />Báo cáo</MenuItem>
                                        {isLogin && (<MenuItem onClick={handleClose} className='flex items-center gap-1'><MdEdit /> Edit</MenuItem>)}
                                    </Menu>
                                </div>
                            </div>
                        </div>
                    </div>

                ))}

            </div>
        </>
    );
}

export default Comment;