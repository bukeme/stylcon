"use client";

import useAuthStore from "@/components/authStore";
import ColorWays from "@/components/Shared/ColorWays";
import Customize from "@/components/Shared/Customize";
import Packaging from "@/components/Shared/Packaging";
import Quantity from "@/components/Shared/Quantity";
import Delivery from "@/components/Shared/Delivery";
import BeanieType from "./beanies/BeanieType";
import { useForm } from "../FormContext";

const BeaniesFlow = () => {
  const { activeSideNav, sideNav, setActiveSideNav } = useAuthStore();
  const { packageStage, makePacking, handlePackagingStage } = useForm();

  const handleNext = () => {
    if (!activeSideNav || !sideNav) return;

    const activeIndex = sideNav.indexOf(activeSideNav);

    if (packageStage < 3 && activeSideNav === "Packaging") {
      if (packageStage === 2 && !makePacking) {
        setActiveSideNav(sideNav[activeIndex + 1]);
      } else {
        handlePackagingStage(packageStage + 1);
      }
    } else if (activeIndex > -1 && activeIndex !== sideNav.length - 1) {
      setActiveSideNav(sideNav[activeIndex + 1]);
    }
  };

  return (
    <div className="w-full mt-4 mb-16">
      {activeSideNav === "Beanie Type" && (
        <BeanieType handleNext={handleNext} />
      )}
      {activeSideNav === "Colourways" && <ColorWays handleNext={handleNext} />}
      {activeSideNav === "Design" && (
        <Customize
          imgs={[
            "https://drive.google.com/file/d/1JHuZ29C5iSIo-2zdgV7XXPQW2eDxe3Ia/view?usp=drive_link",
            "https://drive.google.com/file/d/1u1OruGKbjnn03xNJcVWtaPyT7XTVCFBE/view?usp=drive_link",
          ]}
          handleNext={handleNext}
        />
      )}

      {activeSideNav === "Quantity" && <Quantity handleNext={handleNext} />}
      {activeSideNav === "Packaging" && (
        <Packaging packageStage={packageStage} handleNext={handleNext} />
      )}
      {activeSideNav === "Delivery" && <Delivery />}
    </div>
  );
};

export default BeaniesFlow;
