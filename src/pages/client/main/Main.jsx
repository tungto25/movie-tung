import React from 'react';
import MovieSlider from '../slides/MovieSlide';
import BannerSlide from '../slides/BannerSlide';
import BxhSlide from '../slides/BxhSlide';

function Main(props) {
    return (
        <div>
            <BannerSlide />
            <MovieSlider />
            <BxhSlide />
        </div>
    );
}

export default Main;