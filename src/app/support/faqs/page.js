"use client";
import MainLayout from "@/components/Layouts/MainLayout";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

const content = {
  "Category ( General)": [
    {
      ques: "WHAT IS THE PURPOSE OF THE BRAND",
      ans: "Our aim to empower upcoming fashion brands and designers in Africa by making fashion more accesible",
    },
    {
      ques: "WHAT DO YOU GUYS DO",
      ans: "We are full service fashion brand development agency, we collaborate with manufacturing houses locally and internationally to produce your garment",
    },
    {
      ques: "WHERE ARE YOU GUYS BASED",
      ans: "Our Headquarters is located at curtain plaza (suite 42) 62, modele street Tejuoso road Surulere Lagos Nigeria",
    },
    {
      ques: "FROM WHERE DO YOU MANUFACTURE",
      ans: "We mainly produce our clothing items from China, certain customization/production are done in Nigeria.",
    },
    {
      ques: "DO YOU OWN YOUR FACTORY IN CHINA",
      ans: "No, we do not personally own any factories in China we are affiliates to different in China",
    },
    {
      ques: "FROM WHERE DO YOU MANUFACTURE",
      ans: "We mainly produce our clothing items from China, certain customization/production are done in Nigeria.",
    },
    { ques: "CAN I PROVIDE MY CLOTHING ITEM FOR PRINTING", ans: "No" },
    {
      ques: "FROM WHERE DO YOU MANUFACTURE",
      ans: "We mainly produce our clothing items from China, certain customization/production are done in Nigeria.",
    },
    {
      ques: "DO YOU ALLOW PHYSICAL VISITS",
      ans: "Yes you are allowed to visit our office in Lagos",
    },
    {
      ques: "HOW DO I START UP MY FASHION BUSINESS",
      ans: "Kindly visit our resources section on the website and download our newbie guide, it outlines the step by step breakdown on how to build a successful fashion business, also download other resources that you mind find useful.",
    },
    {
      ques: "ARE THE ITEMS ON YOUR PAGE FOR SALE",
      ans: "Most of the items displayed on our social media are only for promotional purposes , they are projects of existing clients, we only render production services and sell blank products.",
    },
  ],
  "Production services": [
    {
      ques: "WHAT IS PRODUCTION SERVICES",
      ans: "Our production services are here to actualize your product vision! While many other suppliers offer only a printing service for their blanks, you can create your very own product with us.",
    },
    {
      ques: "WHAT ARE YOUR MINIMUM ORDER QUANTITIES (MOQ)",
      ans: "Our MOQ varies by item but generally items that are require customization only are 30pcs while items that are fully developed from China are 50pcs. More complex items might require an MOQ 100pcs",
    },
    {
      ques: "CAN I ORDER SAMPLES BEFORE ORDERING IN BULK",
      ans: "Definitely you can order samples before producing in bulk , our procedures mandates us to create a sample before producing in bulk but do note that ordering only a sample cost more than a single purchase.",
    },
    {
      ques: "HOW MUCH DOES A SAMPLE COST",
      ans: "The sample cost varies by fashion item being produced.",
    },
    {
      ques: "WHAT IF I DON'T LIKE THE SAMPLES YOU SENT ME",
      ans: "You can adjust your design and do another sample , do note that samples are constructed based on the information provided, sample fee is non refundable.",
    },
    {
      ques: "WHAT ARE THE BENEFITS OF USING YOUR SERVICE",
      ans: "We handle your entire production for you, from design to packaging. Over the past few years, we have built a network of the best factories both locally and internationally. which are also producing for the likes of New balance, broken planet, Hell star off-white,Aime leon dore , stussy . With low quantities, you would normally not get access to these places. With us, you have easy communication, guaranteed quality, and low MOQs",
    },
    {
      ques: "ARE MY DESIGN SAFE WITH YOU",
      ans: "Yes, all of your graphics and patterns are protected and won't get reproduced for any other brand or produced by us for sale",
    },
    {
      ques: "WOULD YOU KEEP THE DESIGNS SO THAT I CAN ORDER MORE IN THE FUTURE?",
      ans: "Yes, all your designs are saved in our databank. As such, you can quickly reorder products as soon as they sell out",
    },
    {
      ques: "WHAT IS THE QUALITY CONTROL PROCESS?",
      ans: "In the quality check, all of the information provided get compared to the approved information provided such as size chart and all seams and prints get checked for any defects.",
    },
  ],
  Wholesale: [
    {
      ques: "DO YOU HAVE PRODUCTS ON STOCK?",
      ans: "Yes, we have BLANKS on stock and try to have them always available. Some BLANKS can be on stock, but not with certainty. Some sizes might run out. Click our website on the page or visit www.stylconblanks.com items listed might not be immediately for pick up because they are located at our Chinese warehouse e but it takes 7-10 working days to have them delivered to you. Item require a min of 12pcs to be preordered. All custom products under the PRODUCTION SERVICES and are tailored to your specification.",
    },
    {
      ques: "HOW CAN I GET A SAMPLE BEFORE PLACING MY BIG ORDER?",
      ans: "You can buy one of our blanks in the blanks store on www.stylconblanks.com. We have no minimums. To get wholesale pricing, you need contact the blanks website administrator via the blanks website and notify him or her to get a special coupon to use during your purchase, note wholesale pricing requires a minimum of 100pcs of an item",
    },
    {
      ques: "CAN YOU MANUFACTURE MY OWN DESIGN?",
      ans: "Yes, our PRODUCTION SERVICES segment is dedicated to custom designed products. You can get a custom colourway, adapt the fit of the piece, and change up things like pockets and stitching. You can also get your graphic designs printed by us.",
    },
  ],
};

export default function FAQS() {
  const [active, setActive] = useState([0, 0]);
  return (
    <MainLayout>
      <section className="contain py-20">
        <div data-aos="zoom-in" className="flex flex-col items-center gap-1">
          <p className="text-grey text-lg">Stylcon</p>
          <h1 className="text-5xl font-bold text-center uppercase">
            Frequently Asked Question
          </h1>
        </div>
        <div className="pt-20 flex flex-col gap-16">
          {Object.entries(content).map((con, i) => (
            <div key={i} className=" flex flex-col gap-6">
              <h2 className="font-bold text-lg">{con[0]}</h2>
              {con[1].map((text, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-[10px] font-bold p-6 bg-[#EFEFEF] rounded-lg"
                >
                  <p
                    onClick={() => setActive([i, index])}
                    className="flex justify-between cursor-pointer"
                  >
                    {text.ques}
                    <ChevronRight
                      className={`transition-all duration-700 ${
                        active[0] === i && active[1] === index && "rotate-90"
                      }`}
                      color="#292D32"
                    />
                  </p>
                  {active[0] === i && active[1] === index && (
                    <p data-aos="zoom-in" className="text-[#515151] pr-14">
                      {text.ans}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </MainLayout>
  );
}
