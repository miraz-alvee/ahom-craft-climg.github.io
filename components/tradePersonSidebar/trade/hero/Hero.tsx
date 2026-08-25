import Image from "next/image";
import TradeHeroImage from "@/public/images/home/trade-person-image.jpg";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";


export default function TradeHeroSection() {
  return (
    <section id="top" className="relative">
      <div className="relative h-160 md:h-180 w-full overflow-hidden">
        <Image
          src={TradeHeroImage}
          alt="Electrician in a hard hat looking up at scaffolding on a job site"
          fill
          priority
          className="object-cover brightness-70 contrast-100"
        />

        {/* Content — centered over the image */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center sm:px-6">
          {/* Badge */}
          <span className="anim-badge mb-4 inline-flex w-fit items-center rounded-full border border-[#F38D27] bg-[#FDF3F0] px-4 py-1.5 text-xs font-medium text-[#F97316] backdrop-blur-sm sm:text-sm">
            For Trades Person
          </span>

          {/* Heading */}
          <h1 className="anim-heading mt-5 max-w-3xl font-display text-4xl md:text-6xl font-extrabold leading-[1.05] text-white">
            {/* <h1 className="anim-heading max-w-3xl font-inter text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-[52px] lg:leading-[1.1]"> */}
           Build Your <span className="text-[#2563EB]">Trade Career</span>
          </h1>

          {/* Subtext */}
          <p className="anim-sub mt-4 max-w-xl text-sm text-white/85 sm:mt-5 sm:text-base md:text-lg">
           Find skilled trade jobs, grow your expertise with courses, and connect with top employers — all in one platform.
          </p>

          {/* CTA Button */}
          <div className="anim-buttons mt-6 sm:mt-8">
            <Link href="/sign-up">
              <button className="inline-flex items-center gap-2.5 rounded-lg bg-[#2563EB] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition-all duration-300 hover:scale-105 hover:bg-blue-700 hover:shadow-2xl sm:text-base">
                Start Your Journey
                <FaArrowRightLong size={16} />
              </button>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .anim-badge   { animation: fadeUp 0.5s 0.00s ease both; }
        .anim-heading { animation: fadeUp 0.5s 0.08s ease both; }
        .anim-sub     { animation: fadeUp 0.5s 0.16s ease both; }
        .anim-buttons { animation: fadeUp 0.5s 0.24s ease both; }
      `}</style>
    </section>
  );
}


