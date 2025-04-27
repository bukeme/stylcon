"use client";

import useAuthStore from "@/components/authStore";
import ColorWays from "@/components/Shared/ColorWays";
import NeckLabel from "@/components/Shared/NeckLabel";
import CareLabel from "@/components/Shared/CareLabel";
import Customize from "@/components/Shared/Customize";
import ClothDesign from "@/components/Shared/ClothDesign";
import Fits from "./hoodie/Fits";
import ClothType from "@/components/Shared/ClothType";
import Packaging from "@/components/Shared/Packaging";
import Quantity from "@/components/Shared/Quantity";
import Delivery from "@/components/Shared/Delivery";
import { useForm } from "../FormContext";

const HoodiesFlow = () => {
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
            "https://drive.google.com/file/d/1OdwClsNl-ZJxjwT873inU--7FjOgVp3Z/view?usp=drive_link"
          }
          handleNext={handleNext}
        />
      )}
      {activeSideNav === "Care label" && <CareLabel handleNext={handleNext} />}
      {activeSideNav === "Design" && (
        <Customize
          imgs={[
            "https://drive.google.com/file/d/1Pduo42KXesL62DG8Ud2VVmEDRo7jVlti/view?usp=drive_link",
            "https://drive.google.com/file/d/1vI44ac0QpbSYvISuv-2io6S-zBfo_AMt/view?usp=drive_link",
          ]}
          handleNext={handleNext}
        />
      )}
      {activeSideNav === "Cloth Design" && (
        <ClothDesign
          options={[
            {
              name: "Regular",
              img: "https://drive.google.com/file/d/1dHg6tnGhKCHeS2mvVHI14ZOqKXoh_AN-/view?usp=drive_link",
            },
            {
              name: "Color wash",
              img: "https://drive.google.com/file/d/1fOLApvlAhEIOAnIwjnswZz9gaEPRsa5f/view?usp=drive_link",
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

export default HoodiesFlow;
