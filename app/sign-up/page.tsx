"use client"

import loginImage1 from "@/public/images/login/login-image-01.png"
import loginLogo from "@/public/images/login/logo.png"
import { useActivateMutation, useRegisterMutation } from "@/redux/features/register/registerApi"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { ReactNode } from "react"
import { useEffect, useRef, useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { toast } from "sonner"

const T = {
    gold: "#A68A3E",
    goldLight: "#E8D48B",
    goldWarm: "#C4A44E",
    goldDeep: "#8A7234",
    navy: "#1A1D24",
    navyMid: "#4E5A78",
    navySoft: "rgba(78,90,120)",
    muted: "#7A8099",
    subtle: "#A0A6B8",
    inputBg: "#F7F7F9",
    display: "'Georgia', 'Times New Roman', serif",
    body: "'Poppins', 'DM Sans', system-ui, sans-serif",
}

/* Maps the role chip id to the backend's user_role value.
   Adjust these if your API expects different slugs. */
const ROLE_TO_USER_ROLE: Record<string, string> = {
    seeker: "job_seeker",
    trade: "trade_person",
    employer: "employer",
    trainer: "trainer",
}

/* Pulls a readable message out of an RTK Query error shape. */
function getErrorMessage(error: unknown, fallback: string): string {
    if (error && typeof error === "object") {
        const err = error as {
            data?: unknown;
            error?: unknown;
        };
        if (err.data) {
            if (typeof err.data === "string") return err.data;
            if (typeof err.data === "object" && err.data !== null) {
                const data = err.data as Record<string, unknown>;
                if (typeof data.message === "string") return data.message;
                if (typeof data.detail === "string") return data.detail;
                const firstFieldError = Object.values(data).flatMap((value) =>
                    Array.isArray(value) ? value : [value]
                )[0];
                if (typeof firstFieldError === "string") return firstFieldError;
            }
        }
        if (typeof err.error === "string") return err.error;
    }
    return fallback;
}

/* ─── Role selector chip ─── */
type RoleChipProps = {
    label: string
    icon: ReactNode
    active: boolean
    onClick: () => void
}

function RoleChip({ label, icon, active, onClick }: RoleChipProps) {
    const [h, setH] = useState(false);
    return (
        <button type="button" onClick={onClick}
            onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
            style={{
                flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                gap: 4, padding: "10px 8px", borderRadius: 12,
                background: active ? `linear-gradient(135deg, rgba(166,138,62,0.08), rgba(166,138,62,0.03))` : h ? "rgba(166,138,62,0.04)" : T.inputBg,
                border: `1.5px solid ${active ? T.muted : h ? "rgba(166,138,62,0.2)" : "transparent"}`,
                cursor: "pointer", transition: "all 0.2s ease",
                fontFamily: T.body,
                transform: active ? "translateY(-1px)" : "translateY(0)",
                boxShadow: active ? `0 3px 12px rgba(166,138,62,0.1)` : "none",
            }}>
            <div style={{ color: active ? T.gold : h ? T.goldWarm : T.subtle, transition: "color 0.2s ease" }}>{icon}</div>
            <span style={{
                fontSize: 12, fontWeight: active ? 600 : 500, color: active ? T.goldDeep : h ? T.goldWarm : T.muted,
                transition: "color 0.2s ease"
            }}>{label}</span>
        </button>
    );
}

const roles = [
    { id: "seeker", label: "Carrer Seeker", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" /><path d="M4 20c0-3.5 3.5-6 8-6s8 2.5 8 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg> },
    { id: "trade", label: "Trade Professional", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.7" /><circle cx="17" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" /><path d="M3 20c0-3 2.5-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /><path d="M16 14c2.5 0 5 1.5 5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg> },
    { id: "employer", label: "Employer", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="2" y="7" width="20" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.8" /><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="1.8" /><path d="M2 13h20" stroke="currentColor" strokeWidth="1.3" /><circle cx="12" cy="13" r="1.5" fill="currentColor" /></svg> },
    { id: "trainer", label: "Trainer", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.7" /><circle cx="17" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" /><path d="M3 20c0-3 2.5-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /><path d="M16 14c2.5 0 5 1.5 5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg> },
];

const OTP_LENGTH = 6;

export default function SignUpPage() {
    const [step, setStep] = useState<"form" | "otp">("form");

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const [agreedToTerms, setAgreedToTerms] = useState(false)
    const [role, setRole] = useState("seeker");
    const [mounted, setMounted] = useState(false);

    const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
    const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

    const router = useRouter()

    const [register, { isLoading: isRegistering }] = useRegisterMutation();
    const [activate, { isLoading: isActivating }] = useActivateMutation();

    useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);

    const anim = (d: unknown) => ({ animation: mounted ? `slideUp 0.7s cubic-bezier(0.16,1,0.3,1) ${d}s both` : "none" });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }
        if (!agreedToTerms) {
            toast.error("Please agree to the Terms & Conditions to continue.");
            return;
        }

        try {
            const response = await register({
                email,
                full_name: fullName,
                user_role: ROLE_TO_USER_ROLE[role] ?? role,
                password,
                confirm_password: confirmPassword,
            }).unwrap();

            toast.success(response.message ?? "Registration successful. Check your email for the OTP.");
            setStep("otp");
        } catch (error) {
            toast.error(getErrorMessage(error, "Registration failed. Please try again."));
        }
    };

    const handleOtpChange = (index: number, value: string) => {
        if (value && !/^\d+$/.test(value)) return;

        const digits = value.slice(-1);
        setOtp((prev) => {
            const next = [...prev];
            next[index] = digits;
            return next;
        });

        if (digits && index < OTP_LENGTH - 1) {
            otpRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Backspace" && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    const handleOtpPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
        if (!pasted) return;
        event.preventDefault();
        setOtp((prev) => {
            const next = [...prev];
            for (let i = 0; i < OTP_LENGTH; i++) next[i] = pasted[i] ?? next[i];
            return next;
        });
        otpRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
    };

    const handleActivate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const code = otp.join("");
        if (code.length < OTP_LENGTH) {
            toast.error("Please enter the full 6-digit code.");
            return;
        }

        try {
            const response = await activate({ email, code }).unwrap();
            toast.success(response.message ?? "Account activated successfully.");
            router.push("/login");
        } catch (error) {
            toast.error(getErrorMessage(error, "Invalid or expired code. Please try again."));
        }
    };

    const handleResend = async () => {
        try {
            const response = await register({
                email,
                full_name: fullName,
                user_role: ROLE_TO_USER_ROLE[role] ?? role,
                password,
                confirm_password: confirmPassword,
            }).unwrap();
            toast.success(response.message ?? "A new code has been sent to your email.");
        } catch (error) {
            toast.error(getErrorMessage(error, "Couldn't resend the code. Please try again."));
            // Process sign-up logic (e.g., send data to an API)
            console.log('Form submitted successfully:', { fullName, email, password });
            // Navigate after successful sign-up based on selected role
            if (role === 'employer') {
                router.push('/employer');
            } else {
                // Default: career seekers and others go to career seeker pages
                router.push('/career-seeker');
            }
        };

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
                        maxWidth: 1050,
                        width: "100%",
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
                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                background:
                                    "linear-gradient(to top, rgba(10,12,18,0.92) 0%, rgba(10,12,18,0.4) 50%, rgba(10,12,18,0.15) 100%)",
                            }}
                        />

                        <div
                            style={{
                                position: "absolute",
                                top: 20,
                                left: 20,
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                            }}>
                            <Image className="bg-transparent mix-blend-multiply w-34" src={loginLogo} alt="Craft Climb Logo" />
                        </div>

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
                                }}>

                                Join the future and<br />
                                <span style={{
                                    background: `linear-gradient(135deg, ${T.goldLight}, ${T.goldWarm})`,
                                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                                }}>perceive career.</span>
                            </h1>

                            <p style={{
                                fontSize: 15, fontWeight: 600, fontFamily: T.display, letterSpacing: 0.5,
                                background: `linear-gradient(135deg, ${T.goldLight}, ${T.goldWarm})`,
                                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                                margin: 0,
                            }}>Precision Talent. Perfect Match.
                            </p>
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
                        {step === "form" ? (
                            <>
                                {/* Eyebrow */}
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                                    <div style={{ width: 24, height: 2, borderRadius: 1, background: `linear-gradient(90deg, ${T.gold}, ${T.goldLight})` }} />
                                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: T.gold }}>
                                        Get Started
                                    </span>
                                </div>

                                <h1 style={{ fontFamily: T.display, fontSize: 28, fontWeight: 700, lineHeight: 1.15, margin: "0 0 4px 0", color: T.navy }}>
                                    Create Your Account
                                </h1>
                                <p style={{ fontSize: 14, marginBottom: 32, lineHeight: 1.5, color: T.muted }}>
                                    Tell us who you are to get started.
                                </p>

                                {/* Role selector */}
                                <div style={{ marginBottom: 6, ...anim(0.18) }}>
                                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.navyMid, marginBottom: 4, letterSpacing: 0.3 }}>I am a:</label>
                                    <div style={{ display: "flex", gap: 10 }}>
                                        {roles.map(r => (
                                            <RoleChip key={r.id} label={r.label} icon={r.icon} active={role === r.id} onClick={() => setRole(r.id)} />
                                        ))}
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <label style={{ fontSize: 12, fontWeight: 600, color: T.navySoft, marginBottom: 6, display: "block" }}>
                                        Full Name
                                    </label>
                                    <div style={{ position: "relative", marginBottom: 18 }}>
                                        <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: T.muted, display: "flex", alignItems: "center" }}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                                <circle cx="12" cy="8" r="4" />
                                                <path d="M4 20c0-3.5 3.5-6 8-6s8 2.5 8 6" />
                                            </svg>
                                        </span>
                                        <input
                                            type="text"
                                            placeholder="Your full name"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            required
                                            style={{
                                                width: "100%", boxSizing: "border-box", padding: "11px 14px 11px 40px",
                                                border: "1.5px solid #E8EAF0", borderRadius: 8, fontSize: 14, color: T.navy,
                                                background: "#F8F9FB", outline: "none", transition: "border-color 0.2s",
                                            }}
                                            onFocus={(e) => (e.target.style.borderColor = T.gold)}
                                            onBlur={(e) => (e.target.style.borderColor = "#E8EAF0")}
                                        />
                                    </div>

                                    <label style={{ fontSize: 12, fontWeight: 600, color: T.navySoft, marginBottom: 6, display: "block" }}>
                                        Email Address
                                    </label>
                                    <div style={{ position: "relative", marginBottom: 18 }}>
                                        <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: T.muted, display: "flex", alignItems: "center" }}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                                <rect x="2" y="4" width="20" height="16" rx="2" />
                                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                            </svg>
                                        </span>
                                        <input
                                            type="email"
                                            placeholder="you@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            style={{
                                                width: "100%", boxSizing: "border-box", padding: "11px 14px 11px 40px",
                                                border: "1.5px solid #E8EAF0", borderRadius: 8, fontSize: 14, color: T.navy,
                                                background: "#F8F9FB", outline: "none", transition: "border-color 0.2s",
                                            }}
                                            onFocus={(e) => (e.target.style.borderColor = T.gold)}
                                            onBlur={(e) => (e.target.style.borderColor = "#E8EAF0")}
                                        />
                                    </div>

                                    <label style={{ fontSize: 12, fontWeight: 600, color: T.navySoft, marginBottom: 6, display: "block" }}>
                                        Password
                                    </label>
                                    <div style={{ position: "relative", marginBottom: 14 }}>
                                        <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: T.muted, display: "flex", alignItems: "center" }}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                                <rect x="3" y="11" width="18" height="11" rx="2" />
                                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                            </svg>
                                        </span>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            style={{
                                                width: "100%", boxSizing: "border-box", padding: "11px 40px 11px 40px",
                                                border: "1.5px solid #E8EAF0", borderRadius: 8, fontSize: 14, color: T.navy,
                                                background: "#F8F9FB", outline: "none", transition: "border-color 0.2s",
                                            }}
                                            onFocus={(e) => (e.target.style.borderColor = T.gold)}
                                            onBlur={(e) => (e.target.style.borderColor = "#E8EAF0")}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: T.muted, display: "flex", alignItems: "center", padding: 0 }}
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

                                    <label style={{ fontSize: 12, fontWeight: 600, color: T.navySoft, marginBottom: 6, display: "block" }}>
                                        Confirm Password
                                    </label>
                                    <div style={{ position: "relative", marginBottom: 14 }}>
                                        <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: T.muted, display: "flex", alignItems: "center" }}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                                <rect x="3" y="11" width="18" height="11" rx="2" />
                                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                            </svg>
                                        </span>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Confirm your password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                            style={{
                                                width: "100%", boxSizing: "border-box", padding: "11px 40px 11px 40px",
                                                border: "1.5px solid #E8EAF0", borderRadius: 8, fontSize: 14, color: T.navy,
                                                background: "#F8F9FB", outline: "none", transition: "border-color 0.2s",
                                            }}
                                            onFocus={(e) => (e.target.style.borderColor = T.gold)}
                                            onBlur={(e) => (e.target.style.borderColor = "#E8EAF0")}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: T.muted, display: "flex", alignItems: "center", padding: 0 }}
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

                                    <div className="mt-2 mb-4">
                                        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: T.muted, cursor: "pointer" }}>
                                            <input
                                                type="checkbox"
                                                checked={agreedToTerms}
                                                onChange={(e) => setAgreedToTerms(e.target.checked)}
                                                style={{ accentColor: T.gold, width: 14, height: 14 }}
                                            />
                                            By continuing, I agree to the <span style={{ color: T.gold }}>Terms & Conditions</span> and
                                            <span style={{ color: T.gold }}>Privacy Policy</span>.
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isRegistering}
                                        className="bg-[#2563EB] shadow-lg shadow-blue-900/30 transition-all duration-300 hover:scale-105 hover:bg-blue-700 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
                                        style={{
                                            width: "100%", padding: "13px", color: "#fff", border: "none", borderRadius: 8,
                                            fontSize: 15, fontWeight: 700, cursor: "pointer", display: "flex",
                                            alignItems: "center", justifyContent: "center", gap: 8, letterSpacing: 0.3,
                                            transition: "background 0.2s, transform 0.1s",
                                        }}>
                                        {isRegistering ? "Creating account..." : "Sign up"}
                                        {!isRegistering && (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        )}
                                    </button>
                                </form>

                                <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "12px 0" }}>
                                    <div style={{ flex: 1, height: 1, background: "#E8EAF0" }} />
                                    <span style={{ fontSize: 10, color: T.muted, fontWeight: 600 }}>OR</span>
                                    <div style={{ flex: 1, height: 1, background: "#E8EAF0" }} />
                                </div>

                                <button className="w-full flex items-center justify-center gap-3 px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 lg:py-2 xl:py-2 border border-gray-300 rounded-xl bg-white hover:bg-gray-50 transition cursor-pointer">
                                    <FcGoogle className="w-5 h-5 sm:w-7 sm:h-7" />
                                    <p className="text-[#C59132] text-base">Continue with Google</p>
                                </button>

                                <p style={{ margin: "20px 0 20px 0" }} className="text-center text-xs sm:text-sm md:text-sm lg:text-sm text-[#7A8099] ">
                                    Already have an account?
                                    <Link href="/login" className="text-[#A68A3E] hover:text-[#001F4D] font-bold underline">  Sign in</Link>
                                </p>
                            </>
                        ) : (
                            <>
                                {/* OTP step */}
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                                    <div style={{ width: 24, height: 2, borderRadius: 1, background: `linear-gradient(90deg, ${T.gold}, ${T.goldLight})` }} />
                                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: T.gold }}>
                                        Verify Email
                                    </span>
                                </div>

                                <h1 style={{ fontFamily: T.display, fontSize: 28, fontWeight: 700, lineHeight: 1.15, margin: "0 0 4px 0", color: T.navy }}>
                                    Enter Verification Code
                                </h1>
                                <p style={{ fontSize: 14, marginBottom: 32, lineHeight: 1.5, color: T.muted }}>
                                    We sent a 6-digit code to <strong style={{ color: T.navy }}>{email}</strong>.
                                </p>

                                <form onSubmit={handleActivate}>
                                    <div style={{ display: "flex", gap: 10, marginBottom: 24, justifyContent: "space-between" }}>
                                        {otp.map((digit, index) => (
                                            <input
                                                key={index}
                                                ref={(el) => { otpRefs.current[index] = el; }}
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                                onPaste={handleOtpPaste}
                                                style={{
                                                    width: 48, height: 52, textAlign: "center", fontSize: 20, fontWeight: 700,
                                                    color: T.navy, border: "1.5px solid #E8EAF0", borderRadius: 8,
                                                    background: "#F8F9FB", outline: "none", transition: "border-color 0.2s",
                                                }}
                                                onFocus={(e) => (e.target.style.borderColor = T.gold)}
                                                onBlur={(e) => (e.target.style.borderColor = "#E8EAF0")}
                                            />
                                        ))}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isActivating}
                                        className="bg-[#2563EB] shadow-lg shadow-blue-900/30 transition-all duration-300 hover:scale-105 hover:bg-blue-700 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
                                        style={{
                                            width: "100%", padding: "13px", color: "#fff", border: "none", borderRadius: 8,
                                            fontSize: 15, fontWeight: 700, cursor: "pointer", display: "flex",
                                            alignItems: "center", justifyContent: "center", gap: 8, letterSpacing: 0.3,
                                            transition: "background 0.2s, transform 0.1s", marginBottom: 16,
                                        }}>
                                        {isActivating ? "Verifying..." : "Verify & Continue"}
                                    </button>
                                </form>

                                <p className="text-center text-xs sm:text-sm text-[#7A8099]">
                                    Didn&apos;t get the code?{" "}
                                    <button
                                        type="button"
                                        onClick={handleResend}
                                        disabled={isRegistering}
                                        className="text-[#A68A3E] hover:text-[#001F4D] font-bold underline disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        Resend
                                    </button>
                                </p>

                                <p style={{ margin: "20px 0 0 0" }} className="text-center text-xs sm:text-sm text-[#7A8099]">
                                    <button
                                        type="button"
                                        onClick={() => setStep("form")}
                                        className="text-[#A68A3E] hover:text-[#001F4D] font-bold underline"
                                    >
                                        ← Back to sign up
                                    </button>
                                </p>
                            </>
                        )}
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
}