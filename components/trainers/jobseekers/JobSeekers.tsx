"use client";

import { useEffect, useRef, useState } from "react";
import { Check, TrendingUp, CheckCircle, Building2, Zap } from "lucide-react";
import { ChartBar } from "@/components/shared/chart/chart";

const stats = [
    {
        icon: <TrendingUp className="w-5 h-5 text-blue-600" />,
        value: "2.5K",
        label: "Students",
        bg: "bg-blue-100",
    },
    {
        icon: <CheckCircle className="w-5 h-5 text-green-600" />,
        value: "89%",
        label: "Average Rating",
        bg: "bg-green-100",
    },

];

export default function TrainerJobSeekerSection() {
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
        "Keep 80% of your course revenue",
        "Monthly payouts directly to your bank",
        "Set your own course prices",
        "Offer discounts and promotions",
        "Bonus for top-performing courses",
    ];

    return (
        <section
            ref={sectionRef}
            className={`bg-[#F8FAFC] py-20 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}>
            <div className="max-w-7xl mx-auto px-6">

                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* LEFT CONTENT */}
                    <div>
                        <p className="font-inter text-[#16A34A] text-sm font-semibold leading-5 mb-6">
                            Revenue Model
                        </p>

                        <h2 className="font-inter text-3xl md:text-4xl font-bold text-[#111827] leading-10 mb-6">
                            Earn While You Teach
                        </h2>

                        <p className="font-inter text-[#6B7280] font-normal text-[14px] leading-7 mb-8 max-w-md mt-3">
                            Our transparent revenue model ensures you get fairly compensated for your expertise.
                        </p>

                        <ul className="space-y-4 mb-8">
                            {features.map((item, i) => (
                                <li key={i} className="font-inter font-normal flex items-start gap-3 text-[#374151] text-sm leading-6">
                                    <Check className="w-6 h-6 text-[#22C55E] mt-0.5" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        {/* <button className="font-inter text-[#2563EB] font-semibold text-sm leading-6 flex items-center gap-2 hover:gap-3 transition-all">
                            Explore Jobs →
                        </button> */}
                    </div>


                    {/* RIGHT CARDS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="col-span-2"><ChartBar></ChartBar></div>
                        <div className="row-start-2">
                            <div
                                className="bg-white  rounded-xl p-6 shadow-sm hover:shadow-md transition" >
                                <div className="w-12 h-12 flex items-center justify-center rounded-lg mb-4 bg-blue-100">
                                    <TrendingUp className="w-5 h-5 text-blue-600" />
                                </div>

                                <h3 className="font-inter text-2xl font-bold text-[#111827] leading-8">
                                    2.5K
                                </h3>

                                <p className="font-inter text-[#6B7280] font-normal text-sm leading-5 mt-1">
                                    Students
                                </p>
                            </div>
                        </div>
                        <div className="row-start-2"><div
                            className="bg-white  rounded-xl p-6 shadow-sm hover:shadow-md transition" >
                            <div className="w-12 h-12 flex items-center justify-center rounded-lg mb-4 bg-green-100">
                                <CheckCircle className="w-5 h-5 text-green-600" />,
                            </div>

                            <h3 className="font-inter text-2xl font-bold text-[#111827] leading-8">
                                89%
                            </h3>

                            <p className="font-inter text-[#6B7280] font-normal text-sm leading-5 mt-1">
                                Average Rating
                            </p>
                        </div></div>
                    </div>
                </div>
            </div>
        </section>
    );
}