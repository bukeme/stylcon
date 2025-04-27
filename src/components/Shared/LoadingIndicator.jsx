"use client";

import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import useAuthStore from "../authStore";
import Image from "next/image";

NProgress.configure({ showSpinner: false });

const LoadingIndicator = () => {
  const { pageLoad } = useAuthStore();

  useEffect(() => {
    pageLoad ? NProgress.start() : NProgress.done();
  }, [pageLoad]);

  return (
    <>
      {pageLoad && (
        <div className="fixed top-2 right-2 z-[90]">
          <Image
            src={"/stylcon.png"}
            alt=""
            width={24}
            height={24}
            className="animate-spin"
          />
        </div>
      )}
    </>
  );
};

export default LoadingIndicator;
