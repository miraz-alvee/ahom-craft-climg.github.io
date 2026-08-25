import LectureDetail from "@/components/trade-person-dashboard/courses/LectureDetail";



export default async function LecturePage({
  params,
}: {
  params: Promise<{ id: string; moduleId: string; lessonId: string }>;
}) {
  const { id, moduleId, lessonId } = await params;
  return (
    <main className="min-h-screen bg-white">
      <LectureDetail courseId={Number(id)} moduleId={Number(moduleId)} lessonId={Number(lessonId)} />
    </main>
  );
}