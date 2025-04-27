import { convertURL } from "@/components/Shared/helpers/helpers";
import Image from "next/image";
import Link from "next/link";

const ProductsCard = ({ item }) => {
  return (
    <div className="flex flex-col gap-6 items-center">
      <Image
        src={convertURL(item.img) || ""}
        alt=""
        width={10000}
        height={10000}
        className="w-auto h-[300px] object-cover"
      />
      <div className="uppercase font-medium flex flex-col gap-2 items-center">
        <p className="text-grey text-center">{item.name}</p>

        <Link
          href="https://stylconblanks.com/"
          className="text-[#595CFF] uppercase"
          target="_blank"
          rel="noopener noreferrer"
        >
          View in Store
        </Link>
      </div>
    </div>
  );
};

export default ProductsCard;
