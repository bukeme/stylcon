"use client";

import api from "@/api";
import ButtonBlack from "@/components/Shared/ButtonBlack";
import ButtonWhite from "@/components/Shared/ButtonWhite";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Validate = () => {
  const [token, setToken] = useState(null);
  const [uidb64, setUidb64] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    console.log(params);

    const extractedToken = params.get("token");
    const extracteduidb64 = params.get("uidb64");

    if (extractedToken) {
      setToken(extractedToken);
    }
    if (extracteduidb64) {
      setUidb64(extracteduidb64);
    }
  }, []);

  useEffect(() => {
    const handleConfirm = async () => {
      if (!token || !uidb64) return;
      try {
        const res = await api.post(
          "/api/accounts/activate/",
          {
            uidb64: uidb64,
            token: token,
          },
          {
            headers: {
              "X-CSRFToken":
                "qQljG0FawMTClFopyGX8whSIzaGYMIgVsCP13PnDs2SFGoWu1VMJzYmxP7QNN7qD",
            },
          }
        );
        const data = await res.data;
        // console.log("Confirmation successful:", data);

        toast.success("Email Verification Successful.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        router.push("/auth/login");
      } catch (error) {
        console.error(
          "An error occurred during confirmation:",
          error?.response?.data || error.message
        );

        toast.error("Oops! Something went wrong. Refresh the page", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } finally {
        setLoading(false);
      }
    };

    handleConfirm();
  }, [token, router, uidb64]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-4 text-xl">
        <h2 className="font-bold">Verify Email</h2>
        <div>
          {loading ? (
            <span>We are verifying your email.</span>
          ) : (
            <aside className="flex flex-col items-center gap-4">
              <p className="">
                Email Verification Failed. Kindly Refresh The Page.
              </p>
              <ButtonBlack
                text={"Refresh page"}
                handleClick={() => router.refresh()}
              />
              <ButtonWhite
                text={"Go back to sign-up"}
                handleClick={() => router.replace("/auth/register")}
              />
            </aside>
          )}
        </div>
      </div>
      {loading && (
        <div className="flex flex-row gap-2 mt-6">
          <div className="w-4 h-4 rounded-full bg-dark animate-bounce"></div>
          <div className="w-4 h-4 rounded-full bg-dark animate-bounce [animation-delay:-.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-dark animate-bounce [animation-delay:-.5s]"></div>
        </div>
      )}
    </div>
  );
};

export default Validate;
