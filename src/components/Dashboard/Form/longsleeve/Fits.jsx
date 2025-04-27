"use client";

import ChooseFit from "@/components/Shared/ChooseFit";
import SizeChart from "@/components/Shared/SizeChart";
import { useEffect, useState } from "react";
import CustomChart from "../../../Shared/CustomChart";
import useAuthStore from "@/components/authStore";
import api from "@/api";
import { toast } from "react-toastify";
import { Skeleton } from "@/components/ui/skeleton";
import ButtonBlack from "@/components/Shared/ButtonBlack";
import { LoaderIcon } from "lucide-react";

const regularFit = [
  {
    id: "A",
    description: "Total Length",
    sizes: [63, 65, 67, 69, 71, 73, 75],
  },
  {
    id: "B",
    description: "Chest Width",
    sizes: [58, 59, 60, 61, 62, 63, 64],
  },
  {
    id: "C",
    description: "Bottom Width",
    sizes: [58, 59, 60, 61, 62, 63, 64],
  },
  {
    id: "D",
    description: "Sleeve Length",
    sizes: [52, 53, 54, 55, 56, 57, 58],
  },
  {
    id: "E",
    description: "Armhole",
    sizes: [25.5, 26, 26.5, 27, 27.5, 28, 28.5],
  },
  {
    id: "F",
    description: "Sleeve Opening",
    sizes: [12.5, 13, 13.5, 14, 14.5, 15, 15.5],
  },
  {
    id: "G",
    description: "Neck Rib Length",
    sizes: [2, 2, 2, 2, 2, 2, 2],
  },
  {
    id: "H",
    description: "Neck Opening",
    sizes: [18, 18, 18, 18, 18, 18, 18],
  },
  {
    id: "I",
    description: "Shoulder to Shoulder",
    sizes: [57, 58, 59, 60, 61, 62, 63],
  },
];

const Fits = ({ handleNext }) => {
  const [fitChoice, setFitChoice] = useState("Boxy fit");
  const [requirement, setRequirement] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { activeId } = useAuthStore();

  useEffect(() => {
    const getDetails = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get(`/api/outfits/fits/${activeId}/`);

        const nameOfFile = data.sizes?.split("/").pop();
        setFileName(nameOfFile);

        setFitChoice(data.fit_type ? data.fit_type : "Boxy fit");
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
            choices={["Boxy fit", "Custom fit"]}
            setFitChoice={setFitChoice}
            requirement={requirement}
            setRequirement={setRequirement}
          />
          {fitChoice !== "Custom fit" ? (
            <SizeChart
              sizeChart={fitChoice !== "Custom fit" ? regularFit : []}
              img={
                "https://drive.google.com/file/d/1pKqN5GBJX2fJaL8PmLgAM3IW8OvQ1pow/view?usp=drive_link"
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
