"use client";

import ButtonBlack from "@/components/Shared/ButtonBlack";
import useAuthStore from "@/components/authStore";
import ColorWays from "@/components/Shared/ColorWays";
import NeckLabel from "@/components/Shared/NeckLabel";
import CareLabel from "@/components/Shared/CareLabel";
import Customize from "@/components/Shared/Customize";
import ClothDesign from "@/components/Shared/ClothDesign";
import ClothType from "@/components/Shared/ClothType";
import Packaging from "../../Shared/Packaging";
import Quantity from "@/components/Shared/Quantity";
import Delivery from "@/components/Shared/Delivery";
import Fits from "./jeans/Fits";
import { useForm } from "../FormContext";

const JeansFlow = () => {
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
          ]}
          handleNext={handleNext}
        />
      )}
      {activeSideNav === "Colourways" && (
        <ColorWays
          colors={[
            "#09145F",
            "#9DB1E5",
            "#514B2D",
            "#88652C",
            "#D4D4D4",
            "#272727",
          ]}
          handleNext={handleNext}
        />
      )}
      {activeSideNav === "Waistband label" && (
        <NeckLabel
          img={
            "https://drive.google.com/file/d/1FisMW-rwNwHjVMDCbGuxYgvcLkslFDtp/view?usp=drive_link"
          }
          handleNext={handleNext}
        />
      )}
      {activeSideNav === "Care label" && <CareLabel handleNext={handleNext} />}
      {activeSideNav === "Design" && (
        <Customize
          imgs={[
            "https://drive.google.com/file/d/1olocnfUU9bBZuolMVYkNc1YFQZebY_qM/view?usp=drive_link",
            "https://drive.google.com/file/d/1xfo0N0IKPFbnjNp-6QaVTvNwOfWttEDA/view?usp=drive_link",
          ]}
          handleNext={handleNext}
        />
      )}
      {activeSideNav === "Cloth Design" && (
        <ClothDesign
          options={[
            {
              name: "Regular",
              img: "https://drive.google.com/file/d/14w7SK6BpoP2hyRXPkTJuDvrTcu4Ap4IG/view?usp=drive_link",
            },
            {
              name: "Color wash",
              img: "https://drive.google.com/file/d/124v7uT1e5ozzLF9lt6dZWzzf5dAHzK4s/view?usp=drive_link",
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

export default JeansFlow;
