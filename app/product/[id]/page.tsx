import Image from "next/image";
import { SearchParamsType } from "@/types/SearchParamsTypes";
import formatPrice from "@/util/PriceFormat";
import AddCart from "./AddCart";

export default function page({ searchParams }: SearchParamsType) {
  return (
    <div className="flex flex-col 2xl:flex-row items-center justify-between gap-24 text-gray-700">
      <Image
        src={searchParams.image}
        alt={searchParams.name}
        width={600}
        height={600}
        className="w-full"
        priority={true}
      />
      <div className="font-medium text-gray-700">
        <h1 className="text-2xl font-medium py-2">{searchParams.name}</h1>
        <p className="py-2">{searchParams.description}</p>
        <p className="py-2">{searchParams.features}</p>
        <div className="flex gap-2">
          <p className="font-bold text-teal-700">
            {searchParams.unit_amount && formatPrice(searchParams.unit_amount)}
          </p>
        </div>
        <AddCart {...searchParams} />
      </div>
    </div>
  );
}
