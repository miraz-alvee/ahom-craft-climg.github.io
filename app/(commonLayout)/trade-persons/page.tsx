import TradeCourseSection from '@/components/trade/course/Course'
import TradeHeroSection from '@/components/trade/hero/Hero'
import TradeJobSeekerSection from '@/components/trade/jobseekers/JobSeekers'
import TradeStartSection from '@/components/trade/start/Start'
import TradeStepSetion from '@/components/trade/steps/Steps'


export default function TradePersonPage() {
  return (
    <div>
        <TradeHeroSection />
        <TradeCourseSection></TradeCourseSection>
        <TradeStepSetion></TradeStepSetion>
        <TradeJobSeekerSection></TradeJobSeekerSection>
        <TradeStartSection></TradeStartSection>
    </div>
  )
}
