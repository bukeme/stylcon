"use client";

import { useEffect } from "react";
import { useForm } from "../Dashboard/FormContext";

const options = [
  "Yes, I'd like them all done in one place.",
  "Don't make my packaging",
];

const PackagingStage2 = ({ choice, request, setChoice, setRequest }) => {
  const { handleMakePacking } = useForm();

  useEffect(() => {
    if (choice === options[0]) handleMakePacking(true);
    if (choice === options[1]) handleMakePacking(false);
  }, [choice]);

  return (
    <section>
      <div>
        <h1 className="text-[28px] font-bold mb-4">Brand Packaging</h1>
        <p>Would you like us to create all your brand custom packaging.</p>
      </div>
      <div className="flex flex-col gap-4 mt-10">
        {options.map((item, i) => (
          <div
            key={i}
            className="w-full p-8 items-center flex gap-2.5 bg-[#F9F9F9] border border-black/[8%] rounded-2xl cursor-pointer"
            onClick={() => setChoice(item)}
          >
            <div
              className={`w-[8px] h-[8px] rounded-full ring-1 ring-dark ring-offset-2 ${
                choice === item && "bg-dark"
              }`}
            />
            <p className="font-bold">{item}</p>
          </div>
        ))}

        <textarea
          className="bg-transparent focus:outline-none border border-black/10 grow h-[150px] rounded-3xl p-4 placeholder:text-grey mt-4"
          placeholder="Special Requests or comments about the packaging"
          value={request}
          onChange={(e) => setRequest(e.target.value)}
        ></textarea>
      </div>
    </section>
  );
};

export default PackagingStage2;
