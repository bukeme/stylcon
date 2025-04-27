"use client";
import Image from "next/image";
import ButtonBlack from "../Shared/ButtonBlack";
import useAuthStore from "../authStore";
import CustomLink from "../Shared/CustomLink";
import { Menu } from "lucide-react";

const Header = ({ activeNav, setShowMobileNav, NavItems }) => {
  const { token, setPageLoad } = useAuthStore();

  return (
    <div className="fixed left-0 top-0 right-0 z-50 drop-shadow w-full bg-white Satoshi">
      <div className="w-full py-6 contain flex justify-between items-center ">
        <CustomLink
          url={"/"}
          otherFunc={() => {
            if (activeNav === "/") setPageLoad(false);
          }}
        >
          <Image src="/logo.png" alt="company logo" width={120} height={120} />
        </CustomLink>
        <div className="hidden lg:flex gap-8 items-end">
          <CustomLink
            url={"/"}
            otherFunc={() => {
              if (activeNav === "/") setPageLoad(false);
            }}
          >
            <button
              className={`text-lg Satoshi-md transition-all duration-500 ${
                activeNav === "/"
                  ? "text-black"
                  : "text-grey hover:text-dark/75 hover:scale-95"
              }`}
            >
              Home
            </button>
          </CustomLink>
          {NavItems.map((nav) => (
            <CustomLink key={nav.name} url={nav.url}>
              <button
                className={`text-lg Satoshi-md transition-all duration-500 ${
                  activeNav.startsWith(nav.url)
                    ? "text-black"
                    : "text-grey hover:text-dark/75 hover:scale-95"
                }`}
              >
                {nav.name}
              </button>
            </CustomLink>
          ))}
        </div>
        {!token ? (
          <CustomLink url={"/auth/login"}>
            <ButtonBlack
              text={"Log in"}
              className={"uppercase hidden lg:block"}
            />
          </CustomLink>
        ) : (
          <div></div>
        )}
        <div
          className="font-bold text-xl lg:hidden cursor-pointer"
          onClick={() => setShowMobileNav(true)}
        >
          <Menu size={32} />
        </div>
      </div>
    </div>
  );
};

export default Header;
