"use client";
import Image from "next/image";
import ButtonPlain from "../Shared/ButtonPlain";
import CustomLink from "../Shared/CustomLink";

const images = [
  "https://drive.google.com/uc?export=view&id=1Sgpnb9Sw6iSJDaLLZBtT3naOairggXFd",
  "https://drive.google.com/uc?export=view&id=1GJh89Pu0f_Hg76ChE6m7VPgD5LdyUOzo",
  "https://drive.google.com/uc?export=view&id=1OgMfNDhdddvV4QSFvocwrn60vO0UiyYD",
  "https://drive.google.com/uc?export=view&id=1nBcrwEf6tX2cQ8oI-Jnu5pQSTmeb3v46",
];

const WePackage = () => {
  return (
    <section className="contain py-24 grid grid-cols-1 md:grid-cols-2 gap-6 md:items-center">
      <aside className="flex flex-col gap-2 items-start">
        <p className="text-lg text-grey">WE PACKAGE</p>
        <h3 className="text-4xl md:text-5xl font-bold leading-10 md:leading-[60px] max-w-[431px]">
          Get your products ready to sell with custom made packaging for your
          brand
        </h3>

        <CustomLink url={"/get-design"}>
          <ButtonPlain
            text={"MAKE A REQUEST"}
            className={"text-[#278007] text-lg font-bold pt-6"}
          />
        </CustomLink>
      </aside>
      <aside className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {images.map((url, i) => (
          <Image
            key={url}
            className={`object-cover h-[298px] ${i < 2 ? "" : "rounded-xl"}`}
            src={url || ""}
            width={1000}
            height={1000}
            alt=""
          />
        ))}
      </aside>
    </section>
  );
};

export default WePackage;
