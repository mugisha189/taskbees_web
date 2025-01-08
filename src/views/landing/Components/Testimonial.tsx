import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TestimonialCard from "@/components/landing/TestimonialCard";

const Testimonials: React.FC = () => {
  const settings = {
    centerMode: true,
    className: "h-[400px]",
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024, // Below 1024px (md screens)
        settings: {
          slidesToShow: 2,
          centerMode: false, // Adjust center mode for better UX on smaller screens
        },
      },
      {
        breakpoint: 768, // Below 768px (sm screens)
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
  };

  const testimonials = [
    {
      title: "Great Quality",
      user: {
        role: "Web Developer",
        name: "Nicolle Williams",
      },
      description:
        "Without JobHunt I’d be homeless, they found me a job and got me sorted out quickly with everything! Can’t quite… The Mitech team works really hard to ensure a high level of quality.",
    },
    {
      title: "Awesome Design",
      user: {
        role: "Web Developer",
        name: "Gabriel Nobels",
      },
      description:
        "Without JobHunt I’d be homeless, they found me a job and got me sorted out quickly with everything! Can’t quite… The Mitech team works really hard to ensure a high level of quality.",
    },
    {
      title: "Good Design",
      user: {
        role: "Web Developer",
        name: "Gabriel Maghraes",
      },
      description:
        "Without JobHunt I’d be homeless, they found me a job and got me sorted out quickly with everything! Can’t quite… The Mitech team works really hard to ensure a high level of quality.",
    },
    {
      title: "Amazing Support",
      user: {
        role: "Designer",
        name: "Alice Johnson",
      },
      description:
        "The team was very supportive and helped me get started right away! They’re very professional and deliver excellent results.",
    },
  ];

  return (
    <div className="w-full flex py-[80px] px-[15px] flex-col gap-[20px] items-center">
      <p className="font-bold text-[24px]">Testimonials</p>
      <p className="text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat,
        perspiciatis.
      </p>
      <div className="flex w-full justify-center">
        <div className="slider-container max-w-[1600px] w-full">
          <Slider {...settings} className="py-[30px] w-[calc(100%-3px)]">
            {testimonials.map((item, index) => (
              <div className="h-full" key={index}>
                <TestimonialCard testimonies={item} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
