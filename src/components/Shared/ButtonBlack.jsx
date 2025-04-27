"use client";

const ButtonBlack = ({
  text,
  className,
  handleClick,
  icon,
  disabled,
  type,
}) => {
  return (
    <button
      type={type || "button"}
      onClick={!disabled ? handleClick : () => {}}
      className={`bg-dark active:scale-105 active:bg-white active:text-dark transition-all duration-700 px-[1.25rem] py-3 text-white rounded-lg  Satoshi-bold flex items-center ${className} ${
        disabled
          ? "opacity-30 cursor-not-allowed"
          : "opacity-100 cursor-pointer"
      }`}
    >
      {icon ? icon : ""}
      {text}
    </button>
  );
};

export default ButtonBlack;
