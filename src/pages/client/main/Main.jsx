import React from 'react';
import MovieSlider from '../slides/MovieSlide';
import BannerSlide from '../slides/BannerSlide';
import BxhSlide from '../slides/BxhSlide';
import SectionSlide from '../slides/SectionSlide';

function Main(props) {
    return (
        <div>
            <BannerSlide />
            <SectionSlide />
            <MovieSlider />
            <BxhSlide />
        </div>
    );
}

export default Main;