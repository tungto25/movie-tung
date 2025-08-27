import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { FaTelegramPlane } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa";

function Footer(props) {
    const icons = [
        <FaTelegramPlane />,
        <FaDiscord />,
        <FaXTwitter />,
        <FaFacebookF />,
        <FaTiktok />,
        <FaYoutube />,
        <FaThreads />,
        <FaInstagram />
    ];
    const contact = ["Hỏi-Đáp", "Chính sách bảo mật", "Điều khoản sử dụng", "Giới thiệu", "Liên hệ"]
    return (
        <Container maxWidth={false} className="bg-black text-white p-5 text-xs md:text-base " >
            <div className='md:ml-20'>
                <div className='px-2 py-1 bg-red-800 rounded-full w-fit flex items-center gap-2'>
                    <Avatar
                        src='/images/vn.png'
                        sx={{
                            width: 20,
                            height: 20,
                            margin: "auto"
                        }}
                    />
                    <p>Hoàng Sa & Trường Sa là của Việt Nam</p>
                </div>
                <div className='flex items-center mt-5 flex-col md:flex-row justify-center'>
                    <Link className='flex items-center ' >
                        <img src="/images/logo.png" alt="Tfilm" className='h-15' />
                        <div className='flex flex-col bg-gradient-to-r from-blue-500 via-blue-700 to-purple-600 bg-clip-text text-transparent'>
                            <h1 className='font-bold font-serif text-3xl'>TFILM</h1>
                            <span className='text-xs'>Phim hay mỗi ngày</span>
                        </div>
                    </Link>
                    <div className='md:ms-20 flex'>
                        {icons.map(e => (
                            <div className='flex items-center justify-center rounded-full w-8 h-8 m-1 bg-gray-700'>
                                {e}
                            </div>
                        ))}
                    </div>

                </div>
                <div className='flex items-center gap-4 ml-2 mt-4 whitespace-nowrap flex-wrap'>
                    {contact.map(e => (
                        <div>
                            {e}
                        </div>
                    ))}
                </div>
                <p className='max-w-xl ml-2 mt-4 text-gray-400 text-xs'>
                    TFILM là nền tảng giải trí trực tuyến cung cấp phim lẻ, phim bộ
                    và các bộ phim kinh điển từ nhiều quốc gia như Mỹ, Hàn Quốc, Nhật Bản, Trung Quốc…
                    với đa dạng độ phân giải từ SD, Full HD đến 4K. Giao diện thân thiện cùng tính năng
                    phân loại theo thể loại, quốc gia và mùa phim giúp người xem dễ dàng tìm kiếm và tận hưởng
                    trải nghiệm xem phim chất lượng cao, mượt mà và tiện lợi.
                </p>
                <div className='flex items-center gap-1 text-gray-400 text-xs mt-3 ms-2'>
                    <FaRegCopyright />
                    <p>2025 TFILM</p>
                </div>
            </div>
        </Container>
    );
}

export default Footer;