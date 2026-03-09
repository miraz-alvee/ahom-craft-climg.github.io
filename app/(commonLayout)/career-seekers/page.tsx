import CategoriesSection from '@/components/career/categories/Categories'
import CareerSeekerSection from '@/components/career/feature/Feature'
import CareerHeroSection from '@/components/career/hero/Hero'
import StepSetion from '@/components/career/steps/Steps'
import StartSection from '@/components/career/start/Start'


export default function CareerSeekersPage() {
    return (
        <div>
            <CareerHeroSection></CareerHeroSection>
            <CareerSeekerSection></CareerSeekerSection>
            <StepSetion></StepSetion>
            <CategoriesSection></CategoriesSection>
            <StartSection></StartSection>
        </div>
    )
}
