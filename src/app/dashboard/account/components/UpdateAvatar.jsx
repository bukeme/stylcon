"use client";

import api from "@/api";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Check } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateAvatar = ({ setProfileImg, setShowModal, profileImg }) => {
  const [avatarList, setAvatarList] = useState([]);
  const [selected, setSelected] = useState(profileImg || null);
  useEffect(() => {
    try {
      const getAvatarList = async () => {
        const { data } = await api.get("/api/accounts/user-avatar/list/");
        setAvatarList(data);
      };
      getAvatarList();
    } catch (err) {
      console.log(err);
      toast.error(
        err.response?.detail || err.response?.messsage || err.message
      );
    }
  }, []);

  return (
    <div className="flex flex-col gap-6 items-center">
      <Image
        src={selected?.image || "/"}
        alt=""
        width={200}
        height={200}
        className="rounded-full bg-grey/25"
      />

      {avatarList.length === 0 ? (
        <div className="flex flex-wrap gap-4 items-center justify-center">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <Skeleton key={num} className={"h-20 w-20 rounded-full"} />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 items-center justify-center">
          {avatarList.map((avatar) => (
            <div className="relative" key={avatar.id}>
              <Image
                onClick={() => setSelected(avatar)}
                src={avatar.image || "/"}
                alt=""
                width={100}
                height={100}
                className={`cursor-pointer rounded-full h-20 w-20 bg-grey/25 ${
                  selected?.image === avatar.image && "ring-4 ring-[#2ABFFF]"
                } `}
              />
              {selected?.image === avatar.image && (
                <Check
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  color="#2ABFFF"
                  size={32}
                />
              )}
            </div>
          ))}
        </div>
      )}
      {selected?.image && (
        <button
          onClick={() => setSelected({ id: null, image: "" })}
          className="text-[#FF0000] border-none bg-none drop-shadow-md"
        >
          - Remove avatar
        </button>
      )}
      <div className="flex gap-3 mt-4">
        <Button
          variant="outline"
          className="rounded-none"
          onClick={() => {
            setSelected(null);
            setShowModal(false);
          }}
        >
          Cancel
        </Button>
        <Button
          className="rounded-none"
          onClick={() => {
            setProfileImg(selected);

            setShowModal(false);
          }}
        >
          Done
        </Button>
      </div>
    </div>
  );
};

export default UpdateAvatar;
