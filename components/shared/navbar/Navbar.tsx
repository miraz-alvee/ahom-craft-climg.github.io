"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import CraftClimbLogo from "@/public/images/login/logo.png"

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
        <nav className="bg-[#FFFFFF] sticky top-0 z-50">
            <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-46">
                <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group shrink-0">
                        <div className="w-28 h-10 sm:w-32 sm:h-12 md:w-36 md:h-12 lg:w-40 lg:h-16 relative transition-transform duration-300 group-hover:scale-105 bg-none mix-blend-multiply">
                            <Image
                                src={CraftClimbLogo}
                                alt="CraftClimb Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation Links - Hidden on mobile/tablet */}
                    <div className="hidden lg:flex items-center space-x-14 xl:space-x-16 2xl:space-x-18">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`relative text-sm xl:text-lg font-medium transition-all duration-300 group py-2 whitespace-nowrap ${isActive(link.href)
                                    ? "text-[#191919]"
                                    : "text-[#191919] hover:text-[#474b52]"
                                    }`}
                            >
                                {link.name}
                                {/* Animated underline */}
                                <span
                                    className={`absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-[#191919] to-[#191919] transition-all duration-300 ${isActive(link.href)
                                        ? "w-full"
                                        : "w-0 group-hover:w-full"
                                        }`}
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
                            className="bg-[#2563EB] text-white font-semibold text-sm leading-6 px-4 py-2 lg:px-5 lg:py-2.5
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
                <div className="px-4 pt-2 pb-4 space-y-3 bg-[#f1f2f4] border-t border-gray-300 shadow-lg">
                    {/* Mobile Navigation Links */}
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={closeMobileMenu}
                            className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${isActive(link.href)
                                ? "bg-[#e0cb82] text-[#492727]"
                                : "text-[#707784] hover:bg-gray-200 hover:text-[#474b52]"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* Mobile Auth Buttons */}
                    <div className="pt-4 space-y-3 border-t border-gray-300">
                        <Link
                            href="/login"
                            onClick={closeMobileMenu}
                            className="block w-full text-center px-4 py-3 rounded-lg text-base font-medium text-[#707784] hover:bg-gray-200 hover:text-[#474b52] transition-all duration-200"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/sign-up"
                            onClick={closeMobileMenu}
                            className="block w-full text-center bg-linear-to-r from-[#e0cb82] to-[#ac9044] hover:from-[#d4a547] hover:to-[#c59132] text-[#492727] px-4 py-3 rounded-full text-base font-medium transition-all duration-300 shadow-lg"
                        >
                            Get Started — Free
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};



