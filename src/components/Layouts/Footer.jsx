"use client";
import { Whatsapp } from "iconsax-react";
import { ArrowRight, Instagram, Loader, Twitter, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CustomLink from "../Shared/CustomLink";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "@/api";

const Legal = [
  { name: "Privacy Policy", url: "/support/privacy-policy" },
  { name: "Return Policy", url: "/support/return-policy" },
  { name: "Shipping Policy", url: "/support/shipping" },
  { name: "Terms of Service", url: "/support/terms" },
];
const Info = [
  { name: "FAQs", url: "/support/faqs", file: false },
  { name: "Download Product Guides", url: "product-guide.pdf", file: true },
  {
    name: "Download Copyright guide",
    url: "essential-Copyright-Guide.pdf",
    file: true,
  },
  { name: "Dashboard", url: "/dashboard", file: false },
];

const Contacts = [
  "Our team is available Mon-Fri 9am - 7pm.",
  "support@stylconmarketplace.com",
];

const Socials = [
  // { icon: <Youtube />, url: "" },
  {
    icon: <Instagram />,
    url: "https://www.instagram.com/stylcon.marketplace?igsh=MTRteDllenNydHE2NQ==",
  },
  // { icon: <Twitter />, url: "" },
  {
    icon: <Whatsapp variant="Outline" />,
    url: "https://api.whatsapp.com/message/OQWXD6AJJ2G7D1?autoload=1&app_absent=0",
  },
];

const Footer = ({}) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const joinNewLetter = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/api/accounts/join-newsletter/", {
        email: email,
      });

      const { message } = await res.data;

      toast.success(message || "You've successfully joined the newsletter!");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-[#F4F4F4]">
      <div className="py-24 contain flex flex-col md:flex-row gap-8 lg:justify-between">
        <aside className="flex flex-col gap-8 justify-between">
          <form
            onSubmit={joinNewLetter}
            className="w-full  flex items-center rounded-l-xl overflow-hidden"
          >
            <input
              className="focus:outline-none bg-white h-[38px] pl-3 w-full placeholder:text-sm Satoshi lg:min-w-[266px]"
              placeholder="Join our newsletter for more resources"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
            <button
              className="active:scale-105 text-white active:bg-white active:text-dark transition-all duration-700 bg-dark h-[38px] px-4 rounded"
              type="submit"
            >
              {loading ? <Loader className="animate-spin" /> : <ArrowRight />}
            </button>
          </form>
          <CustomLink url={"/"}>
            <Image
              src="/logo.png"
              alt="company logo"
              width={130}
              height={130}
            />
          </CustomLink>
        </aside>
        <aside className="flex flex-col items-start gap-2 max-w-[220px]">
          <h5 className="font-bold">LEGAL</h5>
          {Legal.map((item) => (
            <CustomLink key={item.name} url={item.url}>
              <button className="font-medium text-start">{item.name}</button>
            </CustomLink>
          ))}
        </aside>
        <aside className="flex flex-col items-start gap-2 max-w-[220px]">
          <h5 className="font-bold">INFO</h5>
          {Info.map((item) => {
            return item.file ? (
              <a
                key={item.name}
                href={`/${item.url}`}
                download={item.url}
                className=""
              >
                <button className="font-medium text-start">{item.name}</button>
              </a>
            ) : (
              <CustomLink key={item.name} url={item.url}>
                <button className="font-medium text-start">{item.name}</button>
              </CustomLink>
            );
          })}
        </aside>
        <aside className="flex flex-col items-start gap-5 max-w-[220px]">
          <h5 className="font-bold">CONTACT</h5>
          {Contacts.map((item, i) => (
            <p className="font-medium text-start" key={i}>
              {item}
            </p>
          ))}
          <p className="font-bold flex flex-col gap-1">
            Customer care:{" "}
            <span className="font-normal">08147043794 - 07041215503</span>
          </p>
          <div className="flex gap-2 text-grey">
            {Socials.map((item, i) => (
              <Link
                key={i}
                href={item.url}
                className="font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Footer;
