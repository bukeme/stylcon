"use client";

import { useEffect, useState } from "react";
import useAuthStore from "../authStore";
import api from "@/api";
import { toast } from "react-toastify";
import { Skeleton } from "../ui/skeleton";
import ButtonBlack from "./ButtonBlack";
import { LoaderIcon } from "lucide-react";

const Quantity = ({ handleNext }) => {
  const [request, setRequest] = useState("");
  const [sizes, setSizes] = useState({
    XS: "0",
    S: "0",
    M: "0",
    L: "0",
    XL: "0",
    XXL: "0",
  });
  const { activeId } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sample, setSample] = useState("Yes");

  useEffect(() => {
    const getDetails = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get(`/api/outfits/quantity/${activeId}/`);
        // console.log(data);
        const size = data.sizes;
        setSizes(
          size?.length > 0
            ? {
                XS: size[0].value,
                S: size[1].value,
                M: size[2].value,
                L: size[3].value,
                XL: size[4].value,
                XXL: size[5].value,
              }
            : {
                XS: "0",
                S: "0",
                M: "0",
                L: "0",
                XL: "0",
                XXL: "0",
              }
        );
        setRequest(data.special_requirements);
        setSample(data.sample_first ? "Yes" : "No");
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
      await api.post(`/api/outfits/quantity/${activeId}/`, {
        id: activeId,
        sample_first: sample === "Yes" ? true : false,
        quantity_sizes: sizes,
        special_requirements: request,
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

  const hasValues = (obj) => {
    return Object.values(obj).some(
      (value) =>
        value !== null &&
        value !== undefined &&
        value !== "" &&
        value !== "0" &&
        value !== 0
    );
  };

  return (
    <div>
      {isLoading ? (
        <Skeleton className="h-96 w-full" />
      ) : (
        <section className="p-3 sm:p-10 bg-white flex flex-col gap-8">
          <div>
            <h1 className="text-[28px] font-bold mb-4">Quantity</h1>
            <p>To ensure we get it right, kindly do the following</p>
          </div>
          <div className="bg-[#F9F9F9] border border-black/[8%] p-5 sm:p-8 items-center rounded-2xl">
            <p className="text-lg font-bold mb-4">
              How many items would you like to produce?
            </p>
            <div className="flex gap-3">
              <QuantityInput
                size={"XS"}
                value={sizes.XS}
                setValue={(val) => setSizes({ ...sizes, XS: val })}
              />
              <QuantityInput
                size={"S"}
                value={sizes.S}
                setValue={(val) => setSizes({ ...sizes, S: val })}
              />
              <QuantityInput
                size={"M"}
                value={sizes.M}
                setValue={(val) => setSizes({ ...sizes, M: val })}
              />
              <QuantityInput
                size={"L"}
                value={sizes.L}
                setValue={(val) => setSizes({ ...sizes, L: val })}
              />
              <QuantityInput
                size={"XL"}
                value={sizes.XL}
                setValue={(val) => setSizes({ ...sizes, XL: val })}
              />
              <QuantityInput
                size={"XXL"}
                value={sizes.XXL}
                setValue={(val) => setSizes({ ...sizes, XXL: val })}
              />
            </div>
          </div>
          <div className="bg-[#F9F9F9] border border-black/[8%] p-5 sm:p-8 items-center rounded-2xl">
            <p className="text-lg font-bold mb-0.5">
              Do you want a sample first
            </p>
            <p className="text-grey text-sm">
              You have the option to order a sample (recommended)
            </p>
            <div className="flex gap-6 mt-4">
              {["Yes", "No"].map((option, i) => (
                <div
                  key={i}
                  onClick={() => setSample(option)}
                  className="cursor-pointer flex items-center gap-2.5"
                >
                  <div
                    className={`w-[8px] h-[8px] rounded-full ring-1 ring-dark ring-offset-2 ${
                      sample === option && "bg-dark"
                    }`}
                  />
                  <p>{option}</p>
                </div>
              ))}
            </div>
          </div>
          <textarea
            className="bg-transparent focus:outline-none border border-black/10 w-full max-w-[827px] h-[150px] rounded-3xl p-4 placeholder:text-grey"
            placeholder="Special Requests or comments about the quantity"
            value={request}
            onChange={(e) => setRequest(e.target.value)}
          ></textarea>
        </section>
      )}
      <ButtonBlack
        text={loading ? "" : "Save And Next"}
        icon={loading ? <LoaderIcon className="animate-spin" /> : <></>}
        className={"mt-5 w-full justify-center md:w-fit ml-auto"}
        handleClick={handleSave}
        disabled={!hasValues(sizes)}
      />
    </div>
  );
};

export default Quantity;

const QuantityInput = ({ size, value, setValue }) => {
  return (
    <div className="flex flex-col gap-1 items-center">
      <label>{size}</label>
      <input
        type="text"
        className={`w-9 h-[34px] bg-white drop-shadow-md focus:outline-none rounded-lg text-sm flex justify-center ${
          value.length > 2 ? "pl-2" : value.length > 1 ? "pl-2.5" : "pl-3.5"
        }`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
