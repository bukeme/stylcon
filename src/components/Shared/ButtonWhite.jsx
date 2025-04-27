"use client";

const ButtonWhite = ({ text, className, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className={`w-fit Satoshi-bold py-4 px-16 bg-white text-dark rounded-[54px] hover:skew-y-3 active:scale-105 active:bg-dark active:text-white transition-all duration-700 ${className}`}
    >
      {text}
    </button>
  );
};

export default ButtonWhite;
