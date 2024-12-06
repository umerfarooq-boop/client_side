import Nav from './Nav';
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Service from './Service';
import Coach_Profile from './Coach_Profile';
import Footer from './Footer';
import { TypeAnimation } from 'react-type-animation';
import ChatPopup from './ChatPopup';
import coach from '../../public/SlidderWebimage/coach.jpg'
import football from '../../public/SlidderWebimage/football.jpg'
import footballkid from '../../public/SlidderWebimage/footballKid.jpg'
import player from '../../public/SlidderWebimage/players.jpg'
import stadium from '../../public/SlidderWebimage/stadium.jpg'
import stadium1 from '../../public/SlidderWebimage/stadium1.jpg'



function Home() {
  const [oldSlide, setOldSlide] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeSlide2, setActiveSlide2] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => {
      setOldSlide(current);
      setActiveSlide(next);
    },
    afterChange: current => setActiveSlide2(current),
    autoplay: true,
    arrows: false,
    autoplaySpeed: 3000, 
  };


  return (
    <>
      <Nav />
      <div className="slider-container h-auto">
  <Slider {...settings}>
    <div className="relative flex items-start justify-center">
      <img
        src="https://st.depositphotos.com/1380903/51896/v/450/depositphotos_518965062-stock-illustration-black-abstract-background-composed-squares.jpg"
        alt="Background Image"
        className="relative w-[1920px] h-[350px] object-cover"
      />
      <div className="absolute inset-0 mt-[170px] flex justify-center">
        <TypeAnimation
          sequence={[
            'Provide Coach To Grow Career',
            1000,
            'Experienced Staff',
            2000,
            'Special Cricket or Football',
            () => {
              console.log('Sequence completed');
            },
          ]}
          wrapper="span"
          cursor={true}
          repeat={Infinity}
          style={{ fontSize: '2em', fontWeight: 'bold', color: 'white' }}
        />
      </div>
    </div>

    {/* Other slides */}
    <div>
      <img src={stadium} alt="Slide 2" className=" relative w-[1920px] h-[350px] object-cover"/>
    </div>
    <div>
      <img src={player} alt="Slide 3" className="relative w-[1920px] h-[350px] object-cover" />
    </div>
    <div>
      <img src={football} alt="Slide 4" className=" relative w-[1920px] h-[350px] object-cover"/>
    </div>
    <div>
      <img src={stadium1} alt="Slide 5" className=" relative w-[1920px] h-[350px] object-cover"/>
    </div>
    <div>
      <img src={stadium1} alt="Slide 6" className="relative w-[1920px] h-[350px] object-cover" />
    </div>
  </Slider>

  {/* Custom styles for the slider */}
  <style jsx>{`
    .slider-container {
      width: 100%;
      max-width: 1920px;
      margin: 0 auto;
    }
    
    .slider-image {
      width: 100%;
      height: auto;
    }

    @media (max-width: 1200px) {
      .slider-image {
        height: auto;
      }
    }

    @media (max-width: 768px) {
      .slider-image {
        height: auto;
        max-height: 300px; /* Reduce height for smaller screens */
      }
    }

    @media (max-width: 480px) {
      .slider-image {
        height: auto;
        max-height: 200px; /* Further reduce height for very small screens */
      }
    }
  `}</style>
</div>

    <Service />
    <Coach_Profile />
    <ChatPopup />
    <Footer/>
    </>
  );
}

export default Home;
