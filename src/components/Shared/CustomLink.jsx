"use client";

import Link from "next/link";
import useAuthStore from "../authStore";
import { startTransition } from "react";

const CustomLink = ({ className, url, children, otherFunc }) => {
  const { setPageLoad } = useAuthStore();

  const handleClick = () => {
    startTransition(() => {
      setPageLoad(true);
    });

    if (otherFunc) {
      otherFunc();
    }
  };
  return (
    <Link href={url} className={className && className} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default CustomLink;
