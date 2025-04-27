"use client";

import api from "@/api";
import ButtonBlack from "@/components/Shared/ButtonBlack";
import ButtonWhite from "@/components/Shared/ButtonWhite";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Google = () => {
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const codeParam = params.get("code");
    if (!codeParam) return;
    const handleConfirm = async () => {
      try {
        const res = await api.get(
          `/api/accounts/google/callback?code=${codeParam}`
        );

        console.log(res);
      } catch (error) {
        console.error(
          "An error occurred during confirmation:",
          error?.response?.data || error.message
        );

        toast.error("Oops! Something went wrong. Refresh the page");
      } finally {
        setLoading(false);
      }
    };

    handleConfirm();
  }, [params, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-4 text-xl">
        <h2 className="font-bold">Google Confirmation</h2>
        <div>
          {loading ? (
            ""
          ) : (
            <aside className="flex flex-col items-center gap-4">
              <p className="">Failed</p>
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

export default Google;
