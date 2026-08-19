"use client";

import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Package,
} from "lucide-react";

import {
  useGetOrdersQuery,
} from "@/redux/features/career-seeker/tools/toolsOrdersApis";

export default function OrdersPage() {
  const router = useRouter();

  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useGetOrdersQuery();

  console.log(
    "[OrdersPage] Orders response:",
    orders
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f4f6fb] p-8">
        Loading orders...
      </div>
    );
  }

  if (isError) {
    console.error(
      "[OrdersPage] Orders error:",
      error
    );

    return (
      <div className="min-h-screen bg-[#f4f6fb] p-8">
        <p className="text-red-500">
          Failed to load orders.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f6fb] px-4 py-6 sm:px-8">

      <div className="mx-auto max-w-6xl">

        <div className="mb-8">

          <h1 className="font-inter text-2xl font-bold">
            My Orders
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            View your previous tool orders.
          </p>

        </div>

        {!orders || orders.length === 0 ? (
          <div className="rounded-xl bg-white p-12 text-center">

            <Package
              size={50}
              className="mx-auto mb-4 text-gray-400"
            />

            <h2 className="text-xl font-semibold">
              No orders yet
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Your orders will appear here.
            </p>

          </div>
        ) : (
          <div className="space-y-4">

            {orders.map((order) => (
              <div
                key={order.order_id}
                className="rounded-xl border border-black bg-white p-6"
              >

                <div className="flex flex-col justify-between gap-4 sm:flex-row">

                  <div>

                    <p className="text-sm text-gray-500">
                      Order #{order.order_id}
                    </p>

                    <h2 className="mt-1 text-lg font-semibold">
                      {order.order_items.length}{" "}
                      {order.order_items.length === 1
                        ? "Item"
                        : "Items"}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      {order.shipping_address_details.address}
                    </p>

                  </div>

                  <div className="flex flex-col items-start gap-2 sm:items-end">

                    <p className="text-lg font-bold text-blue-600">
                      $
                      {Number(
                        order.total_amount_with_delivery
                      ).toFixed(2)}
                    </p>

                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                      {order.status}
                    </span>

                  </div>

                </div>

                <div className="mt-5 border-t pt-4">

                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-xs text-gray-500">
                        Payment
                      </p>

                      <p className="text-sm font-medium capitalize">
                        {order.payment_method.replaceAll(
                          "_",
                          " "
                        )}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        console.log(
                          "[OrdersPage] Opening order:",
                          order.order_id
                        );

                        router.push(
                          `/career-seeker/tools/orders/${order.order_id}`
                        );
                      }}
                      className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      View Order
                      <ArrowRight size={16} />
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}