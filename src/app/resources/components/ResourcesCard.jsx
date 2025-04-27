"use client";
import { convertURL, validateEmail } from "@/components/Shared/helpers/helpers";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import Input from "@/components/Shared/Input";
import api from "@/api";
import { toast } from "react-toastify";

const ResourcesCard = ({ details, prevEmail, setPrevEmail }) => {
  const [email, setEmail] = useState(prevEmail);
  const [loading, setLoading] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const download = () => {
    const fileName = details.file;

    const link = document.createElement("a");
    link.href = `/${fileName}`;
    link.download = details.text;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(`${details.text} downloading`);
  };

  const handleDownload = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (email !== prevEmail) {
        await api.post("/api/accounts/join-newsletter/", {
          email: email,
        });

        download();
      } else {
        download();
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || err.message);
      setPrevEmail("");
    } finally {
      setLoading(false);
      setPrevEmail(email);
      setShowEmailModal(false);
    }
  };
  return (
    <Dialog
      open={showEmailModal}
      onOpenChange={() => {
        setShowEmailModal((prev) => !prev);
        setEmail(prevEmail);
      }}
    >
      <div className="px-6 py-12 bg-white drop-shadow-sm flex flex-col gap-3">
        <Image
          src={convertURL(details.img)}
          alt=""
          width={1000}
          height={1000}
          className="bg-grey/25 h-[160px] md:h-[221px] object-cover"
        />
        <div className="flex flex-col gap-4 justify-between grow">
          <p
            className={`px-2 py-1 text-[12px] w-fit rounded-[4px] ${
              details.tag === "Production"
                ? "bg-[#EEFFED] text-[#0B9B00]"
                : "bg-[#FFFBEE] text-[#9D7900]"
            }`}
          >
            {details.tag}
          </p>
          <h3 className="text-dark text-xl font-bold">{details.text}</h3>
          <p className="text-grey text-lg">{details.desc}</p>
          <DialogTrigger asChild>
            <Button className="py-3 text-white rounded-lg  Satoshi-bold mt-auto">
              {details.btnText}
            </Button>
            {/* href={`/${details.file}`}
              download={details.file} */}
          </DialogTrigger>
        </div>
      </div>

      <DialogContent className="max-w-[477px] !rounded-none">
        <DialogHeader>
          <DialogTitle>{""}</DialogTitle>
          <DialogDescription>{""}</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleDownload}
          className={"flex flex-col items-center gap-4 text-dark pt-4"}
        >
          <h5 className="font-bold Satoshi">Provide your email address</h5>
          <p className="Satoshi text-center text-sm">
            {
              "Kindly enter your email address below to proceed with downloading."
            }
          </p>

          <Input
            name={"social"}
            type="email"
            className={"h-[53px]"}
            value={email}
            setValue={(val) => setEmail(val)}
            label={""}
            placeHolder={"example@email.com"}
            errMsg={false}
          />

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="rounded-none"
              onClick={() => setShowEmailModal(false)}
              type={"button"}
            >
              Cancel
            </Button>
            <Button
              className="rounded-none"
              disabled={!email || validateEmail(email).length > 0}
            >
              {loading ? <Loader className="animate-spin" /> : "Proceed"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ResourcesCard;
