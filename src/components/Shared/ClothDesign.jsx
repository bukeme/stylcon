"use client";

import { useEffect, useState } from "react";
import { convertURL } from "./helpers/helpers";
import Image from "next/image";
import useAuthStore from "../authStore";
import api from "@/api";
import { toast } from "react-toastify";
import { Skeleton } from "../ui/skeleton";
import ButtonBlack from "./ButtonBlack";
import { LoaderIcon } from "lucide-react";

const ClothDesign = ({ options, handleNext }) => {
  const [request, setRequest] = useState("");
  const [selected, setSelected] = useState(options ? options[0] : "");

  const { activeId } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getDetails = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get(
          `/api/outfits/cloth-design/${activeId}/`
        );

        setSelected(
          data.cloth_design_type
            ? options.find((opt) => opt.name === data.cloth_design_type)
            : options[0]
        );
        setRequest(data.special_requirements);
      } catch (err) {
        console.log(err);
        toast.error(err.message || "Error");
      } finally {
        setIsLoading(false);
      }
    };
    getDetails();
  }, [activeId]);

  const handleSave = async () => {
    setLoading(true);
    // console.log(selected);
    try {
      const formData = new FormData();
      formData.append("id", activeId);

      formData.append("cloth_design_type", selected.name);
      formData.append("special_requirements", request);

      await api.post(`/api/outfits/cloth-design/${activeId}/`, formData, {
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
        <Skeleton className="h-96 w-full" />
      ) : (
        <section className="bg-white p-6 md:p-10">
          <div>
            <h1 className="text-[28px] font-bold mb-4">Customization</h1>
            <p>
              {
                "To ensure we get it right, kindly check which of these designs you'd like"
              }
            </p>
          </div>
          {options.length > 0 && (
            <div
              className={`grid grid-cols-1 md:grid-cols-${options.length} gap-4 m4-10 items-center mt-10`}
            >
              {options.map((option, i) => (
                <div
                  onClick={() => setSelected(option)}
                  key={i}
                  className="bg-[#F9F9F9] border border-black/[8%] py-10 px-8 flex flex-col items-center gap-2.5 h-full cursor-pointer"
                >
                  <div className="w-full flex gap-2 items-center">
                    <div
                      className={`w-[8px] h-[8px] rounded-full ring-1 ring-dark ring-offset-2 ${
                        selected.name === option.name && "bg-dark"
                      }`}
                    />

                    <p className="font-bold">{option.name}</p>
                  </div>
                  {option.img ? (
                    <Image
                      src={convertURL(option.img) || ""}
                      alt=""
                      height={1000}
                      width={1000}
                      className="w-auto h-[176px]"
                    />
                  ) : (
                    <div className="h-[193px] w-full flex items-center justify-center bg-grey/25 animate-pulse" />
                  )}
                </div>
              ))}
            </div>
          )}
          <textarea
            className="bg-transparent mt-10 focus:outline-none border border-black/10 w-full max-w-[827px] h-[150px] rounded-3xl p-4 placeholder:text-grey"
            placeholder="Special Requests or comments about the outfit"
            value={request}
            onChange={(e) => setRequest(e.target.value)}
          ></textarea>
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

export default ClothDesign;
