"use client";

import api from "@/api";
import useAuthStore from "@/components/authStore";
import ButtonBlack from "@/components/Shared/ButtonBlack";
import { convertURL } from "@/components/Shared/helpers/helpers";
import { Skeleton } from "@/components/ui/skeleton";
import { LoaderIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const types = [
  {
    name: "Jacquered Beanie",
    img: "https://drive.google.com/file/d/1QAM_ex4WIk9uFrbWYN9DXbXiHu_GakV0/view?usp=drive_link",
  },
  {
    name: "Embroidered Beanie",
    img: "https://drive.google.com/file/d/1TwW3ubdzpDqkT823q5pQJlw899wc4wkt/view?usp=drive_link",
  },
];

const BeanieType = ({ handleNext }) => {
  const [selected, setSelected] = useState(types[0].name);

  const { activeId } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getDetails = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get(`/api/outfits/outfit-type/${activeId}/`);
        // console.log(data);
        setSelected(data.name ? data.name : types ? types[0].name : "");
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
        <section className="p-3 sm:p-10 bg-white flex flex-col gap-10">
          <div>
            <h1 className="text-[28px] font-bold mb-4">Choose your style</h1>
            <p className="text-grey">
              What type of fit do you want the clothes to have on you. Choose a
              pre-made measurement or upload your custom measurement.
            </p>
          </div>
          <div className="flex flex-col items-center sm:items-start sm:flex-row gap-6">
            {types.map((type, i) => (
              <div
                onClick={() => setSelected(type.name)}
                key={i}
                className="bg-[#F9F9F9] border border-black/[8%] p-5 sm:p-8 items-center rounded-2xl w-fit cursor-pointer"
              >
                <div className="flex gap-2 items-center mb-2.5">
                  <div
                    className={`w-[8px] h-[8px] rounded-full ring-1 ring-dark ring-offset-2 ${
                      selected === type.name && "bg-dark"
                    }`}
                  />
                  <p>{type.name}</p>
                </div>
                <Image
                  src={convertURL(type.img) || ""}
                  alt=""
                  height={1000}
                  width={1000}
                  className="h-[193px] w-auto"
                />
              </div>
            ))}
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

export default BeanieType;
