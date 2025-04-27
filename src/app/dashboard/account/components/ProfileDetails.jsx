"use client";
import Input from "@/components/Shared/Input";
import ButtonBlack from "@/components/Shared/ButtonBlack";
import useAuthStore from "@/components/authStore";
import { useState } from "react";
import { Loader } from "lucide-react";
import api from "@/api";
import { toast } from "react-toastify";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import CustomLink from "@/components/Shared/CustomLink";

const ProfileDetails = ({ details, setDetails, isLoading, profileImg }) => {
  const { setReload, logout } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const saveChanges = async () => {
    setLoading(true);
    try {
      const res = await api.patch("/api/accounts/user-profile/", {
        first_name: details.firstName,
        last_name: details.lastName,
        phone: details.phone,
        email: details.email,
        social_media: details.socilaHandle,
        avatar: profileImg ? profileImg.id : "",
      });

      toast.success(res.message || "Profile details updated");
      setReload();
    } catch (err) {
      console.log(err);
      toast.error(
        err.response?.detail || err.response?.messsage || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAcc = async () => {
    setLoading(true);
    try {
      const res = await api.delete(`/api/accounts/user-profile/`);
      toast.success(res.message || "Your account has been deleted!");
      logout();
      router.push("/auth/login");
    } catch (err) {
      console.log(err);
      toast.error(
        err.response?.detail || err.response?.messsage || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={showModal} onOpenChange={(open) => setShowModal(open)}>
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold border-b-2 border-grey/15 pb-3 mb-4">
          My Profile
        </h2>
        {isLoading ? (
          <div className="flex flex-col gap-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <Skeleton key={num} className={"h-16 w-full"} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <Input
              name={"firstName"}
              type="text"
              className={"h-[53px]"}
              value={details.firstName}
              setValue={(val) =>
                setDetails((prev) => {
                  return { ...prev, firstName: val.trim() };
                })
              }
              label={"First Name"}
              placeHolder={"Add first name"}
              errMsg={false}
            />
            <Input
              name={"lastName"}
              type="text"
              className={"h-[53px]"}
              value={details.lastName}
              setValue={(val) =>
                setDetails((prev) => {
                  return { ...prev, lastName: val.trim() };
                })
              }
              label={"Last Name"}
              placeHolder={"Add last name"}
              errMsg={false}
            />
            <Input
              name={"phoneNumber"}
              type="text"
              className={"h-[53px]"}
              value={details.phone}
              setValue={(val) =>
                setDetails((prev) => {
                  return { ...prev, phone: val };
                })
              }
              label={"Phone Number"}
              placeHolder={"Add phone number"}
              errMsg={false}
            />
            <Input
              name={"email"}
              type="email"
              className={"h-[53px]"}
              value={details.email}
              setValue={(val) => ""}
              label={"Email"}
              placeHolder={"Enter email address"}
              errMsg={false}
            />
            <Input
              name={"social"}
              type="text"
              className={"h-[53px]"}
              value={details.socilaHandle}
              setValue={(val) =>
                setDetails((prev) => {
                  return { ...prev, socilaHandle: val };
                })
              }
              label={"Social Media Handle"}
              placeHolder={"Add social handle"}
              errMsg={false}
            />
            <ButtonBlack
              text={
                loading ? <Loader className="animate-spin" /> : "Save changes"
              }
              className={"w-full justify-center sm:w-fit"}
              handleClick={saveChanges}
            />
          </div>
        )}
        <div className="flex flex-col gap-6 pt-8 items-start">
          <h3 className="w-full text-3xl font-bold border-b-2 border-grey/15 pb-3 mb-4">
            More
          </h3>
          <DialogTrigger>
            <p className="font-semibold hover:text-red-500">
              Delete My Account
            </p>
          </DialogTrigger>
          <CustomLink url={"/dashboard/account/change-password"}>
            <p className="font-semibold">Change my password</p>
          </CustomLink>
        </div>
      </div>
      <DialogContent className="max-w-[477px] !rounded-none">
        <DialogHeader>
          <DialogTitle>{""}</DialogTitle>
          <DialogDescription>{""}</DialogDescription>
        </DialogHeader>
        <div className={"flex flex-col items-center gap-4 text-dark pt-4"}>
          <h5 className="font-bold Satoshi">
            Are you sure you want to delete your account?
          </h5>
          <p className="Satoshi text-center text-sm">
            {
              "Doing this means you lose access to your account including all the designs you've created. This action can't be reversed"
            }
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
              onClick={handleDeleteAcc}
            >
              {loading ? <Loader className="animate-spin" /> : "Delete"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDetails;
