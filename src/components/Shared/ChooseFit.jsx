"use client";

const ChooseFit = ({
  choices,
  fitChoice,
  setFitChoice,
  requirement,
  setRequirement,
}) => {
  return (
    <section className="w-full bg-white flex flex-col py-10 px-6 xl:max-w-[320px] grow">
      <h2 className="font-bold text-2xl">Choose your fit</h2>
      <p className="text-grey mt-4 hidden md:block">
        What type of fit fo you want the clothes to have on you. Choose a
        pre-made measurement or upload your custom measurement
      </p>
      <div className="mt-10 flex flex-col gap-6">
        {choices.map((choice, i) => (
          <div
            onClick={() => setFitChoice(choice)}
            key={i}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div
              className={`w-2 h-2 ring-2 ring-offset-2 rounded-full ease-linear duration-500 ${
                fitChoice === choice ? "bg-dark ring-dark" : "ring-grey"
              }`}
            />
            <p>{choice}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-col gap-4 h-full">
        <label htmlFor="requirement">
          {"Any special requirement's you'd like"}
        </label>
        <textarea
          name="requirement"
          id="requirement"
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="focus:outline-none border border-dark/10 min-h-[150px] h-full p-2"
        ></textarea>
      </div>
    </section>
  );
};

export default ChooseFit;
