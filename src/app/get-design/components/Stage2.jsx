"use client";

import StagesInput from "./StagesInput";

const Stage2 = ({ form, setForm }) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg">{"Let's get to know you"}</h2>
      <StagesInput
        value={form.name}
        setValue={(val) => setForm({ ...form, name: val })}
        label={"Name"}
        placeholder={"Enter Name"}
      />
      <StagesInput
        value={form.email}
        setValue={(val) => setForm({ ...form, email: val })}
        label={"Email"}
        placeholder={"Enter email address"}
      />
      <StagesInput
        value={form.brandName}
        setValue={(val) => setForm({ ...form, brandName: val })}
        label={"Brand Name"}
        placeholder={"Enter brand name"}
      />
      <StagesInput
        value={form.whatsapp}
        setValue={(val) => setForm({ ...form, whatsapp: val })}
        label={"Whatsapp"}
        placeholder={"Enter whatsapp number"}
      />
    </div>
  );
};

export default Stage2;
