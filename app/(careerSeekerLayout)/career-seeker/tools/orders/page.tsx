"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Package, Calendar, MapPin, CreditCard, ShieldCheck } from "lucide-react";
import { useGetOrdersQuery } from "@/redux/features/tools/toolsOrdersApis";

export default function OrdersPage() {
  const router = useRouter();
  const { data: orders, isLoading, isError } = useGetOrdersQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] p-8">
        <div className="mx-auto max-w-5xl space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-36 rounded-2xl bg-slate-200/60 dark:bg-slate-800 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-[#f8fafc] p-8">
        <div className="mx-auto max-w-md rounded-2xl bg-white p-8 text-center shadow-sm border border-slate-200">
          <p className="text-sm font-semibold text-rose-500">Failed to load tool orders.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-inter text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
              <Package className="h-6 w-6 text-blue-600" />
              My Tool Orders
            </h1>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Manage and track your purchased tools and equipment orders.
            </p>
          </div>
          {orders && orders.length > 0 && (
            <span className="rounded-full bg-blue-50 dark:bg-blue-950 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
              {orders.length} {orders.length === 1 ? "Order" : "Orders"}
            </span>
          )}
        </div>

        {!orders || orders.length === 0 ? (
          <div className="rounded-3xl bg-white dark:bg-slate-900 p-12 text-center shadow-sm border border-slate-200/80 dark:border-slate-800">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
              <Package className="h-8 w-8" />
            </div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">No tool orders yet</h2>
            <p className="mt-1 text-xs text-slate-400 max-w-sm mx-auto">
              Your purchased tool orders will appear here with live tracking.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const targetId = order.order_id || (order as any).id;
              const items = order.order_items || [];
              const statusLower = (order.status || "pending").toLowerCase();

              return (
                <div
                  key={targetId}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 dark:hover:border-blue-900 hover:shadow-xl hover:shadow-blue-500/5"
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold uppercase text-blue-600 dark:text-blue-400">
                          Order #{targetId}
                        </span>
                        <span className="text-slate-300 dark:text-slate-700">•</span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {order.created_at ? new Date(order.created_at).toLocaleDateString() : "N/A"}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                        {items.length} {items.length === 1 ? "Tool Item" : "Tool Items"}
                      </h3>

                      {order.shipping_address_details?.address && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          {order.shipping_address_details.address}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col items-start gap-2 sm:items-end shrink-0">
                      <p className="font-inter text-xl font-extrabold text-blue-600 dark:text-blue-400">
                        ${Number(order.total_amount_with_delivery || order.total_amount || 0).toFixed(2)}
                      </p>

                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border ${
                          statusLower === "delivered" || statusLower === "completed"
                            ? "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400"
                            : "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/60 dark:text-amber-400"
                        }`}
                      >
                        <ShieldCheck className="h-3.5 w-3.5" />
                        <span className="capitalize">{order.status || "Pending"}</span>
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <CreditCard className="h-3.5 w-3.5 text-slate-400" />
                      <span>Payment: <strong className="capitalize text-slate-700 dark:text-slate-300">{(order.payment_method || "COD").replaceAll("_", " ")}</strong></span>
                    </div>

                    <button
                      onClick={() => router.push(`/career-seeker/tools/orders/${targetId}`)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 px-4 py-2 text-xs font-bold text-blue-600 dark:text-blue-400 transition-all group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-600 dark:group-hover:text-white"
                    >
                      <span>View Details</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}