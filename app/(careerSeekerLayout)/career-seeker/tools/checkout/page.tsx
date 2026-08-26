"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, MapPin, Plus, ShoppingBag, ShieldCheck, Truck } from "lucide-react";
import { useGetCartItemsQuery } from "@/redux/features/tools/toolsCartItemsApis";
import {
  useGetShippingAddressesQuery,
  useCreateShippingAddressMutation,
} from "@/redux/features/tools/toolsShippingApis";
import { useCreateOrderMutation } from "@/redux/features/tools/toolsOrdersApis";

export default function CheckoutPage() {
  const router = useRouter();

  const { data: cartData, isLoading: cartLoading } = useGetCartItemsQuery();
  const { data: shippingAddresses, isLoading: addressesLoading } = useGetShippingAddressesQuery();
  const [createShippingAddress, { isLoading: isCreatingAddress }] = useCreateShippingAddressMutation();
  const [createOrder, { isLoading: isCreatingOrder }] = useCreateOrderMutation();

  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const totalAmount = Number(cartData?.total_amount ?? 0);

  const handleCreateAddress = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!address.trim() || !phoneNumber.trim()) return;

    try {
      const response = await createShippingAddress({
        address: address.trim(),
        phone_number: phoneNumber.trim(),
      }).unwrap();

      setSelectedAddressId(response.id);
      setAddress("");
      setPhoneNumber("");
      setShowAddressForm(false);
    } catch (error) {
      console.error("Failed to create shipping address:", error);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) return;

    try {
      const response = await createOrder({
        shipping_address: selectedAddressId,
        delivery_charge: "0.00",
      }).unwrap();

      const newOrderId = response?.order_id ?? (response as any)?.id;
      if (newOrderId) {
        router.push(`/career-seeker/tools/orders/${newOrderId}`);
      } else {
        router.push("/career-seeker/tools/orders");
      }
    } catch (error) {
      console.error("Order creation failed:", error);
    }
  };

  if (cartLoading || addressesLoading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] p-8 flex items-center justify-center">
        <p className="text-xs font-semibold text-slate-400">Loading checkout...</p>
      </div>
    );
  }

  const cartItems = cartData?.cart_items ?? [];

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/career-seeker/tools/cart")}
            className="mb-4 inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Cart
          </button>
          <h1 className="font-inter text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <ShoppingBag className="h-6 w-6 text-blue-600" />
            Checkout & Delivery
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Select your shipping address and complete your tool order.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Left Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Shipping Address Selection Card */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <h2 className="font-inter text-base font-bold text-slate-900 dark:text-slate-100">
                    Shipping Address
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    Where should we deliver your order?
                  </p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600">
                  <MapPin className="h-4 w-4" />
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {shippingAddresses?.map((addr) => {
                  const selected = selectedAddressId === addr.id;
                  return (
                    <button
                      type="button"
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`group w-full rounded-xl border p-4 text-left transition-all duration-200 ${
                        selected
                          ? "border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 ring-1 ring-blue-600"
                          : "border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-300"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">
                            {addr.address}
                          </p>
                          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            Phone: {addr.phone_number}
                          </p>
                        </div>
                        {selected && (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white shadow-xs">
                            <Check className="h-3.5 w-3.5" />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setShowAddressForm(!showAddressForm)}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
              >
                <Plus className="h-4 w-4" /> Add New Address
              </button>

              {showAddressForm && (
                <form onSubmit={handleCreateAddress} className="mt-4 space-y-3 rounded-xl bg-slate-50 dark:bg-slate-950 p-4 border border-slate-200 dark:border-slate-800">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Street Address
                    </label>
                    <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter full street address"
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-2 text-xs outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Phone Number
                    </label>
                    <input
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="019XXXXXXXX"
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-2 text-xs outline-none focus:border-blue-600"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isCreatingAddress}
                    className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isCreatingAddress ? "Saving..." : "Save Address"}
                  </button>
                </form>
              )}
            </div>

            {/* Order Items Preview Card */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
              <h2 className="font-inter text-base font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-4">
                Items in Cart ({cartItems.length})
              </h2>
              <div className="mt-4 space-y-3 divide-y divide-slate-100 dark:divide-slate-800">
                {cartItems.map((item) => (
                  <div key={item.cart_item_id} className="flex items-center justify-between pt-3 first:pt-0">
                    <div>
                      <p className="font-semibold text-xs text-slate-800 dark:text-slate-200">
                        {item.tool.name}
                      </p>
                      <p className="text-[11px] text-slate-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-xs text-slate-900 dark:text-slate-100">
                      ${Number(item.total_price).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Summary Card */}
          <div className="h-fit rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
            <h2 className="font-inter text-base font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-4">
              Order Summary
            </h2>

            <div className="mt-5 space-y-3 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Items ({cartItems.length})</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Truck className="h-3 w-3 text-blue-500" /> Delivery
                </span>
                <span className="font-semibold text-emerald-600">FREE</span>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900 dark:text-slate-100">Total</span>
                  <span className="font-inter text-xl font-extrabold text-blue-600 dark:text-blue-400">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={!selectedAddressId || isCreatingOrder}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-3 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>{isCreatingOrder ? "Placing Order..." : "Place Order Now"}</span>
            </button>

            {!selectedAddressId && (
              <p className="mt-3 text-center text-[11px] font-semibold text-rose-500">
                Please select a shipping address to proceed.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}