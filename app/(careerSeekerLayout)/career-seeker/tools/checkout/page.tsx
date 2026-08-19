"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  MapPin,
  Plus,
  ShoppingCart,
} from "lucide-react";

import {
  useGetCartItemsQuery,
} from "@/redux/features/career-seeker/tools/toolsCartItemsApis";

import {
  useGetShippingAddressesQuery,
  useCreateShippingAddressMutation,
} from "@/redux/features/career-seeker/tools/toolsShippingApis";

import {
  useCreateOrderMutation,
} from "@/redux/features/career-seeker/tools/toolsOrdersApis";

export default function CheckoutPage() {
  const router = useRouter();

  const {
    data: cartData,
    isLoading: cartLoading,
  } = useGetCartItemsQuery();

  const {
    data: shippingAddresses,
    isLoading: addressesLoading,
  } = useGetShippingAddressesQuery();

  const [
    createShippingAddress,
    {
      isLoading: isCreatingAddress,
    },
  ] = useCreateShippingAddressMutation();

  const [
    createOrder,
    {
      isLoading: isCreatingOrder,
    },
  ] = useCreateOrderMutation();

  const [selectedAddressId, setSelectedAddressId] =
    useState<number | null>(null);

  const [showAddressForm, setShowAddressForm] =
    useState(false);

  const [address, setAddress] =
    useState("");

  const [phoneNumber, setPhoneNumber] =
    useState("");

  console.log(
    "[CheckoutPage] Cart:",
    cartData
  );

  console.log(
    "[CheckoutPage] Shipping addresses:",
    shippingAddresses
  );

  const totalAmount = Number(
    cartData?.total_amount ?? 0
  );

  const handleCreateAddress = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!address.trim()) {
      console.error(
        "[CheckoutPage] Address is required"
      );

      return;
    }

    if (!phoneNumber.trim()) {
      console.error(
        "[CheckoutPage] Phone number is required"
      );

      return;
    }

    try {
      console.log(
        "[CheckoutPage] Creating shipping address..."
      );

      const response =
        await createShippingAddress({
          address: address.trim(),
          phone_number: phoneNumber.trim(),
        }).unwrap();

      console.log(
        "[CheckoutPage] Address created:",
        response
      );

      setSelectedAddressId(response.id);

      setAddress("");
      setPhoneNumber("");

      setShowAddressForm(false);

    } catch (error) {
      console.error(
        "[CheckoutPage] Failed to create address:",
        error
      );
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      console.error(
        "[CheckoutPage] No shipping address selected"
      );

      return;
    }

    try {
      console.log(
        "[CheckoutPage] Creating order with address:",
        selectedAddressId
      );

      const response =
        await createOrder({
          shipping_address: selectedAddressId,
          delivery_charge: "0.00",
        }).unwrap();

      console.log(
        "[CheckoutPage] Order created successfully:",
        response
      );

      console.log(
        "[CheckoutPage] Order ID:",
        response.order_id
      );

      router.push(
        `/career-seeker/tools/orders/${response.order_id}`
      );

    } catch (error) {
      console.error(
        "[CheckoutPage] Order creation failed:",
        error
      );
    }
  };

  if (cartLoading || addressesLoading) {
    return (
      <div className="min-h-screen bg-[#f4f6fb] p-8">
        <div className="mx-auto max-w-6xl">
          Loading checkout...
        </div>
      </div>
    );
  }

  const cartItems =
    cartData?.cart_items ?? [];

  return (
    <div className="min-h-screen bg-[#f4f6fb] px-4 py-6 sm:px-8">

      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">

          <button
            onClick={() =>
              router.push(
                "/career-seeker/tools/cart"
              )
            }
            className="mb-4 flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600"
          >
            <ArrowLeft size={16} />
            Back to Cart
          </button>

          <h1 className="font-inter text-2xl font-bold">
            Checkout
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Select your shipping address and place your order.
          </p>

        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Left */}
          <div className="space-y-6 lg:col-span-2">

            {/* Shipping Address */}
            <div className="rounded-xl border border-black bg-white p-6">

              <div className="flex items-center justify-between">

                <div>
                  <h2 className="font-inter text-lg font-semibold">
                    Shipping Address
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Where should we deliver your order?
                  </p>
                </div>

                <MapPin
                  size={22}
                  className="text-blue-600"
                />

              </div>

              <div className="mt-6 space-y-3">

                {shippingAddresses?.map(
                  (shippingAddress) => {

                    const selected =
                      selectedAddressId ===
                      shippingAddress.id;

                    return (
                      <button
                        type="button"
                        key={shippingAddress.id}
                        onClick={() => {
                          console.log(
                            "[CheckoutPage] Selected address:",
                            shippingAddress
                          );

                          setSelectedAddressId(
                            shippingAddress.id
                          );
                        }}
                        className={`w-full rounded-lg border p-4 text-left transition ${
                          selected
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                      >

                        <div className="flex items-start justify-between">

                          <div>

                            <p className="font-inter font-medium">
                              {shippingAddress.address}
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                              {shippingAddress.phone_number}
                            </p>

                          </div>

                          {selected && (
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600">
                              <Check
                                size={14}
                                className="text-white"
                              />
                            </div>
                          )}

                        </div>

                      </button>
                    );
                  }
                )}

              </div>

              {/* Add Address */}
              <button
                type="button"
                onClick={() =>
                  setShowAddressForm(
                    !showAddressForm
                  )
                }
                className="mt-4 flex items-center gap-2 text-sm font-medium text-blue-600"
              >
                <Plus size={17} />
                Add New Address
              </button>

              {showAddressForm && (
                <form
                  onSubmit={handleCreateAddress}
                  className="mt-5 space-y-4 rounded-lg bg-gray-50 p-4"
                >

                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Address
                    </label>

                    <input
                      value={address}
                      onChange={(event) =>
                        setAddress(
                          event.target.value
                        )
                      }
                      placeholder="Enter your address"
                      className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Phone Number
                    </label>

                    <input
                      value={phoneNumber}
                      onChange={(event) =>
                        setPhoneNumber(
                          event.target.value
                        )
                      }
                      placeholder="019XXXXXXXX"
                      className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:border-blue-600"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isCreatingAddress}
                    className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
                  >
                    {isCreatingAddress
                      ? "Saving..."
                      : "Save Address"}
                  </button>

                </form>
              )}

            </div>

            {/* Cart Items */}
            <div className="rounded-xl border border-black bg-white p-6">

              <h2 className="font-inter text-lg font-semibold">
                Your Items
              </h2>

              <div className="mt-5 space-y-4">

                {cartItems.map((item) => (
                  <div
                    key={item.cart_item_id}
                    className="flex items-center justify-between border-b pb-4 last:border-0"
                  >

                    <div>
                      <p className="font-medium">
                        {item.tool.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold">
                      $
                      {Number(
                        item.total_price
                      ).toFixed(2)}
                    </p>

                  </div>
                ))}

              </div>

            </div>

          </div>

          {/* Right */}
          <div className="h-fit rounded-xl border border-black bg-white p-6">

            <h2 className="font-inter text-lg font-semibold">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">
                  Items
                </span>

                <span className="font-medium">
                  {cartItems.length}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">
                  Delivery
                </span>

                <span className="font-medium">
                  $0.00
                </span>
              </div>

              <div className="border-t pt-4">

                <div className="flex justify-between">

                  <span className="font-semibold">
                    Total
                  </span>

                  <span className="text-xl font-bold text-blue-600">
                    ${totalAmount.toFixed(2)}
                  </span>

                </div>

              </div>

            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={
                !selectedAddressId ||
                isCreatingOrder
              }
              className="mt-6 w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {isCreatingOrder
                ? "Placing Order..."
                : "Place Order"}
            </button>

            {!selectedAddressId && (
              <p className="mt-3 text-center text-xs text-red-500">
                Please select a shipping address.
              </p>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}