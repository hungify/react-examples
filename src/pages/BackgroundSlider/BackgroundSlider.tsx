import { sliders } from 'mocks';
import 'pages/BackgroundSlider/BackgroundSlider.css';
import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function BackgroundSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLeftClick = () => {
    if (currentIndex === 0) {
      setCurrentIndex(sliders.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleRightClick = () => {
    if (currentIndex === sliders.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div
      className="slider-wrapper"
      style={{
        backgroundImage: `url(${sliders[currentIndex].src})`,
      }}
    >
      <div className="slider-container">
        {sliders.map((sld) => (
          <div
            className={'slide' + (currentIndex === sld.id ? ' active' : '')}
            key={sld.id}
            style={{
              backgroundImage: `url(${sld.src})`,
            }}
          />
        ))}
        <button className="arrow left-arrow" id="left" onClick={handleLeftClick}>
          <FaArrowLeft />
        </button>
        <button className="arrow right-arrow" id="right" onClick={handleRightClick}>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
