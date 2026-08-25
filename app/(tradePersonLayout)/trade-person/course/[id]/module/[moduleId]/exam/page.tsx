import ExamRunner from "@/components/trade-person-dashboard/exams/ExamRunner";


export default async function ExamPage({ params }: { params: Promise<{ id: string; moduleId: string }>}) {
  const { id, moduleId } = await params;
  return (
    <main className="min-h-screen bg-white">
      <ExamRunner courseId={Number(id)} moduleId={Number(moduleId)} />
    </main>
  );
}


// import ModuleContent from "@/components/career-seekers-dashboard/courses/ModuleContent";

// export default async function ModulePage({
//   params,
// }: {
//   params: Promise<{ id: string; moduleId: string }>;
// }) {
//   const { id, moduleId } = await params;
//   return (
//     <main className="min-h-screen bg-white">
//       <ModuleContent courseId={Number(id)} moduleId={Number(moduleId)} />
//     </main>
//   );
// }