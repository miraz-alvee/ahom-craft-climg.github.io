"use client";

import { useEffect, useRef, useState } from "react";
import { Zap, BookOpen, MessageSquare, BarChart3, ShieldCheck, Award } from "lucide-react";

const features = [
    {
        icon: <Zap className="w-5 h-5 text-blue-600" />,
        title: "Smart Job Search",
        desc: "AI-powered search that understands your skills and preferences to find the perfect match",
        bg: "bg-blue-100",
    },
    {
        icon: <BookOpen className="w-5 h-5 text-purple-600" />,
        title: "Profile Builder",
        desc: "Create a standout professional profile that showcases your experience and skills",
        bg: "bg-purple-100",
    },
    {
        icon: <MessageSquare className="w-5 h-5 text-green-600" />,
        title: "Skill Assessments",
        desc: "Take assessments to validate your skills and stand out to employers",
        bg: "bg-green-100",
    },
    {
        icon: <BarChart3 className="w-5 h-5 text-red-500" />,
        title: "Application Tracker",
        desc: "Keep track of all your applications and their status in one place",
        bg: "bg-red-100",
    },
    {
        icon: <ShieldCheck className="w-5 h-5 text-blue-600" />,
        title: "Salary Insights",
        desc: "Get real salary data to negotiate confidently and know your worth",
        bg: "bg-blue-100",
    },
    {
        icon: <Award className="w-5 h-5 text-purple-600" />,
        title: "Career Coaching",
        desc: "Connect with mentors and coaches to guide your career growth",
        bg: "bg-purple-100",
    },
];

export default function CareerSeekerSection() {
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
            className={`bg-white py-20 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
        >
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
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="anim-card border border-[#F3F4F6] rounded-xl p-6 bg-transparent shadow-sm hover:shadow-md transition"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className={`w-10 h-10 flex items-center justify-center rounded-lg mb-4 ${feature.bg}`}>
                                {feature.icon}
                            </div>

                            <h3 className="font-inter text-[16px] font-semibold text-[#111827] leading-7 mb-2">
                                {feature.title}
                            </h3>

                            <p className="font-inter text-[#6B7280] text-[12px] leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}