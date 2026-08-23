import CourseDetail from "@/components/career-seekers-dashboard/courses/CourseDetail";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CourseDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <main className="mx-auto max-w-6xl p-6">
      <CourseDetail courseId={Number(id)} />
    </main>
  );
}