import React from 'react';
import Header from '../../../components/client/Header';
import Footer from '../../../components/client/Footer';
import ClientRouters from '../../../routers/ClientRouters';

function Home(props) {
    return (
        <div>
            <Header />
            <ClientRouters />
            <Footer />
        </div>
    );
}

export default Home;