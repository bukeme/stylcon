"use client";
import { useState } from "react";
import ResourcesCard from "./ResourcesCard";

const content = [
  {
    img: "https://drive.google.com/file/d/1kFx8-5Mh-ql3Zgz6A7V6CgM-Zojre948/view?usp=drive_link",
    tag: "Production",
    text: "Product Guide",
    desc: "This helps you understand all you need to know about product quality, printing, finishing e.t.c",
    btnText: "Download Product Guide",
    file: "product-guide.pdf",
  },
  {
    img: "https://drive.google.com/file/d/1osqORlST14nUxF_TW2Yxyv-BZSkic8ZP/view?usp=drive_link",
    tag: "Marketing",
    text: "Newbie Guide",
    desc: "Just starting out your fashion brand, here's how to go from zero to successful brand in one product.",
    btnText: "Download Newbie Guide",
    file: "NEWBIE-GUIDE.pdf",
  },
  {
    img: "https://drive.google.com/file/d/1VoOV3dzKbqYD8HFj0A0x_tsoqEOIgVvv/view?usp=drive_link",
    tag: "Marketing",
    text: "Copyright Guide",
    desc: "This Document breaks down all you need to know about copyright and copyright laws. How to protect your designs and how to avoid copyright theft.",
    btnText: "Download Copyright Guide",
    file: "essential-Copyright-Guide.pdf",
  },
  {
    img: "https://drive.google.com/file/d/1FhyYdslLg8lv_VXHpFSgrrZtBH5pV2q5/view?usp=drive_link",
    tag: "Design",
    text: "Brand Style Guide",
    desc: "You need to build your brand with a style. See our all in one guide to help you choose a style.",
    btnText: "Download Brand Style Guide",
    file: "brand_style_guide.pdf",
  },
  {
    img: "https://drive.google.com/file/d/1eOzWbf6vylanh2AxTGhFOrpbiiZmIN67/view?usp=drive_link",
    tag: "Design",
    text: "Mockup Templates",
    desc: "To produce any outfit, your manufacturer requires a mockup. Here's a simple drag and drop template you can use.",
    btnText: "Download MockUp Template",
    file: "mockup_template.pdf",
  },
  {
    img: "https://drive.google.com/file/d/1NaQfuCSBzRc2NIKKs19ywkV0FRVtTs4G/view?usp=drive_link",
    tag: "Design",
    text: "All in one Guide",
    desc: "This includes all out products for your use. You want it all, you can have it all in one place.",
    btnText: "Download All in One Guide",
    file: "All_in_one.zip",
  },
];

const ResourceContent = ({ contentRef }) => {
  const [prevEmail, setPrevEmail] = useState("");
  return (
    <section
      ref={contentRef}
      className="py-24 contain grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {content.map((item, i) => (
        <ResourcesCard
          key={i}
          details={item}
          prevEmail={prevEmail}
          setPrevEmail={setPrevEmail}
        />
      ))}
    </section>
  );
};

export default ResourceContent;
