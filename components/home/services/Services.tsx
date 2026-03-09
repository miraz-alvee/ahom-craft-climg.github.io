"use client";
import { TrendingUp, Building2, GraduationCap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const services = [
  {
    icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
    title: "Find Your Dream Job",
    desc: "Discover opportunities that match your skills and aspirations",
    steps: ["Create Profile", "Browse Jobs", "Apply & Connect"],
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: <Building2 className="w-6 h-6 text-purple-600" />,
    title: "Hire Top Talent",
    desc: "Find the perfect candidates for your team quickly",
    steps: ["Post Jobs", "Review Candidates", "Hire Fast"],
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: <GraduationCap className="w-6 h-6 text-green-600" />,
    title: "Share Your Expertise",
    desc: "Create courses and help others grow their skills",
    steps: ["Create Courses", "Reach Learners", "Earn Revenue"],
    color: "bg-green-100 text-green-600",
  },
];



export default function ServicesSection() {
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
      className={`bg-[#F9FAFB] py-20 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
            
          <h2 className="font-inter text-3xl md:text-[44px] font-bold text-[#111827] leading-12 tracking-[-0.5px]">
            One Platform, Three Paths
          </h2>

          <p className="font-inter text-[#6B7280] font-normal text-base leading-7 mt-3">
            Whether you're seeking opportunities, hiring talent, or sharing expertise
          </p>
        </div>

        {/* your cards here */}
         {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="anim-card bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-lg transition duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100 mb-6">
                {service.icon}
              </div>

              <h3 className="font-inter text-lg font-bold text-[#111827] leading-7 mb-2">
                {service.title}
              </h3>

              <p className="font-inter text-[#6B7280] font-normal text-sm leading-6 mb-6">
                {service.desc}
              </p>

              <ul className="space-y-3">
                {service.steps.map((step, i) => (
                  <li key={i} className="font-inter font-normal text-[#374151] text-[12px] flex items-center gap-3 ">
                    <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-medium ${service.color}`}>
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}