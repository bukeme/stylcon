"use client";

import api from "@/api";
import PackagingStage1 from "./PackagingStage1";
import PackagingStage2 from "./PackagingStage2";
import PackagingStage3 from "./PackagingStage3";
import useAuthStore from "../authStore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Skeleton } from "../ui/skeleton";
import ButtonBlack from "./ButtonBlack";
import { LoaderIcon } from "lucide-react";

const Packaging = ({ packageStage, handleNext }) => {
  const { activeId } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    type: "",
    choice: "",
    imgs: [],
    request1: "",
    request2: "",
  });

  useEffect(() => {
    const getDetails = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get(`/api/outfits/packaging/${activeId}/`);
        // console.log(data);

        const requests = data.special_requirements
          ? data.special_requirements.split("-")
          : "";

        setForm({
          type: data.packaging_type || "Branded Bags",
          choice:
            data.packaging_choice ||
            "Yes, I'd like them all done in one place.",
          imgs: data.image,
          request1: requests.length > 1 ? requests[0] : requests,
          request2: requests.length > 1 ? requests[1] : requests,
        });
      } catch (err) {
        console.log(err);
        toast.error(err.message || "Error");
      } finally {
        setIsLoading(false);
      }
    };
    getDetails();
  }, []);

  const handleSave = async () => {
    setLoading(true);

    try {
      await api.post(`/api/outfits/packaging/${activeId}/`, {
        id: activeId,
        packaging_type: form.type,
        packaging_choice: form.choice,
        image:
          form.choice === "Yes, I'd like them all done in one place."
            ? form.imgs
            : [],
        special_requirements: `${form.request1}-${form.request2}`,
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
        <div className="bg-white p-6 md:p-10">
          {packageStage === 1 && (
            <PackagingStage1
              type={form.type}
              setType={(val) =>
                setForm((prev) => {
                  return {
                    ...prev,
                    type: val,
                  };
                })
              }
              setRequest={(val) =>
                setForm((prev) => {
                  return {
                    ...prev,
                    request1: val,
                  };
                })
              }
              request={form.request1}
            />
          )}
          {packageStage === 2 && (
            <PackagingStage2
              choice={form.choice}
              setChoice={(val) =>
                setForm((prev) => {
                  return {
                    ...prev,
                    choice: val,
                  };
                })
              }
              setRequest={(val) =>
                setForm((prev) => {
                  return {
                    ...prev,
                    request2: val,
                  };
                })
              }
              request={form.request2}
            />
          )}
          {packageStage === 3 && (
            <PackagingStage3
              imgs={form.imgs}
              setImgs={(val) =>
                setForm((prev) => {
                  return {
                    ...prev,
                    imgs: val,
                  };
                })
              }
            />
          )}
        </div>
      )}
      <ButtonBlack
        text={loading ? "" : "Save And Next"}
        icon={loading ? <LoaderIcon className="animate-spin" /> : <></>}
        className={"mt-5 w-full justify-center md:w-fit ml-auto"}
        handleClick={() => {
          if (packageStage === 3) {
            handleSave();
          } else if (
            packageStage === 2 &&
            form.choice !== "Yes, I'd like them all done in one place."
          ) {
            handleSave();
          } else handleNext();
        }}
        disabled={packageStage === 3 && form.imgs.length === 0}
      />
    </div>
  );
};

export default Packaging;
