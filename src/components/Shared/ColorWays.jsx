"use client";

import { useEffect, useState } from "react";
import Input from "./Input";
import ColorTag from "./ColorTag";
import useAuthStore from "../authStore";
import { toast } from "react-toastify";
import api from "@/api";
import { Skeleton } from "../ui/skeleton";
import ButtonBlack from "./ButtonBlack";
import { LoaderIcon } from "lucide-react";

const defaultColors = [
  "#FDC109",
  "#FF6A0D",
  "#C90000",
  "#6A2D5D",
  "#005E44",
  "#7F856D",
  "#586764",
  "#2F74B8",
  "#3D438B",
  "#123954",
  "#4E5A7B",
  "#63687A",
  "#858282",
  "#615C62",
  "#D7DBD9",
  "#E5D0B1",
  "#C8B596",
  "#8C5B40",
  "#5E3F32",
  "#FFFFFF",
  "#000000",
];

const ColorWays = ({ colors = defaultColors, handleNext }) => {
  const [selectedColors, setSelectedColors] = useState([]);
  const [customColor, setCustomColor] = useState("");
  const { activeId } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getDetails = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get(`/api/outfits/colorway/${activeId}/`);
        // console.log(data);
        setSelectedColors(data.color ? data.color.split(" ") : []);
        setCustomColor(data.custom_color);
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
    const formData = new FormData();
    formData.append("id", activeId);
    formData.append("color", selectedColors.join(" "));

    formData.append("custom_color", customColor);

    try {
      await api.post(`/api/outfits/colorway/${activeId}/`, formData, {
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
        <section className="px-4 py-6 md:p-10 bg-white">
          <h2 className="font-bold text-2xl mb-4">Select colourways</h2>
          <p className="flex items-center gap-3">
            Choose one or more colourways
            <span className="bg-grey/10 py-0.5 px-2 rounded-sm">
              {selectedColors.length}
            </span>
          </p>

          <div className="flex flex-col md:flex-row-reverse justify-between gap-6 my-10">
            <div className="p-4 flex flex-col gap-4 bg-[#F4F4F4] lg:max-w-[321px]">
              {[
                "For customized pieces, you can pick upto 3 colors for an MOQ of 30pcs",
                "For fully developed pieces, you can only pick a single color for an MOQ of 50pcs",
              ].map((text, i) => (
                <p className="font-medium" key={i}>
                  {text}
                </p>
              ))}
            </div>
            <div className="flex flex-wrap max-w-[730px] gap-2 h-fit">
              {colors.map((color) => (
                <ColorTag
                  key={color}
                  color={color}
                  selectedColors={selectedColors}
                  setSelectedColors={setSelectedColors}
                  limit={3}
                />
              ))}
            </div>
          </div>
          <Input
            name={"customColor"}
            type="text"
            className={"h-[62px]"}
            value={customColor}
            setValue={(val) => setCustomColor(val)}
            label={"Custom Color/Instructions"}
            placeHolder={""}
            errMsg={""}
          />
        </section>
      )}
      <ButtonBlack
        text={loading ? "" : "Save And Next"}
        icon={loading ? <LoaderIcon className="animate-spin" /> : <></>}
        className={"mt-5 w-full justify-center md:w-fit ml-auto"}
        handleClick={handleSave}
        disabled={selectedColors.length === 0 && !customColor}
      />
    </div>
  );
};

export default ColorWays;
