"use client";
import Image from "next/image";
import CustomLink from "../Shared/CustomLink";
import useAuthStore from "../authStore";

const DashboardHeaderBasic = ({
  isEmpty,
  searchInput,
  setSearchInput,
  url = "/",
  activeNav,
  setActiveNav,
}) => {
  const { user } = useAuthStore();
  return (
    <header
      className={`flex justify-between items-start px-6 lg:px-9 2xl:px-0 ${
        isEmpty ? "py-0 mt-6" : "py-6"
      }`}
    >
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="flex items-center gap-5">
          <CustomLink url={url} className={"flex justify-center"}>
            <Image
              src="/stylcon.png"
              alt=""
              width={35}
              height={20}
              className=""
            />
          </CustomLink>
          {!isEmpty && <p className="font-bold">Projects</p>}
        </div>
        {!isEmpty && (
          <div className="lg:pl-10 mt-4 lg:mt-0 flex gap-2 items-center">
            {["Draft", "Completed"].map((txt) => (
              <button
                key={txt}
                onClick={() => setActiveNav(txt.toLowerCase())}
                className={`px-4 py-2 rounded-lg transition-all ease-linear duration-500 ${
                  activeNav === txt.toLowerCase()
                    ? "bg-grey/15 text-dark"
                    : "bg-transparent text-grey"
                }`}
              >
                {txt}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center gap-4">
        {!isEmpty && (
          <input
            type="text"
            className="hidden md:block bg-white h-11 w-[423px] border border-grey/25 placeholder:text-grey rounded-[50px] pl-4 focus:outline-dark/75"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        )}
        <CustomLink url={"/dashboard/account"}>
          {user?.image ? (
            <Image
              src={user?.image?.image || ""}
              alt=""
              width={54}
              height={54}
              className="rounded-full bg-[#6e78a8]"
            />
          ) : (
            <div className="w-[43px] h-[43px] bg-[#6e78a8] rounded-[50%] flex items-center justify-center">
              <p className="text-2xl font-medium text-white mb-1.5">
                {`${user?.username || user?.first_name}`
                  ?.split("")[0]
                  ?.toLowerCase() || ""}
              </p>
            </div>
          )}
        </CustomLink>
      </div>
    </header>
  );
};

export default DashboardHeaderBasic;
