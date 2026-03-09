"use client";

import { useEffect, useRef, useState } from "react";
import { Check, TrendingUp, CheckCircle, Building2, Zap } from "lucide-react";

const stats = [
    {
        icon: <TrendingUp className="w-5 h-5 text-blue-600" />,
        value: "2.5K",
        label: "Jobs Posted Today",
        bg: "bg-blue-100",
    },
    {
        icon: <CheckCircle className="w-5 h-5 text-green-600" />,
        value: "89%",
        label: "Success Rate",
        bg: "bg-green-100",
    },
    {
        icon: <Building2 className="w-5 h-5 text-purple-600" />,
        value: "500+",
        label: "Top Companies",
        bg: "bg-purple-100",
    },
    {
        icon: <Zap className="w-5 h-5 text-red-500" />,
        value: "24h",
        label: "Avg Response Time",
        bg: "bg-red-100",
    },
];

export default function HiringSection() {
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


    const features = [
        "Post unlimited jobs with detailed requirements",
        "AI-powered candidate matching and filtering",
        "Collaborative hiring with team features",
        "Analytics dashboard to track hiring metrics",
    ];

    return (
        <section
            ref={sectionRef}
            className={`bg-[#FFFFFF] py-20 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}>
            <div className="max-w-7xl mx-auto px-6">

                <div className="grid lg:grid-cols-2 gap-32 items-center">

                    {/* RIGHT CARDS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {stats.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white  rounded-xl p-6 shadow-sm hover:shadow-md transition"
                            >
                                <div
                                    className={`w-12 h-12 flex items-center justify-center rounded-lg mb-4 ${item.bg}`}
                                >
                                    {item.icon}
                                </div>

                                <h3 className="font-inter text-2xl font-bold text-[#111827] leading-8">
                                    {item.value}
                                </h3>

                                <p className="font-inter text-[#6B7280] font-normal text-sm leading-5 mt-1">
                                    {item.label}
                                </p>
                            </div>
                        ))}

                    </div>

                    {/* LEFT CONTENT */}
                    <div>
                        <p className="font-inter text-[#2563EB] text-sm font-semibold leading-5 mb-6">
                            For Employers
                        </p>

                        <h2 className="font-inter text-3xl md:text-4xl font-bold text-[#111827] leading-10 mb-6">
                            Find the Perfect Candidate
                        </h2>

                        <p className="font-inter text-[#6B7280] font-normal text-[14px] leading-7 mb-8 max-w-md mt-3">
                            Streamline your hiring process with powerful tools and access to qualified talent.
                        </p>

                        <ul className="space-y-4 mb-8">
                            {features.map((item, i) => (
                                <li key={i} className="font-inter font-normal flex items-start gap-3 text-[#374151] text-sm leading-6">
                                    <Check className="w-6 h-6 text-[#22C55E] mt-0.5" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <button className="font-inter text-[#2563EB] font-semibold text-sm leading-6 flex items-center gap-2 hover:gap-3 transition-all">
                            Strat Hiring →
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}