"use client";

import { useMemo, useState } from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import toolsImage01 from "@/public/images/tools/tool-01.jpg";
import { useGetToolCategoriesQuery } from "@/redux/features/career-seeker/tools/toolsCategoryApis";
import { useGetToolsQuery } from "@/redux/features/career-seeker/tools/toolsApis";




// ======================================================
// TYPES
// ======================================================

type FilterValue = "All" | string;


// ======================================================
// COMPONENT
// ======================================================

export default function ToolsPage() {

  // ====================================================
  // FILTER STATE
  // ====================================================

  const [filter, setFilter,] = useState<FilterValue>("All");


  // ====================================================
  // GET CATEGORIES
  // ====================================================

  const {
    data: categories = [],
    isLoading:
    isCategoriesLoading,
    isError:
    isCategoriesError,
    error:
    categoriesError,
  } =
    useGetToolCategoriesQuery();


  // ====================================================
  // GET TOOLS
  // ====================================================

  const {
    data: toolsData,
    isLoading:
    isToolsLoading,
    isError:
    isToolsError,
    error:
    toolsError,
  } =
    useGetToolsQuery();


  // ====================================================
  // TOOLS
  // ====================================================

  const tools = toolsData?.results ?? [];


  // ====================================================
  // LOG CATEGORY RESPONSE
  // ====================================================

  console.log(
    "[ToolsPage] Categories:",
    categories
  );


  // ====================================================
  // LOG TOOLS RESPONSE
  // ====================================================

  console.log(
    "[ToolsPage] Tools:",
    toolsData
  );


  // ====================================================
  // FILTER TOOLS
  // ====================================================

  const filteredTools = useMemo(() => {
    if (filter === "All") {
      return tools;
    }
    return tools.filter((tool) => tool.category === filter);
  }, [tools, filter,]);


  // ====================================================
  // LOADING
  // ====================================================

  const isLoading =
    isCategoriesLoading ||
    isToolsLoading;


  // ====================================================
  // ERROR
  // ====================================================

  if (
    isCategoriesError ||
    isToolsError
  ) {

    console.error(
      "[ToolsPage] Categories error:",
      categoriesError
    );

    console.error(
      "[ToolsPage] Tools error:",
      toolsError
    );


    return (
      <div className="min-h-screen bg-[#f4f6fb]">
        <div className="px-8 py-6">
          <div className="mb-6">
            <h1 className="font-inter text-2xl font-bold"> Tools</h1>
            <p className="font-inter text-gray-500 text-sm"> Browse professional tools & equipment </p>
          </div>
          <div className="bg-white rounded-xl border p-8 text-center">
            <p className="font-inter text-red-500">Failed to load tools.</p>
          </div>
        </div>
      </div>
    );
  }

  const router = useRouter();

  // ====================================================
  // LOADING UI
  // ====================================================

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f4f6fb]">
        <div className="px-8 py-6">
          <div className="mb-6">
            <h1 className="font-inter text-2xl font-bold">
              Tools
            </h1>
            <p className="font-inter text-gray-500 text-sm">
              Browse professional tools & equipment
            </p>
          </div>
          {/* FILTER SKELETON */}
          <div className="flex flex-wrap gap-3 mb-8">
            {[1, 2, 3, 4, 5].map(
              (item) => (

                <div
                  key={item}
                  className="h-9 w-20 bg-gray-200 rounded-full animate-pulse"
                />
              )
            )}
          </div>
          {/* TOOL SKELETON */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5].map(
              (item) => (
                <div
                  key={item}
                  className="bg-white rounded-xl border overflow-hidden animate-pulse"
                >
                  <div className="h-52 bg-gray-200" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-9 bg-gray-200 rounded" />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );
  }


  // ====================================================
  // MAIN UI
  // ====================================================

  return (
    <div className="min-h-screen bg-[#f4f6fb]">
      <div className="px-8 py-6">
        {/* ==================================================
            HEADER
        ================================================== */}
        <div className="mb-6">
          <h1 className="font-inter text-2xl font-bold">
            Tools
          </h1>
          <p className="font-inter text-gray-500 text-sm">
            Browse professional tools & equipment
          </p>
        </div>


        {/* ==================================================
            FILTERS
        ================================================== */}

        <div className="flex flex-wrap gap-3 mb-8">
          {/* ALL */}
          <button
            type="button"
            onClick={() => {
              console.log(
                "[ToolsPage] Selected category:",
                "All"
              );
              setFilter(
                "All"
              );
            }}
            className={`font-inter px-4 py-2 text-sm rounded-full border transition
              ${filter === "All"
                ? "bg-[#2563EB] text-white border-none"
                : "bg-white hover:bg-blue-50"
              }`}
          >
            All
          </button>

          {/* API CATEGORIES */}

          {categories
            .filter(
              (category) =>
                category.is_active
            )
            .map(
              (category) => (

                <button
                  key={
                    category.id
                  }
                  type="button"
                  onClick={() => {

                    console.log(
                      "[ToolsPage] Selected category:",
                      {
                        id:
                          category.id,
                        name:
                          category.name,
                      }
                    );

                    setFilter(
                      category.name
                    );

                  }}
                  className={`font-inter px-4 py-2 text-sm rounded-full border transition
                    ${filter ===
                      category.name
                      ? "bg-[#2563EB] text-white border-none"
                      : "bg-white hover:bg-blue-50 border border-[#2563EB]"
                    }`}
                >
                  {
                    category.name
                  }
                </button>
              )
            )}
        </div>


        {/* ==================================================
            RESULT COUNT
        ================================================== */}

        <div className="mb-4">
          <p className="font-inter text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-700">
              {
                filteredTools.length
              }
            </span>{" "}
            tools
            {filter !==
              "All" && (
                <>
                  {" "}in{" "}
                  <span className="font-semibold text-gray-700">
                    {filter}
                  </span>
                </>
              )}
          </p>
        </div>


        {/* ==================================================
            TOOL GRID
        ================================================== */}

        {filteredTools.length ===
          0 ? (
          <div className="bg-white rounded-xl border p-10 text-center">
            <p className="font-inter text-gray-500">
              No tools found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredTools.map(
              (tool) => {
                // ========================================
                // IMAGE
                // ========================================
                const toolImage =
                  tool.images?.length >
                    0
                    ? (
                      tool.images[0]
                        ?.image ??
                      null
                    )
                    : null;
                // ========================================
                // PRICE
                // ========================================
                const price =
                  tool.discount_price ||
                  tool.regular_price;
                // ========================================
                // RATING
                // ========================================
                const rating =
                  tool.average_rating ??
                  0;
                console.log(
                  "[ToolsPage] Rendering tool:",
                  {
                    id:
                      tool.tools_id,
                    name:
                      tool.name,
                    category:
                      tool.category,
                    price,
                    rating,
                  }
                );

                return (
                  <div
                    key={
                      tool.tools_id
                    }
                    className="bg-white rounded-xl border border-none hover:shadow-md overflow-hidden shadow-lg transition-transform duration-200 hover:scale-102"
                  >
                    {/* ==================================
                        IMAGE
                    ================================== */}
                    <div className="relative h-52 w-full">
                      {toolImage ? (
                        <img
                          src={
                            toolImage
                          }
                          alt={
                            tool.name
                          }
                          className="w-full h-full object-cover"
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

                      {/* PRICE */}
                      <div className="font-inter absolute top-3 right-3 bg-white/60 text-gray-900 text-sm font-semibold px-3 py-1 rounded-md shadow">
                        ${price}
                      </div>
                      {/* DISCOUNT */}
                      {tool.discount_percentage &&
                        tool.discount_percentage !==
                        "0%" && (

                          <div className="font-inter absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">

                            {
                              tool.discount_percentage
                            }{" "}
                            OFF
                          </div>
                        )}
                    </div>


                    {/* ==================================
                        CONTENT
                    ================================== */}

                    <div className="p-4">
                      {/* NAME */}
                      <h3 className="font-inter font-semibold text-sm mb-1">
                        {
                          tool.name
                        }
                      </h3>
                      {/* DESCRIPTION */}
                      <p className="font-inter text-xs text-gray-500 mb-3 line-clamp-2">

                        {
                          tool.description
                        }
                      </p>
                      {/* CATEGORY */}

                      <p className="font-inter text-xs text-blue-600 font-medium mb-2">
                        {
                          tool.category
                        }
                      </p>
                      {/* ==================================
                          RATING
                      ================================== */}
                      <div className="flex items-center gap-1 text-yellow-500 text-sm mb-4">
                        {[1, 2, 3, 4, 5].map(
                          (star) => (
                            <Star
                              key={
                                star
                              }
                              size={
                                14
                              }
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
                        <span className="font-inter text-gray-500 text-xs ml-2">
                          ({tool.total_reviews})
                        </span>
                      </div>

                      {/* ==================================
                          STOCK
                      ================================== */}

                      <div className="flex items-center gap-1 mb-3">
                        <span className="font-inter text-sm font-medium text-gray-500">
                          Stock:
                        </span>
                        <span
                          className={`font-inter text-xs font-medium ${tool.stock_quantity >
                              0
                              ? "text-green-600"
                              : "text-red-500"
                            }`}
                        >
                          {
                            tool.stock_quantity
                          }
                        </span>
                      </div>


                      {/* ==================================
                          BUY BUTTON
                      ================================== */}
                      {/* <button
                        type="button"
                        className="font-inter w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-lg"
                        onClick={() => {

                          console.log(
                            "[ToolsPage] Buy Now clicked:",
                            tool
                          );
                        }}
                      >
                        Buy Now
                      </button> */}
                      <button
                        type="button"
                        onClick={() => {
                          console.log(
                            "[ToolsPage] Opening tool:",
                            {
                              id: tool.tools_id,
                              name: tool.name,
                            }
                          );

                          router.push(
                            `/career-seeker/tools/${tool.tools_id}`
                          );
                        }}
                        className="cursor-pointer font-inter w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-lg"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    </div>
  );
}