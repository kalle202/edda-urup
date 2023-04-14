import Image from "next/image"
import formatPrice from "@/util/PriceFormat"
import { ProductType } from "@/types/ProductType"

export default function Product({name, image, price}: ProductType) {
  return (
    <div>
        <Image className="" src={image} alt={name} width={800} height={800}/>
        <h1>{name}</h1>
        <h2 className="text-sm text-teal-700">{price !== null ? formatPrice(price): 'N/A'}</h2>
    </div>
  )
}
