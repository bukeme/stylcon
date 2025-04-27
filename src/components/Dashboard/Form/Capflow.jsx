"use client";

import useAuthStore from "@/components/authStore";
import ButtonBlack from "@/components/Shared/ButtonBlack";
import ClothType from "@/components/Shared/ClothType";
import ColorWays from "@/components/Shared/ColorWays";
import Customize from "@/components/Shared/Customize";
import Delivery from "@/components/Shared/Delivery";
import NeckLabel from "@/components/Shared/NeckLabel";
import Packaging from "@/components/Shared/Packaging";
import Quantity from "@/components/Shared/Quantity";
import { useForm } from "../FormContext";

const Capflow = () => {
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
      {activeSideNav === "Type" && (
        <ClothType
          types={[
            "Snapback",
            "5D Panel Hat",
            "Bucket Hat",
            "Baseball Hat",
            "Trucker Hat",
          ]}
          hasTextarea={false}
          handleNext={handleNext}
        />
      )}
      {activeSideNav === "Colourways" && <ColorWays handleNext={handleNext} />}
      {activeSideNav === "Cap label" && (
        <NeckLabel
          img={
            "https://drive.google.com/file/d/14xsOIH-8_q2QgHx_MMh3k25G8nfJD74l/view?usp=drive_link"
          }
          handleNext={handleNext}
        />
      )}
      {activeSideNav === "Design" && (
        <Customize
          imgs={[
            "https://drive.google.com/file/d/1X0ouGHC0iGPTU70yjWAYrNB9thCrwa1o/view?usp=drive_link",
            "https://drive.google.com/file/d/1sC_aPb6CY2vQAIBlS-CmCwFTzcTAvZwy/view?usp=drive_link",
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

export default Capflow;
