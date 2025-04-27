"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { convertURL } from "./helpers/helpers";
import { LoaderIcon, Plus } from "lucide-react";
import useAuthStore from "../authStore";
import api from "@/api";
import { toast } from "react-toastify";
import { Skeleton } from "../ui/skeleton";
import ButtonBlack from "./ButtonBlack";

const logoOptions = ["Stylcon logo", "My brand logo"];

const CareLabel = ({ handleNext }) => {
  const [form, setForm] = useState({
    logo: "My brand logo",
    request: "",
  });
  const [file, setFile] = useState(null);
  const [image, setImage] = useState("");
  const { activeId } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getDetails = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get(`/api/outfits/care-label/${activeId}/`);
        // console.log(data);

        setImage(
          data.option !== "My brand logo" ? "" : data.design_image || ""
        );
        setForm({
          logo: data.option ? data.option : "My brand logo",
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
      formData.append("option", form.logo);

      if (form.logo === "My brand logo") {
        if (!file && !image) {
          throw new Error("Kindly upload your logo image");
        } else if (file) formData.append("design_image", file);
      }

      formData.append("special_requirements", form.request);

      await api.post(`/api/outfits/care-label/${activeId}/`, formData, {
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

  const setLabel = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const isDisabled = () => {
    if (form.logo !== "My brand logo") {
      return false;
    } else if (image) {
      return false;
    }

    return true;
  };

  const handleFileChange = (e) => {
    const newFile = e.target.files?.[0];
    if (newFile) {
      setLabel(newFile);
      setFile(newFile);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Skeleton className="h-96 w-full" />
      ) : (
        <div className="flex flex-col md:flex-row gap-5">
          <section className="flex flex-col gap-4 md:w-fit">
            <div className="py-8 px-10 bg-white">
              <h3 className="text-2xl font-bold mb-8">
                Select your Care label option
              </h3>
              <div className="flex flex-col gap-6">
                {logoOptions.map((option, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setForm({ ...form, logo: option });
                    }}
                    className="cursor-pointer flex items-center gap-2.5"
                  >
                    <div
                      className={`w-[8px] h-[8px] rounded-full ring-1 ring-dark ring-offset-2 ${
                        form.logo === option && "bg-dark"
                      }`}
                    />
                    <p>{option}</p>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-grey ml-5">
                Woven Labels, MOQ: 1000pcs
              </p>
            </div>
            <textarea
              className="bg-transparent focus:outline-none border border-black/10 w-full h-[150px] rounded-[31px] p-4 placeholder:text-grey"
              placeholder="Special Requests or comments about the label"
              value={form.request}
              onChange={(e) => setForm({ ...form, request: e.target.value })}
            ></textarea>
          </section>
          <section className="grow p-10 bg-white flex justify-center">
            <div className="w-[130px] relative">
              {form.logo === "Stylcon logo" && (
                <div className="w-full bg-[#EDEDED] py-2 flex justify-center absolute top-3">
                  <Image
                    src={"/logo.png"}
                    alt=""
                    height={1000}
                    width={1000}
                    className="w-3/4 h-auto"
                  />
                </div>
              )}
              {form.logo === "My brand logo" && (
                <label
                  htmlFor="upload-care_label"
                  className="w-full bg-[#EDEDED] py-2 flex justify-center absolute top-3 cursor-pointer"
                >
                  {!image && (
                    <div className="bg-white p-2 rounded-full">
                      <Plus size={16} />
                    </div>
                  )}
                  <input
                    type="file"
                    id="upload-care_label"
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                  />
                  {image && (
                    <Image
                      src={image}
                      alt=""
                      height={1000}
                      width={1000}
                      className="w-auto h-[40px] object-cover"
                    />
                  )}
                </label>
                // max-w-[75%]
              )}
              <Image
                src={
                  convertURL(
                    "https://drive.google.com/file/d/1OY985YtNPzmIZ6F3cYzKkewcYdYkBI3w/view?usp=drive_link"
                  ) || ""
                }
                alt=""
                height={1000}
                width={1000}
                className="w-full h-auto"
              />
            </div>
          </section>
        </div>
      )}

      <ButtonBlack
        text={loading ? "" : "Save And Next"}
        icon={loading ? <LoaderIcon className="animate-spin" /> : <></>}
        className={"mt-5 w-full justify-center md:w-fit ml-auto"}
        handleClick={handleSave}
        disabled={isDisabled()}
      />
    </div>
  );
};

export default CareLabel;
