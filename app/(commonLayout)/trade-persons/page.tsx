import TradeCourseSection from '@/components/tradePersonSidebar/trade/course/Course'
import TradeHeroSection from '@/components/tradePersonSidebar/trade/hero/Hero'
import TradeJobSeekerSection from '@/components/tradePersonSidebar/trade/jobseekers/JobSeekers'
import TradeStartSection from '@/components/tradePersonSidebar/trade/start/Start'
import TradeStepSetion from '@/components/tradePersonSidebar/trade/steps/Steps'


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
