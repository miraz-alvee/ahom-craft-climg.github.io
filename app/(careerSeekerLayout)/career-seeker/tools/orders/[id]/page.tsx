"use client";

import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle,
  Package,
  MapPin,
  Phone,
} from "lucide-react";

import {
  useGetOrderByIdQuery,
} from "@/redux/features/career-seeker/tools/toolsOrdersApis";

export default function OrderDetailsPage() {
  const router = useRouter();

  const params = useParams();

  const orderId = Number(params.id);

  console.log(
    "[OrderDetailsPage] URL order ID:",
    params.id
  );

  console.log(
    "[OrderDetailsPage] Parsed order ID:",
    orderId
  );

  const {
    data: order,
    isLoading,
    isError,
    error,
  } = useGetOrderByIdQuery(orderId);

  console.log(
    "[OrderDetailsPage] Order response:",
    order
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f4f6fb] p-8">
        Loading order...
      </div>
    );
  }

  if (isError || !order) {
    console.error(
      "[OrderDetailsPage] Order error:",
      error
    );

    return (
      <div className="min-h-screen bg-[#f4f6fb] p-8">

        <button
          onClick={() =>
            router.push(
              "/career-seeker/tools/orders"
            )
          }
          className="flex items-center gap-2 text-sm text-gray-600"
        >
          <ArrowLeft size={16} />
          Back to Orders
        </button>

        <div className="mt-8 rounded-xl bg-white p-10 text-center">
          <p className="text-red-500">
            Order not found.
          </p>
        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f6fb] px-4 py-6 sm:px-8">

      <div className="mx-auto max-w-6xl">

        {/* Header */}

        <button
          onClick={() =>
            router.push(
              "/career-seeker/tools/orders"
            )
          }
          className="mb-6 flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600"
        >
          <ArrowLeft size={16} />
          Back to Orders
        </button>

        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div>

            <h1 className="font-inter text-2xl font-bold">
              Order #{order.order_id}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Order placed on{" "}
              {new Date(
                order.created_at
              ).toLocaleDateString()}
            </p>

          </div>

          <div className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">

            <CheckCircle size={17} />

            {order.status}

          </div>

        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Main */}

          <div className="space-y-6 lg:col-span-2">

            {/* Order Items */}

            <div className="rounded-xl border border-black bg-white p-6">

              <div className="flex items-center gap-2">

                <Package
                  size={20}
                  className="text-blue-600"
                />

                <h2 className="text-lg font-semibold">
                  Order Items
                </h2>

              </div>

              <div className="mt-6 space-y-4">

                {order.order_items.map(
                  (item) => (
                    <div
                      key={item.order_item_id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >

                      <div>

                        <h3 className="font-medium">
                          {item.tool_name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          Quantity:{" "}
                          {item.quantity}
                        </p>

                        <p className="text-sm text-gray-500">
                          Price: $
                          {Number(
                            item.amount
                          ).toFixed(2)}
                        </p>

                      </div>

                      <p className="font-semibold">
                        $
                        {Number(
                          item.quantity_total_price
                        ).toFixed(2)}
                      </p>

                    </div>
                  )
                )}

              </div>

            </div>

            {/* Shipping */}

            <div className="rounded-xl border border-black bg-white p-6">

              <div className="flex items-center gap-2">

                <MapPin
                  size={20}
                  className="text-blue-600"
                />

                <h2 className="text-lg font-semibold">
                  Shipping Address
                </h2>

              </div>

              <div className="mt-5">

                <p className="font-medium">
                  {order.shipping_address_details.address}
                </p>

                <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">

                  <Phone size={15} />

                  {order.shipping_address_details.phone_number}

                </div>

              </div>

            </div>

          </div>

          {/* Summary */}

          <div className="h-fit rounded-xl border border-black bg-white p-6">

            <h2 className="text-lg font-semibold">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">

              <div className="flex justify-between">

                <span className="text-sm text-gray-500">
                  Subtotal
                </span>

                <span className="font-medium">
                  $
                  {Number(
                    order.total_amount
                  ).toFixed(2)}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-sm text-gray-500">
                  Delivery
                </span>

                <span className="font-medium">
                  $
                  {Number(
                    order.delivery_charge
                  ).toFixed(2)}
                </span>

              </div>

              <div className="border-t pt-4">

                <div className="flex justify-between">

                  <span className="font-semibold">
                    Total
                  </span>

                  <span className="text-xl font-bold text-blue-600">
                    $
                    {Number(
                      order.total_amount_with_delivery
                    ).toFixed(2)}
                  </span>

                </div>

              </div>

            </div>

            <div className="mt-6 rounded-lg bg-gray-50 p-4">

              <p className="text-xs text-gray-500">
                Payment Method
              </p>

              <p className="mt-1 font-medium capitalize">
                {order.payment_method.replaceAll(
                  "_",
                  " "
                )}
              </p>

              <p className="mt-4 text-xs text-gray-500">
                Payment Status
              </p>

              <p className="mt-1 font-medium capitalize">
                {order.payment_status}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}