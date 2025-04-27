"use client";
import MainLayout from "@/components/Layouts/MainLayout";
import ButtonWhite from "@/components/Shared/ButtonWhite";
import { useRouter } from "next/navigation";
import ResourcesCard from "../resources/components/ResourcesCard";
import Image from "next/image";
import { convertURL } from "@/components/Shared/helpers/helpers";

const details = [
  {
    id: 1,
    text: "Create/Log in to your account to access the interactive form",
    desc: "Sign up and use the interactive tech pack design flow and select fabrics & colours, upload patterns and graphics, and define quantities. You got full creative freedom!",
    img: "https://drive.google.com/file/d/1gPrPFWwON4H6V2frgPjwB_TnBCiRwbkY/view?usp=drive_link",
  },
  {
    id: 2,
    text: "Choose your product",
    desc: "Start by selecting from a wide range of products we offer. We have products ranging from Tshirt. Caps, Hoodies,  Shorts, Tank tops to sweatshirts in various quality and quantity.",
    img: "https://drive.google.com/file/d/18j6Tnf-Ikvumgta4gxoYX2sYz5kVb_TP/view?usp=drive_link",
  },
  {
    id: 3,
    text: "Custom build your outfits and packaging",
    desc: "Upload your design directly on your clothes for production and include your labels and  packaging items all in one place.",
    img: "https://drive.google.com/file/d/1fXWD_9qC5zsCZMdvdqc2i9oo82fEPP43/view?usp=drive_link",
  },
  {
    id: 4,
    text: "Request a Quote",
    desc: "After subitting your designs, our team analyses your garment in detail to ensure flawless production results and provides you with a quote for sampling and bulk production. You can reach out to the STYLCON team at any point in time after design submission to ask questions or request additional development services.",
    img: "https://drive.google.com/file/d/14uEPjTZcAmEwN9ysvD8o7VMmwko6w_fN/view?usp=drive_link",
  },
];

export default function How() {
  const router = useRouter();
  return (
    <MainLayout>
      <h1 className="font-bold text-5xl md:text-6xl sm:text-center max-w-[405px] sm:mx-auto px-6 xl:px-0 py-24">
        {"How it works in 4 steps"}
      </h1>
      <div className="max-w-[1079px] mx-auto px-6 xl:px-0 py-24 flex flex-col gap-20 md:gap-32">
        {details.map((deet) => (
          <div
            key={deet.id}
            className={`flex flex-col md:items-center gap-10 ${
              deet.id % 2 === 1 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            <div
              data-aos={deet.id % 2 === 1 ? "fade-left" : "fade-right"}
              className={`md:max-w-[415px] flex flex-col gap-6 ${
                deet.id % 2 === 1 ? "md:pr-3" : ""
              }`}
            >
              <h3 className="flex gap-3 text-4xl font-bold text-dark">
                <span>{deet.id}.</span>
                {deet.text}
              </h3>
              <p className="text-dark text-lg">{deet.desc}</p>
            </div>
            <div
              data-aos={deet.id % 2 === 1 ? "fade-right" : "fade-left"}
              className="w-full  drop-shadow-xl"
            >
              <Image
                src={convertURL(deet.img)}
                width={10000}
                height={10000}
                className=""
                alt=""
              />
            </div>
          </div>
        ))}
      </div>
      <div className="bg-dark py-24 flex flex-col gap-10 items-center mt-10">
        <p className="text-4xl text-white text-center max-w-[625px] mx-auto">
          One tool for development & production, built for independent fashion
          designers and creators.
        </p>
        <ButtonWhite
          text={"Get Started"}
          className={""}
          handleClick={() => router.push("/login")}
        />
      </div>
      <div className="py-20 contain flex flex-col md:flex-row md:items-center gap-10">
        <aside className="flex flex-col gap-10 max-w-[680px]">
          <h3 className="text-4xl font-bold">
            Check out our product guide to see what customization offers we
            offer
          </h3>
          <p className="text-lg">
            Everything you want to know about production from customization to
            finishing. Read about it in our product guide.
          </p>
        </aside>
        <aside className="max-w-[393px] mx-auto md:mx-0">
          <ResourcesCard
            details={{
              img: "",
              text: "Product Guide",
              tag: "Production",
              btnText: "Download Product Guide",
              desc: "This helps you understand all you need to know about product quality, printing, finishing e.t.c",
            }}
          />
        </aside>
      </div>
    </MainLayout>
  );
}
