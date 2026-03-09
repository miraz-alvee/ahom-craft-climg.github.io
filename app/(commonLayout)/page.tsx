"use client";
import DownloadSection from "@/components/home/download/Download";
import FeaturesSection from "@/components/home/features/Features";
import HeroSection from "@/components/home/hero/Hero";
import HiringSection from "@/components/home/hiring/Hiring";
import JobSeekersSection from "@/components/home/jobseekers/JobSeekers";
import ServicesSection from "@/components/home/services/Services";
import UsersFeedback from "@/components/home/testimonial/UsersFeedback";

export default function CommonLayoutHomePage() {
  return (
    <div>
      <HeroSection></HeroSection>
      <ServicesSection></ServicesSection>
      <FeaturesSection></FeaturesSection>
      <JobSeekersSection></JobSeekersSection>
      <HiringSection></HiringSection>
      <UsersFeedback></UsersFeedback>
      <DownloadSection></DownloadSection>
    </div>
  )
}
