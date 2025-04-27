import MainLayout from "@/components/Layouts/MainLayout";

const content = [
  "If you are a start up, I would recommend you start with everyday ready to wear items, such as Tees, Hoodies ,caps ETC.",
  "If you are under a budget always ensure your designs are minimal as this help you save cost.",
  "When printing ensure you have read thoroughly about the various printing types and the advantages each have over each other.",
  "If you are printing DTF (DIRECT TO FILM) ensure your designs are not in a block format, they should have as many spaces in between the design as possible, this allows the products not have a paper feeling.",
  "If you want your design to be screen-printed, ensure they are in spot colors and a max of 3 colors. This guarantees a good design,",
  "If you are a start up, I would recommend you start with everyday ready to wear items, such as Tees, Hoodies ,caps ETC",
  "If you are under a budget always ensure your designs are minimal as this help you save cost",
  "When printing ensure you have read thoroughly about the various printing types and the advantages each have over each other",
  "If you are printing DTF (DIRECT TO FILM) ensure your designs are not in a block format, they should have as many spaces in between the design as possible, this allows the products not have a paper feeling.",
  "If you want your design to be screen-printed, ensure they are in spot colors and a max of 3 colors. This guarantees a good design,",
  "To ensure you have a very clear vectorized design, do not try to extract the design from a mock up you made with procreate or Canva",
  "To avoid back and forth with manufactures, and save a lot money from making samples or making in bulk an item you would not like, get a certified designer that would help you design your project.",
  "Having a tech pack saves you a lot of stress explaining what you want and you have a concrete reference to ensure the manufacturer does the right thing",
  "I would strongly advice you don't make certain items such as heavy customized denims, rugby jersey in Nigeria",
  "A very good way to save cost and time is to get blanks and customize them.",
  "Generally accepted printing file format worldwide are PSD, & AI",
  "Photorealistic designs are better printed as DTG/ DTF",
];

export default function HelpfulTips() {
  return (
    <MainLayout>
      <section className="contain py-20">
        <div data-aos="zoom-in" className="flex flex-col items-center gap-1">
          <p className="text-grey text-lg">Stylcon</p>
          <h1 className="text-5xl font-bold">HELPFUL TIPS</h1>
        </div>
        <div className="pt-20 flex flex-col gap-6">
          <h2 className="uppercase font-bold text-lg">Introduction</h2>
          {content.map((text, i) => (
            <p key={i} className="text-[#515151]">
              {text}
            </p>
          ))}
        </div>
      </section>
    </MainLayout>
  );
}
