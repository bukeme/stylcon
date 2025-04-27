"use client";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    ques: "What's your MOQ on T-shirts?",
    ans: "For customization, our minimum quantity is 30 pieces.",
    id: 1,
  },
  {
    ques: "What types of printing do you do?",
    ans: " Screen Printing, Embriodery, Vinyl, DTG(Direct to Garment), DTF(Direct to Film), Sublimation.",
    id: 2,
  },
  {
    ques: "Are your clothes made locally or imported?",
    ans: "85% of our products are made from china. ",
    id: 3,
  },
  {
    ques: "Can you produce items based on my sketch",
    ans: "Yes, all we need is a detailed techpack outining the accessories, patterns and fabric, measurements and all other information pertaining to the outfit. We also make techpacks and designs based on your ideas.",
    id: 4,
  },
];

const FAQs = () => {
  const [active, setActive] = useState(-1);

  return (
    <section className="contain py-28 text-dark">
      <div className="flex flex-col gap-2 items-start mb-6">
        <h3 className="text-4xl font-bold">FAQs</h3>
        <p className="text-lg text-grey">
          All you need to know about starting a fashion brand
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {FAQS.map((item) => (
          <div key={item.id} className="">
            <div className="flex justify-between p-4 items-center bg-white drop-shadow rounded gap-1">
              <p className="font-bold text-lg lg:text-2xl">{item.ques}</p>
              <span
                onClick={() => {
                  active === item.id ? setActive(-1) : setActive(item.id);
                }}
                className="text-grey p-2 xs:p-4 lg:p-6 bg-grey/[15%] rounded-[50%] cursor-pointer"
              >
                {active === item.id ? <Minus size={24} /> : <Plus size={24} />}
              </span>
            </div>
            <AnimatePresence>
              {active === item.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-8 px-4 lg:text-xl bg-[#F2F2F2] drop-shadow rounded"
                >
                  {item.ans}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQs;
