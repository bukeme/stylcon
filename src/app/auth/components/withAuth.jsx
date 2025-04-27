import React, { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { getToken, setCookie } from "@/components/Shared/helpers/helpers";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "@/constants";

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
      auth().catch(() => setIsAuthorized(false));
    }, [auth]);

    const refreshToken = async () => {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);

      try {
        const res = await api.post("/api/token/refresh/", {
          refresh: refreshToken,
        });

        if (res.status === 200) {
          setCookie(await res.data.access);
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (err) {
        console.log(err);
        setIsAuthorized(false);
      }
    };

    const auth = useCallback(async () => {
      const token = getToken();
      if (!token) {
        return setIsAuthorized(false);
      }

      const decoded = jwtDecode(token);
      const tokenExpiration = decoded.exp;
      const now = Date.now() / 1000;

      tokenExpiration < now ? await refreshToken() : setIsAuthorized(true);
    }, []);

    if (isAuthorized === null) {
      return <div>Loading...</div>;
    }

    const wrappedComponent = React.createElement(WrappedComponent, props);

    return isAuthorized ? wrappedComponent : <Navigate to="/login" />;
  };
  return Wrapper;
};

export default withAuth;
