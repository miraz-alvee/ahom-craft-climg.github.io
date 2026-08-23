"use client";

import {
    useMemo,
    useState,
} from "react";

import {
    ArrowLeft,
    Minus,
    Plus,
    ShoppingCart,
    Star,
} from "lucide-react";

import Image from "next/image";

import { useRouter } from "next/navigation";

import toolsImage01 from "@/public/images/tools/tool-01.jpg";
import { useGetToolsQuery } from "@/redux/features/tools/toolsApis";
import { useAddToCartMutation } from "@/redux/features/tools/toolsCartItemsApis";



// ======================================================
// PROPS
// ======================================================

interface ToolDetailsProps {
    toolId: number;
}


// ======================================================
// COMPONENT
// ======================================================

export default function ToolDetails({
    toolId,
}: ToolDetailsProps) {

    const router =
        useRouter();


    // ====================================================
    // QUANTITY
    // ====================================================

    const [
        quantity,
        setQuantity,
    ] = useState(1);


    // ====================================================
    // GET TOOLS
    // ====================================================

    const {
        data,
        isLoading,
        isError,
        error,
    } =
        useGetToolsQuery();


    // ====================================================
    // ADD TO CART
    // ====================================================

    const [
        addToCart,
        {
            isLoading:
            isAddingToCart,
        },
    ] =
        useAddToCartMutation();


    // ====================================================
    // FIND CURRENT TOOL
    // ====================================================

    const tool =
        useMemo(() => {

            return data?.results?.find(
                (item) =>
                    item.tools_id ===
                    toolId
            );

        }, [
            data,
            toolId,
        ]);


    // ====================================================
    // LOG
    // ====================================================

    console.log(
        "[ToolDetails] Tool ID:",
        toolId
    );

    console.log(
        "[ToolDetails] Tool:",
        tool
    );


    // ====================================================
    // LOADING
    // ====================================================

    if (isLoading) {

        return (
            <div className="min-h-screen bg-[#f4f6fb] px-8 py-6">

                <div className="max-w-6xl mx-auto">

                    <div className="h-6 w-24 bg-gray-200 rounded animate-pulse mb-8" />

                    <div className="grid md:grid-cols-2 gap-10">

                        <div className="h-125 bg-gray-200 rounded-2xl animate-pulse" />

                        <div className="space-y-5">

                            <div className="h-8 bg-gray-200 rounded animate-pulse" />

                            <div className="h-20 bg-gray-200 rounded animate-pulse" />

                            <div className="h-8 bg-gray-200 rounded animate-pulse" />

                            <div className="h-12 bg-gray-200 rounded animate-pulse" />

                        </div>

                    </div>

                </div>

            </div>
        );
    }


    // ====================================================
    // ERROR
    // ====================================================

    if (isError) {

        console.error(
            "[ToolDetails] API error:",
            error
        );


        return (
            <div className="min-h-screen bg-[#f4f6fb] px-8 py-6">

                <div className="max-w-6xl mx-auto">

                    <button
                        onClick={() =>
                            router.back()
                        }
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
                    >
                        <ArrowLeft
                            size={18}
                        />

                        Back
                    </button>


                    <div className="bg-white rounded-xl border p-10 text-center">

                        <p className="text-red-500">
                            Failed to load tool.
                        </p>

                    </div>

                </div>

            </div>
        );
    }


    // ====================================================
    // TOOL NOT FOUND
    // ====================================================

    if (!tool) {

        return (
            <div className="min-h-screen bg-[#f4f6fb] px-8 py-6">

                <div className="max-w-6xl mx-auto">

                    <button
                        onClick={() =>
                            router.back()
                        }
                        className="cursor-pointer flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
                    >

                        <ArrowLeft
                            size={18}
                        />

                        Back

                    </button>


                    <div className="bg-white rounded-xl border p-10 text-center">

                        <p className="text-gray-500">
                            Tool not found.
                        </p>

                    </div>

                </div>

            </div>
        );
    }


    // ====================================================
    // PRICE
    // ====================================================

    const regularPrice =
        Number(
            tool.regular_price
        );


    const discountPrice =
        Number(
            tool.discount_price
        );


    const hasDiscount =
        discountPrice <
        regularPrice;


    const totalPrice =
        discountPrice *
        quantity;


    // ====================================================
    // RATING
    // ====================================================

    const rating =
        tool.average_rating ??
        0;


    // ====================================================
    // IMAGE
    // ====================================================

    const image =
        tool.images?.length > 0
            ? tool.images[0]?.image
            : null;


    // ====================================================
    // INCREASE
    // ====================================================

    const increaseQuantity =
        () => {

            if (
                quantity <
                tool.stock_quantity
            ) {

                setQuantity(
                    (previous) =>
                        previous + 1
                );

            }

        };


    // ====================================================
    // DECREASE
    // ====================================================

    const decreaseQuantity =
        () => {

            if (
                quantity > 1
            ) {

                setQuantity(
                    (previous) =>
                        previous - 1
                );

            }

        };


    // ====================================================
    // ADD TO CART
    // ====================================================


    const handleAddToCart = async () => {
        try {
            const response = await addToCart({
                tool: tool.tools_id,
                quantity,
                is_active: true,
            }).unwrap();

            console.log("[ToolDetails] Added to cart:", response);

            router.push("/employer/tools/cart");
        } catch (error) {
            console.error("[ToolDetails] Add to cart failed:", error);
        }
    };

    //   const handleAddToCart =
    //     async () => {

    //       const payload = {
    //         tool:
    //           tool.tools_id,

    //         quantity,

    //         is_active:
    //           true,
    //       };


    //       console.log(
    //         "[ToolDetails] Adding to cart:",
    //         payload
    //       );


    //       try {

    //         const response =
    //           await addToCart(
    //             payload
    //           ).unwrap();


    //         console.log(
    //           "[ToolDetails] Add to cart response:",
    //           response
    //         );


    //         console.log(
    //           "[ToolDetails] Cart item:",
    //           response.cart_item
    //         );


    //         // Optional:
    //         // go to cart after adding
    //         //
    //         // router.push("/cart");

    //       } catch (error) {

    //         console.error(
    //           "[ToolDetails] Add to cart failed:",
    //           error
    //         );

    //       }

    //     };


    // ====================================================
    // UI
    // ====================================================

    return (
        <div className="min-h-screen bg-[#f4f6fb]">

            <div className="max-w-6xl mx-auto px-6 py-8">


                {/* ==================================================
            BACK
        ================================================== */}

                <button
                    type="button"
                    onClick={() =>
                        router.back()
                    }
                    className="cursor-pointer flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 font-inter"
                >

                    <ArrowLeft
                        size={18}
                    />

                    Back to Tools

                </button>


                {/* ==================================================
            PRODUCT
        ================================================== */}

                <div className="bg-white rounded-2xl border overflow-hidden border-none">

                    <div className="grid grid-cols-1 md:grid-cols-2">


                        {/* ==============================================
                IMAGE
            ============================================== */}

                        <div className="relative min-h-113 bg-gray-100">

                            {image ? (

                                <img
                                    src={image}
                                    alt={
                                        tool.name
                                    }
                                    className="absolute inset-0 w-full h-full object-cover"
                                />

                            ) : (

                                <Image
                                    src={
                                        toolsImage01
                                    }
                                    alt={
                                        tool.name
                                    }
                                    fill
                                    className="object-cover"
                                />

                            )}


                            {/* DISCOUNT */}

                            {hasDiscount && (

                                <div className="absolute top-5 left-5 bg-red-500 text-white px-3 py-2 rounded-lg text-sm font-semibold">

                                    {
                                        tool.discount_percentage
                                    }{" "}
                                    OFF

                                </div>

                            )}

                        </div>


                        {/* ==============================================
                DETAILS
            ============================================== */}

                        <div className="p-8 lg:p-10">


                            {/* CATEGORY */}

                            <p className="font-inter text-sm text-blue-600 font-medium mb-2">

                                {
                                    tool.category
                                }

                            </p>


                            {/* NAME */}

                            <h1 className="font-inter text-3xl font-bold text-gray-900 mb-4">

                                {
                                    tool.name
                                }

                            </h1>


                            {/* DESCRIPTION */}

                            <p className="font-inter text-gray-500 leading-7 mb-6">

                                {
                                    tool.description
                                }

                            </p>


                            {/* RATING */}

                            <div className="flex items-center gap-2 mb-6">

                                <div className="flex items-center gap-1 text-yellow-500">

                                    {[1, 2, 3, 4, 5].map(
                                        (star) => (

                                            <Star
                                                key={
                                                    star
                                                }
                                                size={17}
                                                fill={
                                                    star <=
                                                        Math.floor(
                                                            rating
                                                        )
                                                        ? "currentColor"
                                                        : "none"
                                                }
                                            />

                                        )
                                    )}

                                </div>


                                <span className="font-inter text-sm text-gray-500">

                                    {
                                        tool.total_reviews
                                    }{" "}
                                    reviews

                                </span>

                            </div>


                            {/* PRICE */}

                            <div className="mb-6">

                                <div className="flex items-center gap-3">

                                    <span className="font-inter text-3xl font-bold text-gray-900">

                                        $
                                        {
                                            tool.discount_price
                                        }

                                    </span>


                                    {hasDiscount && (

                                        <span className="font-inter text-lg text-gray-400 line-through">

                                            $
                                            {
                                                tool.regular_price
                                            }

                                        </span>

                                    )}

                                </div>

                            </div>


                            {/* STOCK */}

                            <div className="mb-6">

                                {tool.stock_quantity >
                                    0 ? (

                                    <span className="font-inter text-sm text-green-600">

                                        In stock (
                                        {
                                            tool.stock_quantity
                                        }{" "}
                                        available)

                                    </span>

                                ) : (

                                    <span className="font-inter text-sm text-red-500">

                                        Out of stock

                                    </span>

                                )}

                            </div>


                            {/* QUANTITY */}

                            <div className="mb-6">

                                <p className="font-inter text-sm font-medium text-gray-700 mb-2">

                                    Quantity

                                </p>


                                <div className="flex items-center w-fit border border-gray-300 rounded-lg overflow-hidden">

                                    <button
                                        type="button"
                                        onClick={
                                            decreaseQuantity
                                        }
                                        disabled={
                                            quantity <=
                                            1
                                        }
                                        className="w-11 h-11 flex items-center justify-center hover:bg-gray-100 disabled:opacity-40"
                                    >

                                        <Minus
                                            size={16}
                                        />

                                    </button>


                                    <div className="w-14 h-11 flex items-center justify-center font-inter font-semibold border-x border-gray-300">

                                        {
                                            quantity
                                        }

                                    </div>


                                    <button
                                        type="button"
                                        onClick={
                                            increaseQuantity
                                        }
                                        disabled={
                                            quantity >=
                                            tool.stock_quantity
                                        }
                                        className="w-11 h-11 flex items-center justify-center hover:bg-gray-100 disabled:opacity-40"
                                    >

                                        <Plus
                                            size={16}
                                        />

                                    </button>

                                </div>

                            </div>


                            {/* TOTAL */}

                            <div className="flex items-center justify-between border-t border-gray-200 pt-5 mb-5">

                                <span className="font-inter text-gray-500">

                                    Total

                                </span>


                                <span className="font-inter text-2xl font-bold text-gray-900">

                                    $
                                    {
                                        totalPrice.toFixed(
                                            2
                                        )
                                    }

                                </span>

                            </div>


                            {/* ADD TO CART */}

                            <button
                                type="button"
                                onClick={
                                    handleAddToCart
                                }
                                disabled={
                                    isAddingToCart ||
                                    tool.stock_quantity <=
                                    0
                                }
                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-inter font-medium flex items-center justify-center gap-2 transition"
                            >

                                <ShoppingCart
                                    size={18}
                                />

                                {isAddingToCart
                                    ? "Adding..."
                                    : "Add to Cart"}

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}