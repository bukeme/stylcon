"use client";
import ButtonPlain from "../Shared/ButtonPlain";
import Image from "next/image";
import ButtonWhite from "../Shared/ButtonWhite";
import useAuthStore from "../authStore";
import CustomLink from "../Shared/CustomLink";

const Hero = () => {
  const { token } = useAuthStore();

  return (
    <section className="text-[#f8f8f8]">
      <Image
        className="w-full h-[662px] lg:h-[90vh] object-cover brightness-50 bg-grey/25"
        src={
          "https://drive.google.com/uc?export=view&id=16msCUrsROgMWzwdNkSBhiwHewPkJkTsY" ||
          ""
        }
        alt="Hero image"
        width={10000}
        height={10000}
      />
      <div className="relative contain">
        <div className="absolute left-0 bottom-8 xs:bottom-[6.44rem] flex flex-col gap-6 items-center sm:items-start px-6 xl:px-0">
          <h1 className="font-[900] Satoshi-bold text-6xl lg:text-8xl max-w-[750px] lg:max-w-[900px] tracking-tighter text-center sm:text-left">
            Your fashion production assistant
          </h1>
          <p className="text-2xl text-center sm:text-left">
            Create your fashion brand from start to finish
          </p>
          <aside className="flex flex-col sm:flex-row mt-2 gap-8 items-center text-lg font-bold">
            <CustomLink url={"/dashboard"}>
              <ButtonWhite
                text={token ? "Go to Dashboard" : "Get Started"}
                className={""}
                handleClick={() => {}}
              />
            </CustomLink>

            <CustomLink url={"/how"}>
              <ButtonPlain
                text={"How it works"}
                handleClick={() => {}}
                className={""}
              />
            </CustomLink>
          </aside>
        </div>
      </div>
      <div className="flex flex-col gap-2 items-center py-20 bg-[#F9FAFB]">
        <p className="lg:text-lg text-grey">AT THE HEART OF WHAT WE DO</p>
        <h3 className="text-2xl lg:text-4xl text-dark font-bold text-center">
          Your all in one clothing manufacturers.
        </h3>
      </div>
    </section>
  );
};

export default Hero;
