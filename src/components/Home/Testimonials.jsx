"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

const testimonials = [
  {
    text: "Working with Stylcon has been a game-changer for our brand. The attention to detail  and the quality of the materials exceeded our expectations. ",
    url: "https://www.instagram.com/79luxe/?igsh=bXJ6czI5YWEydmE0",
    name: "79Luxe",
    email: "@79Luxe",
  },
  {
    text: "I was a bit skeptical at the beginning but they delivered more than my expectations. I'm sticking with Stylcon all the way.",
    name: "Wirenation",
    url: "https://www.instagram.com/wirenationbrand/?igsh=MXRubWhlaWdmZXdiNQ%3D%3D",
    email: "@wirenation",
  },
  {
    text: "I collaborated with stylcon and it was the best experience with a manufacturer. I recommend them all the time to any brand.",
    url: "https://www.instagram.com/absa1.0/?igsh=cWdyejF5MHFraXE3#",
    name: "Absa",
    email: "@absa1.0",
  },
  {
    text: "Stylcon has always delivered on my design every time. There's no other better production company out there. They are the best.",
    url: "https://www.instagram.com/onggg_clothing/?igsh=bzI1MHVsZXIwdHYy",
    name: "ONGGG",
    email: "@onggg_clothing",
  },
];

const Testimonials = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1008,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  return (
    <section className="py-28">
      <div className="flex flex-col gap-2 items-center mb-20">
        <h3 className="text-2xl lg:text-4xl lg:max-w-[340px] font-bold text-center">
          Testimonials
        </h3>
        <p className="lg:text-lg text-grey">
          {" Here's what previous clients had to say"}
        </p>
      </div>
      <div className="hidden md:block overflow-hidden">
        <Slider {...settings}>
          {testimonials.map((tes) => (
            <Card key={tes.email} tes={tes} />
          ))}
        </Slider>
      </div>
      <div className=" grid grid-cols-1 sm:grid-cols-2 gap-8 md:hidden contain">
        {testimonials.map((tes, i) => (
          <Card key={tes.email + "0"} tes={tes} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;

const Card = ({ tes }) => {
  return (
    <div className="md:pl-6">
      <div className="h-[300px] sm:h-[455px] p-4 sm:p-12 bg-[#f4f4f4]/50 flex flex-col justify-between rounded-lg">
        <p className="text-center text-[#5A5A5A] lg:text-xl font-bold mt-8">
          {tes.text}
        </p>

        <div className="flex flex-col items-center">
          {/* <div
            style={{
              backgroundColor: `${tes.img}`,
              opacity: "30%",
            }}
            className={`h-[48px] w-[48px] rounded-[50%]`}
          ></div> */}
          <p className="text-dark text-lg lg:text-xl font-bold">{tes.name}</p>
          <Link href={tes.url} target="_blank" rel="noopener noreferrer">
            {tes.email}
          </Link>
        </div>
      </div>
    </div>
  );
};
