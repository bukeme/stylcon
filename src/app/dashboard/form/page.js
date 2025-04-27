"use client";
import useAuthStore from "@/components/authStore";
import Capflow from "@/components/Dashboard/Form/Capflow";
import CrewnecksFlow from "@/components/Dashboard/Form/CrewnecksFlow";
import HoodiesFlow from "@/components/Dashboard/Form/HoodiesFlow";
import SocksFlow from "@/components/Dashboard/Form/SocksFlow";
import Longsleeve from "@/components/Dashboard/Form/LongsleeveFlow";
import TankTopFlow from "@/components/Dashboard/Form/TankTopFlow";
import TshirtFlow from "@/components/Dashboard/Form/TshirtFlow";
import ZipHoodieFlow from "@/components/Dashboard/Form/ZipHoodieFlow";
import SweatPantFlow from "@/components/Dashboard/Form/SweatPantFlow";
import PantFlow from "@/components/Dashboard/Form/PantFlow";
import BeaniesFlow from "@/components/Dashboard/Form/BeaniesFlow";
import ShortsFlow from "@/components/Dashboard/Form/ShortsFlow";
import JeansFlow from "@/components/Dashboard/Form/JeansFlow";
import JerseyFlow from "@/components/Dashboard/Form/JerseyFlow";

const {
  default: DasboardLayout,
} = require("@/components/Layouts/DasboardLayout");

const Form = () => {
  const { activeOption } = useAuthStore();

  return (
    <DasboardLayout sidebar={true} className={"bg-[#F9FAFC]"}>
      <div className="lg:h-[90dvh] overflow-y-scroll pb-40">
        {activeOption === "tshirt" && <TshirtFlow />}
        {activeOption === "caps" && <Capflow />}
        {activeOption === "hoodie" && <HoodiesFlow />}
        {activeOption === "sweatshirt" && <CrewnecksFlow />}
        {activeOption === "socks" && <SocksFlow />}
        {activeOption === "zip hoodie" && <ZipHoodieFlow />}
        {activeOption === "denim" && <JeansFlow />}
        {activeOption === "longsleeve" && <Longsleeve />}
        {activeOption === "tank top" && <TankTopFlow />}
        {activeOption === "beanies" && <BeaniesFlow />}
        {activeOption === "pants" && <PantFlow />}
        {activeOption === "jersey" && <JerseyFlow />}
        {activeOption === "sweatpants" && <SweatPantFlow />}
        {activeOption === "shorts" && <ShortsFlow />}
        {activeOption === "custom request" && ""}
      </div>
    </DasboardLayout>
  );
};

export default Form;
