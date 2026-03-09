"use client";
import { useEffect, useRef, useState } from "react";
import { Zap, BookOpen, MessageSquare, BarChart3, ShieldCheck, Award } from "lucide-react";

const categories = [
    {
        icon: <Zap className="w-5 h-5 text-blue-600" />,
        title: "Technology",
        bg: "bg-[#EFF6FF]",
    },
    {
        icon: <BookOpen className="w-5 h-5 text-purple-600" />,
        title: "Design",
        bg: "bg-purple-100",
    },
    {
        icon: <MessageSquare className="w-5 h-5 text-green-600" />,
        title: "Marketing",
        bg: "bg-green-100",
    },
    {
        icon: <BarChart3 className="w-5 h-5 text-red-500" />,
        title: "Finance",
        bg: "bg-red-100",
    },
    {
        icon: <ShieldCheck className="w-5 h-5 text-blue-600" />,
        title: "Healthcare",
        bg: "bg-blue-100",
    },
    {
        icon: <Award className="w-5 h-5 text-purple-600" />,
        title: "Education",
        bg: "bg-purple-100",
    },
];

export default function CategoriesSection() {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                }
            },
            { threshold: 0.4 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`bg-[#F9FAFB] py-30 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>

            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-14">

                    <h2 className="font-inter text-3xl md:text-[34px] font-bold text-[#111827] leading-12 tracking-[-0.5px]">
                        Everything You Need to Land Your Dream Job
                    </h2>

                    <p className="font-inter text-[#6B7280] font-normal text-base leading-7 mt-3">
                        Powerful tools designed to accelerate your job search
                    </p>
                </div>

                {/* Cards */}
                <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {categories.map((categorie, index) => (
                        <div
                            key={index}
                            className="anim-card bg-[#ffffff] border border-[#F3F4F6] rounded-xl p-6 shadow-sm hover:shadow-md transition"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className={`w-10 h-10 flex items-center justify-center rounded-lg mb-4 ${categorie.bg}`}>
                                {categorie.icon}
                            </div>

                            <h3 className="font-inter text-[16px] font-semibold text-[#111827] leading-7 mb-2">
                                {categorie.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    )
}
