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
} from "@/components/Shared/helpers/helpers";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";
import api from "@/api";
import useAuthStore from "@/components/authStore";
import CustomLink from "@/components/Shared/CustomLink";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [keepSignIn, setKeepSignIn] = useState(false);
  const { setTokens, setKeepLoggedIn, token, setUser, setPageLoad } =
    useAuthStore();
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
    if (validateForm(form)) return;

    setLoading(true);
    try {
      const res = await api.post(
        "/api/accounts/login/",
        {
          email: form.email,
          password: form.password,
        },
        {
          headers: {
            "X-CSRFToken":
              "ZUTH3zTUbbZs3JgG0RZQsSDyPSE8GstS1GnpqoBn7rYvosOLt6Orvz7n5POXHRDA",
          },
        }
      );

      const { data, message } = await res.data;
      // console.log(data);

      const filteredData = Object.keys(data)
        .filter((key) => key !== "tokens")
        .reduce((acc, key) => {
          acc[key] = data[key];
          return acc;
        }, {});

      toast.success(message);

      setTokens(data.tokens.access, data.tokens.refresh, data.pk);
      setUser(filteredData);
      setKeepLoggedIn(keepSignIn);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      console.log(err);
    } finally {
      setLoading(false);
      setSubmitted(false);
    }
  };
  return (
    <section className="w-full pb-20 flex-grow">
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
        className="max-w-[411px] mx-auto flex flex-col gap-4 mt-20 px-6 sm:px-0"
      >
        <h3 className="text-3xl font-bold text-dark mb-4 text-center">
          Sign In
        </h3>
        <div className="border-b-2 border-grey/25 pb-6">
          <WithGoogle text={"Sign In With Google"} />
        </div>
        <Input
          name={"email"}
          type="email"
          className={"h-[61px]"}
          value={form.email}
          setValue={(val) => setForm({ ...form, email: val.trim() })}
          label={"Email"}
          placeHolder={"user@example.com"}
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
          errMsg={
            submitted && !form.password
              ? "This field cannot be left blank. Please enter your password."
              : ""
          }
        />
        <div className="flex items-center justify-between -mt-4">
          <div
            className={`flex items-center gap-2 justify-center text-grey ${""}`}
          >
            <input
              type="checkbox"
              checked={keepSignIn}
              onChange={(e) => setKeepSignIn(e.target.checked)}
              className={``}
            />
            <label>{"Keep me signed in"}</label>
          </div>
          <CustomLink url="/auth/forgot">
            <p className="underline text-grey">Forgot your password</p>
          </CustomLink>
        </div>

        <div className="w-full mt-6">
          {loading ? (
            <ButtonBlack
              text={""}
              icon={
                <div className="animate-spin">
                  <Loader />
                </div>
              }
              disabled={true}
              className={"justify-center w-full"}
            />
          ) : (
            <ButtonBlack
              text={"Sign In"}
              disabled={validateForm(form)}
              className={"justify-center w-full"}
              type={"submit"}
            />
          )}
        </div>
        <p className="text-grey text-center">
          New to Stylcon?{" "}
          <CustomLink
            url={"/auth/register"}
            type="button"
            className="text-[#617BFF] underline"
          >
            Sign Up
          </CustomLink>
        </p>
      </form>
    </section>
  );
};

export default Login;
