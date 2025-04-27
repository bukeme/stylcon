"use client";
import ButtonPlain from "../Shared/ButtonPlain";

import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomLink from "../Shared/CustomLink";

const images = [
  "https://drive.google.com/uc?export=view&id=11i5u1pQ22M1yjiAaFEejRfmk32Zc7j7f",
  "https://drive.google.com/uc?export=view&id=1lPhLIOv1zS7hJOLdQw4Bm0uZIYKnv0FE",
  "https://drive.google.com/uc?export=view&id=10SVbvPHwnDzeHN14B8fM8RgvFL1CbCEs",
];

const WeDesign = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1.2,
    slidesToScroll: 1.2,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  return (
    <section className="bg-[#F9FAFB] py-24">
      <div className="mb-6 flex flex-col md:flex-row gap-6 justify-between md:items-end contain">
        <aside className="flex flex-col gap-2 items-start ">
          <p className="text-lg text-grey">WE DESIGN</p>
          <h3 className="text-4xl md:text-5xl font-bold leading-10 md:leading-[60px] max-w-[450px] tracking-tighter ">
            Get a unique custom design for all your products
          </h3>
        </aside>
        <CustomLink url={"/how"}>
          <ButtonPlain
            text={"How it works"}
            className={"text-[#278007] text-lg font-bold"}
          />
        </CustomLink>
      </div>
      <div className="hidden md:grid md:grid-cols-3 overflow-hidden gap-4 mt-10 contain">
        {images.map((url) => (
          <div key={url} className="bg-[#F5F5F5] py-16">
            <Image
              className="bg-[#F5F5F5] object-cover h-96"
              src={url || ""}
              width={1000}
              height={1000}
              alt=""
            />
          </div>
        ))}
      </div>
      <div className="md:hidden ml-6 mt-10">
        <Slider {...settings}>
          {images.map((url, i) => (
            <Image
              className="object-cover h-96"
              src={url || ""}
              key={i + 2}
              width={1000}
              height={1000}
              alt=""
            />
          ))}
        </Slider>
      </div>
      <div className="mt-10 contain flex flex-col md:flex-row justify-between gap-6 md:items-center">
        <aside className="flex flex-col gap-2 items-start">
          <h3 className="text-3xl font-bold max-w-[326px]">
            Need a mockup or techpack. We got you
          </h3>
          <p className="text-grey max-w-[380px]">
            Get professional mockups and detailed tech packs tailored to your
            designs, ensuring seamless production from concept to final product.
          </p>

          <CustomLink url={"/get-design"}>
            <ButtonPlain
              text={"GET A DESIGN"}
              className={"text-[#278007] text-lg font-bold pt-6"}
            />
          </CustomLink>
        </aside>
        <Image
          className="object-cover md:max-w-[385px] h-[405px]"
          src={
            "https://drive.google.com/uc?export=view&id=1P7feI3bo3TfVvTUCB4U28Iy1UCn60ZVR"
          }
          width={1000}
          height={1000}
          alt=""
        />
      </div>
    </section>
  );
};

export default WeDesign;
