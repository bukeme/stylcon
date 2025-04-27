"use client";

const Stage4 = ({ form }) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg">Summary</h2>
      <ListItem label="Name" text={form.name?.toUpperCase()} />
      <ListItem label="Email" text={form.email} />
      <ListItem label="Company name" text={form.brandName?.toUpperCase()} />
      <ListItem label="Whatsapp" text={form.whatsapp} />
      <ListItem label="Project Summart" text={form.brief} />
    </div>
  );
};

export default Stage4;

const ListItem = ({ label, text }) => (
  <div className="flex flex-col gap-4 py-4">
    <p className="text-lg font-medium uppercase text-dark">{label}</p>
    {text.includes("\n") ? (
      <div className="text-grey">
        {text.split("\n").map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    ) : (
      <p className="text-grey">{text}</p>
    )}
  </div>
);
