import MainLayout from "@/components/Layouts/MainLayout";

const content = [
  "6.1 Invoicing and payment of samples shall take place prior to any delivery, unless agreed otherwise in writing.",
  "6.2 100% of the invoice relating to samples and first-time garment bulk production Orders must be paid at the time of the Order placement. For following garment bulk production Orders exceeding the value of N2,000,000 or $2,000 50% of the invoice must be paid at the time of the Order placement. The remaining 50% of the invoice is payable before shipment, unless agreed otherwise in writing.",
  "6.3 All prices stated by STYLCON MARKETPLACE are exclusive of value added tax ('VAT') or any other taxes, governmental fees, assessments, or duties, unless expressly stated otherwise herein. You are responsible for all taxes associated with the order. Without limiting the foregoing, You shall pay all applicable taxes, governmental fees, assessments or duties that STYLCON MARKETPLACE charges You in addition to the prices quoted.",
  "6.4 You must pay the total amount stated on the invoice, including VAT, within 48hours of the invoice date at the latest, unless agreed otherwise in writing or in the event as referred to under article 6.1 and 6.2. You are not entitled to suspend Your payment obligations, not even in the event of a claim.",
  "6.5 Full payment must be made to the bank account of STYLCON MARKETPLACE whereby no deductions, withholding, or adjustments are allowed, also in the event You have lodged a claim. The value date specified on STYLCON MARKETPLACE 's bank statements is regarded as the date of payment.",
  "6.6 If the invoice is charged in Naira is not paid in full within 48 hours, You will be in default without need of further notification. Interest will accrue at the rate of 0,5% of the late payment per 48hours or part thereof from the date that You are in default until the date payment in full is credited.",
];

export default function Payment() {
  return (
    <MainLayout>
      <section className="contain py-20">
        <div data-aos="zoom-in" className="flex flex-col items-center gap-1">
          <p className="text-grey text-lg">Stylcon</p>
          <h1 className="text-5xl font-bold">PAYMENT POLICY</h1>
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
