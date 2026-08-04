"use client";

import {
    MapPin,
    Clock,
    DollarSign,
    Users,
    Eye,
    Pencil,
} from "lucide-react";

interface Job {
    id: number;
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    applicants: number;
    status: "Active" | "Closed";
    posted: string;
}

const jobs: Job[] = [
    {
        id: 1,
        title: "Senior Civil Engineer",
        company: "BuildTech Solutions",
        location: "Jakarta, Indonesia",
        type: "Full-time",
        salary: "$5,000 - $7,000/month",
        applicants: 23,
        status: "Active",
        posted: "2 days ago",
    },
    {
        id: 2,
        title: "Electrical Technician",
        company: "PowerGrid Corp",
        location: "Surabaya, Indonesia",
        type: "Contract",
        salary: "$3,000 - $4,000/month",
        applicants: 15,
        status: "Active",
        posted: "3 days ago",
    },
    {
        id: 3,
        title: "Project Manager",
        company: "ConstructPro Ltd",
        location: "Bandung, Indonesia",
        type: "Full-time",
        salary: "$6,000 - $9,000/month",
        applicants: 31,
        status: "Active",
        posted: "5 days ago",
    },
    {
        id: 4,
        title: "Safety Officer",
        company: "SafeWork Industries",
        location: "Medan, Indonesia",
        type: "Part-time",
        salary: "$2,000 - $3,000/month",
        applicants: 8,
        status: "Closed",
        posted: "1 week ago",
    },
    {
        id: 5,
        title: "Mechanical Engineer",
        company: "MechWorks Inc",
        location: "Jakarta, Indonesia",
        type: "Full-time",
        salary: "$4,500 - $6,500/month",
        applicants: 19,
        status: "Active",
        posted: "1 week ago",
    },
];

export default function JobsPage() {
    return (
        <div className='bg-[#f3f4f6] min-h-screen' style={{ padding: "32px 40px", }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" }}>
                <div>
                    <h1 className='font-inter text-[#111827] font-bold text-xl'>My jobs</h1>
                    <p className='font-inter text-sm text-[#6b7280]' style={{ margin: "4px 0 0" }}>Manage your job postings</p>
                </div>
                <button
                    className='font-inter bg-[#2563eb] text-[#ffffff] px-5 py-2.5 text-sm font-semibold rounded-[8px] cursor-pointer'>
                    Post New Jobs
                </button>
            </div>
            <div className="p-6 space-y-4">

                {jobs.map((job) => (
                    <div
                        key={job.id}
                        className="flex justify-between items-center bg-white border rounded-xl p-5 hover:shadow-md transition"
                    >

                        {/* LEFT */}
                        <div className="font-inter flex gap-4 items-start">

                            {/* ICON */}
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <div className="w-6 h-6 bg-blue-500 rounded-sm" />
                            </div>

                            {/* INFO */}
                            <div>
                                <div className="flex items-center gap-3">
                                    <h3 className="font-semibold text-sm">{job.title}</h3>

                                    <span
                                        className={`text-xs font-normal px-2 py-1 rounded-full ${job.status === "Active"
                                                ? "bg-[#F0FDF4] text-[#15803D]"
                                                : "bg-gray-200 text-gray-600"
                                            }`}
                                    >
                                        {job.status}
                                    </span>
                                </div>

                                <p className="text-[#4B5563] text-sm">{job.company}</p>

                                <div className="flex flex-wrap gap-6 text-sm text-[#6B7280] mt-2">

                                    <div className="flex items-center gap-1">
                                        <MapPin size={16} />
                                        {job.location}
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <Clock size={16} />
                                        {job.type}
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <DollarSign size={16} />
                                        {job.salary}
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <Users size={16} />
                                        {job.applicants} applicants
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="flex items-center gap-6 text-gray-400">

                            <span className="text-sm">{job.posted}</span>

                            <Eye
                                size={18}
                                className="cursor-pointer hover:text-gray-700"
                            />

                            <Pencil
                                size={18}
                                className="cursor-pointer hover:text-gray-700"
                            />

                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}