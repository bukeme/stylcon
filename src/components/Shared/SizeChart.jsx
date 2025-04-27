"use client";

import Image from "next/image";
import SizeLine from "./SizeLine";
import { convertURL } from "./helpers/helpers";

const SizeChart = ({
  sizeChart,
  img,
  sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
}) => {
  return (
    <section className="py-10 bg-white px-4 grow">
      <h2 className="font-bold text-2xl">FIll in the size chart</h2>
      <div className="flex flex-col 2xl:flex-row 2xl:items-center overflow-x-scroll xl:overflow-x-scroll gap-4">
        <div className="flex flex-col w-[574px] gap-4 mt-10">
          <div className="flex gap-3">
            <p className="w-[177px]">{""}</p>
            <div className="flex gap-2">
              {sizes.map((item) => (
                <p
                  key={item}
                  className="w-[48px] h-[45px] flex justify-center items-center"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>

          {sizeChart.map((size) => (
            <SizeLine key={size.id} size={size} />
          ))}
        </div>
        {img ? (
          <Image
            src={convertURL(img) || ""}
            alt=""
            height={1000}
            width={1000}
            className="w-[273px] h-auto"
          />
        ) : (
          <div className="h-[193px] w-full flex items-center justify-center bg-grey/25 animate-pulse" />
        )}
      </div>
    </section>
  );
};

export default SizeChart;
