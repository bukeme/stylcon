"use client";

import ChooseFit from "@/components/Shared/ChooseFit";
import SizeChart from "@/components/Shared/SizeChart";
import { useEffect, useState } from "react";
import CustomChart from "../../../Shared/CustomChart";
import useAuthStore from "@/components/authStore";
import { toast } from "react-toastify";
import ButtonBlack from "@/components/Shared/ButtonBlack";
import { LoaderIcon } from "lucide-react";
import api from "@/api";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";

const boxyChart = [
  {
    id: "A",
    description: "Total Length",
    sizes: [60, 62, 64, 66, 69, 72, 75],
  },
  {
    id: "B",
    description: "Chest Width",
    sizes: [63, 64, 65, 66, 67, 69, 71],
  },
  {
    id: "C",
    description: "Bottom Width",
    sizes: [57, 58, 59, 60, 61, 63, 65],
  },
  {
    id: "D",
    description: "Bottom Width Rib",
    sizes: [56, 57, 58, 59, 60, 62, 64],
  },
  {
    id: "E",
    description: "Sleeve Length",
    sizes: [52, 53, 54, 55, 56, 57, 58],
  },
  {
    id: "F",
    description: "Armhole",
    sizes: [28.5, 29, 29.5, 30, 30.5, 31, 31.5],
  },
  {
    id: "G",
    description: "Sleeve Opening",
    sizes: [11, 11.5, 12, 12.5, 13, 13.5, 14],
  },
  {
    id: "H",
    description: "Sleeve Opening Rib",
    sizes: [10, 10.5, 11, 11.5, 12, 12.5, 13],
  },

  {
    id: "I",
    description: "Neck Rib Length",
    sizes: [2, 2, 2, 2, 2, 2, 2],
  },
  {
    id: "J",
    description: "Rib Length",
    sizes: [6, 6, 6, 6, 6, 6, 6],
  },

  {
    id: "K",
    description: "Neck Opening",
    sizes: [18, 18, 18, 18, 18, 18, 18],
  },
  {
    id: "L",
    description: "Shoulder to Shoulder",
    sizes: [60, 61, 62, 63, 64, 66, 68],
  },
];
const ballonChart = [
  {
    id: "A",
    description: "Total Length",
    sizes: [63, 65, 67, 69, 71, 74, 77],
  },
  {
    id: "B",
    description: "Chest Width",
    sizes: [60, 62, 64, 66, 68, 70, 72],
  },
  {
    id: "C",
    description: "Bottom Width",
    sizes: [58, 60, 62, 64, 66, 68, 70],
  },
  {
    id: "D",
    description: "Bottom Width Rib",
    sizes: [42, 44, 46, 48, 50, 52, 54],
  },
  {
    id: "E",
    description: "Sleeve Length",
    sizes: [57, 58, 59, 60, 61, 62, 63],
  },
  {
    id: "F",
    description: "Armhole",
    sizes: [28.5, 29, 29.5, 30, 30.5, 31, 31.5],
  },
  {
    id: "G",
    description: "Sleeve Opening",
    sizes: [14.5, 15, 15.5, 16, 16.5, 17, 17.5],
  },
  {
    id: "H",
    description: "Sleeve Opening Rib",
    sizes: [9.5, 10, 10.5, 11, 11.5, 12, 12.5],
  },
  {
    id: "I",
    description: "Neck Rib Length",
    sizes: [2, 2, 2, 2, 2, 2, 2],
  },
  {
    id: "J",
    description: "Rib Length",
    sizes: [6, 6, 6, 6, 6, 6, 6],
  },

  {
    id: "K",
    description: "Neck Opening",
    sizes: [18, 18, 18, 18, 18, 18, 18],
  },
  {
    id: "L",
    description: "Shoulder to Shoulder",
    sizes: [58.5, 60, 61.5, 63, 64.5, 66, 67.5],
  },
];

const Fits = ({ handleNext }) => {
  const [fitChoice, setFitChoice] = useState("Boxy fit");
  const [requirement, setRequirement] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);

  const activeOption =
    fitChoice === "Boxy fit"
      ? boxyChart
      : fitChoice === "Balloon fit"
      ? ballonChart
      : [];

  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { activeId } = useAuthStore();

  useEffect(() => {
    const getDetails = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get(`/api/outfits/fits/${activeId}/`);

        const nameOfFile = data.sizes.split("/").pop();
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
      toast.error(err.message || "Error");
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
            choices={["Boxy fit", "Balloon fit", "Custom fit"]}
            setFitChoice={setFitChoice}
            requirement={requirement}
            setRequirement={setRequirement}
          />
          {fitChoice !== "Custom fit" ? (
            <SizeChart
              sizeChart={activeOption}
              img={
                "https://drive.google.com/file/d/1HPQr0tntPp4Gr2T2vkCxBOoFv-jY207z/view?usp=drive_link"
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
