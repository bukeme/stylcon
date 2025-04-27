"use client";
import ButtonBlack from "@/components/Shared/ButtonBlack";
import { ArrowLeft, Loader2, X } from "lucide-react";
import { startTransition, useEffect, useState } from "react";
import Stage1 from "./components/Stage1";
import Stage2 from "./components/Stage2";
import Stage3 from "./components/Stage3";
import Stage4 from "./components/Stage4";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { convertURL } from "@/components/Shared/helpers/helpers";
import useAuthStore from "@/components/authStore";
import api from "@/api";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const GetDesign = () => {
  const [stage, setStage] = useState(1);
  const [form, setForm] = useState({
    preference: ["MERCH DESIGN, MOCKUP AND TECHPACKS"],
    name: "",
    email: "",
    brandName: "",
    whatsapp: "",
    brief: "",
  });
  const router = useRouter();
  const { setPageLoad } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setPageLoad(false);
  }, []);

  const handleDone = async () => {
    setLoading(true);
    try {
      const { data } = await api.post("/api/outfits/project-brief/", {
        name: form.name,
        email: form.email,
        brand_name: form.brandName,
        whatsapp: form.whatsapp,
        project_brief: form.brief,
        option: form.preference.join(","),
      });
      // console.log(data);

      setShowModal(true);

      toast.success(data.message || "Project brief sent successfully");
    } catch (err) {
      console.log(err);
      toast.error("Project brief failed to send");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    stage < 4 ? setStage((prev) => (prev += 1)) : handleDone();
  };

  const isDisabled = () => {
    let res = false;
    if (stage === 1) {
      res = form.preference.length === 0;
    } else if (stage === 2) {
      res = !form.name || !form.email || !form.brandName || !form.whatsapp;
    } else if (stage === 3) {
      res = !form.brief;
    }
    return res;
  };

  return (
    <div className="bg-dark text-white min-h-screen px-6 2xl:px-0">
      <div className="max-w-[1200px] mx-auto py-20 md:py-32 flex flex-col md:flex-row gap-10 xl:gap-14 relative">
        <aside
          onClick={() => router.back()}
          className="h-7 sm:h-10 w-7 sm:w-10 bg-white rounded-full text-dark flex items-center justify-center absolute top-5 right-0 xl:-right-5 cursor-pointer active:cursor-progress"
        >
          <X strokeWidth={3.5} size={16} className="sm:scale-125" />
        </aside>
        <section className="hidden md:flex flex-col gap-8 xl:w-[496px]">
          <h1
            onClick={() => console.log(isDisabled())}
            className="text-4xl font-bold md:max-w-[470px]"
          >
            We make products for people with vision and passion.
          </h1>
          <p className="text-lg md:max-w-[400px]">
            {
              " We don't just create, we are here to empower and inspire, giving  what you need to bring your ideas to life and make things happen."
            }
          </p>
          <Image
            src={
              convertURL(
                "https://drive.google.com/file/d/1KnsNu6d1LkrpriA20-UDJ2w51YgMQxqK/view?usp=drive_link"
              ) || ""
            }
            alt=""
            width={1000}
            height={1000}
          />
        </section>
        <section className="grow min-h-[80dvh] md:min-h-full bg-white py-8 md:py-14 px-4 md:px-8 flex flex-col gap-10 text-dark">
          <div className="grid grid-cols-4 gap-4 sm:gap-6 md:gap-10">
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className={`h-1 ease-linear duration-700 ${
                  stage >= num ? "bg-dark" : "bg-grey/25"
                }`}
              />
            ))}
          </div>
          {stage === 1 && (
            <Stage1
              form={form}
              setPreference={(val) => setForm({ ...form, preference: val })}
            />
          )}
          {stage === 2 && <Stage2 form={form} setForm={setForm} />}
          {stage === 3 && <Stage3 form={form} setForm={setForm} />}
          {stage === 4 && (
            <Dialog
              open={showModal}
              onOpenChange={(open) => setShowModal(open)}
            >
              <Stage4 form={form} />
              <DialogContent className="max-w-[90%] sm:max-w-[477px] !rounded-none">
                <DialogHeader>
                  <DialogTitle>{""}</DialogTitle>
                  <DialogDescription>{""}</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center gap-4">
                  <h5 className="font-bold text-dark Satoshi py-1 px-6 w-fit bg-[#E8FFDB] rounded-[30px]">
                    Project brief sent successfully
                  </h5>
                  <p className="text-center text-sm">
                    {"We've received your details."}
                  </p>

                  <Button
                    className="rounded-none active:cursor-progress"
                    onClick={() => {
                      setShowModal(false);
                      router.back();
                      startTransition(() => {
                        setPageLoad(true);
                      });
                    }}
                  >
                    Continue
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
          <div className="flex justify-between gap-2 mt-auto">
            {stage > 1 && (
              <button
                onClick={() => {
                  if (stage <= 1) return;
                  setStage((prev) => (prev -= 1));
                }}
                className="bg-none border-none flex items-center gap-2"
              >
                <ArrowLeft size={20} />
                Back
              </button>
            )}

            <ButtonBlack
              text={
                stage === 4 ? (
                  <>{loading ? <Loader2 className="animate-spin" /> : "Done"}</>
                ) : (
                  "Next"
                )
              }
              className={"uppercase rounded-none w-fit ml-auto"}
              handleClick={handleNext}
              disabled={isDisabled()}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default GetDesign;
