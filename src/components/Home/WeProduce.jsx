import Image from "next/image";
import { convertURL } from "../Shared/helpers/helpers";

const details = [
  {
    text: "Fill in all your production details",
    desc: "Provide your design, fabric choices, and quantity requirements using our simple form to customize your production process.",
  },
  {
    text: "Submit",
    desc: "Review your details and send them to our team with one click for fast processing and expert handling.",
  },
  {
    text: "Get a Quote",
    desc: "Receive an accurate production cost estimate based on your unique project requirements within 24 hours.",
  },
];

const WeProduce = () => {
  return (
    <section className="contain py-24">
      <div className="flex flex-col gap-2 items-start mb-6">
        <p className="text-lg text-grey">WE PRODUCE</p>
        <h3 className="text-4xl md:text-5xl font-bold leading-10 md:leading-[60px] max-w-[541px]">
          {"  Building a brand is hard, production shouldn't be."}
        </h3>
      </div>
      <Image
        className="w-full rounded-lg mt-10 object-cover"
        src={convertURL(
          "https://drive.google.com/file/d/1dGhrzrDZNBlSu2Ovjf0rjcbCH3buwN_4/view?usp=drive_link"
        )}
        width={1000}
        height={1000}
        alt=""
      />
      <div className="grid grid-cols-1 md:grid-cols-3 md:items-end gap-6 mt-10">
        {details.map((deet) => (
          <div key={deet.text} className="flex flex-col gap-2 items-start">
            <h3 className="text-3xl font-bold">{deet.text}</h3>
            <p className=" text-grey">{deet.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WeProduce;
