"use client";

import api from "@/api";
import useAuthStore from "@/components/authStore";
import ButtonBlack from "@/components/Shared/ButtonBlack";
import CustomLink from "@/components/Shared/CustomLink";
import { validatePassword } from "@/components/Shared/helpers/helpers";
import Input from "@/components/Shared/Input";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { startTransition, useEffect, useState } from "react";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [form, setForm] = useState({
    confirmPassword: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { setPageLoad } = useAuthStore();
  const params = useSearchParams();
  const router = useRouter();

  const validations = [
    { text: "8+ characters", value: "8" },
    { text: "1 uppercase letter", value: "upper" },
    { text: "1 number or special characters", value: "symbol" },
  ];

  useEffect(() => {
    setPageLoad(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = params.get("token");
      await api.post("/api/accounts/password-reset/confirm/", {
        token: token,
        password: form.password,
      });

      // console.log(data);

      toast.success("Password reset successful!");

      router.push("/auth/login");
      startTransition(() => {
        setPageLoad(true);
      });
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.password?.[0] || err.message);
    } finally {
      setLoading(false);
    }
  };

  const validatePass = (password, value) => {
    if (!password || !password.trim()) return false;

    switch (value) {
      case "upper":
        return /[A-Z]/.test(password);
      case "symbol":
        return /[!@#$%^&*(),.?":{}|<>\d]/.test(password);
      case "8":
        return password.length >= 8;

      default:
        throw new Error(
          "Invalid validation type. Use 'upper', 'symbol', or '8'."
        );
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
            Create new password
          </h2>
          <p className="text-center font-medium text-lg text-dark">
            {"Please enter your new password below for your spotify account."}
          </p>
        </div>
        <div>
          <Input
            name={"newPassword"}
            type="password"
            className={"h-[61px]"}
            value={form.password}
            setValue={(val) => setForm({ ...form, password: val.trim() })}
            label={"New Password"}
            placeHolder={"Enter Password"}
            errMsg={""}
          />
          <div className="flex flex-col gap-2">
            {validations.map((validation, i) => (
              <div key={i} className="flex gap-2 items-center">
                <div
                  className={`h-2.5 w-2.5 rounded-full ${
                    validatePass(form.password, validation.value)
                      ? "bg-[#56AF32]"
                      : "bg-grey/50"
                  }`}
                />
                <p>{validation.text}</p>
              </div>
            ))}
          </div>
        </div>
        <Input
          name={"confirmPassword"}
          type="password"
          className={"h-[61px]"}
          value={form.confirmPassword}
          setValue={(val) => setForm({ ...form, confirmPassword: val.trim() })}
          label={"Confirm new password"}
          placeHolder={"Enter Password again"}
          errMsg={
            form.password !== form.confirmPassword &&
            form.confirmPassword.length > 0
              ? "Passwords do not match"
              : ""
          }
        />
        <CustomLink url="/support">
          <p className="underline text-[#617BFF]">Need support?</p>
        </CustomLink>
        <ButtonBlack
          text={
            loading ? <Loader className="animate-spin" /> : "Create Password"
          }
          disabled={
            form.password !== form.confirmPassword ||
            validatePassword(form.password).length > 0
          }
          className={"justify-center w-full"}
          type={"submit"}
        />
      </form>
    </section>
  );
};

export default ResetPassword;
