import Image from "next/image";
import bgImage from "@/public/images/home/bg-image.png";
import { FaArrowRightLong } from "react-icons/fa6";

export default function EmployersHeroSection() {
  return (
    <section
      style={{
        background:
          "linear-gradient(135deg, #EFF6FF 25%, #FFFFFF 60.36%, #ECFEFF 95.71%)",
        minHeight: "560px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background image centered */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "100%",
          zIndex: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <Image
          src={bgImage}
          alt=""
          style={{
            objectFit: "contain",
            maxWidth: "1200px",
            width: "100%",
            opacity: 0.9,
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: "60px 24px",
          maxWidth: "1000px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        {/* Badge */}
        <div className="anim-badge font-inter" style={{ marginBottom: "20px" }}>
          <span
            style={{
              display: "inline-block",
              border: "1px solid #BFDBFE",
              borderRadius: "999px",
              padding: "10px 24px",
              fontSize: "13px",
              color: "#2563EB",
              background: "#EFF6FF",
              backdropFilter: "blur(4px)",
              letterSpacing: "0.01em",
            }}
          >
            For Employers
          </span>
        </div>

        {/* Heading */}
        <h1
          className="anim-heading w-full font-inter font-bold text-2xl md:text-[52px] leading-15"
          style={{
            color: "#111827",
            margin: "0 0 18px",
            letterSpacing: "-0.02em",
          }}
        >
            Hire Smarter&nbsp;, Faster
         
        </h1>

        {/* Subtext */}
        <p
          className="anim-sub font-inter font-normal leading-7"
          style={{
            fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
            color: "#4B5563",
            margin: "0 auto 36px",
            maxWidth: "620px",
          }}
        >
          Access top talent, streamline your hiring process, and build your dream 
          team with powerful recruitment tools.
        </p>

        {/* CTA Button */}
        <div className="anim-buttons font-inter text-sm transition-all duration-300 drop-shadow-lg hover:drop-shadow-2xl hover:scale-105 transform whitespace-nowrap">
          <button
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "20px",
              background: "#2563EB",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              padding: "16px 28px",
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "0.01em",
              boxShadow: "0 4px 20px rgba(37,99,235,0.28)",
              transition: "background 0.18s, transform 0.15s, box-shadow 0.18s",
            }}>
            Post Your First Job Free 
            <FaArrowRightLong size={20}/>
           
          </button>
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

        @media (max-width: 640px) {
          section { min-height: 480px !important; }
        }
        @media (max-width: 400px) {
          section { padding: 0 8px !important; }
        }
      `}</style>
    </section>
  );
}