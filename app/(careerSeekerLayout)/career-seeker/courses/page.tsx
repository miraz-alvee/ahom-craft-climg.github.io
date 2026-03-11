"use client"

import { useState } from "react"
import { BookOpen, Clock, PlayCircle, Star } from "lucide-react"

type Category = "Site" | "Business" | "Civil" | "Electrical"

const FILTERS = ["All", "Site", "Business", "Civil", "Electrical"]

const courses = [
  {
    title: "Product Management",
    author: "Mike Johnson",
    hours: "12 hours",
    students: "6,700",
    rating: 4.7,
    category: "Business" as Category,
    gradient: "from-orange-500 to-red-500",
  },
  {
    title: "UX Design Masterclass",
    author: "Emily Davis",
    hours: "20 hours",
    students: "9,200",
    rating: 4.8,
    category: "Site" as Category,
    gradient: "from-green-500 to-teal-500",
  },
  {
    title: "Data Science with Python",
    author: "Alex Rivera",
    hours: "30 hours",
    students: "15,000",
    rating: 4.6,
    category: "Civil" as Category,
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    title: "Digital Marketing Strategy",
    author: "Jessica Park",
    hours: "15 hours",
    students: "5,400",
    rating: 4.5,
    category: "Electrical" as Category,
    gradient: "from-pink-500 to-red-400",
  },
  {
    title: "Leadership & Management",
    author: "David Wilson",
    hours: "10 hours",
    students: "4,200",
    rating: 4.7,
    category: "Business" as Category,
    gradient: "from-yellow-500 to-orange-500",
  },
]

export default function CoursePage() {
  const [filter, setFilter] = useState("All")

  const filteredCourses = courses.filter((course) => {
    if (filter === "All") return true
    return course.category === filter
  })

  return (
    <div className="min-h-screen bg-[#f4f6fb]">
      <div className="px-10 py-6">

        {/* Header */}
        <div className="mb-6">
          <h1 className="font-inter text-2xl font-bold">Courses & Learning</h1>
          <p className="font-inter text-gray-500 text-sm">
            Enhance your skills with professional courses
          </p>
        </div>

        {/* My Learning */}
        <div className="flex items-center gap-2 mb-6">
          <BookOpen size={20} className="font-inter text-blue-600"/>
          <h2 className="font-inter font-semibold text-lg">My Learning</h2>
        </div>

        {/* Progress Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">

          <div className="bg-white rounded-xl p-4 shadow-sm border flex gap-4">
            <div className="w-24 h-24 rounded-lg bg-linear-to-r from-blue-500 to-teal-400 flex items-center justify-center">
              <PlayCircle className="text-white" size={36}/>
            </div>

            <div className="flex-1">
              <h3 className="font-inter font-semibold">
                Complete React Developer Course
              </h3>
              <p className="font-inter text-sm text-gray-500">John Smith</p>

              <p className="font-inter text-xs mt-2 text-gray-500">65% complete</p>

              <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                <div className="bg-blue-600 h-2 rounded-full w-[65%]" />
              </div>

              <button className="font-inter text-blue-600 text-sm mt-3">
                Continue Learning →
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border flex gap-4">
            <div className="w-24 h-24 rounded-lg bg-linear-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <PlayCircle className="text-white" size={36}/>
            </div>

            <div className="flex-1">
              <h3 className="font-inter font-semibold">
                System Design Interview Prep
              </h3>
              <p className="font-inter text-sm text-gray-500">Sarah Chen</p>

              <p className="font-inter text-xs mt-2 text-gray-500">30% complete</p>

              <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                <div className="bg-blue-600 h-2 rounded-full w-[30%]" />
              </div>

              <button className="font-inter text-blue-600 text-sm mt-3">
                Continue Learning →
              </button>
            </div>
          </div>

        </div>

        {/* Browse */}
        <h2 className="font-inter font-semibold text-lg mb-4">
          Browse Courses
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">

          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-inter px-4 py-2 text-sm rounded-full border transition
                ${
                  filter === f
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white hover:bg-blue-50"
                }`}
            >
              {f}
            </button>
          ))}

        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredCourses.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition"
            >

              <div
                className={`h-36 bg-linear-to-r ${course.gradient} relative flex items-center justify-center`}
              >
                <PlayCircle className="font-inter text-white" size={42} />

                <span className="font-inter absolute top-3 right-3 text-xs bg-black/40 text-white px-3 py-1 rounded-full">
                  {course.category}
                </span>
              </div>

              <div className="p-4">

                <h3 className="font-inter font-semibold text-sm mb-1">
                  {course.title}
                </h3>

                <p className="font-inter text-xs text-gray-500 mb-3">
                  {course.author}
                </p>

                <div className="font-inter flex items-center gap-4 text-xs text-gray-500 mb-2">
                  <span className="flex items-center gap-1">
                    <Clock size={14}/>
                    {course.hours}
                  </span>

                  <span>
                    • {course.students} students
                  </span>
                </div>

                <div className="font-inter flex items-center gap-1 text-yellow-500 text-sm mb-4">

                  {[1,2,3,4,5].map((star)=>(
                    <Star
                      key={star}
                      size={14}
                      fill={star <= Math.floor(course.rating) ? "currentColor" : "none"}
                    />
                  ))}

                  <span className="font-inter text-gray-500 text-xs ml-2">
                    {course.rating}
                  </span>

                </div>

                <button className="font-inter w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-lg">
                  Enroll Now
                </button>

              </div>
            </div>

          ))}

        </div>

      </div>
    </div>
  )
}