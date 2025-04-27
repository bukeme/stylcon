"use client";

const Stage1 = ({ form, setPreference }) => {
  const choose = (selected) => {
    const preference = [...form.preference];
    const index = preference.indexOf(selected);
    if (index < 0) {
      preference.push(selected);
      setPreference(preference);
    } else {
      preference.splice(index, 1);
      setPreference(preference);
    }
  };

  return (
    <div className=" flex flex-col gap-4 mb-3">
      <h2 className="uppercase text-4xl font-bold max-w-[380px]">
        Get in touch with an expert.
      </h2>
      <p className="text-lg">What would you like to do?</p>
      <div className="mt-6 flex flex-col gap-4">
        {[
          "BRANDING",
          "WEBSITE DESIGN",
          "MERCH DESIGN, MOCKUP AND TECHPACKS",
          "PACKAGING",
        ].map((option, i) => (
          <div
            key={i}
            onClick={() => choose(option)}
            className={`p-6 bg-grey/10 cursor-pointer flex gap-4 items-center`}
          >
            <aside
              className={`h-5 w-5 border border-dark transition-colors duration-500 ${
                form.preference.includes(option) && "bg-dark"
              }`}
            ></aside>
            <p className="uppercase text-lg">{option}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stage1;
