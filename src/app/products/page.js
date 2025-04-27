"use client";
import MainLayout from "@/components/Layouts/MainLayout";
import { useState } from "react";
import ProductsNav from "./components/ProductsNav";
import ProductsContent from "./components/ProductsContent";

export default function Products() {
  const [mainNav, setMainNav] = useState("Products");
  const [subNav, setSubNav] = useState("TOPS");
  const [subNav2, setSubNav2] = useState("ALL");
  return (
    <MainLayout>
      <section className="flex flex-col gap-6 items-center py-40 contain">
        <h1 className="text-6xl font-bold">Stylcon Catalogue</h1>
        <p className="text-grey sm:text-center max-w-[625px]">
          {
            "  It's our job as fashion people to build products that is not only aesthetically pleasing but enjoyable."
          }
        </p>
      </section>
      <ProductsNav
        mainNav={mainNav}
        setMainNav={setMainNav}
        subNav={subNav}
        setSubNav={setSubNav}
        subNav2={subNav2}
        setSubNav2={setSubNav2}
      />

      <ProductsContent mainNav={mainNav} subNav={subNav} subNav2={subNav2} />
    </MainLayout>
  );
}
