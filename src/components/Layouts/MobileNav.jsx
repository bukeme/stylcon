import { X } from "lucide-react";
import ButtonBlack from "../Shared/ButtonBlack";
import CustomLink from "../Shared/CustomLink";

const MobileNav = ({ activeNav, setShowMobileNav, NavItems }) => {
  return (
    <section className="fixed z-[80] top-0 bottom-0 right-0 left-0 lg:hidden">
      <div
        onClick={() => setShowMobileNav(false)}
        className="bg-black/50 w-full h-full cursor-pointer blur-md"
      ></div>
      <div
        data-aos="fade-left"
        className="fixed top-0 right-0 bg-white w-[70%] sm:w-[300px] h-full flex flex-col pt-10 gap-6 items-start pl-8"
      >
        <button
          onClick={() => setShowMobileNav(false)}
          className="text-2xl Satoshi-md self-end pr-8"
        >
          <X size={32} />
        </button>
        <CustomLink url={"/"} otherFunc={() => setShowMobileNav(false)}>
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
          <CustomLink
            key={nav.name}
            url={nav.url}
            otherFunc={() => setShowMobileNav(false)}
          >
            <button
              className={`text-lg font-medium transition-all duration-500 ${
                activeNav.startsWith(nav.url)
                  ? "text-black"
                  : "text-grey hover:text-dark/75 hover:scale-95"
              }`}
            >
              {nav.name}
            </button>
          </CustomLink>
        ))}
        <CustomLink url={"/auth/login"}>
          <ButtonBlack text={"Log in"} className={"uppercase"} />
        </CustomLink>
      </div>
    </section>
  );
};

export default MobileNav;
