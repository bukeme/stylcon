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

const regularChart = [
  {
    id: "A",
    description: "Total Length",
    sizes: [58, 61, 64, 67, 70],
  },
  {
    id: "B",
    description: "Chest Width",
    sizes: [42, 44, 46, 48, 50],
  },
  {
    id: "C",
    description: "Waist Width",
    sizes: [40, 42, 44, 46, 48],
  },
  {
    id: "D",
    description: "Bottom Width",
    sizes: [44, 46, 48, 50, 52],
  },
  {
    id: "E",
    description: "Armhole",
    sizes: [23, 24, 25, 26, 27],
  },
  {
    id: "F",
    description: "Neck Opening",
    sizes: [19, 19, 19, 19, 19],
  },
  {
    id: "G",
    description: "Neck Drop Opening",
    sizes: [10, 10, 10, 10, 10],
  },
  {
    id: "H",
    description: "Neck Drop Back",
    sizes: [3, 3, 3, 3, 3],
  },
  {
    id: "I",
    description: "Strap",
    sizes: [5, 5, 5, 5, 5],
  },
];
const tightChart = [
  {
    id: "A",
    description: "Total Length",
    sizes: [58, 61, 64, 67, 70],
  },
  {
    id: "B",
    description: "Chest Width",
    sizes: [42, 44, 46, 48, 50],
  },
  {
    id: "C",
    description: "Waist Width",
    sizes: [40, 42, 44, 46, 48],
  },
  {
    id: "D",
    description: "Bottom Width",
    sizes: [44, 46, 48, 50, 52],
  },
  {
    id: "E",
    description: "Armhole",
    sizes: [23, 24, 25, 26, 27],
  },
  {
    id: "F",
    description: "Neck Opening",
    sizes: [19, 19, 19, 19, 19],
  },
  {
    id: "G",
    description: "Neck Drop Opening",
    sizes: [10, 10, 10, 10, 10],
  },
  {
    id: "H",
    description: "Neck Drop Back",
    sizes: [3, 3, 3, 3, 3],
  },
  {
    id: "I",
    description: "Strap",
    sizes: [5, 5, 5, 5, 5],
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
      : fitChoice === "Tight fit"
      ? tightChart
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
            choices={["Regular fit", "Tight fit", "Custom fit"]}
            setFitChoice={setFitChoice}
            requirement={requirement}
            setRequirement={setRequirement}
          />
          {fitChoice !== "Custom fit" ? (
            <SizeChart
              sizeChart={activeOption}
              sizes={["XS", "S", "M", "L", "XL"]}
              img={
                "https://drive.google.com/file/d/1ij1KMjVOAjbPDv5lSvcK8j5fBcfampWs/view?usp=drive_link"
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
