"use client";

import { useState } from "react";
import { usePurchaseCourseMutation } from "@/redux/features/career-seeker/courses/getAllCourseApis";

interface Props {
  courseId: number;
}

export default function EnrollButton({ courseId }: Props) {
  const [purchaseCourse, { isLoading }] = usePurchaseCourseMutation();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleEnroll = async () => {
    setErrorMsg(null);
    try {
      await purchaseCourse({
        course: courseId,
        payment_status: "success", // TODO: replace with real status once payment is integrated
      }).unwrap();
    } catch (err) {
      setErrorMsg("Enrollment failed. Please try again.");
    }
  };

  return (
    <div>
      <button
        onClick={handleEnroll}
        disabled={isLoading}
        className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
      >
        {isLoading ? "Enrolling..." : "Enroll Now"}
      </button>
      {errorMsg && <p className="mt-1 text-xs text-red-600">{errorMsg}</p>}
    </div>
  );
}