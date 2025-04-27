"use client";
import MainLayout from "@/components/Layouts/MainLayout";
import ButtonBlack from "@/components/Shared/ButtonBlack";
import { convertURL } from "@/components/Shared/helpers/helpers";
import Image from "next/image";
import Link from "next/link";

const details = [
  {
    text: "A Fashion Studio",
    desc: "We are clothing manufacturers based in Nigeria specialized in casual and streetwear for men and women. We are creating ethical motion in the clothing industry and have become the go-to manufacturers for numerous luxury brands.",
  },
  {
    text: "Passion at every step",
    desc: "We're not just creative, we're passionate artists. Crafting ideas into reality is our sport, and we play to win. Every stroke, every pixel—polished to perfection. We live for the thrill of turning imagination into art, pushing boundaries with fiery determination. Our team's motto? Passion at heart, creativity in action",
  },
];

export default function About() {
  return (
    <MainLayout>
      <section
        data-aos="zoom-in"
        className="flex flex-col gap-6 items-center py-40 max-w-[950px] mx-auto px-6 xl:px-0 mt-20"
      >
        <h1 className="text-6xl sm:text-center font-bold">
          On a mission to make the fashion market accessible in Africa
        </h1>
        <p className="text-grey sm:text-center max-w-[625px]">
          {
            "Start with your community then expand to the world. Change starts with you"
          }
        </p>

        <div className="mt-60 flex flex-col sm:flex-row md:flex-col gap-14">
          {details.map((deet, i) => (
            <div
              data-aos="fade-up"
              key={i}
              className="flex flex-col gap-1 md:grid md:grid-cols-2"
            >
              <h2 className="font-bold text-3xl text-dark">{deet.text}</h2>
              <p className="text-lg">{deet.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="contain py-20 flex flex-col md:flex-row gap-10 md:items-center">
        <div className="flex flex-col gap-3">
          <h2 data-aos="fade-right" className="font-bold text-4xl text-dark">
            The Stylcon Way
          </h2>
          <p data-aos="fade-left" className="text-lg text-grey">
            {
              "The complexity of fashion supply chains has exploded over the past few years, the frequency of drops is rapidly increasing and sourcing has become a global effort, however the tools used are from the past with paper tech packs, a complete lack of responsive communication, and the absence of transparency. Even the biggest of fashion companies struggle with manufacturing and overseeing their global supply chains, so we've built an entire ecosystem platform for independent designers, connecting all the dots from designing to manufacturing."
            }
          </p>
        </div>
        <Image
          data-aos="zoom-in-left"
          className="h-[483px] object-cover"
          src={
            "https://drive.google.com/uc?export=view&id=1D13D0F0V20_y9fpyQExVEgcuQVVDHrT1"
          }
          alt=""
          width={1000}
          height={1000}
        />
      </section>
      <section className="contain py-20">
        <div data-aos="fade-up" className="flex flex-col gap-3">
          <h2 className="font-bold text-4xl text-dark">Team</h2>
          <p className="text-lg text-grey">
            {
              "From starting our own fashion brands in 2019 and finding the first factory willing to produce our initial blanks to now having a large network of the leading factories and providing 200+ brands with great products and driving industry transformation."
            }
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mt-10">
          {[
            "https://drive.google.com/file/d/1wegcdnTv-Tq87irBSqGEHw6_5YAy1CZj/view?usp=drive_link",
            "https://drive.google.com/file/d/1l0lcfCR6dtJbnL1l3kcFA6eAJb1ZKgKw/view?usp=drive_link",
          ].map((url, i) => (
            <Image
              key={i}
              className="h-[300px] w-auto object-cover bg-grey/25"
              src={convertURL(url)}
              alt=""
              width={1000}
              height={1000}
            />
          ))}
        </div>
      </section>
      <section className="contain py-20 flex flex-col sm:flex-row gap-8 sm:justify-between sm:items-end">
        <div data-aos="fade-right" className="flex flex-col gap-3">
          <p className="text-lg text-grey">{"LET'S COLLABORATE"}</p>
          <h2 className="font-bold text-4xl text-dark max-w-[228px]">
            {"Work with us Let's Talk."}
          </h2>
        </div>
        <Link href="mailto:support@stylconmarketplace.com">
          <ButtonBlack text={"Contact Us"} className={"h-fit"} />
        </Link>
      </section>
    </MainLayout>
  );
}
