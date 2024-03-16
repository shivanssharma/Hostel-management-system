import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ImageCarousel.css';


const CustomPrevArrow = ({ onClick }) => (
  <button className="carousel-arrow left" onClick={onClick}>
    {'<'}
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button className="carousel-arrow right" onClick={onClick}>
    {'>'}
  </button>
);


const ImageCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };


  return (
    <Slider {...settings}>
      <div>
        <img src="images\MDH (5).JPG" alt="Slide 2" />
      </div>
      <div>
        <img src="images\arora.jpeg" alt="Slide 1" />
      </div>
      <div>
        <img src="images\tushar.jpeg" alt="Slide 3" />
      </div>
      <div>
        <img src="images\all.jpeg" alt="Slide 4" />
      </div>
      <div>
        <img src="images\smadhi.jpeg" alt="Slide 5" />
      </div>
      <div>
        <img src="images\all.jpeg" alt="Slide 6" />
      </div>
    </Slider>
  );
};

export default ImageCarousel;
