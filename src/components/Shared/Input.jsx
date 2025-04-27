"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Input = ({
  name,
  type,
  className,
  value,
  setValue,
  label,
  placeHolder,

  errMsg,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className={`flex flex-col gap-2 w-full ${
        isFocused ? "text-dark" : "text-grey"
      } ${errMsg.length > 0 && "!text-[#FF2E2E]"}`}
    >
      <label htmlFor={name}>{label}</label>
      <div
        className={`border relative rounded-lg overflow-hidden ${
          isFocused ? "border-dark" : "border-grey/50"
        } ${errMsg.length > 0 && "!border-[#FF2E2E]/[60%]"}`}
      >
        <input
          type={showPassword ? "text" : type}
          name={name}
          className={`focus:outline-none bg-white w-full pl-4 ${className}`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeHolder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            !value ? setIsFocused(false) : "";
          }}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-1/2 -translate-y-1/2 right-4 z-50 cursor-pointer border-none bg-none"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      <p>{errMsg}</p>
    </div>
  );
};

export default Input;
