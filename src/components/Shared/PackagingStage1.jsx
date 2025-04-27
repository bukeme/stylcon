"use client";

import Image from "next/image";
import { convertURL } from "./helpers/helpers";

const PackagingStage1 = ({ type, request, setType, setRequest }) => {
  return (
    <section>
      <div>
        <h1 className="text-[28px] font-bold mb-4">Choose your packaging</h1>
        <p>
          Do you want us to pack every piece in your branded bag or use an
          unbranded bag
        </p>
      </div>
      <div className="mt-10 flex flex-col md:flex-row gap-6 md:gap-14">
        <div className="flex flex-col gap-4">
          {["Branded Bags", "Unbranded Bags"].map((item, i) => (
            <div
              key={i}
              className="w-full md:w-[320px] p-8 items-center flex gap-2.5 bg-[#F9F9F9] border border-black/[8%] rounded-2xl cursor-pointer"
              onClick={() => setType(item)}
            >
              <div
                className={`w-[8px] h-[8px] rounded-full ring-1 ring-dark ring-offset-2 ${
                  type === item && "bg-dark"
                }`}
              />
              <p className="font-bold">{item}</p>
            </div>
          ))}

          <textarea
            className="bg-transparent md:w-[320px] focus:outline-none border border-black/10 grow h-[150px] rounded-3xl p-4 placeholder:text-grey"
            placeholder="Special Requests or comments about the outfit"
            value={request}
            onChange={(e) => setRequest(e.target.value)}
          ></textarea>
        </div>
        <Image
          src={
            convertURL(
              "https://drive.google.com/file/d/1-OzPmBxILjckcj4wvXCmJSxMGlx30X3s/view?usp=drive_link"
            ) || ""
          }
          alt=""
          height={1000}
          width={1000}
          className="w-[574px] h-auto"
        />
      </div>
    </section>
  );
};

export default PackagingStage1;
