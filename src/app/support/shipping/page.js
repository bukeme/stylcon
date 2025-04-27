import MainLayout from "@/components/Layouts/MainLayout";

const content = [
  "Orders might take up to 2-12 weeks to be fulfilled since each product is made to order. Please make sure  to check the estimated turnaround time before placing your order as cancellations won't be eligible  after 24 hours from purchase.",
  "For any modification regarding shipping address please get in touch with our customer service. Shipping prices would be calculated based on the location at which products is being manufactured so  shipping would vary from the place of delivery, Items that are fully made from our Chinese factories can/would be sent with the courier service/agent  of your choice, STYLCON MARKETPLACE has no obligation to any recommendation made.",
  "The courier service/agent is a third party and STYLCON MARKETPLACE would not be held liable for any  agreement/made between you and the courier service/agent. Shipping prices and rates will be calculated based on the order's weight. International orders might be charged import duties and taxes by customs upon arrival, the company is  not responsible for any of them.",
  "The company is not responsible for any lost or stolen packages and packages damaged during transit or  delivery, please contact the courier directly in order to solve any problems that may arise upon transit or  delivery. In case of returned packages due to any circumstances, the customer is responsible for the cost of reshipping. Shipping is non-refundable",
];

export default function Shipping() {
  return (
    <MainLayout>
      <section className="contain py-20">
        <div data-aos="zoom-in" className="flex flex-col items-center gap-1">
          <p className="text-grey text-lg">Stylcon</p>
          <h1 className="text-5xl font-bold">SHIPPING POLICY</h1>
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
