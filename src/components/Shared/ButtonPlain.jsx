"use client";
import { ArrowRight } from "lucide-react";

const ButtonPlain = ({ text, handleClick, className }) => {
  return (
    <button
      onClick={handleClick}
      className={`flex gap-4 items-center hover:-skew-y-3 transition-all duration-700 active:scale-110 ${className}`}
    >
      {text} <ArrowRight />
    </button>
  );
};

export default ButtonPlain;
