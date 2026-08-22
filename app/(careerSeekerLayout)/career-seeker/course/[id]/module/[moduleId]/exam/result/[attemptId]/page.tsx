import { ExamReview } from "@/components/career-seekers-dashboard/exams/ExamResult";


export default async function ExamResultPage({
  params,
}: {
  params: Promise<{ id: string; moduleId: string; attemptId: string }>;
}) {
  const { moduleId, attemptId } = await params;
  return (
    <main className="min-h-screen bg-white">
      <ExamReview moduleId={Number(moduleId)} attemptId={Number(attemptId)} />
    </main>
  );
}

// import LectureDetail from "@/components/career-seekers-dashboard/courses/LectureDetail";

// export default async function LecturePage({
//   params,
// }: {
//   params: Promise<{ id: string; moduleId: string; lessonId: string }>;
// }) {
//   const { id, moduleId, lessonId } = await params;
//   return (
//     <main className="min-h-screen bg-white">
//       <LectureDetail courseId={Number(id)} moduleId={Number(moduleId)} lessonId={Number(lessonId)} />
//     </main>
//   );
// }