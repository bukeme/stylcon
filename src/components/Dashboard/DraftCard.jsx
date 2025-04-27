"use client";
import { Loader, Trash2 } from "lucide-react";
import { formatDate } from "../Shared/helpers/helpers";

import useAuthStore from "../authStore";
import { useForm } from "./FormContext";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { startTransition, useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "@/api";
import { useRouter } from "next/navigation";

const DraftCard = ({ item }) => {
  const {
    setActiveId,
    setActiveOption,
    setSideNav,
    setReload,
    setActiveSideNav,
    activeSideNav,
    setPageLoad,
  } = useAuthStore();
  const { options } = useForm();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (activeSideNav) {
      // console.log(activeSideNav);
      router.push(`/dashboard/form?outfit=${item.category}&id=${item.id}`);
      startTransition(() => {
        setPageLoad(true);
      });
      setIsLoading(false);
    }
  }, [activeSideNav]);

  const handleContinue = () => {
    setIsLoading(false);
    const currentOption = options.find(
      (opt) => opt.name.toLowerCase() === item.category
    );

    if (!currentOption) return;

    const { nav: sideNav } = currentOption;
    const curStage = item.current_stage;
    const category = item.category;

    setActiveId(item.id);
    setActiveOption(category);
    setSideNav(sideNav);

    setActiveId(item.id);
    setActiveOption(category);
    setSideNav(sideNav);

    const getNextNav = (curStage) => {
      switch (curStage) {
        case null:
          return sideNav[0];
        case "delivery":
          return "Delivery";
        case "fits":
          return "Fits";
        case "socks_size":
          return "Size";
        case "cloth_type":
          return "Cloth type";
        case "outfit_type":
          return sideNav.find((item) => item.toLowerCase().includes("type"));
        case "colorway":
          return "Colourways";
        case "neck_label":
          return sideNav.find((item) =>
            ["neck", "waistband", "cap label"].some((term) =>
              item.toLowerCase().includes(term)
            )
          );
        case "care_label":
          return "Care label";
        case "design":
          return "Design";
        case "cloth_design":
          return "Cloth Design";
        case "quantity":
          return "Quantity";
        case "packaging":
          return "Packaging";
        default:
          return "";
      }
    };

    const nextNav = getNextNav(curStage);

    if (curStage && sideNav.includes(nextNav)) {
      const activeIndex = sideNav.indexOf(nextNav);
      setActiveSideNav(sideNav[activeIndex + 1]);
    } else {
      setActiveSideNav(nextNav);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await api.delete(`/api/outfits/outfit-delete/${item.id}`);

      // console.log(res);
      toast.success("Item deleted succesfully");

      setReload();
      setShowModal(false);
    } catch (err) {
      console.log(err);
      toast.error(err.response.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={showModal} onOpenChange={(open) => setShowModal(open)}>
      <div className="rounded-xl bg-[#f9f9f9] md:h-[225px] flex flex-col md:justify-between gap-3 p-4 text-dark">
        <div className="flex items-center justify-between">
          <aside>
            <h4 className="text-3xl font-bold">#{item.id}</h4>
            <p className="text-sm flex gap-2 items-center mt-3 capitalize">
              {item.category}
              <span className="bg-[#D1E1FF] rounded-lg px-2 py-1">Draft</span>
            </p>
          </aside>
          <DialogTrigger>
            <Trash2 color="#E33D3D" size={16} />
          </DialogTrigger>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm">
            {formatDate(item.updated_at || item.created_at)}
          </p>

          <button
            onClick={handleContinue}
            className="bg-white py-[14px] px-4 rounded-[50px] text-dark"
          >
            {isLoading ? <Loader className="animate-spin" /> : "Continue"}
          </button>
        </div>
      </div>

      <DialogContent className="max-w-[477px] !rounded-none">
        <DialogHeader>
          <DialogTitle>{""}</DialogTitle>
          <DialogDescription>{""}</DialogDescription>
        </DialogHeader>
        <div className={"flex flex-col items-center gap-4 text-dark pt-4"}>
          <h5 className="font-bold Satoshi">
            Are you sure want to delete this design draft?
          </h5>
          <p className="Satoshi text-center">
            This action cannot be undone. This will permanently delete your
            progress and remove draft <b>#{item.id}</b>.
          </p>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="rounded-none"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="rounded-none"
              onClick={handleDelete}
            >
              {loading ? <Loader className="animate-spin" /> : "Delete"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DraftCard;
