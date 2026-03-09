import EmployersHeroSection from "@/components/employers/hero/Hero";
import EmployerSection from "@/components/employers/hire/Hire";
import PricingSection from "@/components/employers/payment/Price";
import TeamSection from "@/components/employers/team/Team";


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
