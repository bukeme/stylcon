"use client";
import Footer from "./Footer";
import Header from "./Header";
import { useEffect, useState } from "react";
import Aos from "aos";
import MobileNav from "./MobileNav";
import useAuthStore from "../authStore";
import { isTokenExpired } from "../Shared/helpers/helpers";

const NavItems = [
  { name: "Products", url: "/products" },
  { name: "Resources", url: "/resources" },
  { name: "About Us", url: "/about" },
  { name: "Support", url: "/support" },
];

const MainLayout = ({ children }) => {
  const [activeNav, setActiveNav] = useState("");
  const [showMobileNav, setShowMobileNav] = useState(false);
  const { token, logout, initializeStore, isInitialized, setPageLoad } =
    useAuthStore();

  useEffect(() => {
    initializeStore();
  }, [initializeStore]);

  useEffect(() => {
    if (!isInitialized) return;

    if (token && isTokenExpired(token)) {
      logout();
    }
  }, [logout, token, isInitialized]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setActiveNav(window.location.pathname);
    }
    setPageLoad(false);
  }, []);

  useEffect(() => {
    Aos.init({
      offset: 200,
      duration: 300,
      easing: "ease-in-sine",
    });
  }, []);

  return (
    <main className="pt-20">
      <Header
        activeNav={activeNav}
        setShowMobileNav={setShowMobileNav}
        NavItems={NavItems}
      />
      {children}
      <Footer />
      {showMobileNav && (
        <MobileNav
          activeNav={activeNav}
          setShowMobileNav={setShowMobileNav}
          NavItems={NavItems}
        />
      )}
    </main>
  );
};

export default MainLayout;
