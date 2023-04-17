"use client"
import Image from "next/image"
import { useCartStore } from "@/store"
import formatPrice from "@/util/PriceFormat"
import {IoAddCircle, IoRemoveCircle} from "react-icons/io5"
import basket from "@/public/AdobeStock_121899513.jpeg"
import { motion } from "framer-motion"

export default function Cart() {
  const cartStore = useCartStore()

  // Total price of all products in the cart
  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!
  }, 0)

  return(
    <motion.div onClick={() => cartStore.toggleCart()} className="fixed w-full h-screen left-0 top-0 bg-black/25">
        <div onClick={(e) => e.stopPropagation()} className="bg-white absolute right-0 top-0 w-1/4 h-screen p-12 overflow-y-scroll text-gray-700">
          <h1>Here's your shopping list 📃</h1>
          {cartStore.cart.map((item) => (
            <div className="flex py-4 gap-4">
              <Image className="" src={item.image} alt={item.name} width={150} height={150}/>
              <div>
                <h2>{item.name}</h2>
                {/* Update the quantity of a product */}
                <div className="flex gap-2 text-lg">
                  <h2>Quantity: {item.quantity}</h2>
                  <button onClick={() => cartStore.removeProduct({
                    id: item.id,
                    image: item.image, 
                    name: item.name, 
                    unit_amount: item.unit_amount, 
                    quantity: item.quantity
                  })}>
                    <IoRemoveCircle/>
                  </button>
                  <button onClick={() => cartStore.addProduct({
                     id: item.id,
                     image: item.image, 
                     name: item.name, 
                     unit_amount: item.unit_amount, 
                     quantity: item.quantity
                     })}>
                    <IoAddCircle/>
                  </button>
                </div>
                <p className="text-sm">
                  {item.unit_amount && formatPrice(item.unit_amount)}
                </p>
              </div>
            </div>
          ))}
          {/* Checkout and total */}
          <p>Total: {formatPrice(totalPrice)}</p>
          {cartStore.cart.length > 0 && (
            <button className="py-2 mt-4 bg-teal-700 w-full rounded-md text-white">Checkout</button>
          )}
          {!cartStore.cart.length && (
            <div className="flex flex-col items-center gap-12 text-2xl font-medium pt-56 opacity-75">
              <h1>Your cart is empty</h1>
              <Image className="rounded-md" src={basket} alt="basket" width={200} height={200}/>
            </div>
          )}
        </div>
    </motion.div>
  )
}