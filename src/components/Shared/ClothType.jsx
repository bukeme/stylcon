"use client";

import { useEffect, useState } from "react";
import useAuthStore from "../authStore";
import api from "@/api";
import { toast } from "react-toastify";
import { Skeleton } from "../ui/skeleton";
import ButtonBlack from "./ButtonBlack";
import { LoaderIcon } from "lucide-react";

const ClothType = ({ types, hasTextarea = true, handleNext }) => {
  const [request, setRequest] = useState("");
  const [selected, setSelected] = useState(types ? types[0] : "");
  const { activeId } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getDetails = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get(`/api/outfits/outfit-type/${activeId}/`);
        // console.log(data);
        setSelected(data.name ? data.name : types ? types[0] : "");
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

    try {
      const formData = new FormData();
      formData.append("id", activeId);
      formData.append("name", selected);

      await api.post(`/api/outfits/outfit-type/${activeId}/`, formData, {
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
        <section className="bg-white p-6 md:py-[60px] md:px-20 md:p-10">
          <div>
            <h1 className="text-[28px] font-bold mb-4">
              Choose your cloth type
            </h1>
            <p>What type of hat do you want to customize</p>
          </div>
          <div className="mt-10 flex flex-wrap justify-center md:justify-normal gap-4">
            {types &&
              types.map((type, i) => (
                <div
                  key={i}
                  className="w-full md:w-[48%] xl:w-[32.1%] h-fit p-8 items-center flex gap-2.5 bg-[#F9F9F9] border border-black/[8%] rounded-2xl cursor-pointer"
                  onClick={() => setSelected(type)}
                >
                  <div
                    className={`w-[8px] h-[8px] rounded-full ring-1 ring-dark ring-offset-2 ${
                      selected === type && "bg-dark"
                    }`}
                  />
                  <p className="font-medium">{type}</p>
                </div>
              ))}
            {hasTextarea && (
              <textarea
                className="bg-transparent focus:outline-none border border-black/10  grow h-[150px] rounded-3xl p-4 placeholder:text-grey"
                placeholder="Special Requests or comments about the outfit"
                value={request}
                onChange={(e) => setRequest(e.target.value)}
              ></textarea>
            )}
          </div>
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
