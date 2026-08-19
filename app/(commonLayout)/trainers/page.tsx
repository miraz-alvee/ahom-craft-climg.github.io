import TrainerSection from "@/components/trainerSidebar/trainers/course/Course";
import TrainersHeroSection from "@/components/trainerSidebar/trainers/hero/Hero";
import TrainerJobSeekerSection from "@/components/trainerSidebar/trainers/jobseekers/JobSeekers";

import TrainerStartSection from "@/components/trainerSidebar/trainers/start/Start";
import StepSetion from "@/components/trainerSidebar/trainers/steps/Steps";

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
