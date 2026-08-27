import ExamRunner from "@/components/employer-dashboard/exams/ExamRunner";


export default async function ExamPage({ params }: { params: Promise<{ id: string; moduleId: string }>}) {
  const { id, moduleId } = await params;
  return (
    <main className="min-h-screen bg-white">
      <ExamRunner courseId={Number(id)} moduleId={Number(moduleId)} />
    </main>
  );
}
