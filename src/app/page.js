import FAQs from "@/components/Home/FAQs";
import Hero from "@/components/Home/Hero";
import JFY from "@/components/Home/JFY";
import Resources from "@/components/Home/Resources";
import Testimonials from "@/components/Home/Testimonials";
import WeDesign from "@/components/Home/WeDesign";
import WePackage from "@/components/Home/WePackage";
import WeProduce from "@/components/Home/WeProduce";
import MainLayout from "@/components/Layouts/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <WeProduce />
      <WeDesign />
      <WePackage />
      <JFY />
      <Testimonials />
      <Resources />
      <FAQs />
    </MainLayout>
  );
}
