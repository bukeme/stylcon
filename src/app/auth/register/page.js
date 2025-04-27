"use client";
import ButtonBlack from "@/components/Shared/ButtonBlack";
import Input from "@/components/Shared/Input";
import Image from "next/image";
import { startTransition, useEffect, useState } from "react";
import WithGoogle from "../components/WithGoogle";
import { useRouter } from "next/navigation";
import {
  validateEmail,
  validateForm,
  validatePassword,
  validateUserName,
} from "@/components/Shared/helpers/helpers";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";
import api from "@/api";
import useAuthStore from "@/components/authStore";
import CustomLink from "@/components/Shared/CustomLink";

const Register = () => {
  const [form, setForm] = useState({ username: "", password: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token, setPageLoad } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    setPageLoad(false);
  }, []);

  useEffect(() => {
    if (token) {
      router.push("/dashboard");
      startTransition(() => {
        setPageLoad(true);
      });
    }
  }, [token, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (validateForm(form) || validatePassword(form.password).length > 0)
      return;

    setLoading(true);
    try {
      const res = await api.post(
        "/api/accounts/register/",
        {
          username: form.username,
          email: form.email,
          password: form.password,
          password2: form.password,
        },
        {
          headers: {
            "X-CSRFToken":
              "rma9O5hz4oHuHTAnAmxzTI5RDfDx5mUjt8ERbUZ20EGx2C8s3BmaWpzGTcNm6L41",
          },
        }
      );
      const data = await res.data;

      console.log(res);
      console.log(data);
      toast.success(data.message);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.response?.data?.username[0] ||
          err.message
      );
      console.log(err);
    } finally {
      setLoading(false);
      setSubmitted(false);
    }
  };
  return (
    <div className="w-full flex flex-row items-stretch">
      <section className="w-full pb-20 flex-grow">
        <div className="max-w-[411px] mx-auto mt-6 lg:mt-8 px-6 sm:px-0">
          <CustomLink className="border-none bg-none" url={"/"}>
            <Image src="/stylcon.png" alt="" width={35} height={20} />
          </CustomLink>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-20">
            <h3 className="text-3xl font-bold text-dark mb-4">
              Create Account
            </h3>

            <Input
              name={"username"}
              type="text"
              className={"h-[61px]"}
              value={form.username}
              setValue={(val) => setForm({ ...form, username: val.trim() })}
              label={"Username"}
              placeHolder={"Username"}
              errMsg={submitted && validateUserName(form.username)}
            />

            <Input
              name={"email"}
              type="email"
              className={"h-[61px]"}
              value={form.email}
              setValue={(val) => setForm({ ...form, email: val.trim() })}
              label={"Email Address"}
              placeHolder={"Email Address"}
              errMsg={submitted && validateEmail(form.email)}
            />
            <Input
              name={"password"}
              type="password"
              className={"h-[61px]"}
              value={form.password}
              setValue={(val) => setForm({ ...form, password: val.trim() })}
              label={"Password"}
              placeHolder={"Password"}
              errMsg={submitted && validatePassword(form.password)}
            />
            {loading ? (
              <ButtonBlack
                text={""}
                icon={
                  <div className="animate-spin">
                    <Loader />
                  </div>
                }
                disabled={true}
                className={"justify-center"}
              />
            ) : (
              <ButtonBlack
                text={"Create Account"}
                disabled={validateForm(form)}
                className={"justify-center"}
                type={"submit"}
              />
            )}
            <p className="text-grey text-center">
              Already have an account?{" "}
              <CustomLink
                url={"/auth/login"}
                type="button"
                className="text-[#617BFF] underline"
              >
                Sign In
              </CustomLink>
            </p>
            <div className="border-t-2 border-grey/25 pt-2">
              <WithGoogle text={"Sign Up With Google"} />
            </div>
          </form>
        </div>
      </section>
      <aside className="min-w-[42%] min-h-dvh hidden lg:flex bg-[#F3F5F7] flex-col gap-4 px-20 justify-center">
        <h2 className="flex flex-col gap-1 text-dark text-3xl font-bold">
          Get your quote.
          <span className="text-grey">Craft your outfit.</span>
        </h2>
        <p className="max-w-[494px] text-lg text-grey leading-8">
          Get a quote for the production of your outfit with our interactive
          studio form. Craft your outfit, get your packaging and quote all in
          one place.
        </p>
      </aside>
    </div>
  );
};

export default Register;
