"use client";

import useAuthStore from "@/components/authStore";
import ColorWays from "@/components/Shared/ColorWays";
import NeckLabel from "@/components/Shared/NeckLabel";
import CareLabel from "@/components/Shared/CareLabel";
import Customize from "@/components/Shared/Customize";
import Packaging from "@/components/Shared/Packaging";
import Quantity from "@/components/Shared/Quantity";
import Delivery from "@/components/Shared/Delivery";
import { useForm } from "../FormContext";
import Fits from "./jersey/Fits";
import ClothType from "@/components/Shared/ClothType";

const JerseyFlow = () => {
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
            "Custom Jersey",
            "Hockey Jersey",
            "Football Jersey",
            "NFL Jersey",
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
            "https://drive.google.com/file/d/19EGfR3uqgKq6ji5Mk7kEj_20BxohMo_s/view?usp=drive_link",
            "https://drive.google.com/file/d/1NAECYebmqfhoYLOtQlaFkC2wWq_Uyze1/view?usp=drive_link",
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

export default JerseyFlow;
