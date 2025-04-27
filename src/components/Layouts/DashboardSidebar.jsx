"use client";
import { useEffect } from "react";
import useAuthStore from "../authStore";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const DashboardSidebar = () => {
  const { activeOption, sideNav, activeSideNav, setActiveSideNav } =
    useAuthStore();

  useEffect(() => {
    if (sideNav && !activeSideNav) {
      setActiveSideNav(sideNav[0]);
    }
  }, [sideNav, activeSideNav]);

  return (
    <div className="bg-white drop-shadow-sm py-6 px-4 flex flex-col items-start gap-2 lg:h-dvh">
      <h3 className="w-full uppercase font-bold flex items-center justify-center lg:justify-between lg:px-4 py-4 cursor-pointer lg:h-[10dvh]">
        {activeOption}
      </h3>
      <div className="w-full lg:h-[80dvh] overflow-y-scroll flex flex-wrap lg:flex-nowrap justify-center lg:justify-normal lg:flex-col lg:items-start gap-2">
        {sideNav &&
          sideNav.map((nav, i) => (
            <p
              key={i}
              className={`p-2 lg:p-0 w-fit lg:w-full lg:py-4 lg:pl-4 text-left transition-opacity ease-in-out duration-500 cursor-default capitalize ${
                activeSideNav && activeSideNav === nav
                  ? "bg-grey/10 text-dark"
                  : "text-grey"
              } `}
            >
              {nav}
            </p>
          ))}
      </div>
      <Link
        href={"/dashboard"}
        className="flex lg:h-[10dvh] mx-auto mt-4 lg:mt-auto items-end"
      >
        <p className="flex items-center gap-2 text-dark px-8 py-4 bg-[#F3F3F3] rounded-lg">
          <ArrowRight className="rotate-180" size={16} />
          Back to home
        </p>
      </Link>
    </div>
  );
};

export default DashboardSidebar;
