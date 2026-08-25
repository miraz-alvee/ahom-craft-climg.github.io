import CareerSeekerSection from '@/components/career-seekers-sidebar/career/feature/Feature'
import CareerHeroSection from '@/components/career-seekers-sidebar/career/hero/Hero'
import StepSetion from '@/components/career-seekers-sidebar/career/steps/Steps'
import StartSection from '@/components/career-seekers-sidebar/career/start/Start'


export default function CareerSeekersPage() {
    return (
        <div>
            <CareerHeroSection></CareerHeroSection>
            <CareerSeekerSection></CareerSeekerSection>
            <StepSetion></StepSetion>
            {/* <CategoriesSection></CategoriesSection> */}
            <StartSection></StartSection>
        </div>
    )
}
