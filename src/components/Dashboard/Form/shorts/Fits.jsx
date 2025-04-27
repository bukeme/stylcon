"use client";

import ChooseFit from "@/components/Shared/ChooseFit";
import SizeChart from "@/components/Shared/SizeChart";
import { useEffect, useState } from "react";
import CustomChart from "../../../Shared/CustomChart";
import useAuthStore from "@/components/authStore";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/api";
import { toast } from "react-toastify";
import ButtonBlack from "@/components/Shared/ButtonBlack";
import { LoaderIcon } from "lucide-react";

const regularChart = [
  {
    id: "A",
    description: "Leg Length incl. Waistband",
    sizes: [41, 44, 47, 50, 53],
  },
  {
    id: "B",
    description: "Waistband Stretched",
    sizes: [44, 47, 50, 53, 56],
  },
  {
    id: "C",
    description: "Waistband Relaxed",
    sizes: [29, 32, 35, 38, 41],
  },
  {
    id: "D",
    description: "Thigh Width",
    sizes: [28, 30, 32, 34, 36],
  },
  {
    id: "E",
    description: "Leg Opening",
    sizes: [25, 27, 29, 31, 33],
  },
  {
    id: "F",
    description: "Front Rise incl. Waistband",
    sizes: [31, 31, 31, 31, 31],
  },
  {
    id: "G",
    description: "Back Rise incl. Waistband",
    sizes: [35, 35, 35, 35, 35],
  },
];
const baggyChart = [
  {
    id: "A",
    description: "Leg Length incl. Waistband",
    sizes: [41, 44, 47, 50, 53],
  },
  {
    id: "B",
    description: "Waistband Stretched",
    sizes: [44, 47, 50, 53, 56],
  },
  {
    id: "C",
    description: "Waistband Relaxed",
    sizes: [29, 32, 35, 38, 41],
  },
  {
    id: "D",
    description: "Thigh Width",
    sizes: [33, 35, 37, 39, 41],
  },
  {
    id: "E",
    description: "Leg Opening",
    sizes: [32, 33, 34, 35, 36],
  },
  {
    id: "F",
    description: "Front Rise incl. Waistband",
    sizes: [33, 33, 33, 33, 33],
  },
  {
    id: "G",
    description: "Back Rise incl. Waistband",
    sizes: [38, 38, 38, 38, 38],
  },
];
const Fits = ({ handleNext }) => {
  const [fitChoice, setFitChoice] = useState("Regular fit");
  const [requirement, setRequirement] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { activeId } = useAuthStore();

  const activeOption =
    fitChoice === "Regular fit"
      ? regularChart
      : fitChoice === "Baggy fit"
      ? baggyChart
      : [];

  useEffect(() => {
    const getDetails = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get(`/api/outfits/fits/${activeId}/`);

        const nameOfFile = data.sizes?.split("/").pop();
        setFileName(nameOfFile);

        setFitChoice(data.fit_type ? data.fit_type : "Regular fit");
        setRequirement(data.special_requirements);
      } catch (err) {
        console.log(err);
        toast.error(err.message || "Error");
      } finally {
        setIsLoading(false);
      }
    };

    getDetails();
  }, [activeId]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("id", activeId);
      formData.append("fit_type", fitChoice);
      formData.append("special_requirements", requirement);

      if (fitChoice === "Custom fit") {
        if (file) {
          formData.append("sizes", file);
        } else if (!fileName)
          throw new Error("You need to attach a file for Custom fit");
      }
      await api.post(`/api/outfits/fits/${activeId}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(res);
      toast.success("Saved successfully");
      handleNext();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Skeleton className="h-96 w-full" />
      ) : (
        <div className="flex flex-col xl:flex-row gap-4">
          <ChooseFit
            fitChoice={fitChoice}
            choices={["Regular fit", "Baggy fit", "Custom fit"]}
            setFitChoice={setFitChoice}
            requirement={requirement}
            setRequirement={setRequirement}
          />
          {fitChoice !== "Custom fit" ? (
            <SizeChart
              sizeChart={activeOption}
              sizes={["XS", "S", "M", "L", "XL"]}
              img={
                "https://drive.google.com/file/d/1Rh-S2z79F8-_gicCm7ljPCXSXOnKG4Yv/view?usp=drive_link"
              }
            />
          ) : (
            <CustomChart
              fileName={fileName}
              setFile={setFile}
              setFileName={setFileName}
            />
          )}
        </div>
      )}
      <ButtonBlack
        text={loading ? "" : "Save And Next"}
        icon={loading ? <LoaderIcon className="animate-spin" /> : <></>}
        className={"mt-5 w-full justify-center md:w-fit ml-auto"}
        handleClick={handleSave}
        disabled={fitChoice === "Custom fit" && !file && !fileName}
      />
    </div>
  );
};

export default Fits;
