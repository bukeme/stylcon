"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { convertURL } from "./helpers/helpers";
import Input from "./Input";
import useAuthStore from "../authStore";
import api from "@/api";
import { toast } from "react-toastify";
import { Skeleton } from "../ui/skeleton";
import ButtonBlack from "./ButtonBlack";
import { LoaderIcon } from "lucide-react";

const Customize = ({ imgs, handleNext }) => {
  const [request, setRequest] = useState("");
  const [url, setUrl] = useState("");
  const { activeId } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getDetails = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get(`/api/outfits/design/${activeId}/`);
        // console.log(data);
        setUrl(data.file_link);
        setRequest(data.special_requirements);
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
      formData.append("file_link", url);

      formData.append("special_requirements", request);

      await api.post(`/api/outfits/design/${activeId}/`, formData, {
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
        <section className="bg-white p-6 md:p-10">
          <div>
            <h1 className="text-[28px] font-bold mb-4">
              Add customizations details
            </h1>
            <p>To ensure we get it right, kindly do the following</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 items-center">
            <div className="bg-[#F9F9F9] border border-black/[8%] py-10 px-8 flex flex-col items-center gap-2.5 h-full justify-between">
              <div className="flex gap-2">
                1. <p>Download the template and add your design and details</p>
              </div>
              {imgs ? (
                <Image
                  src={convertURL(imgs[0]) || ""}
                  alt=""
                  height={1000}
                  width={1000}
                  className="w-auto max-h-[150px]"
                />
              ) : (
                <div className="h-[50px] w-full flex items-center justify-center bg-grey/25 animate-pulse" />
              )}

              <a
                href="/upload-guide.pdf"
                download="upload-guide.pdf"
                className="bg-dark active:scale-105 active:bg-white active:text-dark transition-all duration-700 px-[1.25rem] py-3 text-white rounded-lg flex items-center"
              >
                <button>Download guide</button>
              </a>
            </div>
            <div className="bg-[#F9F9F9] border border-black/[8%] py-10 px-8 flex flex-col items-center gap-2.5 h-full justify-between ">
              <p className="flex gap-2">
                2. <span>Upload edited template with your design</span>
              </p>
              {imgs ? (
                <Image
                  src={convertURL(imgs[1]) || ""}
                  alt=""
                  height={1000}
                  width={1000}
                  className="w-auto h-[150px]"
                />
              ) : (
                <div className="h-[50px] w-full flex items-center justify-center bg-grey/25 animate-pulse" />
              )}

              <Input
                name={"url"}
                type="text"
                className={"h-[38px] !w-full"}
                value={url}
                setValue={(val) => setUrl(val)}
                label={""}
                placeHolder={"Paste your drive link here."}
                errMsg={""}
              />
              {/*  */}
            </div>
            <div className="flex flex-col gap-4 min-h-[341px] h-full">
              <div className="bg-[#F4F4F4] rounded-2xl p-4">
                <h4 className="font-bold">There are only 3 rules of thumb</h4>
                <div className="flex flex-col gap-1 mt-2.5">
                  {[
                    "1. Download the guide",
                    "2. Read our file upload to know the acceptable files",
                    "3. Upload the files to a drive and paste the drive link in the textbox",
                  ].map((text, i) => (
                    <p key={i}>{text}</p>
                  ))}
                </div>
              </div>
              <textarea
                className="bg-transparent focus:outline-none border border-black/10 w-full h-[150px] rounded-3xl p-4 placeholder:text-grey"
                placeholder="Special Requests or comments about the outfit"
                value={request}
                onChange={(e) => setRequest(e.target.value)}
              ></textarea>
            </div>
          </div>
        </section>
      )}

      <ButtonBlack
        text={loading ? "" : "Save And Next"}
        icon={loading ? <LoaderIcon className="animate-spin" /> : <></>}
        className={"mt-5 w-full justify-center md:w-fit ml-auto"}
        handleClick={handleSave}
        disabled={!url}
      />
    </div>
  );
};

export default Customize;
