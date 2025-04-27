"use client";

const Stage3 = ({ form, setForm }) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg">{"Let's get to know you"}</h2>

      <div className="flex flex-col gap-4 py-4">
        <label className="text-lg font-medium uppercase">Project Brief</label>
        <textarea
          type="text"
          placeholder={"Just a brief summary of what you want us to do for you"}
          value={form.brief}
          onChange={(e) => setForm({ ...form, brief: e.target.value })}
          name={"brief"}
          className="focus:outline-none bg-transparent text-grey h-64"
        ></textarea>
      </div>
    </div>
  );
};

export default Stage3;
