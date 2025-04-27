"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CheckIcon } from "lucide-react";
import api from "@/api";
import { Skeleton } from "../ui/skeleton";

const PackagingStage3 = ({ imgs, setImgs }) => {
  const [packagings, setPackagings] = useState([]);

  useEffect(() => {
    const getPackages = async () => {
      try {
        const { data } = await api.get("api/outfits/package-image/list/");
        // console.log(data);
        setPackagings(data);
      } catch (err) {
        console.log(err);
        toast.error(err.message || "Error");
      }
    };
    getPackages();
  }, []);

  const handleAddPackaging = (id) => {
    const index = imgs.indexOf(id);

    if (index < 0) {
      setImgs([...imgs, id]);
    } else {
      const items = [...imgs];
      items.splice(index, 1);
      setImgs(items);
    }
  };

  return (
    <section>
      <div>
        <h1 className="text-[28px] font-bold mb-4">Brand Packaging</h1>
        <p>Would you like us to create all your brand custom packaging.</p>
      </div>
      {packagings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
          {packagings.map((packaging) => (
            <div
              key={packaging.id}
              onClick={() => handleAddPackaging(packaging.id)}
              className={`relative w-full border-2 cursor-pointer ${
                imgs.includes(packaging.id)
                  ? "border-dark"
                  : "border-transparent"
              }`}
            >
              <Image
                src={packaging.image || ""}
                width={1000}
                height={1000}
                alt=""
                className="h-[200px] w-full object-cover"
              />
              <div className="absolute bottom-2 right-3 flex items-center justify-center w-5 h-5 border-2 border-dark rounded-md bg-[#D9D9D9]">
                {imgs.includes(packaging.id) && (
                  <CheckIcon size={12} strokeWidth={3} />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <Skeleton key={num} className="h-[200px] w-full" />
          ))}
        </div>
      )}
    </section>
  );
};

export default PackagingStage3;
