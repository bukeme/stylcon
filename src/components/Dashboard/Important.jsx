"use client";

import { X } from "lucide-react";
import CustomLink from "../Shared/CustomLink";

const Important = ({ setShowImportant }) => {
  return (
    <div className="mt-6 relative border border-black/10 rounded-xl flex flex-col gap-4 items-center p-6 h-fit">
      <X
        className="absolute top-5 right-5 cursor-pointer"
        size={16}
        onClick={() => setShowImportant(false)}
      />
      <p className="p-2 bg-[#E33D3D]/10 text-[#E33D3D] text-sm rounded-lg">
        Important
      </p>
      <h3 className="text-2xl font-bold">{"Don't start without a design"}</h3>
      <p className="text-grey text-center">
        {
          " Before you create your outfits, kindly ensure you have your design, mockup and techpack ready. If you don't, click the get a design button"
        }
      </p>
      <CustomLink url={"/get-design"}>
        <p className="border border-black/10 rounded-lg bg-transparent text-lg font-bold py-4 px-7">
          Get a design
        </p>
      </CustomLink>
    </div>
  );
};

export default Important;
