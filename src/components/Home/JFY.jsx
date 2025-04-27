"use client";

import Image from "next/image";
import ButtonBlack from "../Shared/ButtonBlack";
import CustomLink from "../Shared/CustomLink";

const products = [
  {
    text: "Washed hoodies",
    img: "https://drive.google.com/uc?export=view&id=17SxjwJIIFqSYvkky-79pbQpm8_pxET_p",
  },
  {
    text: "5D Panel hat",
    img: "https://drive.google.com/uc?export=view&id=1_blRZV1Kki1en_X2cZoiT5mcJZaqW177",
  },
  {
    text: "TACKLED TANKED TOPS",
    img: "https://drive.google.com/uc?export=view&id=1fFln7-kvJi0BBewJ4KnxaKy0dbHb54nl",
  },
  {
    text: "240 GSM TEE",
    img: "https://drive.google.com/uc?export=view&id=1glOZcjYZfKdSdjzyM51AaLIqI6VqI4E7",
  },
  {
    text: "Washed shorts",
    img: "https://drive.google.com/uc?export=view&id=10riV6oUlejPtP8TSy6q2OsnMxmtux9FI",
  },
  {
    text: "WASHED TANK TOPS",
    img: "https://drive.google.com/uc?export=view&id=11VNfifxkuTR47eOLe4IAXpSQCyRiINc_",
  },
  {
    text: "WASHED TERRY PANTS",
    img: "https://drive.google.com/uc?export=view&id=1tP2gdcCfx_vjOt-uvfsYMstX1mp1QqIp",
  },
  {
    text: "WOMEN WRANGLER TEES",
    img: "https://drive.google.com/uc?export=view&id=13UM6UsuMkn7z-5XwDDqai3Jmw43bgHmQ",
  },
];

const JFY = () => {
  return (
    <section className="bg-[#F9FAFB] py-24 flex flex-col items-center gap-16">
      <div className="flex flex-col gap-2 items-center bg-[#F9FAFB]">
        <h3 className="text-2xl lg:text-4xl text-dark font-bold text-center">
          Products just for you
        </h3>
        <p className="lg:text-lg text-grey">See all available products</p>
      </div>
      <div className="contain grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14 mt-16">
        {products.map((prod, i) => (
          <div key={i} className="flex flex-col gap-6 items-center">
            <Image
              className={`object-cover h-[221px]`}
              src={prod.img || ""}
              width={1000}
              height={1000}
              alt=""
            />
            <p className="text-lg font-bold text-[#5A5A5A]">{prod.text}</p>
          </div>
        ))}
      </div>
      <CustomLink url={"/products"}>
        <ButtonBlack text={"View Catalogue"} className={"w-fit px-8 py-4"} />
      </CustomLink>
    </section>
  );
};

export default JFY;
