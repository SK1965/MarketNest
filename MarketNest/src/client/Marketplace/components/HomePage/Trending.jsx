import React, { useEffect, useState } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Trending = () => {
  const [data, setData] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/server/marketplace/deals");
        setData(response.data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (data) {
        setCurrentSlide((prev) => (prev + 1) % data.length);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [data]);

  const handleNavigation = () => {
    if (data) {
      navigate("../productpage", { state: { product: data[currentSlide] } });
    }
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  if (!Array.isArray(data) || data.length === 0) {
    return <div>Error: No data available</div>;
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="max-w-screen relative min-h-[50vh] md:min-h-[89vh] rounded-md shadow-md dark:bg-gray-50 bg-opacity-35 dark:text-gray-800">
        <div className="overflow-hidden h-full">
          <AnimatePresence initial={false}>
            <m.div
              key={currentSlide}
              initial={{ x: 60, opacity: 0, scale: 0.95 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="absolute w-full h-full bg-cover bg-center cursor-pointer"
              style={{ backgroundImage: `url(${data[currentSlide].thumbnail})` }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  setCurrentSlide((prev) => (prev + 1) % data.length);
                } else if (swipe > swipeConfidenceThreshold) {
                  setCurrentSlide((prev) => (prev - 1 + data.length) % data.length);
                }
              }}
              onClick={handleNavigation}
            >
              <m.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="absolute w-1/2 bottom-24 left-8 bg-black bg-opacity-50 font-bold text-4xl text-white rounded-md p-4"
              >
               get upto {data[currentSlide].discount}% of on {data[currentSlide].name}
              </m.div>
            </m.div>
          </AnimatePresence>
        </div>
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + data.length) % data.length)}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-md p-1 text-2xl focus:outline-none"
        >
          &#10094;
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % data.length)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-md p-1 text-2xl focus:outline-none"
        >
          &#10095;
        </button>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {data.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${currentSlide === index ? "bg-gray-800" : "bg-gray-400"}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </LazyMotion>
  );
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export default Trending;
