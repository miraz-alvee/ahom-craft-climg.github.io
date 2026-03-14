"use client"

import { useState } from "react"
import { BookOpen, Clock, PlayCircle, Star } from "lucide-react"
import Image from "next/image"

import toolsImage01 from "@/public/images/tools/tool-01.jpg"
import toolsImage02 from "@/public/images/tools/tool-02.jpg"
import toolsImage03 from "@/public/images/tools/tool-03.jpg"
import toolsImage04 from "@/public/images/tools/tool-04.jpg"
import toolsImage05 from "@/public/images/tools/tool-05.jpg"
import toolsImage06 from "@/public/images/tools/tool-06.jpg"
import toolsImage07 from "@/public/images/tools/tool-07.jpg"
import toolsImage08 from "@/public/images/tools/tool-08.jpg"

type Category = "Civil" | "Electrical" | "Plumbing" | "Safety"

const FILTERS = ["All", "Civil", "Electrical", "Plumbing", "Safety"]

const tools = [
  {
    title: "12 Pcs Tools Package",
    description: "A complete toolkit featuring 12 essential tools.",
    rating: 4.5,
    reviews: 95,
    price: 28,
    category: "Civil" as Category,
    image: toolsImage01,
  },
  {
    title: "Electric Drill Kit",
    description: "Professional drilling machine set.",
    rating: 4.6,
    reviews: 120,
    price: 45,
    category: "Electrical" as Category,
    image: toolsImage02,
  },
  {
    title: "Pipe Wrench Set",
    description: "Heavy-duty plumbing wrench set.",
    rating: 4.4,
    reviews: 78,
    price: 32,
    category: "Plumbing" as Category,
    image: toolsImage03,
  },
  {
    title: "12 Pcs Tools Package",
    description: "A complete toolkit featuring 12 essential tools.",
    rating: 4.5,
    reviews: 95,
    price: 28,
    category: "Civil" as Category,
    image: toolsImage04,
  },
  {
    title: "Electric Drill Kit",
    description: "Professional drilling machine set.",
    rating: 4.6,
    reviews: 120,
    price: 45,
    category: "Electrical" as Category,
    image: toolsImage05,
  },
  {
    title: "Pipe Wrench Set",
    description: "Heavy-duty plumbing wrench set.",
    rating: 4.4,
    reviews: 78,
    price: 32,
    category: "Plumbing" as Category,
    image: toolsImage06,
  },
  {
    title: "12 Pcs Tools Package",
    description: "A complete toolkit featuring 12 essential tools.",
    rating: 4.5,
    reviews: 95,
    price: 28,
    category: "Civil" as Category,
    image: toolsImage07,
  },
  {
    title: "Electric Drill Kit",
    description: "Professional drilling machine set.",
    rating: 4.6,
    reviews: 120,
    price: 45,
    category: "Electrical" as Category,
    image: toolsImage08,
  },
  {
    title: "Pipe Wrench Set",
    description: "Heavy-duty plumbing wrench set.",
    rating: 4.4,
    reviews: 78,
    price: 32,
    category: "Plumbing" as Category,
    image: toolsImage06,
  },
]

export default function ToolsPage() {
  const [filter, setFilter] = useState("All")

 const filteredTools= tools.filter((tool) => {
  if (filter === "All") return true
  return tool.category === filter
})

  return (
    <div className="min-h-screen bg-[#f4f6fb]">
      <div className="px-8 py-6">

        {/* Header */}
        <div className="mb-6">
          <h1 className="font-inter text-2xl font-bold">Tools</h1>
          <p className="font-inter text-gray-500 text-sm">
            Browse professional tools & equipment
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">

          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-inter px-4 py-2 text-sm rounded-full border transition
                ${filter === f
                  ? "bg-[#2563EB] text-white border-blue-600"
                  : "bg-white hover:bg-blue-50"
                }`}
            >
              {f}
            </button>
          ))}

        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 ">
          {filteredTools.map((tool, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border hover:shadow-md overflow-hidden shadow-lg transition-transform duration-200 hover:scale-102"
            >

              {/* Image */}
              <div className="relative h-52 w-full">
                <Image
                  src={tool.image}
                  alt={tool.title}
                  fill
                  className="object-cover"
                />

                {/* Price */}
                <div className="font-inter absolute top-3 right-3 bg-white/60 text-gray-900 text-sm font-semibold px-3 py-1 rounded-md shadow">
                  ${tool.price}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">

                <h3 className="font-inter font-semibold text-sm mb-1">
                  {tool.title}
                </h3>

                <p className="font-inter text-xs text-gray-500 mb-3">
                  {tool.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 text-yellow-500 text-sm mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      fill={star <= Math.floor(tool.rating) ? "currentColor" : "none"}
                    />
                  ))}

                  <span className="font-inter text-gray-500 text-xs ml-2">
                    ({tool.reviews})
                  </span>
                </div>

                {/* Button */}
                <button className="font-inter w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-lg">
                  Buy Now
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  )
}