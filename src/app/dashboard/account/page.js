"use client";

import DashboardHeaderBasic from "@/components/Dashboard/DashboardHeaderBasic";
import AccountNav from "./components/AccountNav";
import { useEffect, useState } from "react";
import ProfileDetails from "./components/ProfileDetails";
import { Plus } from "lucide-react";
import CompanyData from "./components/CompanyData";
import Shipping from "./components/Shipping";
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
import UpdateAvatar from "./components/UpdateAvatar";
import Image from "next/image";

const Profile = () => {
  const [activeNav, setActiveNav] = useState("personal data");
  const [compData, setCompData] = useState(null);
  const [shippingData, setShippingData] = useState(null);
  const { reload, setPageLoad, setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [profileImg, setProfileImg] = useState(null);
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    socilaHandle: "",
  });

  const [companyData, setCompanyData] = useState({
    name: "",
    website: "",
    address: "",
    phone: "",
    instagram: "",
    tiktok: "",
    facebook: "",
  });

  const [shipping, setShipping] = useState({
    address1: "",
    address2: "",
    zipCode: "",
    city: "",
    country: "",
    phone1: "",
    phone2: "",
  });

  useEffect(() => {
    setPageLoad(false);
  }, []);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const user = await api.get("/api/accounts/user-profile/");
        const company = await api.get("/api/accounts/company-data/");
        const shipping = await api.get("/api/accounts/user-delivery/");
        // console.log(user, company, shipping);
        setUser(user.data);
        setDetails({
          firstName: user.data.first_name || "",
          lastName: user.data.last_name || "",
          phone: user.data.phone || "",
          email: user.data.email || "",
          socilaHandle: user.data.social_media || "",
        });
        setProfileImg(user.data.image);
        setCompData(company.data);
        updateCompanyData(company.data);

        setShippingData(shipping.data);
        updateShipping(shipping.data);
      } catch (err) {
        console.log(err);
        toast.error(
          err.response?.detail || err.response?.messsage || err.message
        );
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [reload]);

  const updateCompanyData = (data = compData) => {
    if (!data) return;
    setCompanyData({
      name: data?.name || "",
      website: data?.website || "",
      address: data?.address || "",
      phone: data?.phone || "",
      instagram: data?.instragram || "",
      tiktok: data?.tiktok || "",
      facebook: data?.facebook || "",
    });
  };
  const updateShipping = (data = shippingData) => {
    if (!data) return;
    setShipping({
      address1: data?.address1 || "",
      address2: data?.address2 || "",
      zipCode: data?.zip_code || "",
      city: data?.city || "",
      country: data?.country || "",
      phone1: data?.phone1 || "",
      phone2: data?.phone2 || "",
    });
  };

  return (
    <div className="max-w-[1500px] mx-auto mb-12">
      <DashboardHeaderBasic url="/dashboard" isEmpty={true} />
      <div className="px-6 lg:px-8 mt-6 md:mt-14 xl:pr-12 flex flex-col lg:flex-row gap-10 lg:gap-6 lg:justify-between">
        <AccountNav activeNav={activeNav} setActiveNav={setActiveNav} />
        {activeNav === "personal data" && (
          <div className="w-full lg:w-[72%] flex flex-col items-center gap-6 lg:flex-row-reverse lg:justify-between xl:pr-10">
            <aside className="w-24 h-24 lg:min-w-[180px] lg:min-h-[180px] relative lg:-translate-y-full">
              <Dialog
                open={showModal}
                onOpenChange={(open) => setShowModal(open)}
              >
                <Image
                  src={profileImg?.image || "/"}
                  alt=""
                  width={100}
                  height={100}
                  className="h-full w-full object-cover rounded-full bg-[#ADB6D7]"
                />
                <DialogTrigger>
                  <div className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2 w-[17px] h-[17px] lg:min-w-[32px] lg:min-h-[32px] bg-[#F0F0F0] rounded-[50%] text-xs lg:text-lg flex justify-center items-center">
                    <Plus color="#ADB6D7" />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-[90%] sm:max-w-[680px] !rounded-none overflow-y-scroll max-h-[90dvh]">
                  <DialogHeader>
                    <DialogTitle className="text-center font-bold">
                      {"Choose an Avatar"}
                    </DialogTitle>
                    <DialogDescription>{""}</DialogDescription>
                  </DialogHeader>

                  <UpdateAvatar
                    setShowModal={setShowModal}
                    setProfileImg={setProfileImg}
                    profileImg={profileImg}
                  />
                </DialogContent>
              </Dialog>
            </aside>
            <div className="w-full lg:w-[60%]">
              <ProfileDetails
                details={details}
                setDetails={setDetails}
                isLoading={isLoading}
                profileImg={profileImg}
              />
            </div>
          </div>
        )}
        {activeNav === "company data" && (
          <div className="w-full max-w-[642px] mx-auto">
            <CompanyData
              companyData={companyData}
              setCompanyData={setCompanyData}
              onCancle={updateCompanyData}
              compData={compData}
              isLoading={isLoading}
            />
          </div>
        )}
        {activeNav === "shipping and billing address" && (
          <Shipping
            shipping={shipping}
            setShipping={setShipping}
            onCancle={updateShipping}
            shippingData={shippingData}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
