"use client";

import { useEffect, useRef, useState } from "react";

const starts = [
    {
        id: 1,
        title: "Create Your Profile",
        desc: "Sign up and build your professional profile with your experience, skills, and career goals",
        bg: "bg-[#2563EB]",
    },
    {
        id: 2,
        title: "Discover Opportunities",
        desc: "Browse AI-recommended jobs or search for specific roles that match your interests",
        bg: "bg-[#9333EA]",
    },
    {
        id: 3,
        title: "Apply & Connect",
        desc: "Apply with one click and connect directly with employers to land your dream job",
        bg: "bg-[#16A34A]",
    },
   
];


export default function StepSetion() {
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
            className={`bg-[#FFFFFF] py-20 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-14">

                    <h2 className="font-inter text-3xl md:text-[34px] font-bold text-[#111827] leading-12 tracking-[-0.5px]">
                      Get Started in 3 Simple Steps
                    </h2>

                    <p className="font-inter text-[#6B7280] font-normal text-base leading-7 mt-1">
                        Have a tour to designed and accelerate your job search
                    </p>
                </div>

                {/* Cards */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {starts.map((start, index) => (
                        <div
                            key={index}
                            className="anim-card p-6 bg-transparent"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className={`w-16 h-16 text-[#FFFFFF] flex justify-center items-center font-bold text-xl leading-8 rounded-lg mb-4 mx-auto ${start.bg}`}>
                                {start.id}
                            </div>

                            <h3 className="font-inter text-base font-semibold text-[#111827] leading-7 mb-2 text-center">
                                {start.title}
                            </h3>

                            <p className="font-inter font-normal text-[#6B7280] text-[14px] leading-relaxed text-center">
                                {start.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
