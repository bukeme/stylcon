"use client";

import api from "@/api";
import useAuthStore from "@/components/authStore";
import ButtonBlack from "@/components/Shared/ButtonBlack";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronDown, Info, LoaderIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const ClothType = ({ handleNext }) => {
  const [selected, setSelected] = useState("275gsm");
  const [showOption, setShowOption] = useState(false);
  const dropdownRef = useRef(null);
  const { activeId } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowOption(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const getDetails = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get(`/api/outfits/cloth-type/${activeId}/`);
        // console.log(data);
        setSelected(data.fabric_size ? data.fabric_size : "275gsm");
      } catch (err) {
        console.log(err);
        toast.error(err.message || "Error");
      } finally {
        setIsLoading(false);
      }
    };
    getDetails();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("id", activeId);
    formData.append("fabric_size", selected);

    formData.append("special_requirements", "");

    try {
      await api.post(`/api/outfits/cloth-type/${activeId}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // console.log(res);
      toast.success("Saved successfully");
      handleNext();
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Skeleton className="h-80 w-full" />
      ) : (
        <section className="bg-white py-10 xl:py-20 px-6 xl:px-20">
          <h2 className="font-bold text-2xl mb-4">Choose the type of cloth</h2>
          <p>Pick how thick you want the fabric to be.</p>
          <div ref={dropdownRef} className="mt-10 relative max-w-[290px]">
            <p className="font-semibold">Fabric Sizes:</p>
            <p
              onClick={() => setShowOption((prev) => !prev)}
              className={`mt-4 py-3 px-4 flex justify-between gap-1 border cursor-pointer ${
                selected ? "border-black/10" : "bg-[#F5F5F5] border-transparent"
              }`}
            >
              <span>
                {selected || "Select a fabric"}
                {selected === "275gsm" && (
                  <span className="text-grey"> {"(Recommended)"}</span>
                )}
              </span>
              <ChevronDown strokeWidth="1" />
            </p>
            {showOption && (
              <div className="flex flex-col border border-black/10 bg-white absolute top-full left-0 right-0">
                {["275gsm", "240gsm", "285gsm", "300gsm", "320gsm"].map(
                  (item, i) => (
                    <p
                      key={i}
                      onClick={() => {
                        setSelected(item);
                        setShowOption(false);
                      }}
                      className={`py-4 px-4 hover:bg-[#F4F4F4]/50 ease-linear duration-500 cursor-pointer ${
                        selected === item && "bg-[#F4F4F4]"
                      }`}
                    >
                      {item}
                      {item === "275gsm" && (
                        <span className="text-grey"> {"(Recommended)"}</span>
                      )}
                    </p>
                  )
                )}
              </div>
            )}
          </div>
          <p className="mt-2 flex gap-1 text-xs text-dark">
            <Info strokeWidth={1.5} size={16} color="#0047FF" />
            275 is the universal GSM used by several brands in the world
          </p>
        </section>
      )}
      <ButtonBlack
        text={loading ? "" : "Save And Next"}
        icon={loading ? <LoaderIcon className="animate-spin" /> : <></>}
        className={"mt-5 w-full justify-center md:w-fit ml-auto"}
        handleClick={handleSave}
      />
    </div>
  );
};

export default ClothType;
