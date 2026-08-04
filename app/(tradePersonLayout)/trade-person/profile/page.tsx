import { Mail, Phone, MapPin, Linkedin, Github, Globe, Calendar, Heart, DollarSign, Users } from 'lucide-react';

// import {
//     Dialog,
//     DialogTrigger,
// } from "@/components/ui/dialog"
// import EditProfile from './EditPersonalInfo';
import { FiEdit3 } from 'react-icons/fi';

export default function PersonalInfo() {
    return (
        <div className="min-h-screen bg-[#f4f6fb] font-inter">
            <div className="px-8 py-6">
                {/* Header Section with Blue Background */}
                <div className="bg-linear-to-b from-[#2557A7] to-[#1E4A8F] h-20 rounded-t-lg">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        {/* Profile Image */}
                        <div className="relative mt-10 ml-4">
                            <img
                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jon"
                                alt="Jon Player"
                                className="w-18 h-18 md:w-25 md:h-25 rounded-full border-4 border-white shadow-lg bg-white"
                            />
                        </div>

                        {/* Name and Title */}
                        <div className="flex justify-between gap-5 mt-20">
                            <div>
                                <h1 className="font-inter text-base text-[#111827] md:text-2xl font-bold">Jon Player</h1>
                                <p className="font-inter text-[#2557A7] text-base mb-4">Software Engineer</p>
                            </div>
                            {/* <Dialog>
                            <form>
                                <DialogTrigger asChild>
                                    <FiEdit3 size={20} className='mt-5'/>
                                </DialogTrigger>
                               <EditProfile></EditProfile>
                            </form>
                        </Dialog> */}
                        </div>
                    </div>
                </div>

                {/* Bio Section */}
                <div className="bg-gray-50 p-4 md:p-6 -mx-6 mt-20">
                    <p className="text-gray-700 leading-relaxed">
                        Experienced professional with a strong background in administrative support and customer service.
                        Skilled in managing front desk operations, scheduling appointments, and maintaining excellent client
                        relationships. Dedicated to providing exceptional service and ensuring smooth office operations.
                    </p>
                </div>

                {/* Contact Information Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
                    {/* Email */}
                    <div className="flex items-start gap-3 ">
                        <div className="p-2 bg-gray-100 rounded-lg">
                            <Mail className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className='space-y-1'>
                            <p className="font-inter font-normal text-[#6B7280] leading-4">Email</p>
                            <p className="font-inter text-base text-[#111827] leading-5">  admin@email.ext</p>
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                            <Phone className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                            <p className="font-inter font-normal text-[#6B7280] leading-4">Phone</p>
                            <p className="font-inter text-base text-[#111827] leading-5">+8801521210257</p>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-3 ">
                        <div className="p-2 bg-gray-100 rounded-lg">
                            <MapPin className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className='w-full'>
                            <p className="font-inter font-normal text-[#6B7280] leading-4">Location</p>
                            <p className="font-inter text-base text-[#111827] leading-5">House# 45, Road #18, Sector# 1, Uttara, 1230, Bangladesh</p>
                        </div>
                    </div>

                    {/* LinkedIn */}
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                            <Linkedin className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>

                            {/* <p className="font-inter text-base text-[#111827] leading-5"> */}
                            <p className="font-inter font-normal text-[#6B7280] leading-4">LinkedIn</p>
                            <a href="https://linkedin.com/in/theadmin" className="text-blue-600 hover:underline">
                                https://linkedin.com/in/theadmin
                            </a>
                        </div>
                    </div>

                    {/* GitHub */}
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                            <Github className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                            <p className="font-inter font-normal text-[#6B7280] leading-4">GitHub</p>
                            <a href="https://github.com/theadmin" className="text-blue-600 hover:underline">
                                https://github.com/theadmin
                            </a>
                        </div>
                    </div>

                    {/* Portfolio */}
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                            <Globe className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                            <p className="font-inter font-normal text-[#6B7280] leading-4">Portfolio</p>
                            <a href="https://theadmin.dev" className="text-blue-600 hover:underline">
                                https://theadmin.dev
                            </a>
                        </div>
                    </div>
                </div>

                {/* Additional Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-6 border-t border-gray-200">
                    {/* Date of Birth */}
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                            <Calendar className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Date of Birth</p>
                            <p className="text-gray-900">October 10, 1991 (34 years)</p>
                        </div>
                    </div>

                    {/* Marital Status */}
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                            <Heart className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Marital Status</p>
                            <p className="text-gray-900">Civil Partnership</p>
                        </div>
                    </div>

                    {/* Gender */}
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                            <Users className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Gender</p>
                            <p className="text-gray-900">Male</p>
                        </div>
                    </div>

                    {/* Current Salary */}
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                            <DollarSign className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Current Salary</p>
                            <p className="text-gray-900">£45,000/year</p>
                        </div>
                    </div>
                </div>

                {/* Work Sectors */}
                <div className="py-6 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Work Sectors</h3>
                    <div className="flex flex-wrap gap-2">
                        <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm">
                            Business & Professional Services
                        </span>
                    </div>
                </div>

                {/* Interests */}
                <div className="py-6 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                        <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">
                            Technology
                        </span>
                        <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">
                            Photography
                        </span>
                        <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">
                            Travel
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}