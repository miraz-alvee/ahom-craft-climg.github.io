"use client";

import { useEffect, useRef, useState } from "react";
import { Check, TrendingUp, CheckCircle, Building2, Zap } from "lucide-react";
import tradeImage from "@/public/images/home/trade-image.png"
import Image from "next/image";

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

export default function TradeJobSeekerSection() {
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
        "View all job applications in one place",
        "Track interview schedules and reminders",
        "Monitor course progress and test scores",
        "Download earned certifications instantly",
        "Get job recommendations based on your profile",
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
                   <Image src={tradeImage} alt="Trade Dashboard"></Image>
                </div>
            </div>
        </section>
    );
}