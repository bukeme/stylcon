import MainLayout from "@/components/Layouts/MainLayout";
import Image from "next/image";

const loading = () => {
  return (
    <MainLayout>
      <div className="h-screen flex justify-center items-center">
        <Image
          className="animate-pulse [animation-delay:.7s] brightness-50 invert"
          src="/logo.png"
          width={500}
          height={500}
          alt="Logo"
        />
      </div>
    </MainLayout>
  );
};

export default loading;
