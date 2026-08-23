"use client";

interface ModalShellProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: React.ReactNode;
  actionLabel: string;
  actionColor: "blue" | "red";
  onAction: () => void;
}

function ModalShell({ open, onClose, title, description, actionLabel, actionColor, onAction }: ModalShellProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="relative w-full max-w-sm rounded-2xl bg-[#f1efe9] p-8 text-center shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-black text-white"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <p className="mt-3 text-sm text-gray-500">{description}</p>
        <button
          onClick={onAction}
          className={`mt-6 w-full rounded-xl py-3 text-sm font-semibold text-white
            ${actionColor === "blue" ? "bg-blue-600 hover:bg-blue-700" : "bg-red-500 hover:bg-red-600"}`}
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
}

export function StartExamModal({ open, onClose, onStart }: { open: boolean; onClose: () => void; onStart: () => void }) {
  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Confirm Start Exam"
      description="Are you sure you want to start the exam?"
      actionLabel="Start"
      actionColor="blue"
      onAction={onStart}
    />
  );
}

export function ExitExamModal({ open, onClose, onConfirmExit }: { open: boolean; onClose: () => void; onConfirmExit: () => void }) {
  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Exit Exam?"
      description={<>Are you sure you want to leave the exam?<br />Your current progress may be lost.</>}
      actionLabel="Yes, Exit"
      actionColor="red"
      onAction={onConfirmExit}
    />
  );
}