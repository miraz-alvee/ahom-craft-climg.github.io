"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ShoppingCart,
  ArrowRight,
  Minus,
  Plus,
} from "lucide-react";

import {
  useGetCartItemsQuery,
} from "@/redux/features/career-seeker/tools/toolsCartItemsApis";

export default function CartPage() {
  const router = useRouter();

  const {
    data,
    isLoading,
    isError,
    error,
  } = useGetCartItemsQuery();

  console.log("[CartPage] Cart response:", data);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f4f6fb] px-4 py-6 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-inter text-2xl font-bold text-gray-900">
            Shopping Cart
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Review your selected tools before checkout
          </p>

          <div className="mt-8 rounded-xl bg-white p-10 text-center">
            Loading your cart...
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    console.error("[CartPage] Cart error:", error);

    return (
      <div className="min-h-screen bg-[#f4f6fb] px-4 py-6 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-inter text-2xl font-bold">
            Shopping Cart
          </h1>

          <div className="mt-8 rounded-xl bg-white p-10 text-center">
            <p className="text-red-500">
              Failed to load cart.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const cartItems = data?.cart_items ?? [];
  const totalAmount = Number(data?.total_amount ?? 0);

  console.log("[CartPage] Cart items:", cartItems);
  console.log("[CartPage] Total amount:", totalAmount);

  const handleCheckout = () => {
    console.log(
      "[CartPage] Navigating to checkout"
    );

    router.push("/career-seeker/tools/checkout");
  };

  const handleIncrease = (cartItemId: number) => {
    console.log(
      "[CartPage] Increase quantity clicked:",
      cartItemId
    );

    console.log(
      "[CartPage] No cart update API has been provided yet."
    );
  };

  const handleDecrease = (cartItemId: number) => {
    console.log(
      "[CartPage] Decrease quantity clicked:",
      cartItemId
    );

    console.log(
      "[CartPage] No cart update API has been provided yet."
    );
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#f4f6fb] px-4 py-6 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-inter text-2xl font-bold">
            Shopping Cart
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Review your selected tools before checkout
          </p>

          <div className="mt-8 rounded-xl bg-white p-12 text-center">
            <ShoppingCart
              size={50}
              className="mx-auto mb-4 text-gray-400"
            />

            <h2 className="text-xl font-semibold">
              Your cart is empty
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Add some tools to your cart before checking out.
            </p>

            <button
              onClick={() =>
                router.push("/career-seeker/tools")
              }
              className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700"
            >
              Browse Tools
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f6fb] px-4 py-6 sm:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-inter text-2xl font-bold text-gray-900">
            Shopping Cart
          </h1>

          <p className="mt-1 font-inter text-sm text-gray-500">
            Review your selected tools before checkout
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Cart Items */}
          <div className="space-y-4 lg:col-span-2">

            {cartItems.map((item) => (
              <div
                key={item.cart_item_id}
                className="rounded-xl border border-black bg-white p-4 shadow-sm"
              >
                <div className="flex flex-col gap-4 sm:flex-row">

                  {/* Image */}
                  <div className="relative h-32 w-full overflow-hidden rounded-lg bg-gray-100 sm:w-32">

                    {item.tool.image ? (
                      <Image
                        src={item.tool.image}
                        alt={item.tool.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <ShoppingCart
                          size={32}
                          className="text-gray-400"
                        />
                      </div>
                    )}

                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col justify-between">

                    <div>
                      <h2 className="font-inter text-lg font-semibold">
                        {item.tool.name}
                      </h2>

                      <div className="mt-2 flex items-center gap-3">

                        <span className="font-inter text-lg font-bold text-blue-600">
                          ${Number(
                            item.tool.discount_price
                          ).toFixed(2)}
                        </span>

                        {Number(item.tool.regular_price) >
                          Number(item.tool.discount_price) && (
                          <span className="font-inter text-sm text-gray-400 line-through">
                            ${Number(
                              item.tool.regular_price
                            ).toFixed(2)}
                          </span>
                        )}

                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">

                      {/* Quantity */}
                      <div className="flex items-center gap-3">

                        <button
                          type="button"
                          onClick={() =>
                            handleDecrease(
                              item.cart_item_id
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-black hover:bg-gray-50"
                        >
                          <Minus size={15} />
                        </button>

                        <span className="min-w-8 text-center font-inter text-sm font-medium">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            handleIncrease(
                              item.cart_item_id
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-black hover:bg-gray-50"
                        >
                          <Plus size={15} />
                        </button>

                      </div>

                      {/* Total */}
                      <p className="font-inter text-lg font-bold">
                        $
                        {Number(
                          item.total_price
                        ).toFixed(2)}
                      </p>

                    </div>

                  </div>

                </div>
              </div>
            ))}

          </div>

          {/* Order Summary */}
          <div className="h-fit rounded-xl border border-black bg-white p-6 shadow-sm">

            <h2 className="font-inter text-lg font-semibold">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">
                  Items
                </span>

                <span className="text-sm font-medium">
                  {cartItems.length}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">
                  Subtotal
                </span>

                <span className="text-sm font-medium">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>

              <div className="border-t pt-4">

                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold">
                    Total
                  </span>

                  <span className="text-xl font-bold text-blue-600">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>

              </div>

            </div>

            <button
              onClick={handleCheckout}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-inter text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Continue to Checkout
              <ArrowRight size={18} />
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}