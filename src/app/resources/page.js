"use client";
import MainLayout from "@/components/Layouts/MainLayout";
import Hero from "./components/Hero";
import ResourceContent from "./components/ResourceContent";
import { useRef } from "react";

export default function Resources() {
  const contentRef = useRef();

  const handleScrollTo = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <MainLayout>
      <Hero handleScrollTo={handleScrollTo} />
      <div data-aos="fade-up" className="bg-dark py-16 w-full">
        <h2 className="font-bold text-4xl text-white text-center px-4 max-w-[800px] mx-auto">
          {
            "We've curated all you need to know about building a successful brand."
          }
        </h2>
      </div>
      <ResourceContent contentRef={contentRef} />
    </MainLayout>
  );
}
