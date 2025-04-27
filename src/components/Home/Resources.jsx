"use client";
import Image from "next/image";
import CustomLink from "../Shared/CustomLink";

const resources = [
  {
    icon: "/fashion.svg",
    heading: "Business of Fashion",
    text: "Understanding industry trends, brand development, marketing, and strategies for creating a successful fashion business",
  },
  {
    icon: "/sales.svg",
    heading: "Sales",
    text: "Understand how to sell your fashion, attract customers, and make your brand successful through social media and promotions.",
  },
  {
    icon: "/design.svg",
    heading: "Design",
    text: "Explore creating unique fashion sketches, picking styles, and bringing your ideas to life as wearable art",
  },
  {
    icon: "/prod.svg",
    heading: "Production",
    text: "This helps you understand all you need to know about product quality, printing, finishing e.t.c",
  },
];

const Resources = () => {
  return (
    <section className="text-white bg-black py-28">
      <div className="flex flex-col gap-2 items-center mb-20 px-6">
        <p className="lg:text-lg text-grey">STYLCON RESOURCES</p>
        <h3 className="text-4xl font-bold md:leading-[60px] lg:max-w-[340px] text-center">
          The help you need when you need it
        </h3>
      </div>
      <div className="contain grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource, i) => (
          <div
            data-aos={(i + 1) % 2 === 1 ? "flip-right" : "flip-left"}
            key={resource.heading}
            className="py-12 px-6 bg-[#0E0E0E] border border-white/[10%] rounded flex flex-col gap-4 items-start"
          >
            <Image src={resource.icon} alt="" width={32} height={32} />

            <p className="text-xl font-bold">{resource.heading}</p>
            <p className="text-lg">{resource.text}</p>
            <CustomLink url={"/resources"}>
              <p className="mt-4 bg-[#1B1F21] p-4 rounded-[62px] Satoshi-bold text-lg  hover:bg-dark active:scale-105 transition-all duration-700">
                Get Resources
              </p>
            </CustomLink>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Resources;
