"use client";

import api from "@/api";
import useAuthStore from "@/components/authStore";
import ButtonBlack from "@/components/Shared/ButtonBlack";
import { Skeleton } from "@/components/ui/skeleton";
import { LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const sizeOptions = [
  "Women (20cm x 20cm)",
  "Men size (24cm x 24cm)",
  "Unisex size (22cm x 20cm)",
];

const Size = ({ handleNext }) => {
  const [form, setForm] = useState({
    size: sizeOptions[0],
    request: "",
  });
  const { activeId } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getDetails = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get(`/api/outfits/socks-size/${activeId}/`);
        // console.log(data);

        setForm({
          size: data.size ? data.size : sizeOptions[0],
          request: data.special_requirements,
        });
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
      formData.append("size", form.size);

      formData.append("special_requirements", form.request);

      await api.post(`/api/outfits/socks-size/${activeId}/`, formData, {
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
        <section className="p-3 sm:p-10 bg-white flex flex-col gap-10">
          <div>
            <h1 className="text-[28px] font-bold mb-4">Choose your size</h1>
            <p className="text-grey">
              What type of fit do you want the clothes to have on you. Choose a
              pre-made measurement or upload your custom measurement
            </p>
          </div>
          <div className="flex flex-col gap-6">
            {sizeOptions.map((option, i) => (
              <div
                key={i}
                onClick={() => setForm({ ...form, size: option })}
                className="cursor-pointer flex items-center gap-2.5"
              >
                <div
                  className={`w-[8px] h-[8px] rounded-full ring-1 ring-dark ring-offset-2 ${
                    form.size === option && "bg-dark"
                  }`}
                />
                <p>{option}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="">{"Any special requirement's you'd like"}</label>
            <textarea
              className="bg-transparent focus:outline-none border border-black/10 w-full h-[182px] p-4 placeholder:text-grey"
              placeholder=""
              value={form.request}
              onChange={(e) => setForm({ ...form, request: e.target.value })}
            ></textarea>
          </div>
        </section>
      )}
      <ButtonBlack
        text={loading ? "" : "Save And Next"}
        icon={loading ? <LoaderIcon className="animate-spin" /> : <></>}
        className={"mt-5 w-full justify-center md:w-fit ml-auto"}
        handleClick={handleSave}
      />
    </div>
  );
};

export default Size;
