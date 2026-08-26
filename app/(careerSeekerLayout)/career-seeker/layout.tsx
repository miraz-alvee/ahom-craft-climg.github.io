"use client";
import { usePathname } from "next/navigation";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { CareerAppSidebar } from "@/components/career-seekers-sidebar/app-sidebar";
import RequireAuth from "@/components/ProtectedRoute/RequireAuth";

export default function JobSeekerLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Format the pathname to a readable title
    const getPageTitle = () => {
        if (pathname === "/job-seeker") return "Dashboard";

        const segments = pathname.split("/").filter(Boolean);
        const lastSegment = segments[segments.length - 1];

        // Convert kebab-case to Title Case
        return lastSegment
            .split("-")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };
    return (
        <RequireAuth redirectTo="/login" requiredRole="career_seeker|job_seeker">
            <SidebarProvider>
                <CareerAppSidebar />
                <SidebarInset>
                    <header className="flex h-18 shrink-0 items-center gap-2 px-4 sticky">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-0"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#" className="font-inter font-medium">
                                        Craft Climb Workspace
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="font-inter font-medium">{getPageTitle()}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </header>
                    <main className="flex-1 w-full bg-[#F9FAFB]">
                        {/* <h1>hello i am chatbot</h1> */}
                        {children}
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </RequireAuth>
    )
}