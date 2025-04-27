"use client";
import useAuthStore from "@/components/authStore";
import { FormProvider } from "@/components/Dashboard/FormContext";
import { isTokenExpired } from "@/components/Shared/helpers/helpers";
import { refreshAuthToken } from "@/components/Shared/helpers/RefreshAuthToken";
import LoadingIndicator from "@/components/Shared/LoadingIndicator";
import { DM_Sans } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const dmSans = DM_Sans({ subsets: ["latin"] });

export default function DashboardRootLayout({ children }) {
  const {
    token,
    refreshToken,
    keepLoggedIn,
    setTokens,
    logout,
    initializeStore,
    isInitialized,
  } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    initializeStore();
  }, [initializeStore]);

  useEffect(() => {
    if (!isInitialized) return;

    const handleAuth = async () => {
      try {
        if (token && !isTokenExpired(token)) {
          return;
        } else if (!token || isTokenExpired(token)) {
          throw Error();
        }

        if (keepLoggedIn && refreshToken) {
          const data = await refreshAuthToken(refreshToken);
          // console.log(data);
          if (data) {
            setTokens(data.token, data.refreshToken);
          } else {
            throw Error();
          }
        }
      } catch (err) {
        // console.log(err);
        logout();
        router.push("/auth/login");
      }
    };

    handleAuth();
  }, [
    keepLoggedIn,
    refreshToken,
    setTokens,
    logout,
    token,
    isInitialized,
    router,
  ]);

  if (!token) return <div></div>;

  return (
    <FormProvider>
      <div className={dmSans.className && "overflow-x-hidden"}>
        <LoadingIndicator />
        {children}
      </div>
    </FormProvider>
  );
}
