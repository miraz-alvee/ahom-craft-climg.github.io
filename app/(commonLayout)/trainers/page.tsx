import TrainerSection from "@/components/trainers/course/Course";
import TrainersHeroSection from "@/components/trainers/hero/Hero";
import TrainerJobSeekerSection from "@/components/trainers/jobseekers/JobSeekers";

import TrainerStartSection from "@/components/trainers/start/Start";
import StepSetion from "@/components/trainers/steps/Steps";

export default function TrainerPage() {
  return (
    <div> 
      <TrainersHeroSection></TrainersHeroSection>
      <TrainerSection></TrainerSection>
      <StepSetion></StepSetion>
      <TrainerJobSeekerSection></TrainerJobSeekerSection>
      <TrainerStartSection></TrainerStartSection>
    </div>
  )
}
