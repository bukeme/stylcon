"use client";

import { useEffect, useState } from "react";
import ProductsCard from "./ProductsCard";
import { PRODUCTS } from "@/constants";

const ProductsContent = ({ mainNav, subNav, subNav2 }) => {
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const data = PRODUCTS;

  useEffect(() => {
    if (data) {
      setIsLoading(true);
      const currentSection = data[mainNav.toLowerCase()];
      const currentCategory =
        mainNav.toLowerCase() === "products"
          ? currentSection.filter(
              (prod) => prod.category === subNav.toLowerCase()
            )
          : subNav2.toLowerCase() === "all"
          ? currentSection
          : currentSection.filter(
              (prod) => prod.category === subNav2.toLowerCase()
            );

      setCategory(currentCategory);

      setIsLoading(false);
    }
  }, [data, mainNav, subNav, subNav2]);

  return (
    <section className="contain grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 mb-16">
      {isLoading
        ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
            <div key={num} className="h-[300px] bg-grey/25 animate-pulse"></div>
          ))
        : category.map((item, i) => <ProductsCard key={i} item={item} />)}
    </section>
  );
};

export default ProductsContent;
