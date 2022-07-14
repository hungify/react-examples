import { testimonials } from 'mocks';
import { useEffect, useState } from 'react';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

export default function TestimonialBoxSwitcher() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setActive(Math.floor(Math.random() * testimonials.length));
    }, 10000);
    return () => clearInterval(timeInterval);
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-[#f4f4f4]">
      <div className="bg-[#476ce4] mx-auto my-5 max-w-3xl md:py-8 md:px-20 rounded-2xl relative text-white px-[30px] py-[20px]">
        <div className="w-full  rounded-full h-2 ">
          <div className=" h-1 rounded-full bg-gray-200 animate-grow origin-left"></div>
        </div>
        <div className="absolute text-3xl text-white opacity-30 top-[70px] left-[40px] hidden md:block">
          <FaQuoteRight />
        </div>
        <div className="absolute text-3xl text-white opacity-30 top-[70px] right-[40px] hidden md:block">
          <FaQuoteLeft />
        </div>
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.name}
            style={{
              display: active === index ? 'block' : 'none',
            }}
          >
            <p className="text-justify text-2xl my-5">{testimonial.text}</p>
            <div className="flex justify-center items-center">
              <img
                src={testimonial.photo}
                alt="user"
                className="h-[75px] w-[75px] object-cover rounded-full"
              />
              <div className="ml-3">
                <h4 className="font-semibold m-0 normal-case">{testimonial.name}</h4>
                <p className="my-2">{testimonial.position}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
