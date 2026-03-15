"use client";

import CreateJob from "@/components/employers/job-dialog/create-job";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRight, Briefcase, MapPin, MessageCircle, Users, Wrench } from "lucide-react";
import { useState } from "react";


export default function JobBoard() {
    const [postJobOpen, setPostJobOpen] = useState(false);

    const jobs = [
        { title: "Senior Civil Engineer", type: "Full-time", age: "2 days ago", location: "Jakarta, Indonesia", applicants: 23, status: "Active" },
        { title: "Electrical Technician", type: "Contract", age: "3 days ago", location: "Surabaya, Indonesia", applicants: 15, status: "Active" },
        { title: "Project Manager", type: "Full-time", age: "5 days ago", location: "Bandung, Indonesia", applicants: 31, status: "Active" },
        { title: "Safety Officer", type: "Part-time", age: "1 week ago", location: "Medan, Indonesia", applicants: 8, status: "Closed" },
        { title: "Mechanical Engineer", type: "Full-time", age: "1 week ago", location: "Jakarta, Indonesia", applicants: 19, status: "Active" },
    ];

    const posts = [
        { initials: "SK", color: "bg-blue-500", name: "Smart Kool", time: "2 hours ago", title: "Building Solutions with Smart Engineering", excerpt: "Innovative approaches to modern construction challenges...", likes: 24, comments: 8 },
        { initials: "JP", color: "bg-blue-400", name: "Jean Paul", time: "5 hours ago", title: "Infrastructure Development Tips", excerpt: "Key considerations for large-scale infrastructure projects...", likes: 18, comments: 5 },
        { initials: "SF", color: "bg-blue-700", name: "Sasi Fonseka", time: "1 day ago", title: "Safety Guidelines Update", excerpt: "New safety protocols for construction sites in 2024...", likes: 42, comments: 12 },
    ];

    return (
        <div style={{ minHeight: "100vh" }} className="min-h-screen bg-[#F9FAFB] p-4 sm:p-6 lg:p-8">
            {/* Stats Row */}
            {/* <div className="flex flex-wrap gap-4 mb-6">
        <StatCard title="Total Jobs Posted" value={29} badge="+3 this week" badgeColor="text-blue-600" icon={<Briefcase size={18} className="text-blue-600" />} iconBg="bg-blue-50" />
        <StatCard title="Active Applications" value={156} badge="+12 today" badgeColor="text-green-600" icon={<Users size={18} className="text-green-600" />} iconBg="bg-green-50" />
        <StatCard title="Tools Listed" value={8} badge="2 pending" badgeColor="text-orange-500" icon={<Wrench size={18} className="text-orange-500" />} iconBg="bg-orange-50" />
        <StatCard title="Messages" value={24} badge="5 unread" badgeColor="text-purple-600" icon={<MessageCircle size={18} className="text-purple-600" />} iconBg="bg-purple-50" />
      </div> */}

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">

                <Dialog>
                    <form>
                        <DialogTrigger asChild>
                            <Button className="font-inter flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-6 rounded-xl transition-colors shadow-sm"
                                variant="outline"><Briefcase size={16} /> Post a Job</Button>
                        </DialogTrigger>

                        <CreateJob></CreateJob>
                    </form>
                </Dialog>


                <button className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold px-5 py-2.5 rounded-xl border border-gray-200 transition-colors shadow-sm">
                    <Wrench size={16} />
                    Browse Tools
                </button>
            </div>

            {/* Main Content Grid */}
            <div className="font-inter grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
                {/* Recent Jobs */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
                        <h2 className="text-base font-bold text-gray-900">Recent Jobs</h2>
                        <button className="text-blue-600 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                            View all <ArrowRight size={14} />
                        </button>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-50">
                                    <th className="text-left text-xs text-gray-400 font-medium px-6 py-3">Job Title</th>
                                    <th className="text-left text-xs text-gray-400 font-medium px-4 py-3 hidden sm:table-cell">Location</th>
                                    <th className="text-left text-xs text-gray-400 font-medium px-4 py-3">Applicants</th>
                                    <th className="text-left text-xs text-gray-400 font-medium px-4 py-3 hidden md:table-cell">Status</th>
                                    <th className="text-left text-xs text-gray-400 font-medium px-4 py-3 hidden lg:table-cell">View Applicants</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobs.map((job) => (
                                    <tr key={job.title} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-semibold text-gray-800">{job.title}</p>
                                            <p className="text-xs text-gray-400">{job.type} • {job.age}</p>
                                        </td>
                                        <td className="px-4 py-4 hidden sm:table-cell">
                                            <span className="flex items-center gap-1.5 text-sm text-gray-600">
                                                <MapPin size={13} className="text-gray-400" />
                                                {job.location}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-sm font-semibold text-gray-800">{job.applicants}</td>
                                        <td className="px-4 py-4 hidden md:table-cell">
                                            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${job.status === "Active" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>
                                                {job.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 hidden lg:table-cell">
                                            <button className="text-sm text-blue-600 font-medium border border-blue-100 bg-blue-50 hover:bg-blue-100 px-4 py-1.5 rounded-lg transition-colors">
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Posts */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-base font-bold text-gray-900">Recent Posts</h2>
                        <button className="text-blue-600 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                            View all <ArrowRight size={14} />
                        </button>
                    </div>
                    {posts.map((p) => (
                        <div className="py-4 border-b border-gray-50 last:border-0">
                            <div className="flex items-center gap-2 mb-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${p.color}`}>
                                    {/* {p.title} */}
                                </div>
                                <span className="text-sm font-semibold text-gray-800">{p.name}</span>
                                <span className="text-xs text-gray-400 ml-auto">{p.time}</span>
                            </div>
                            <p className="text-sm font-medium text-gray-900 mb-0.5">{p.title}</p>
                            <p className="text-xs text-gray-400 mb-2 line-clamp-1">{p.excerpt}</p>
                            <div className="flex gap-4 text-xs text-gray-400">
                                <span>{p.likes} likes</span>
                                <span>{p.comments} comments</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}