import { useEffect, useState } from 'react';
import { CAROUSEL_IMAGE_LIST } from '../configs/CarouselConfig';

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CAROUSEL_IMAGE_LIST.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  function goToNextSlide() {
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_IMAGE_LIST.length);
  }

  function goToPreviousSlide() {
    setCurrentIndex((prev) =>
      prev === 0 ? CAROUSEL_IMAGE_LIST.length - 1 : prev - 1,
    );
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <div className="flex justify-center items-center relative">
        <button
          onClick={goToPreviousSlide}
          className="lg:flex hidden absolute left-[5.8rem] bg-customDarkGrey rounded-full w-12 h-12 items-center justify-center cursor-pointer z-50 hover:opacity-90"
        >
          <img src="../assets/images/carousel/arrow-left.png" alt="Previous" />
        </button>
        <div className="relative w-10/12 overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {CAROUSEL_IMAGE_LIST.map((image, index) => (
              <img
                key={index}
                src={image.imageUrl}
                className="w-full min-h-48"
              />
            ))}
          </div>
        </div>
        <button
          onClick={goToNextSlide}
          className="lg:flex hidden absolute right-[5.8rem] bg-customDarkGrey rounded-full w-12 h-12 items-center justify-center cursor-pointer z-50 hover:opacity-90"
        >
          <img src="../assets/images/carousel/arrow-right.png" alt="Next" />
        </button>
      </div>
      <div className="flex gap-2 transition-all">
        {CAROUSEL_IMAGE_LIST.map((_, index) => (
          <div
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              currentIndex === index
                ? 'bg-customLightYellow w-8 transition-all duration-200'
                : 'bg-customLightGrey'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
