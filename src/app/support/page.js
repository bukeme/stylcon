"use client";
import MainLayout from "@/components/Layouts/MainLayout";
import CustomLink from "@/components/Shared/CustomLink";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const details = [
  { text: "FAQS", desc: "", url: "/faqs" },
  { text: "Privacy Policy", desc: "", url: "/privacy-policy" },
  { text: "Return Policy", desc: "", url: "/return-policy" },
  { text: "Terms of Service", desc: "", url: "/terms" },
  { text: "Shipping", desc: "", url: "/shipping" },
  { text: "Payment Policy", desc: "", url: "/payment" },
  { text: "Helpful Tips", desc: "", url: "/tips" },
];

export default function Support() {
  const router = useRouter();
  return (
    <MainLayout>
      <section className="contain py-20">
        <div data-aos="zoom-in" className="flex flex-col items-center gap-1">
          <p className="text-grey text-lg">Stylcon</p>
          <h1 className="text-5xl font-bold">Support</h1>
        </div>
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {details.map((deet, i) => (
            <div
              data-aos="flip-up"
              key={i}
              className="border-b-2 border-grey/25 pb-6 flex flex-col gap-6"
            >
              <h3 className="font-bold text-lg">{deet.text}</h3>
              <p className="text-grey">
                {
                  "We are clothing manufacturers based in Nigeria specialized in casual and streetwear for men and women. We are creating ethical motion in the clothing industry and have become the go-to manufacturers for numerous luxury brands."
                }
              </p>
              <CustomLink url={`/support${deet.url}`}>
                <button className="flex gap-6 transition-all duration-500 hover:scale-95">
                  <span className="text-[#000D99] text-lg underline">
                    {"Read more"}
                  </span>

                  <div className="text-white h-[30px] w-[30px] bg-[#000D99] rounded-[50%] flex items-center justify-center">
                    <ArrowRight size={16} />
                  </div>
                </button>
              </CustomLink>
            </div>
          ))}
        </div>
        <div data-aos="fade-up" className="flex flex-col gap-3 mt-16">
          <h2 className="font-bold text-lg text-dark">{"Working with Us"}</h2>
          <p className="text-lg text-dark">
            {
              "We are clothing manufacturers based in Nigeria specialized in casual and streetwear for men and women. We are creating ethical motion in the clothing industry and have become the go-to manufacturers for numerous luxury brands."
            }
          </p>
        </div>
      </section>
    </MainLayout>
  );
}
