import Header from '../../../components/client/Header';
import Footer from '../../../components/client/Footer';
import ClientRouters from '../../../routers/ClientRouters';
import { useEffect, useState } from 'react';
import Auth from '../auth/Auth';
import DetailMovie from '../detail/DetailMovie';

function Home(props) {
    const [scrolled, setScrolled] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50); // scrollY > 50px thì bg hiện
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    const handleOpenLogin = () => {
        setOpenLogin(true);
    }
    const handleCloseLogin = () => {
        setOpenLogin(false);
    }
    return (
        <div className="flex flex-col min-h-screen overflow-hidden relative bg-gray-900">
            <header className={`md:fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${scrolled ? "bg-gray-950" : "bg-gray-900/20"}`}>
                <Header handleOpenLogin={handleOpenLogin} />
            </header>

            <div className="flex-grow relative z-10">
                <ClientRouters handleOpenLogin={handleOpenLogin} />
            </div>
            <Footer className="relative z-10" />
            <Auth openLogin={openLogin} handleCloseLogin={handleCloseLogin} />
        </div>
    );
}

export default Home;