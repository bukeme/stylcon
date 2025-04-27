"use client";

import api from "@/api";
import useAuthStore from "@/components/authStore";
import { useForm } from "@/components/Dashboard/FormContext";
import DasboardLayout from "@/components/Layouts/DasboardLayout";
import ButtonBlack from "@/components/Shared/ButtonBlack";
import { convertURL } from "@/components/Shared/helpers/helpers";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { toast } from "react-toastify";

const Options = () => {
  const router = useRouter();
  const { options } = useForm();
  const {
    activeOption,
    setActiveOption,
    setSideNav,
    userNum,
    setActiveId,
    setPageLoad,
  } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (name, nav) => {
    if (name === "Custom Request") {
      window.open("https://forms.gle/9k1L5JTknYt2hyuN9", "_blank");
      return;
    }
    setActiveOption(name.toLowerCase());
    setSideNav(nav);
  };

  const start = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.post(`/api/outfits/outfit-create/`, {
        category: activeOption,
        user: userNum,
      });
      // console.log(data);
      await setActiveId(data.id);
      router.push(`/dashboard/form?outfit=${activeOption}&id=${data.id}`);
      startTransition(() => {
        setPageLoad(true);
      });
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Unable to start form");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DasboardLayout sidebar={false} isForm={false}>
      <section className="px-6 lg:h-[90dvh] overflow-y-scroll pb-64 xl:px-0 pt-14 max-w-[1171px] mx-auto flex flex-col items-center gap-10">
        <div className="flex flex-col md:items-center text-dark gap-2">
          <h1 className="font-bold text-3xl md:text-center md:text-4xl">
            What kind of outfit do you want to produce
          </h1>
          <p>Select an outfit</p>
        </div>
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {options.map((opt, i) => (
            <div
              key={i}
              onClick={() => handleClick(opt.name, opt.nav)}
              className={`sm:h-[200px] md:h-[187px] bg-[#F8F8F8] border-2  overflow-hidden rounded-3xl flex flex-col gap-3 justify-between items-center p-6 cursor-pointer ${
                activeOption === opt.name.toLowerCase()
                  ? "border-dark"
                  : "border-grey/25"
              }`}
            >
              <Image
                src={convertURL(opt.img) || "/"}
                alt={opt}
                width={1000}
                height={1000}
                className="h-10 sm:h-[105px] w-auto object-cover"
              />
              <p className="text-xs sm:text-base whitespace-nowrap">
                {opt.name}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-grey/75 w-[90%] fixed bottom-5 z-50 min-w-[140px] max-w-[500px] rounded-lg overflow-hidden">
          <ButtonBlack
            text={isLoading ? "" : "Save And Next"}
            icon={isLoading && <Loader className="animate-spin" />}
            handleClick={start}
            className={"w-full justify-center"}
            disabled={!activeOption}
          />
        </div>
      </section>
    </DasboardLayout>
  );
};

export default Options;
