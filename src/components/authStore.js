import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      refreshToken: null,
      keepLoggedIn: false,
      activeOption: null,
      sideNav: null,
      activeSideNav: null,
      isInitialized: false,
      user: null,
      userNum: null,
      activeId: null,
      reload: false,
      pageLoad: false,
      setActiveOption: (option) => set({ activeOption: option }),
      setSideNav: (option) => set({ sideNav: option }),
      setActiveSideNav: (option) => set({ activeSideNav: option }),
      setUser: (value) => set({ user: value }),
      setTokens: (token, refreshToken, userNum) =>
        set({ token, refreshToken, userNum, isInitialized: true }),
      setKeepLoggedIn: (value) => set({ keepLoggedIn: value }),
      setActiveId: (value) => set({ activeId: value }),
      setReload: () => set((state) => ({ reload: !state.reload })),
      setPageLoad: (pageLoad) => set({ pageLoad }),
      logout: () =>
        set({
          token: null,
          refreshToken: null,
          keepLoggedIn: false,
          isInitialized: true,
          user: null,
        }),
      initializeStore: () => set({ isInitialized: true }),
    }),

    {
      name: "authStorage",
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;
