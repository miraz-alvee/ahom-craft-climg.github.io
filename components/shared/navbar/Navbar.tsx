"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Navlogo from "@/public/images/home/nav-logo.png";

export default function Navbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Career Seekers", href: "/career-seekers" },
        { name: "Employers", href: "/employers" },
        { name: "Trainers", href: "/trainers" },
        { name: "Trade Persons", href: "/trade-persons" },
    ];

    const isActive = (href: string) => {
        if (href === "/") {
            return pathname === "/";
        }
        return pathname?.startsWith(href);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className="bg-[#ffffff] sticky top-0 z-50 py-1 md:py-0">
            <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-46 mb-2">
                <div className="flex items-center justify-between h-14 sm:h-14 lg:h-16">
                    {/* Logo */}


                    <div className="flex font-bold text-xl">
                        <Link href="/">
                            <Image src={Navlogo} alt="Brand Logo" width={88} height={68} />
                        </Link>
                    </div>

                    {/* Desktop Navigation Links - Hidden on mobile/tablet */}
                    <div className="font-inter hidden lg:flex items-center space-x-10 xl:space-x-12 2xl:space-x-16">
                        {navLinks.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`
                                    relative
                                    inline-flex
                                    flex-col
                                    items-center
                                    text-[15px]
                                    leading-[22.5px]
                                    font-bold
                                    duration-200
                                    transition-colors 
                                    focus-ring 
                                    rounded-sm
                                    pb-1.5
                                    text-[#3b3b3e]
                                    ${pathname === item.href ? "" : "hover:text-ink"}
                                `}>
                                {/* Link Text Content */}
                                <span>{item.name}</span>

                                {/* Bottom Horizontal Indicator Line */}
                                <div
                                    className={`
                                    absolute 
                                    bottom-0 
                                    h-0.5 
                                    w-full 
                                    transition-all 
                                    duration-200
                                    ${pathname === item.href
                                        ? "bg-[#3b3b3e] scale-x-100"
                                        : "bg-transparent scale-x-0 hover:bg-ink"
                                    }
                                `}
                                />
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Auth Buttons - Hidden on mobile */}
                    <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
                        {/* <Button className="bg-[#2563EB] text-white font-semibold text-sm leading-6 px-4 py-5" variant="outline">Get Started</Button>
                        <Button className="bg-[#2563EB] text-white font-semibold text-sm leading-6 px-4 py-5" variant="outline">Get Started</Button> */}
                        {/* <Link
                            href="/login"
                            // className="text-[#707784] hover:text-[#474b52] transition-all duration-300 text-sm lg:text-base font-medium relative group px-2 py-1"
                            className="bg-[#2563EB] text-white font-semibold text-sm leading-6 px-4 py-5"
                        >
                            Sign In
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#707784] transition-all duration-300 group-hover:w-full" />
                        </Link> */}
                        <Link
                            href="/sign-up"
                            className="font-inter bg-[#2563EB] text-white font-semibold text-sm leading-6 px-4 py-2 lg:px-5 lg:py-2.5
                             rounded-xl lg:text-sm transition-all duration-300 drop-shadow-lg hover:drop-shadow-2xl hover:scale-105 transform whitespace-nowrap"
                        >
                            Get Started — Free
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden p-2 rounded-lg text-[#707784] hover:text-[#474b52] hover:bg-gray-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#ac9044]"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <X size={24} className="sm:w-6 sm:h-6" />
                        ) : (
                            <Menu size={24} className="sm:w-6 sm:h-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="px-4 pt-2 pb-4 space-y-4 bg-surface-muted border-t border-surface-border shadow-lg">
                    {/* Mobile Navigation Links */}
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={closeMobileMenu}
                            className={`block rounded-lg text-[15px]
                                leading-[22.5px]
                                font-bold transition-all duration-200 ${isActive(link.href)
                                    ? "text-ink-900"
                                    : "text-ink-600 hover:text-ink-900"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* Mobile Auth Buttons */}
                    <div className="pt-2 mb:pt-4 border-t border-surface-border">
                        <Link
                            href="/login"
                            onClick={closeMobileMenu}
                            className="block w-full text-center text-lg font-bold px-4 py-3 rounded-lg text-ink-600 hover:bg-surface-muted hover:text-ink-900 transition-all duration-200"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/sign-up"
                            onClick={closeMobileMenu}
                            className="block w-full text-center text-base font-bold bg-brand hover:bg-brand-hover text-black px-2 md:px-4 py-2 md:py-3 rounded-full transition-all duration-300 shadow-lg"
                        >
                            Get Started — Free
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};



