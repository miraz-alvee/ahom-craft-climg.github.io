
export default function PricingSection() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      description: "Perfect for small teams getting started",
      features: [
        "1 active job posting",
        "Basic candidate filtering",
        "Email support",
      ],
      cta: "Get Started",
      popular: false,
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$49",
      period: "/month",
      description: "For growing companies with active hiring",
      features: [
        "10 active job postings",
        "AI-powered candidate matching",
        "Team collaboration (5 users)",
        "Analytics dashboard",
        "Priority support",
      ],
      cta: "Start Free Trial",
      popular: true,
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations with specific needs",
      features: [
        "Unlimited job postings",
        "Advanced AI matching",
        "Unlimited team members",
        "Custom integrations",
        "Dedicated account manager",
      ],
      cta: "Contact Sales",
      popular: false,
      highlighted: false,
    },
  ];

  return (
    <section className="mt-8 md:mt-6"
      style={{
        background: "#fff",
        padding: "64px 34px",
        fontFamily: "'Inter', sans-serif",
      
      }}
    >
      {/* Header */}
      <div className="text-center mb-6 md:mb-16">
        <h2 className="font-inter text-2xl md:text-[34px] font-bold text-[#111827] leading-12 tracking-[-0.5px]"> Simple, Transparent Pricing
        </h2>
        <p className="font-inter text-[#6B7280] font-normal text-base leading-7 tracking-normal mt-3">
          Choose the plan that fits your hiring needs
        </p>
      </div>

      {/* Cards Grid */}
      <div className="flex flex-wrap justify-center items-center gap-6 max-w-275 mx-auto py-6 md:py-12">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`pricing-card ${plan.highlighted ? "highlighted" : ""}`}
            style={{
              position: "relative",
              width: "320px",
              minHeight: "452px",
              borderRadius: "16px",
              border: `1px solid ${plan.highlighted ? "transparent" : "#E2E8F0"}`,
              background: plan.highlighted
                ? "linear-gradient(145deg, #7C3AED, #9333EA)"
                : "#fff",
              padding: "32px 28px",
              display: "flex",
              flexDirection: "column",
              boxSizing: "border-box",
              boxShadow: plan.highlighted
                ? "0 20px 60px rgba(124,58,237,0.35)"
                : "0 2px 12px rgba(0,0,0,0.06)",
              transform: plan.highlighted ? "translateY(-16px)" : "none",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <div
                style={{
                  position: "absolute",
                  top: "-14px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#fff",
                  border: "1px solid #E2E8F0",
                  borderRadius: "999px",
                  padding: "4px 16px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#7C3AED",
                  whiteSpace: "nowrap",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                Most Popular
              </div>
            )}

            {/* Plan Name */}
            <div
              style={{
                fontSize: "15px",
                fontWeight: 600,
                color: plan.highlighted ? "rgba(255,255,255,0.85)" : "#475569",
                marginBottom: "8px",
              }}
            >
              {plan.name}
            </div>

            {/* Price */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "4px",
                marginBottom: "10px",
              }}
            >
              <span
                style={{
                  fontSize: plan.price === "Custom" ? "2.4rem" : "2.8rem",
                  fontWeight: 800,
                  color: plan.highlighted ? "#fff" : "#0F172A",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                }}
              >
                {plan.price}
              </span>
              {plan.period && (
                <span
                  style={{
                    fontSize: "14px",
                    color: plan.highlighted
                      ? "rgba(255,255,255,0.7)"
                      : "#94A3B8",
                    fontWeight: 400,
                  }}
                >
                  {plan.period}
                </span>
              )}
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: "13px",
                color: plan.highlighted ? "rgba(255,255,255,0.75)" : "#64748B",
                margin: "0 0 20px",
                lineHeight: 1.5,
              }}
            >
              {plan.description}
            </p>

            {/* Features */}
            <ul
              style={{
                listStyle: "none",
                margin: "0 0 28px",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "11px",
                flex: 1,
              }}
            >
              {plan.features.map((f) => (
                <li
                  key={f}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "13.5px",
                    color: plan.highlighted ? "rgba(255,255,255,0.9)" : "#334155",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={plan.highlighted ? "rgba(255,255,255,0.9)" : "#22C55E"}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ flexShrink: 0 }}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "10px",
                border: plan.highlighted ? "none" : "1.5px solid #E2E8F0",
                background: plan.highlighted ? "#fff" : "transparent",
                color: plan.highlighted ? "#7C3AED" : "#7C3AED",
                fontSize: "14px",
                fontWeight: 700,
                cursor: "pointer",
                letterSpacing: "0.01em",
                transition: "background 0.18s, transform 0.15s, box-shadow 0.18s",
              }}>
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Glow under Pro card */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        /* Tablet: stack nicely */
        @media (max-width: 1080px) {
          .pricing-grid {
            gap: 20px;
          }
          .pricing-card {
            width: 300px !important;
          }
        }

        /* Mobile: full width single column */
        @media (max-width: 720px) {
          .pricing-grid {
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }
          .pricing-card {
            width: min(320px, 92vw) !important;
            transform: none !important;
          }
          .pricing-card.highlighted:hover {
            transform: translateY(-4px) !important;
          }
        }

        @media (max-width: 380px) {
          .pricing-card {
            width: 94vw !important;
            padding: 24px 20px !important;
          }
        }
      `}</style>
    </section>
  );
}