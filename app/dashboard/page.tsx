import Stripe from "stripe";
import { prisma } from "@/util/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import formatPrice from "@/util/PriceFormat";
import Image from "next/image";

export const revalidate = 0;

const fetchOrders = async () => {
  const user = await getServerSession(authOptions);
  if (!user) {
    return null;
  }
  const orders = await prisma.order.findMany({
    where: {
      userId: user?.user?.id,
    },
    include: {
      products: true,
    },
  });
  return orders;
};

export default async function Dashboard() {
  const orders = await fetchOrders();
  if (orders === null)
    return <div>You need to be logged in to view your orders</div>;
  if (orders.length === 0) {
    return (
      <div>
        <h1>No orders placed</h1>
      </div>
    );
  }
  return (
    <div>
      <div className="font-medium">
        {orders.map((order) => (
          <div
            className="rounded-lg p-8 my-12"
            key={order.id}
          >
            <h2>Order reference: {order.id}</h2>
            <p>Time: {new Date(order.createdDate).toString()}</p>
            <p className="text-md py-2">
              Status:{" "}
              <span
                className={`${
                  order.status === "complete" ? "bg-teal-500" : "bg-orange-500"
                } text-white py-1 rounded-md px-2 mx-2 text-sm`}
              >
                {order.status}
              </span>
            </p>
            <p className="font-medium">Total: {formatPrice(order.amount)}</p>
            <div className="flex gap-8">
              {order.products.map((product) => (
                <div
                  key={product.id}
                  className="py-2"
                >
                  <h2 className="py-2">{product.name}</h2>
                  <div className="flex flex-col items-center gap-4">
                    <Image
                      src={product.image!}
                      width={72}
                      height={72}
                      alt={product.name}
                      priority={true}
                    />
                    <p>{formatPrice(product.unit_amount)}</p>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
