import EmployersHeroSection from "@/components/employer-role-sidebar/employers/hero/Hero";
import EmployerSection from "@/components/employer-role-sidebar/employers/hire/Hire";
import PricingSection from "@/components/employer-role-sidebar/employers/payment/Price";
import TeamSection from "@/components/employer-role-sidebar/employers/team/Team";


export default function EmployersPage() {
  return (
    <div>
        <EmployersHeroSection></EmployersHeroSection>
        <EmployerSection></EmployerSection>
        <PricingSection></PricingSection>
        <TeamSection></TeamSection>
    </div>
  )
}
