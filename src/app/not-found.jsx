"use client";
import MainLayout from "@/components/Layouts/MainLayout";
import { useRouter } from "next/navigation";

const Notfound = () => {
  const router = useRouter();
  return (
    <MainLayout>
      <p>Page Not Found</p>
      <button onClick={() => router.push("/")}>Go Home</button>
    </MainLayout>
  );
};

export default Notfound;
