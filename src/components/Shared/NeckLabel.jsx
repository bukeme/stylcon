"use client";

import { useEffect, useState } from "react";
import Input from "./Input";
import Image from "next/image";
import { convertURL } from "./helpers/helpers";
import useAuthStore from "../authStore";
import { toast } from "react-toastify";
import api from "@/api";
import { Skeleton } from "../ui/skeleton";
import ButtonBlack from "./ButtonBlack";
import { Check, LoaderIcon } from "lucide-react";

const labelOptions = [
  "I will send a label",
  "No label",
  "Make my branded Label",
];

const sizeOption = ["Standard Label", "Centre-Fold"];
const colorOption = ["#000000", "#FFFFFF"];

const NeckLabel = ({ img, handleNext }) => {
  const [form, setForm] = useState({
    label: "Make my branded Label",
    size: sizeOption[0],
    color: "",
    request: "",
  });
  const [file, setFile] = useState(null);
  const [image, setImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const { activeId } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getDetails = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get(`/api/outfits/neck-label/${activeId}/`);
        // console.log(data);
        setSelectedColor(data.color);
        setImage(data.design_image || "");
        setForm((prev) => {
          return {
            ...prev,
            label: data.option ? data.option : "Make my branded Label",
            size: data.size ? data.size : sizeOption[0],
            request: data.special_requirements,
            color: data.custom_color || "",
          };
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
      formData.append("option", form.label);
      formData.append(
        "size",
        form.label === "Make my branded Label" ? form.size : ""
      );
      formData.append(
        "color",
        form.label === "Make my branded Label" ? selectedColor : ""
      );
      formData.append(
        "custom_color",
        form.label === "Make my branded Label" ? form.color : ""
      );

      if (form.label === "Make my branded Label") {
        if (!file && !image) {
          throw new Error("Kindly upload your logo image");
        } else if (file) formData.append("design_image", file);
      }

      formData.append("special_requirements", form.request);

      await api.post(`/api/outfits/neck-label/${activeId}/`, formData, {
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
    if (form.label !== "Make my branded Label") {
      return false;
    } else if (form.size && image) {
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
        <div className="flex flex-col md:flex-row gap-2.5 md:mt-6">
          <section className="flex flex-col gap-2.5 md:w-fit">
            <div className="w-full p-8 2xl:px-10 bg-white grow">
              <h3 className="text-2xl font-bold mb-8 whitespace-nowrap">
                Select a Label option
              </h3>
              <div className="flex flex-col gap-6">
                {labelOptions.map((option, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setForm({ ...form, label: option });
                      setImage("");
                    }}
                    className="cursor-pointer flex items-center gap-2.5"
                  >
                    <div
                      className={`w-[8px] h-[8px] rounded-full ring-1 ring-dark ring-offset-2 ${
                        form.label === option && "bg-dark"
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
            {/*  */}
            {form.label === "Make my branded Label" && (
              <div className="py-8 px-10 bg-white">
                <h3 className="text-2xl font-bold mb-8">Choose size</h3>
                <div className="flex flex-col gap-6">
                  {sizeOption.map((option, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setForm({ ...form, size: option });
                        setImage("");
                      }}
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
              </div>
            )}
            {form.label === "Make my branded Label" && (
              <div className="py-8 px-10 bg-white">
                <h3 className="text-2xl font-bold mb-8">Label Color</h3>
                <div className="flex gap-2 mb-2.5">
                  {colorOption.map((color) => (
                    <div
                      key={color}
                      onClick={() => {
                        if (selectedColor === color) {
                          setSelectedColor("");
                          return;
                        }
                        setSelectedColor(color);
                      }}
                      style={{ backgroundColor: color }}
                      className={`w-[50px] h-[50px] rounded-full border cursor-pointer flex items-center justify-center ${
                        color === "#FFFFFF"
                          ? "border-dark"
                          : "border-transparent"
                      } ${selectedColor === color && "ring-4 ring-[#2ABFFF]"}`}
                    >
                      {selectedColor === color && <Check color="#2ABFFF" />}
                    </div>
                  ))}
                </div>
                <Input
                  value={form.color}
                  setValue={(val) => setForm({ ...form, color: val })}
                  errMsg={""}
                  placeHolder={"Type any colour you'd like"}
                  className={"h-12"}
                />
              </div>
            )}
          </section>
          <section className="grow flex flex-col gap-10">
            <div
              className={`bg-white p-8 grow flex flex-col gap-20 items-center ${
                form.label === "Make my branded Label"
                  ? "md:grid md:grid-cols-2"
                  : "md:justify-center"
              }`}
            >
              {img ? (
                <Image
                  src={convertURL(img) || ""}
                  alt=""
                  height={1000}
                  width={1000}
                  className="w-[439px] h-auto"
                />
              ) : (
                <div className="h-[193px] w-full flex items-center justify-center bg-grey/25 animate-pulse" />
              )}
              {form.label === "Make my branded Label" && (
                <label htmlFor="upload-label">
                  {form.size === "Standard Label" && !image && (
                    <div className="flex flex-col gap-6 w-[107px] items-center cursor-pointer">
                      <Image
                        src={
                          convertURL(
                            "https://drive.google.com/file/d/13QFfp2lUt0IKbbfJK3PeMMBpPNJfVQEN/view?usp=drive_link"
                          ) || ""
                        }
                        alt=""
                        height={1000}
                        width={1000}
                        className="w-full h-auto"
                      />
                      <p className="text-center text-[#D33030]">
                        Add your logo/design
                      </p>
                    </div>
                  )}
                  {form.size === "Centre-Fold" && !image && (
                    <div className="flex flex-col gap-6 items-center cursor-pointer">
                      <Image
                        src={
                          convertURL(
                            "https://drive.google.com/file/d/1xV-Lr0k7Jkb6VCl3m04HVvYC81wCRs0m/view?usp=drive_link"
                          ) || ""
                        }
                        alt=""
                        height={1000}
                        width={1000}
                        className="w-full h-auto"
                      />
                      <p className="text-center text-[#D33030] max-w-[107px]">
                        Add your logo/design
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    id="upload-label"
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                  />
                  {image && (
                    <div className="cursor-pointer w-[250px]">
                      <Image
                        src={image}
                        alt=""
                        height={1000}
                        width={1000}
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </label>
              )}
            </div>
            <textarea
              className="bg-transparent focus:outline-none border border-black/10 w-full h-[150px] rounded-[31px] p-4 placeholder:text-grey"
              placeholder="Special Requests or comments about the label"
              value={form.request}
              onChange={(e) => setForm({ ...form, request: e.target.value })}
            ></textarea>
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

export default NeckLabel;
