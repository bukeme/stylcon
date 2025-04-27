import MainLayout from "@/components/Layouts/MainLayout";

const content = [
  "RETURN & REFUND POLICY We aim to ensure full client satisfaction; this is why all our garments undergo multiple in-line quality  controls during the production process and before being shipped. Special note for all orders. Due to the nature of the materials developed by the company later exposed  to garment dyeing, you must pay attention to the following information before ordering with us.",
  "We do not accept order cancellations once more than 24 hours have elapsed since the purchase date as  every order is prepared and manufactured individually on demand.",
  "Products declared as samples are not allegeable for any claims. With all products, slight variations in color, size, and weight are to be expected. Measurements have a  tolerance of +/- 2cm to the measurements indicated in the size chart on the tech pack. The weight has a  tolerance of 5% to the indicated weight in grams per square meter (gsm). Garment dyed orders have a color variance allowance of 2%-8%, compared to samples and lab dips  already developed, as well as between dyeing batches.",
  "Anything surpassing 8% will be issued a return  authorisation. Discoloration, changes in the material, shrinkage, or other damage caused by improper handling or  washing errors are also not grounds for complaint. In case of a justified complaint, we are entitled to choose between granting a replacement delivery,  amending the affected products, or a partial refund. All orders placed on this website are made under request, meaning once the entire order is produced  and shipped out it can't be returned unless received garment/s are damaged, stained, or contain any  defects / flaws bigger than the stated allowances.",
  "For delays of more than 16 weeks, you have the right to cancel the order. All claims must be made within three calendar days of receipt of the order. We are not responsible for the risk of loss or damage during return shipment. By using our website, registering an account, or making a purchase, you hereby consent to our return &  refund policy and agree to its terms",
];

export default function ReturnPolicy() {
  return (
    <MainLayout>
      <section className="contain py-20">
        <div data-aos="zoom-in" className="flex flex-col items-center gap-1">
          <p className="text-grey text-lg">Stylcon</p>
          <h1 className="text-5xl font-bold">RETURN & REFUND POLICY</h1>
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
