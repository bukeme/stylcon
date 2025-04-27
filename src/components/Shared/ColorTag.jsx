"use client";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";

const ColorTag = ({ color, selectedColors, setSelectedColors, limit }) => {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    const index = selectedColors.indexOf(color);

    if (index > -1 && !isSelected) setIsSelected(true);
  }, [color]);

  useEffect(() => {
    const index = selectedColors.indexOf(color);
    if (index > -1 && isSelected) return;

    if (index < 0 && isSelected) {
      if (selectedColors.length >= limit) {
        setIsSelected(false);
        return;
      }
      let colors = [...selectedColors];
      colors.push(color);
      setSelectedColors(colors);
    }

    if (index > -1 && !isSelected) {
      let colors = [...selectedColors];
      colors.splice(index, 1);

      setSelectedColors(colors);
    }
  }, [isSelected, selectedColors, color]);

  return (
    <div
      onClick={() => {
        setIsSelected((prev) => !prev);
      }}
      style={{ backgroundColor: color }}
      className={`w-[50px] h-[50px] rounded-full border cursor-pointer flex items-center justify-center ${
        color === "#FFFFFF" ? "border-dark" : "border-transparent"
      } ${isSelected && "ring-4 ring-[#2ABFFF]"}`}
    >
      {isSelected && <Check color="#2ABFFF" />}
    </div>
  );
};

export default ColorTag;
