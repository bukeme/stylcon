"use client";

import api from "@/api";
import useAuthStore from "@/components/authStore";
import ButtonBlack from "@/components/Shared/ButtonBlack";
import ChooseFit from "@/components/Shared/ChooseFit";
import CustomChart from "@/components/Shared/CustomChart";
import SizeChart from "@/components/Shared/SizeChart";
import { Skeleton } from "@/components/ui/skeleton";
import { LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const sizeChart = [
  {
    id: "A",
    description: "Leg Length incl. Waistband",
    sizes: [63, 65, 67, 69, 71, 73, 75],
  },
  {
    id: "B",
    description: "Waistband Stretched",
    sizes: [58, 59, 60, 61, 62, 63, 64],
  },
  {
    id: "C",
    description: "Waistband Relaxed",
    sizes: [58, 59, 60, 61, 62, 63, 64],
  },
  {
    id: "D",
    description: "Thigh Width",
    sizes: [20, 21, 22, 23, 24, 25, 26],
  },
  {
    id: "E",
    description: "Leg Opening",
    sizes: [23.5, 24, 24.5, 25, 25.5, 26, 26.5],
  },

  {
    id: "F",
    description: "Front Rise incl. Waistband",
    sizes: [2, 2, 2, 2, 2, 2, 2],
  },
  {
    id: "G",
    description: "Back Rise incl. Waistband",
    sizes: [18, 18, 18, 18, 18, 18, 18],
  },
];

const Fits = ({ handleNext }) => {
  const [fitChoice, setFitChoice] = useState("Regular Leg");
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
            choices={["Regular fit", "Custom fit"]}
            setFitChoice={setFitChoice}
            requirement={requirement}
            setRequirement={setRequirement}
          />
          {fitChoice !== "Custom fit" ? (
            <SizeChart
              sizeChart={fitChoice === "Regular fit" ? sizeChart : []}
              img={
                "https://drive.google.com/file/d/1E2-3k-MoIXT2CruHJqDlpaGLfstV-9fP/view?usp=drive_link"
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
