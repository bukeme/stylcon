"use client";

import api from "@/api";
import useAuthStore from "@/components/authStore";
import ButtonBlack from "@/components/Shared/ButtonBlack";
import CustomLink from "@/components/Shared/CustomLink";
import Input from "@/components/Shared/Input";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { setPageLoad } = useAuthStore();

  useEffect(() => {
    setPageLoad(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/api/accounts/password-reset/", {
        email: email,
      });

      await res.data;

      toast.success("Kindly check your email for url to reset your password");
    } catch (err) {
      console.log(err);
      toast.error(
        err.response?.data?.email?.[0] ||
          err.response?.data?.message ||
          err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full pb-20 flex-grow justify-center">
      <CustomLink className="border-none bg-none" url={"/"}>
        <Image
          src="/stylcon.png"
          alt=""
          width={35}
          height={20}
          className="mt-6 lg:mt-8 ml-6 sm:ml-10"
        />
      </CustomLink>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[490px] mx-auto mt-40 flex flex-col gap-4 px-6 sm:px-0"
      >
        <div className="flex flex-col items-center mb-6 max-w-[490px] mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-4 text-center">
            Reset your password
          </h2>
          <p className="text-center font-medium text-lg text-dark">
            {
              "Enter the email address or username linked to your Stylcon account and we'll send you an email"
            }
          </p>
        </div>
        <Input
          name={"email"}
          type="email"
          className={"h-[61px]"}
          value={email}
          setValue={(val) => setEmail(val)}
          label={"Email address"}
          placeHolder={"user@example.com"}
          errMsg={""}
        />
        <ButtonBlack
          text={loading ? <Loader className="animate-spin" /> : "Send Link"}
          disabled={!email}
          className={"justify-center w-full"}
          type={"submit"}
        />
        <CustomLink url="/auth/login">
          <p className="underline text-[#617BFF] text-center">
            Return to Login
          </p>
        </CustomLink>
      </form>
    </section>
  );
};

export default ForgotPassword;
