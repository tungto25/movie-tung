import Header from '../../../components/client/Header';
import Footer from '../../../components/client/Footer';
import ClientRouters from '../../../routers/ClientRouters';
import { useEffect, useState } from 'react';

function Home(props) {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50); // scrollY > 50px thì bg hiện
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <div className="flex flex-col min-h-screen relative overflow-hidden relative bg-gray-900">
            <header className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${scrolled ? "bg-gray-900/80" : "bg-gray-900/20"}`}>
                <Header />
            </header>

            <div className="flex-grow relative z-10">
                <ClientRouters />
            </div>
            <Footer className="relative z-10" />
        </div>
    );
}

export default Home;