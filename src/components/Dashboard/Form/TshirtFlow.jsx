"use client";

import Fits from "./tshirt/Fits";
import useAuthStore from "@/components/authStore";
import ClothType from "./tshirt/ClothType";
import ColorWays from "@/components/Shared/ColorWays";
import NeckLabel from "@/components/Shared/NeckLabel";
import CareLabel from "@/components/Shared/CareLabel";
import Customize from "@/components/Shared/Customize";
import ClothDesign from "@/components/Shared/ClothDesign";
import Packaging from "@/components/Shared/Packaging";
import Quantity from "@/components/Shared/Quantity";
import Delivery from "@/components/Shared/Delivery";
import { useForm } from "../FormContext";

const TshirtFlow = () => {
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
      {activeSideNav === "Fits" && <Fits handleNext={handleNext} />}
      {activeSideNav === "Cloth type" && <ClothType handleNext={handleNext} />}
      {activeSideNav === "Colourways" && <ColorWays handleNext={handleNext} />}
      {activeSideNav === "Neck label" && (
        <NeckLabel
          img={
            "https://drive.google.com/file/d/1iCUFaTPI0JWYThxbfPurOH3W4jN75PNa/view?usp=drive_link"
          }
          handleNext={handleNext}
        />
      )}
      {activeSideNav === "Care label" && <CareLabel handleNext={handleNext} />}
      {activeSideNav === "Design" && (
        <Customize
          imgs={[
            "https://drive.google.com/file/d/1MD6SiR0-OqsjjO9SH13_fpbkTVHacRAN/view?usp=drive_link",
            "https://drive.google.com/file/d/1kSYOr4HVJIXoDAurZH7gNd-HiP3S1tQx/view?usp=drive_link",
          ]}
          handleNext={handleNext}
        />
      )}
      {activeSideNav === "Cloth Design" && (
        <ClothDesign
          options={[
            {
              name: "Regular",
              img: "https://drive.google.com/file/d/1EAnDYTp8EEGBBRlM_QTxZ8ePgdW0HGzs/view?usp=drive_link",
            },
            {
              name: "Color wash",
              img: "https://drive.google.com/file/d/1b4P4nHofUclfgJqOOm3sUMZ4FoyrBVhc/view?usp=drive_link",
            },
            {
              name: "Stitching",
              img: "https://drive.google.com/file/d/1jpqM4IzdXQvPWPDHoMlh4HSat_OfGBkL/view?usp=drive_link",
            },
          ]}
          handleNext={handleNext}
        />
      )}
      {activeSideNav === "Packaging" && (
        <Packaging packageStage={packageStage} handleNext={handleNext} />
      )}
      {activeSideNav === "Quantity" && <Quantity handleNext={handleNext} />}
      {activeSideNav === "Delivery" && <Delivery />}
    </div>
  );
};

export default TshirtFlow;
