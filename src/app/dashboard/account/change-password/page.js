"use client";

import api from "@/api";
import useAuthStore from "@/components/authStore";
import DashboardHeaderBasic from "@/components/Dashboard/DashboardHeaderBasic";
import ButtonBlack from "@/components/Shared/ButtonBlack";
import {
  validateForm,
  validatePassword,
} from "@/components/Shared/helpers/helpers";
import Input from "@/components/Shared/Input";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const { logout, setPageLoad } = useAuthStore();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setPageLoad(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (validateForm(form) || validatePassword(form.newPassword).length > 0)
      return;

    setLoading(true);
    try {
      if (form.newPassword !== form.confirmPassword)
        throw new Error("Password don't match");

      const { data } = await api.post(
        "/api/accounts/change-password/",
        {
          old_password: form.oldPassword,
          new_password: form.newPassword,
        },
        {
          headers: {
            "X-CSRFToken":
              "ZUTH3zTUbbZs3JgG0RZQsSDyPSE8GstS1GnpqoBn7rYvosOLt6Orvz7n5POXHRDA",
          },
        }
      );
      logout();
      toast.success(data.message || "Password updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      console.log(err);
    } finally {
      setLoading(false);
      setSubmitted(false);
    }
  };

  return (
    <div className="max-w-[1500px] mx-auto mb-12">
      <DashboardHeaderBasic url="/dashboard" isEmpty={true} />

      <form
        onSubmit={handleSubmit}
        className="px-6 mt-6 md:mt-14 w-full sm:max-w-[520px] mx-auto flex flex-col gap-4"
      >
        <h2 className="text-3xl font-bold border-b-2 border-grey/15 pb-3 mb-4">
          Change your password
        </h2>

        <Input
          name={"oldPassword"}
          type="password"
          className={"h-[61px]"}
          value={form.oldPassword}
          setValue={(val) => setForm({ ...form, oldPassword: val.trim() })}
          label={"Old Password"}
          placeHolder={"Enter old password"}
          errMsg={
            submitted && !form.oldPassword
              ? "This field cannot be left blank. Please enter your old password."
              : ""
          }
        />
        <Input
          name={"newPassword"}
          type="password"
          className={"h-[61px]"}
          value={form.newPassword}
          setValue={(val) => setForm({ ...form, newPassword: val.trim() })}
          label={"New Password"}
          placeHolder={"Enter new password"}
          errMsg={
            form.newPassword.length > 0 && validatePassword(form.newPassword)
          }
        />
        <Input
          name={"confirmPassword"}
          type="password"
          className={"h-[61px]"}
          value={form.confirmPassword}
          setValue={(val) => setForm({ ...form, confirmPassword: val.trim() })}
          label={"Confirm Password"}
          placeHolder={"Confirm password"}
          errMsg={
            form.newPassword !== form.confirmPassword
              ? "Passwords don't match."
              : ""
          }
        />
        <ButtonBlack
          text={
            loading ? <Loader className="animate-spin" /> : "Change Password"
          }
          disabled={validateForm(form)}
          className={"justify-center w-fit"}
          type={"submit"}
        />
      </form>
    </div>
  );
};

export default ChangePassword;
