"use client";

import api from "@/api";
import useAuthStore from "@/components/authStore";
import ButtonBlack from "@/components/Shared/ButtonBlack";
import Input from "@/components/Shared/Input";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const CompanyData = ({
  companyData,
  setCompanyData,
  onCancle,
  compData,
  isLoading,
}) => {
  const { setReload } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const saveChanges = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.patch("/api/accounts/company-data/", {
        name: companyData.name,
        website: companyData.website,
        address: companyData.address,
        phone: companyData.phone,
        instragram: companyData.instagram,
        tiktok: companyData.tiktok,
        facebook: companyData.facebook,
      });

      toast.success(res.message || "Company details updated");
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
  return (
    <form onSubmit={saveChanges} className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold border-b-2 border-grey/15 pb-3 mb-2">
        Company data
      </h2>
      {isLoading ? (
        <div className="flex flex-col gap-4">
          {[1, 2, 3, 4].map((num) => (
            <Skeleton key={num} className={"h-16 w-full"} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <Input
            name={"companyName"}
            type="text"
            className={"h-[53px]"}
            value={companyData.name}
            setValue={(val) =>
              setCompanyData((prev) => {
                return { ...prev, name: val };
              })
            }
            label={"Brand Name"}
            placeHolder={"Enter brand name"}
            errMsg={false}
          />
          <Input
            name={"websiteUrl"}
            type="text"
            className={"h-[53px]"}
            value={companyData.website}
            setValue={(val) =>
              setCompanyData((prev) => {
                return { ...prev, website: val.trim() };
              })
            }
            label={"Company Website"}
            placeHolder={"Enter website url"}
            errMsg={false}
          />
          <Input
            name={"companyAddress"}
            type="text"
            className={"h-[53px]"}
            value={companyData.address}
            setValue={(val) =>
              setCompanyData((prev) => {
                return { ...prev, address: val };
              })
            }
            label={"Company Address"}
            placeHolder={"Enter company address"}
            errMsg={false}
          />
          <Input
            name={"companyNumber"}
            type="number"
            className={"h-[53px]"}
            value={companyData.phone}
            setValue={(val) =>
              setCompanyData((prev) => {
                return { ...prev, phone: val };
              })
            }
            label={"Phone Number"}
            placeHolder={"Enter phone number"}
            errMsg={false}
          />
        </div>
      )}

      <h2 className="text-3xl font-bold border-b-2 border-grey/15 pb-3 mt-4 mb-2">
        Social Media
      </h2>
      {isLoading ? (
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((num) => (
            <Skeleton key={num} className={"h-16 w-full"} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <Input
            name={"instagram"}
            type="text"
            className={"h-[53px]"}
            value={companyData.instagram}
            setValue={(val) =>
              setCompanyData((prev) => {
                return { ...prev, instagram: val };
              })
            }
            label={""}
            placeHolder={"Instagram Handle"}
            errMsg={false}
          />
          <Input
            name={"tiktok"}
            type="text"
            className={"h-[53px]"}
            value={companyData.tiktok}
            setValue={(val) =>
              setCompanyData((prev) => {
                return { ...prev, tiktok: val };
              })
            }
            label={""}
            placeHolder={"Tiktok"}
            errMsg={false}
          />
          <Input
            name={"facebook"}
            type="text"
            className={"h-[53px]"}
            value={companyData.facebook}
            setValue={(val) =>
              setCompanyData((prev) => {
                return { ...prev, facebook: val };
              })
            }
            label={""}
            placeHolder={"Facebook"}
            errMsg={false}
          />
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-6 mt-6">
        <ButtonBlack
          handleClick={() => onCancle(compData)}
          text={"Cancel"}
          className={
            "w-full justify-center sm:w-fit !bg-transparent !text-dark border border-dark"
          }
        />
        <ButtonBlack
          text={loading ? <Loader className="animate-spin" /> : "Save changes"}
          className={"w-full justify-center sm:w-fit"}
          type="submit"
        />
      </div>
    </form>
  );
};

export default CompanyData;
