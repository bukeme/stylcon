"use client";

import useAuthStore from "@/components/authStore";
import ColorWays from "@/components/Shared/ColorWays";
import NeckLabel from "@/components/Shared/NeckLabel";
import CareLabel from "@/components/Shared/CareLabel";
import Customize from "@/components/Shared/Customize";
import ClothDesign from "@/components/Shared/ClothDesign";
import ClothType from "@/components/Shared/ClothType";
import Fits from "./tank-top/Fits";
import Packaging from "@/components/Shared/Packaging";
import Quantity from "@/components/Shared/Quantity";
import Delivery from "@/components/Shared/Delivery";
import { useForm } from "../FormContext";

const TankTopFlow = () => {
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
            "Jersey, 235GSM, 100% cotton",
            "Jersey, 235GSM, 100% organic cotton",
            "Rib, 235GSM, 95% cotton, 5% elastane",
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
            "https://drive.google.com/file/d/1iKmT2_ZPCDPOvwUALRkm65hWKsiRsTrO/view?usp=drive_link",
            "https://drive.google.com/file/d/1-YHwHThASAeaDa3doT94p_EJdzHphZML/view?usp=drive_link",
          ]}
          handleNext={handleNext}
        />
      )}
      {activeSideNav === "Cloth Design" && (
        <ClothDesign
          options={[
            {
              name: "Regular",
              img: "https://drive.google.com/file/d/1ZVI32xBRO-1fPqw06QDp95Yod6AVNpse/view?usp=drive_link",
            },
            {
              name: "Sunfade",
              img: "https://drive.google.com/file/d/1ryYWt1YFPazbP_5dTFjd5Ge5XcsL7G2A/view?usp=drive_link",
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

export default TankTopFlow;
