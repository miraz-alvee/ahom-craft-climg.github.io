"use client"
import loginImage1 from "@/public/images/login/login-image-06.png"
import loginLogo from "@/public/images/login/logo.png"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { FaApple, FaLinkedin } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"

const T = {
    gold: "#A68A3E",
    goldLight: "#E8D48B",
    goldWarm: "#C4A44E",
    goldDeep: "#8A7234",
    navy: "#1A1D24",
    navySoft: "rgba(78,90,120)",
    muted: "#7A8099",
    display: "'Georgia', 'Times New Roman', serif",
}

export default function SignInPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)

    return (
        <div
            style={{
                background: "#f0f1f3",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px 16px",
                fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
            }}
        >
            <div
                style={{
                    background: "#ffffff",
                    maxWidth: 1000,
                    width: "100%",
                    // marginTop: 100,
                    borderRadius: 16,
                    boxShadow:
                        "0 1px 3px rgba(0,0,0,0.04), 0 8px 32px rgba(78,90,120,0.08), 0 24px 64px rgba(78,90,120,0.06)",
                    padding: 20,
                    display: "flex",
                    gap: 0,
                    overflow: "hidden",
                }}
            >
                {/* Left Panel - Image */}
                <div
                    style={{
                        width: "46%",
                        minWidth: 0,
                        flexShrink: 0,
                        borderRadius: 10,
                        overflow: "hidden",
                        position: "relative",
                    }}
                    className="login-left-panel" >
                    <Image
                        src={loginImage1}
                        alt="Login background"
                        fill
                        style={{ objectFit: "cover", objectPosition: "center" }}
                        priority
                    />
                    {/* Overlay gradient for text readability */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background:
                                "linear-gradient(to top, rgba(10,12,18,0.92) 0%, rgba(10,12,18,0.4) 50%, rgba(10,12,18,0.15) 100%)",
                        }}
                    />

                     {/* Logo top-left */}
                    <div
                        style={{
                            position: "absolute",
                            top: 10,
                            left: 10,
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                        }}>
                        <Image className="bg-transparent mix-blend-multiply w-34" src={loginLogo} alt="Craft Climb Logo" />
                    </div>

                    {/* Bottom text */}
                    <div style={{ position: "absolute", bottom: 28, left: 24, right: 24 }}>
                        <div
                            style={{
                                width: "100%",
                                height: 1,
                                background: "rgba(255,255,255,0.15)",
                                marginBottom: 18,
                            }}
                        />
                        <h1
                            style={{
                                color: "#fff",
                                fontWeight: 700,
                                fontSize: 26,
                                lineHeight: 1.25,
                                margin: "0 0 4px 0",
                                fontFamily: T.display,
                            }}
                        >

                            <span style={{ color: T.goldLight, fontStyle: "italic" }}>
                                CRAFTCLIMB <br />
                            </span>
                            <span style={{
                                background: `linear-gradient(135deg, ${T.goldLight}, ${T.goldWarm})`,
                                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontSize: 14,
                            }}>Professional Development</span>
                        </h1>
                    </div>
                </div>

                {/* Right Panel - Form */}
                <div
                    style={{
                        flex: 1,
                        minWidth: 0,
                        padding: "32px 40px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                    className="login-right-panel ml-4"
                >
                    {/* Eyebrow */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            marginBottom: 14,
                        }}
                    >
                        <div
                            style={{
                                width: 24,
                                height: 2,
                                borderRadius: 1,
                                background: `linear-gradient(90deg, ${T.gold}, ${T.goldLight})`,
                            }}
                        />
                        <span
                            style={{
                                fontSize: 10,
                                fontWeight: 700,
                                letterSpacing: 2,
                                textTransform: "uppercase",
                                color: T.gold,
                            }}
                        >
                            Welcome Back
                        </span>
                    </div>

                    {/* Heading */}
                    <h1
                        style={{
                            fontFamily: T.display,
                            fontSize: 28,
                            fontWeight: 700,
                            lineHeight: 1.15,
                            margin: "0 0 6px 0",
                            marginBottom: 20,
                            color: T.navy,
                        }}
                    >
                        Sign in to your account
                    </h1>

                    {/* Email Field */}
                    <label
                        style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: T.navySoft,
                            marginBottom: 6,
                            display: "block",
                        }}
                    >
                        Email Address
                    </label>
                    <div
                        style={{
                            position: "relative",
                            marginBottom: 18,
                        }}
                    >
                        <span
                            style={{
                                position: "absolute",
                                left: 14,
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: T.muted,
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                <rect x="2" y="4" width="20" height="16" rx="2" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>
                        </span>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            style={{
                                width: "100%",
                                boxSizing: "border-box",
                                padding: "11px 14px 11px 40px",
                                border: "1.5px solid #E8EAF0",
                                borderRadius: 8,
                                fontSize: 14,
                                color: T.navy,
                                background: "#F8F9FB",
                                outline: "none",
                                transition: "border-color 0.2s",
                            }}
                            onFocus={(e) => (e.target.style.borderColor = T.gold)}
                            onBlur={(e) => (e.target.style.borderColor = "#E8EAF0")}
                        />
                    </div>

                    {/* Password Field */}
                    <label
                        style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: T.navySoft,
                            marginBottom: 6,
                            display: "block",
                        }}
                    >
                        Password
                    </label>
                    <div style={{ position: "relative", marginBottom: 14 }}>
                        <span
                            style={{
                                position: "absolute",
                                left: 14,
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: T.muted,
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                <rect x="3" y="11" width="18" height="11" rx="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        </span>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            style={{
                                width: "100%",
                                boxSizing: "border-box",
                                padding: "11px 40px 11px 40px",
                                border: "1.5px solid #E8EAF0",
                                borderRadius: 8,
                                fontSize: 14,
                                color: T.navy,
                                background: "#F8F9FB",
                                outline: "none",
                                transition: "border-color 0.2s",
                            }}
                            onFocus={(e) => (e.target.style.borderColor = T.gold)}
                            onBlur={(e) => (e.target.style.borderColor = "#E8EAF0")}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: "absolute",
                                right: 14,
                                top: "50%",
                                transform: "translateY(-50%)",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: T.muted,
                                display: "flex",
                                alignItems: "center",
                                padding: 0,
                            }}
                        >
                            {showPassword ? (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                    <line x1="1" y1="1" x2="23" y2="23" />
                                </svg>
                            ) : (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Remember me + Forgot password */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 24,
                        }}
                    >
                        <label
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                fontSize: 13,
                                color: T.muted,
                                cursor: "pointer",
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                style={{ accentColor: T.gold, width: 14, height: 14 }}
                            />
                            Remember me
                        </label>
                        <a
                            href="#"
                            style={{
                                fontSize: 13,
                                color: T.gold,
                                fontWeight: 600,
                                textDecoration: "none",
                            }}
                        >
                            Forgot password?
                        </a>
                    </div>

                    {/* Login Button */}
                    <button
                        style={{
                            width: "100%",
                            padding: "13px",
                            background: T.navy,
                            color: "#fff",
                            border: "none",
                            borderRadius: 8,
                            fontSize: 15,
                            fontWeight: 700,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 8,
                            letterSpacing: 0.3,
                            transition: "background 0.2s, transform 0.1s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#2a2f3d")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = T.navy)}
                        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
                        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                        Log in
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Divider */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            margin: "20px 0",
                        }}
                    >
                        <div style={{ flex: 1, height: 1, background: "#E8EAF0" }} />
                        <span style={{ fontSize: 12, color: T.muted, fontWeight: 500 }}>OR</span>
                        <div style={{ flex: 1, height: 1, background: "#E8EAF0" }} />
                    </div>

                    {/* Social Buttons */}
                    <div className="space-y-2.5 sm:space-y-3 md:space-y-4 lg:space-y-3">
                        <div className="flex justify-between gap-3 sm:gap-4">
                            <button className="w-full flex items-center justify-center px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 lg:py-2 xl:py-2.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition cursor-pointer">
                                <FcGoogle className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>

                            <button className="w-full flex items-center justify-center px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 lg:py-2 xl:py-2.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition cursor-pointer">
                                <FaApple className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>

                            <button className="w-full flex items-center justify-center px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 lg:py-2 xl:py-2.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition cursor-pointer">
                                <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                            </button>
                        </div>

                        {/* Sign up link */}
                        <p style={{ margin: "0 0 20px 0" }} className="text-center text-xs sm:text-sm md:text-sm lg:text-sm text-[#7A8099] ">
                            Don&apos;t have an account?
                            <Link href="/sign-up" className="text-[#A68A3E] hover:text-[#001F4D] font-bold underline">  Sign up</Link>
                        </p>
                    </div>

                </div>
            </div>

            {/* Responsive styles */}
            <style>{`
        @media (max-width: 700px) {
          .login-left-panel {
            display: none !important;
          }
          .login-right-panel {
            padding: 24px 20px !important;
          }
        }
        @media (max-width: 900px) {
          .login-left-panel {
            width: 35% !important;
          }
        }
      `}</style>
        </div>
    )
}