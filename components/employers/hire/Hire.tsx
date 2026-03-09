"use client";

import { useEffect, useRef, useState } from "react";
import { Zap, BookOpen, MessageSquare, BarChart3, ShieldCheck, Award } from "lucide-react";

const features = [
    {
        icon: <Zap className="w-5 h-5 text-blue-600" />,
        title: "Job Posting",
        desc: "Create detailed job listings with requirements, benefits and company culture",
        bg: "bg-blue-100",
    },
    {
        icon: <BookOpen className="w-5 h-5 text-purple-600" />,
        title: "Candidate Filtering",
        desc: "AI-powered filtering to quickly find candidates that match your requirements",
        bg: "bg-purple-100",
    },
    {
        icon: <MessageSquare className="w-5 h-5 text-green-600" />,
        title: "Team Collaboration",
        desc: "Invite team members to review candidates and make hiring decisions together",
        bg: "bg-green-100",
    },
    {
        icon: <BarChart3 className="w-5 h-5 text-red-500" />,
        title: "Analytics Dashboard",
        desc: "Track job performance, application rates, and hiring metrics in real-time",
        bg: "bg-red-100",
    },
    {
        icon: <ShieldCheck className="w-5 h-5 text-blue-600" />,
        title: "Branded Company Page",
        desc: "Showcase your company culture, values, and open positions on a custom page",
        bg: "bg-blue-100",
    },
    {
        icon: <Award className="w-5 h-5 text-purple-600" />,
        title: "Direct Messaging",
        desc: "Communicate directly with candidates through our built-in messaging system",
        bg: "bg-purple-100",
    },
];

export default function EmployerSection() {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`bg-[#F9FAFB] py-20 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-14">

                    <h2 className="font-inter text-3xl md:text-[34px] font-bold text-[#111827] leading-12 tracking-[-0.5px]">
                       Powerful Hiring Tools
                    </h2>

                    <p className="font-inter text-[#6B7280] font-normal text-base leading-7 mt-3">
                        Everything you need to find and hire the best candidates
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