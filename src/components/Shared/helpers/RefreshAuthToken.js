import api from "@/api";

export const refreshAuthToken = async (refreshToken) => {
  try {
    const res = await api.post("/api/accounts/token/refresh/", {
      refreshToken,
    });
    console.log(res);
    return await res.data;
  } catch (err) {
    throw err;
  }
};
