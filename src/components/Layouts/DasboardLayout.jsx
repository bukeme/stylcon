"use client";
import { ArrowRight } from "lucide-react";
import DashboardSidebar from "./DashboardSidebar";
import useAuthStore from "../authStore";
import { useEffect, useState } from "react";
import CustomLink from "../Shared/CustomLink";
import Image from "next/image";
import { useForm } from "../Dashboard/FormContext";
import { useRouter } from "next/navigation";

const DasboardLayout = ({ children, sidebar, className, isForm = true }) => {
  const { activeSideNav, sideNav, setActiveSideNav, user, setPageLoad } =
    useAuthStore();
  const { packageStage, makePacking, handlePackagingStage, handleMakePacking } =
    useForm();
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setPageLoad(false);
  }, []);

  useEffect(() => {
    // if (!activeSideNav || !sideNav) return;

    setActiveIndex(sideNav?.indexOf(activeSideNav));
  }, [activeSideNav, sideNav]);

  const handleBack = () => {
    if (!activeSideNav || !sideNav) return;

    if (packageStage > 1 && activeSideNav === "Packaging") {
      if (packageStage === 1 && !makePacking) {
        handleMakePacking(true);
      }
      handlePackagingStage(packageStage - 1);
    } else if (activeIndex > -1 && activeIndex !== 0) {
      setActiveSideNav(sideNav[activeIndex - 1]);
    } else if (activeIndex === 0) {
      router.push("/dashboard/options");
    }
  };

  return (
    <div className={`flex lg:h-dvh overflow-hidden ${className}`}>
      {sidebar && (
        <aside className="hidden lg:block min-w-[221px] grow">
          <DashboardSidebar />
        </aside>
      )}
      <div className="w-full">
        <header
          className={`flex items-center justify-between mt-10 lg:mt-0 w-full lg:max-w-[1320px] px-6 lg:h-[10dvh] ${
            !sidebar && "mx-auto"
          }`}
        >
          {!isForm ? (
            <CustomLink url={"/dashboard"}>
              <p className="flex items-center gap-2 text-dark">
                <ArrowRight className="rotate-180" size={16} />
                Back to home
              </p>
            </CustomLink>
          ) : (
            <button onClick={handleBack} className="bg-none border-none">
              <p className="flex items-center gap-2 text-dark">
                <ArrowRight className="rotate-180" size={16} />
                Back
              </p>
            </button>
          )}

          <CustomLink url={"/dashboard/account"}>
            {user?.image ? (
              <Image
                src={user?.image?.image || ""}
                alt=""
                width={54}
                height={54}
                className="rounded-full bg-[#6e78a8]"
              />
            ) : (
              <div className="w-[43px] h-[43px] bg-[#6e78a8] rounded-[50%] flex items-center justify-center">
                <p className="text-2xl font-medium text-white mb-1.5">
                  {`${user?.username || user?.first_name}`
                    ?.split("")[0]
                    ?.toLowerCase() || ""}
                </p>
              </div>
            )}
          </CustomLink>
        </header>
        <main
          className={`w-full px-6 md:max-w-[1320px] ${!sidebar && "mx-auto"}`}
        >
          {sidebar && (
            <div className="lg:hidden mt-6">
              <DashboardSidebar />
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
};

export default DasboardLayout;
