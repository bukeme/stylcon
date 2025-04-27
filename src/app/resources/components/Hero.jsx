"use client";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

const Hero = ({ handleScrollTo }) => {
  return (
    <section className="max-w-[1078px] mx-auto px-6 xl:px-0 py-24 grid grid-cols-1 md:grid-cols-2 md:items-center gap-6">
      <aside
        data-aos="zoom-in-right"
        className="flex flex-col gap-6 items-start"
      >
        <h3 className="text-5xl lg:text-6xl font-bold max-w-[500px]">
          Confused about where to begin
        </h3>
        <p className="text-grey max-w-[380px]">
          Find all the answers in our product guide
        </p>
        <div className="lg:mt-6 flex flex-col-reverse w-fit lg:flex-row lg:items-center gap-5">
          <a
            href="/product-guide.pdf"
            download="product-guide.pdf"
            className="bg-dark active:scale-105 Satoshi font-bold active:bg-white active:text-dark transition-all duration-700 py-6 px-12 text-white rounded-lg"
          >
            <button>Download Product Guide</button>
          </a>
          <Button
            variant="link"
            className="underline text-grey text-lg flex px-0 justify-start lg:justify-center"
            onClick={handleScrollTo}
          >
            View all resources
            <ArrowDown className="animate-bounce" />
          </Button>
        </div>
      </aside>
      <Image
        data-aos="zoom-in-left"
        src={
          "https://drive.google.com/uc?export=view&id=17EMbhxPqadg_LyjgPnOBuRQMkddEJM3q"
        }
        className="w-full object-cover hidden md:block h-[350px] lg:h-[527px] bg-grey/25"
        alt=""
        width={1000}
        height={1000}
      />
    </section>
  );
};

export default Hero;
