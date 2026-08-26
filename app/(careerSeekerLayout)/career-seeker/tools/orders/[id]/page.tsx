"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle, Package, MapPin, Phone, CreditCard, ShieldCheck, DollarSign } from "lucide-react";
import { useGetOrderByIdQuery } from "@/redux/features/tools/toolsOrdersApis";

export default function OrderDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = Number(params?.id);

  const { data: order, isLoading, isError } = useGetOrderByIdQuery(orderId, {
    skip: !orderId || isNaN(orderId),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] p-8 flex items-center justify-center">
        <p className="text-xs font-semibold text-slate-400">Loading order details...</p>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 p-8">
        <div className="mx-auto max-w-lg rounded-2xl bg-white dark:bg-slate-900 p-8 text-center shadow-xs border border-slate-200 dark:border-slate-800">
          <p className="text-sm font-semibold text-rose-500 mb-4">Order #{orderId || params?.id} not found.</p>
          <button
            onClick={() => router.push("/career-seeker/tools/orders")}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-blue-700"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const items = order.order_items ?? [];
  const shipping = order.shipping_address_details ?? {
    address: "N/A",
    phone_number: "N/A",
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Navigation */}
        <button
          onClick={() => router.push("/career-seeker/tools/orders")}
          className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Orders
        </button>

        {/* Page Header Card */}
        <div className="mb-8 flex flex-col justify-between gap-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-inter text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                Order #{order.order_id ?? (order as any).id}
              </h1>
            </div>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Placed on {order.created_at ? new Date(order.created_at).toLocaleDateString(undefined, { dateStyle: "medium" }) : "N/A"}
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-4 py-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle className="h-4 w-4" />
            <span className="capitalize">{order.status || "Completed"}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Items & Shipping */}
          <div className="space-y-6 lg:col-span-2">
            {/* Order Items List */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
              <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600">
                  <Package className="h-4 w-4" />
                </div>
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Ordered Items</h2>
              </div>

              <div className="mt-5 space-y-4">
                {items.length === 0 ? (
                  <p className="text-xs text-slate-400">No items found.</p>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.order_item_id || Math.random()}
                      className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60 pb-4 last:border-0 last:pb-0"
                    >
                      <div>
                        <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100">{item.tool_name}</h3>
                        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                          Quantity: <strong className="text-slate-700 dark:text-slate-300">{item.quantity}</strong>
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Price: ${Number(item.amount).toFixed(2)}
                        </p>
                      </div>

                      <p className="font-bold text-sm text-slate-900 dark:text-slate-100">
                        ${Number(item.quantity_total_price).toFixed(2)}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
              <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-600">
                  <MapPin className="h-4 w-4" />
                </div>
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Shipping Address</h2>
              </div>

              <div className="mt-4">
                <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">
                  {shipping.address ?? "N/A"}
                </p>
                <div className="mt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <Phone className="h-3.5 w-3.5 text-slate-400" />
                  <span>{shipping.phone_number ?? "N/A"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Summary Sidebar */}
          <div className="h-fit rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-4">
              Order Summary
            </h2>

            <div className="mt-5 space-y-3.5 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  ${Number(order.total_amount).toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Delivery</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  ${Number(order.delivery_charge).toFixed(2)}
                </span>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-3.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900 dark:text-slate-100">Total</span>
                  <span className="font-inter text-xl font-extrabold text-blue-600 dark:text-blue-400">
                    ${Number(order.total_amount_with_delivery).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-slate-50 dark:bg-slate-950 p-4 border border-slate-100 dark:border-slate-900 space-y-3 text-xs">
              <div>
                <p className="text-slate-400 flex items-center gap-1">
                  <CreditCard className="h-3 w-3" /> Payment Method
                </p>
                <p className="mt-0.5 font-bold capitalize text-slate-800 dark:text-slate-200">
                  {order.payment_method?.replaceAll("_", " ")}
                </p>
              </div>

              <div>
                <p className="text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-emerald-500" /> Payment Status
                </p>
                <p className="mt-0.5 font-bold capitalize text-slate-800 dark:text-slate-200">
                  {order.payment_status}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}