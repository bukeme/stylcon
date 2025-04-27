"use client";

import { startTransition, useEffect, useState } from "react";
import Input from "./Input";
import useAuthStore from "../authStore";
import api from "@/api";
import { toast } from "react-toastify";
import { Skeleton } from "../ui/skeleton";
import ButtonBlack from "./ButtonBlack";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import CustomLink from "./CustomLink";

const Delivery = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    address: "",
  });
  const [showModal, setShowModal] = useState(false);
  const { activeId, setPageLoad } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const getDetails = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get(`/api/outfits/delivery/${activeId}/`);
        // console.log(data);

        setForm({
          name: data.name || "",
          phone: data.phone_number || "",
          email: data.email || "",
          city: data.city || "",
          address: data.address || "",
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

  const handleDone = async () => {
    setLoading(true);

    try {
      if (Object.values(form).some((val) => val === ""))
        throw new Error("Invalid information");

      const formData = new FormData();
      formData.append("id", activeId);
      formData.append("name", form.name);
      formData.append("phone_number", form.phone);
      formData.append("email", form.email);
      formData.append("city", form.city);
      formData.append("address", form.address);

      await api.post(`/api/outfits/delivery/${activeId}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await api.post(`/api/outfits/outfit-complete/${activeId}/`);

      // console.log(res);

      setShowModal(true);
      toast.success("Request made successfully");
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={showModal}
      onOpenChange={(open) => {
        setShowModal(open);
        if (open === false) {
          router.push("/dashboard");
          startTransition(() => {
            setPageLoad(true);
          });
        }
      }}
    >
      {isLoading ? (
        <Skeleton className="h-96 w-full" />
      ) : (
        <section className="p-3 sm:p-10 bg-white flex flex-col gap-8">
          <div>
            <h1 className="text-[28px] font-bold mb-4">Delivery</h1>
            <p>Confirm shipping address</p>
          </div>
          <div className="bg-[#F9F9F9] border border-black/[8%] p-5 sm:p-8 items-center rounded-2xl">
            <p className="text-lg font-bold">Billing Address</p>
            <div className="max-w-[776px] grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              <Input
                label={"Company/Recipient Name"}
                placeHolder={"Enter name"}
                type={"text"}
                value={form.name}
                setValue={(val) => setForm({ ...form, name: val })}
                errMsg={""}
                className={"h-[45px]"}
              />
              <Input
                label={"Phone Number"}
                placeHolder={"Enter phone number"}
                type={"text"}
                value={form.phone}
                setValue={(val) => setForm({ ...form, phone: val })}
                errMsg={""}
                className={"h-[45px]"}
              />
              <Input
                label={"Email Address"}
                placeHolder={"Enter email"}
                type={"email"}
                value={form.email}
                setValue={(val) => setForm({ ...form, email: val })}
                errMsg={""}
                className={"h-[45px]"}
              />
              <Input
                label={"City"}
                placeHolder={"Enter city name"}
                type={"text"}
                value={form.city}
                setValue={(val) => setForm({ ...form, city: val })}
                errMsg={""}
                className={"h-[45px]"}
              />
              <div className="md:col-span-2">
                <Input
                  label={"Address"}
                  placeHolder={"Enter address"}
                  type={"text"}
                  value={form.address}
                  setValue={(val) => setForm({ ...form, address: val })}
                  errMsg={""}
                  className={"h-[45px]"}
                />
              </div>
            </div>
          </div>
        </section>
      )}
      <ButtonBlack
        text={loading ? "" : "Request Price Estimate"}
        icon={loading ? <LoaderIcon className="animate-spin" /> : <></>}
        className={"mt-5 w-full justify-center md:w-fit ml-auto"}
        handleClick={handleDone}
        disabled={Object.values(form).some((val) => val === "")}
      />

      <DialogContent className="max-w-[90%] sm:max-w-[477px] !rounded-none">
        <DialogHeader>
          <DialogTitle>{""}</DialogTitle>
          <DialogDescription>{""}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          <h5 className="font-bold text-dark Satoshi py-1 px-6 w-fit bg-[#E8FFDB] rounded-[30px]">
            Request Successful
          </h5>
          <p className="text-center text-sm">
            {
              "We've received your details. A price estimate would be sent to your email in 12-24 hrs."
            }
          </p>
          <div className="flex gap-3 pt-2 justify-center">
            {/* <CustomLink url={`/dashboard/details/${activeId}`}>
              <Button variant="outline" className="rounded-none">
                View outfit details
              </Button>
            </CustomLink> */}
            <Button
              className="rounded-none active:cursor-progress"
              onClick={() => {
                setShowModal(false);
                router.push("/dashboard");
                startTransition(() => {
                  setPageLoad(true);
                });
              }}
            >
              Back to home
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Delivery;
