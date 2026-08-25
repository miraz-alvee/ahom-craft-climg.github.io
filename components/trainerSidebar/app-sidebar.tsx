"use client";
import * as React from "react";
import {
    ChevronDown,
    House,
    Briefcase,
    FileCheck2,
    MessageSquare,
    UsersRound,
    Wrench,
    SquarePlus,
    GraduationCap,
    FileText,
    User,
    LogOut,
    Bot
} from "lucide-react";

import { usePathname, useRouter } from "next/navigation";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarRail,
    SidebarFooter,
    useSidebar,

} from "@/components/ui/sidebar";

import Link from "next/link";
import Image from "next/image";
import {
    Tooltip,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import JobSeekerMainLogo from "@/public/images/login/logo.png";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectUser, logout } from "@/redux/features/auth/authSlice";
import Swal from "sweetalert2";

// Reusable nav item with tooltip support in collapsed state
function NavItem({
    item,
    isActive,
    isCollapsed,
}: {
    item: { title: string; url: string; icon: React.ElementType };
    isActive: boolean;
    isCollapsed: boolean;
    hasBadge?: boolean;
}) {
    const Icon = item.icon;
    return (
        <SidebarMenuItem>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href={item.url}
                        className={`flex items-center ${isCollapsed ? "justify-center px-0 py-3 w-full" : "gap-3 px-4 py-3"
                            } rounded-2xl transition-colors duration-200 ${isActive
                                ? "bg-[#EFF6FF]"
                                : "hover:bg-gray-50"
                            }`}
                    >
                        <Icon
                            className={`w-5 h-5 shrink-0 ${isActive ? "text-[#2563EB]" : "text-[#191919]"
                                }`}
                            strokeWidth={2}
                        />
                        {!isCollapsed && (
                            <span
                                className={`font-inter font-semibold text-[15px] leading-[100%] ${isActive ? "text-[#2563EB]" : "text-[#191919]"
                                    }`}
                            >
                                {item.title}
                            </span>
                        )}
                    </Link>
                </TooltipTrigger>
            </Tooltip>
        </SidebarMenuItem>
    );
}

// Navigation data
const data = {
    home: [
        {
            title: "Dashboard",
            url: "/trainer",
            icon: House,
        },
        {
            title: "Jobs",
            url: "/trainer/jobs",
            icon: Briefcase,
        },
        {
            title: "Chat",
            url: "/trade-person/chat",
            icon: MessageSquare,
        },
        {
            title: "Applied",
            url: "/trainer/applied",
            icon: FileCheck2,
        },
        {
            title: "Messages",
            url: "/trainer/message",
            icon: Bot,
        },
        {
            title: "Courses",
            url: "/trainer/courses",
            icon: GraduationCap,
        },
        {
            title: "Tools",
            url: "/trainer/tools",
            icon: Wrench,
        },
        {
            title: "Profile",
            url: "/trainer/profile",
            icon: User,
        }
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const user = useAppSelector(selectUser);
    const pathname = usePathname();
    const router = useRouter();
    const { state } = useSidebar();
    const dispatch = useAppDispatch();
    const isCollapsed = state === "collapsed";

    const displayName = user?.full_name ?? "Guest User";
    const displayEmail = user?.email ?? "-";
    const userInitial = displayName.trim().charAt(0).toUpperCase() || "G";

    const formattedRole = user?.user_role
        ? user.user_role.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
        : "Member";

    const handleLogout = () => {
        Swal.fire({
            title: "Log out?",
            text: "You will need to sign in again to access your account.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, log out",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(logout());
                router.push("/login");
            }
        });
    };

    return (
        <Sidebar collapsible="icon" {...props} className="bg-[#ffffff] border-2 border-[#f3f4f5]">
            {/* Header with Logo */}
            <SidebarHeader className="p-3">
                <div className="flex items-center justify-center">
                    {isCollapsed ? (
                        <Image
                            src={JobSeekerMainLogo}
                            alt="JobSeeker Main Logo"
                            width={32}
                            height={32}
                            className="object-contain"
                        />
                    ) : (
                        <Image
                            src={JobSeekerMainLogo}
                            alt="JobSeeker Main Logo"
                            width={88}
                            height={50}
                            className="object-contain"
                        />
                    )}
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-2 px-2">
                            {data.home.map((item) => (
                                <NavItem
                                    key={item.title}
                                    item={item}
                                    isActive={pathname === item.url}
                                    isCollapsed={isCollapsed}
                                />
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer with User Profile */}
            {!isCollapsed && (
                <SidebarFooter className="p-4 bg-transparent">
                    <div className="flex items-center justify-between gap-3 rounded-2xl bg-[#eaf2ff] px-3 py-2.5 shadow-[0_8px_18px_rgba(148,163,184,0.14)]">
                        <div className="flex min-w-0 items-center gap-3">
                            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#9ca3af] ring-2 ring-white/80 shadow-[0_6px_12px_rgba(15,23,42,0.12)]">
                                <div className="flex h-full w-full items-center justify-center text-[18px] font-semibold text-white">
                                    {userInitial}
                                </div>
                            </div>
                            <div className="min-w-0">
                                <div className="truncate text-[15px] font-semibold leading-tight text-[#171717]">
                                    {displayName}
                                </div>
                                <div className="truncate text-[12px] leading-tight text-[#232323]">
                                    {formattedRole}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="rounded-full bg-white/70 p-1.5 text-[#1f2937] shadow-sm transition-colors hover:bg-white hover:text-black cursor-pointer"
                                title="Logout"
                            >
                                <LogOut className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    </div>
                </SidebarFooter>
            )}
            <SidebarRail />
        </Sidebar>
    );
}