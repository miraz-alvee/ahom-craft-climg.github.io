"use client";
import * as React from "react";
import {
    LayoutDashboard,
    Calendar,
    FormInputIcon,
    MessageCircle,
    BriefcaseBusiness,
    GraduationCap,
    FileText,
    UserRoundPen,
    Wrench,
    LogOut,
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
import { selectUser, logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
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
                        className={`flex items-center ${isCollapsed ? "justify-center px-0 py-2 w-full" : "justify-between px-4 py-3"
                            } rounded-lg text-sm transition-all duration-300 ease-in-out group ${isActive
                                ? "bg-linear-to-r from-[#EFF6FF] to-[#EFF6FF]/30 backdrop-blur-xl text-white font-medium border border-gray-400/50 shadow-lg shadow-gray-400/20"
                                : "text-gray-300 hover:bg-white/5 hover:backdrop-blur-sm hover:text-white hover:border hover:border-gray-400/30 hover:shadow-md hover:shadow-gray-400/10 border border-transparent"
                            }`}
                    >
                        <div className={`flex items-center ${isCollapsed ? "gap-0" : "gap-3"}`}>
                            <Icon
                                className={`w-5 h-5 shrink-0 transition-all duration-300 ${isActive ? "text-[#2563EB]" : "text-gray-400 group-hover:bg-[#EFF6FF]"
                                    }`}
                            />
                            {!isCollapsed && (
                                <span className={isActive ? "text-[#2563EB] font-inter font-semibold text-[14px] leading-[100%]" : "text-[#191919] font-inter font-semibold text-[14px] leading-[100%]"}>{item.title}</span>
                            )}
                        </div>
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
            url: "/career-seeker",
            icon: LayoutDashboard,
        },
        {
            title: "Jobs",
            url: "/career-seeker/jobs",
            icon: BriefcaseBusiness,
        },
        {
            title: "Applied",
            url: "/career-seeker/applied",
            icon: Calendar,
        },
        // {
        //     title: "Forum",
        //     url: "/career-seeker/forum",
        //     icon: FormInputIcon,
        // },
        {
            title: "Message",
            url: "/career-seeker/message",
            icon: MessageCircle,
        },
        {
            title: "Course",
            url: "/career-seeker/course",
            icon: GraduationCap,
        },
        // {
        //     title: "Resume",
        //     url: "/career-seeker/resume",
        //     icon: FileText,
        // },
        {
            title: "Tools",
            url: "/career-seeker/tools",
            icon: Wrench,
        },
        {
            title: "Profile",
            url: "/career-seeker/profile",
            icon: UserRoundPen,
        },
    ],
};

export function CareerAppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const user = useAppSelector(selectUser);
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { state } = useSidebar();
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

            <SidebarContent className="bg-[#ffffff]">
                <SidebarGroup className={isCollapsed ? "" : ""}>
                    <SidebarGroupContent>
                        <SidebarMenu className="font-inter space-y-2">
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
