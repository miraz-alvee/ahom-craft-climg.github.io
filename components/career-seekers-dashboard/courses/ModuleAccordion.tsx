// "use client";

// import { useState } from "react";

// import LessonItem from "./LessonItem";
// // import DocumentItem from "./DocumentItem";
// // import QuizCard from "./QuizCard";
// import { CourseModule } from "@/redux/features/career-seeker/courses/courseTypes";
// import { ModuleTestSection } from "../exams/ExamRunner";


// interface Props {
//   module: CourseModule;
//   isPurchased: boolean;
// }

// export default function ModuleAccordion({ module, isPurchased }: Props) {
//   const [open, setOpen] = useState(false);
//   const locked = !module.is_free && !isPurchased;

//   return (
//     <div className="rounded-xl border border-gray-200">
//       <button
//         onClick={() => !locked && setOpen((o) => !o)}
//         className="flex w-full items-center justify-between p-4 text-left"
//         disabled={locked}
//       >
//         <div className="flex items-center gap-3">
//           {module.is_module_complete && (
//             <span className="text-emerald-500">✔</span>
//           )}
//           <span className="font-medium text-gray-900">{module.title}</span>
//           {module.is_free && (
//             <span className="rounded bg-emerald-50 px-2 py-0.5 text-xs text-emerald-600">
//               Free
//             </span>
//           )}
//         </div>
//         <span className="text-gray-400">
//           {locked ? "🔒" : open ? "▲" : "▼"}
//         </span>
//       </button>

//       {open && !locked && (
//         <div className="space-y-4 border-t border-gray-100 p-4">
//           {module.lessons.length > 0 && (
//             <div className="space-y-3">
//               <h4 className="text-xs font-semibold uppercase text-gray-400">
//                 Lessons
//               </h4>
//               {module.lessons.map((lesson) => (
//                 <LessonItem key={lesson.id} lesson={lesson} />
//               ))}
//             </div>
//           )}

//            {/*{module.documents.length > 0 && (
//             <div className="space-y-2">
//               <h4 className="text-xs font-semibold uppercase text-gray-400">
//                 Documents
//               </h4>
//               {module.documents.map((doc) => (
//                 <DocumentItem key={doc.id} doc={doc} />
//               ))}
//             </div>
//           )}

//           {module.quizzes.length > 0 && (
//             <div className="space-y-3">
//               <h4 className="text-xs font-semibold uppercase text-gray-400">
//                 Quiz
//               </h4>
//               {module.quizzes.map((quiz, i) => (
//                 <QuizCard key={quiz.quiz_id} quiz={quiz} index={i} />
//               ))}
//             </div>
//           )} */}

//           <ModuleTestSection courseId={module.course} moduleId={module.id} />
//         </div>
//       )}

//       {locked && (
//         <p className="border-t border-gray-100 p-4 text-xs text-gray-400">
//           Purchase this course to unlock this module.
//         </p>
//       )}
//     </div>
//   );
// }