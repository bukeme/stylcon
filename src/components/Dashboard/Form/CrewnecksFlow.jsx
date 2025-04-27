"use client";

import ButtonBlack from "@/components/Shared/ButtonBlack";
import useAuthStore from "@/components/authStore";
import ColorWays from "@/components/Shared/ColorWays";
import NeckLabel from "@/components/Shared/NeckLabel";
import CareLabel from "@/components/Shared/CareLabel";
import Customize from "@/components/Shared/Customize";
import ClothDesign from "@/components/Shared/ClothDesign";
import ClothType from "@/components/Shared/ClothType";
import Fits from "./crewnecks/Fits";
import Packaging from "@/components/Shared/Packaging";
import Quantity from "@/components/Shared/Quantity";
import Delivery from "@/components/Shared/Delivery";
import { useForm } from "../FormContext";

const CrewnecksFlow = () => {
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
      {activeSideNav === "Cloth type" && (
        <ClothType
          types={[
            "Custom Fabric Request",
            "Fleece 330GSM, 100% organic cotton",
            "Fleece, 400GSM, 100% cotton",
            "Fleece, 400GSM, 100% organic cotton",
            "French Terry, 500GSM, 100% cotton",
          ]}
          handleNext={handleNext}
        />
      )}
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
            "https://drive.google.com/file/d/1WT1WMi666xe-HI_g5-VxleIbh4_u5HLu/view?usp=drive_link",
            "https://drive.google.com/file/d/1IZP7-Ht0sEmwKDxM1XmWNjPssPe1QLSh/view?usp=drive_link",
          ]}
          handleNext={handleNext}
        />
      )}
      {activeSideNav === "Cloth Design" && (
        <ClothDesign
          options={[
            {
              name: "Regular",
              img: "https://drive.google.com/file/d/13fomystZRvgXZqI24zvEdjqOvfCFLxuq/view?usp=drive_link",
            },
            {
              name: "Color wash",
              img: "https://drive.google.com/file/d/1QWwSrCIswNuxx1qIBKtptVzNh-bmovpr/view?usp=drive_link",
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

export default CrewnecksFlow;
