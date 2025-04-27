"use client";

import useAuthStore from "@/components/authStore";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LogOut } from "lucide-react";
import { startTransition, useState } from "react";

const AccountNav = ({ activeNav, setActiveNav }) => {
  const [showModal, setShowModal] = useState(false);
  const { logout, setPageLoad } = useAuthStore();
  return (
    <Dialog open={showModal} onOpenChange={(open) => setShowModal(open)}>
      <div className="flex flex-col gap-4 items-start max-w-[190px] ">
        {["Personal data", "Company data", "Shipping and Billing address"].map(
          (text, i) => (
            <button
              key={i}
              onClick={() => setActiveNav(text.toLocaleLowerCase())}
              className={`transition-all ease-in-out duration-500 text-start ${
                activeNav === text.toLowerCase()
                  ? "text-dark border-l-2 border-dark pl-2 font-bold"
                  : "text-grey"
              }`}
            >
              {text}
            </button>
          )
        )}
        <div className="border-b pt-1 w-full mt-10" />
        <DialogTrigger>
          <p className="text-[#FF0000] flex gap-2 items-center w-16 hover:w-24 transition-all duration-700">
            <LogOut className="rotate-180" size={16} />
            <span className="whitespace-nowrap">Log Out</span>
          </p>
        </DialogTrigger>
      </div>
      <DialogContent className="max-w-[90%] sm:max-w-[680px] !rounded-none">
        <DialogHeader>
          <DialogTitle>{""}</DialogTitle>
          <DialogDescription>{""}</DialogDescription>
        </DialogHeader>
        <h5 className="font-bold text-dark Satoshi pt-4 text-center">
          Log Out from your account
        </h5>
        <div className="flex gap-3 pt-4 justify-center">
          <Button
            variant="outline"
            className="rounded-none"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="rounded-none active:cursor-progress"
            onClick={() => {
              logout();
              startTransition(() => {
                setPageLoad(true);
              });
            }}
          >
            Confirm Log Out
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AccountNav;
