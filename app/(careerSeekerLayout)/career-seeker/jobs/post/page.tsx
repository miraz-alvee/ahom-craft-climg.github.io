import JobPostForm from "@/components/shared/jobs/JobPostForm";


export default function PostJobPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Post a Job</h1>
        <p className="mt-1 text-sm text-gray-500">
          Fill in the details below to publish a new job opening
        </p>
      </div>

      <JobPostForm />
    </div>
  );
}