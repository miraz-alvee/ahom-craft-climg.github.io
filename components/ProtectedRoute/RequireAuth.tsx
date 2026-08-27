"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { selectToken, selectUser } from "@/redux/features/auth/authSlice";

type RequireAuthProps = {
    redirectTo: string;
    requiredRole: string;
    children: React.ReactNode;
};

const normalizeRole = (role: string) => role.toLowerCase().trim().replace(/[-\s]+/g, "_");

export default function RequireAuth({ redirectTo, requiredRole, children }: RequireAuthProps) {
    const router = useRouter();
    const token = useAppSelector(selectToken);
    const user = useAppSelector(selectUser);
    const [authorized, setAuthorized] = React.useState<boolean | null>(null);

    React.useEffect(() => {
        const userRole = user?.user_role ? normalizeRole(user.user_role) : null;
        const allowedRoles = requiredRole.split("|").map(normalizeRole);

        if (!token || !userRole) {
            router.replace(redirectTo);
            setAuthorized(false);
            return;
        }

        if (!allowedRoles.includes(userRole)) {
            const roleRoutes: Record<string, string> = {
                trainer: "/trainer",
                employer: "/employer",
                career_seeker: "/career-seeker",
                trade_person: "/trade-person",
            };

            router.replace(roleRoutes[userRole] ?? redirectTo);
            setAuthorized(false);
            return;
        }

        setAuthorized(true);
    }, [router, token, user, requiredRole, redirectTo]);

    if (authorized !== true) return null;
    return <>{children}</>;
}