"use client";
import { useState } from "react";

type Step = 1 | 2 | 3;

interface Lesson {
  id: number;
  title: string;
  type: string;
  duration: string;
}

interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
}

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8l3.5 3.5L13 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 4h12M5 4V2.667A.667.667 0 015.667 2h4.666A.667.667 0 0111 2.667V4M6.333 7.333v4M9.667 7.333v4M3.333 4l.667 9.333A.667.667 0 004.667 14h6.666a.667.667 0 00.667-.667L12.667 4" stroke="#EF4444" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UploadIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="20" fill="#EEF2FF" />
    <path d="M20 26v-8M17 21l3-3 3 3" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 27h10" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M13.5 23.5A4 4 0 1117 16.1" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const PlusIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export default function CreateNewCourse() {
  const [step, setStep] = useState<Step>(1);
  const [courseName, setCourseName] = useState("");
  const [topic, setTopic] = useState("Engineering");
  const [level, setLevel] = useState("Beginner");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("29.99");
  const [discountedPrice, setDiscountedPrice] = useState("19.99");
  const [modules, setModules] = useState<Module[]>([
    {
      id: 1,
      title: "Module 1: Introduction",
      lessons: [
        { id: 1, title: "Welcome to the course", type: "Video", duration: "2:30" },
        { id: 2, title: "Course Overview", type: "Video", duration: "5:00" },
      ],
    },
  ]);

  const steps = [
    { num: 1, label: "Course Details" },
    { num: 2, label: "Course Content" },
    { num: 3, label: "Pricing & Publish" },
  ];

  const addModule = () => {
    const newId = modules.length + 1;
    setModules([...modules, { id: newId, title: `Module ${newId}: New Module`, lessons: [] }]);
  };

  const deleteModule = (id: number) => {
    setModules(modules.filter((m) => m.id !== id));
  };

  const addLesson = (moduleId: number) => {
    setModules(
      modules.map((m) =>
        m.id === moduleId
          ? {
              ...m,
              lessons: [
                ...m.lessons,
                { id: m.lessons.length + 1, title: "New Lesson", type: "Video", duration: "0:00" },
              ],
            }
          : m
      )
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F3F4F6", padding: "40px 24px", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111827", margin: 0 }}>Create New Course</h1>
          <p style={{ fontSize: 14, color: "#6B7280", marginTop: 4 }}>Share your knowledge with the world</p>
        </div>

        <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
          {/* Sidebar */}
          <div style={{ width: 220, flexShrink: 0 }}>
            {steps.map((s) => {
              const done = step > s.num;
              const active = step === s.num;
              return (
                <div
                  key={s.num}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 14px",
                    borderRadius: 10,
                    marginBottom: 4,
                    background: active ? "white" : "transparent",
                    boxShadow: active ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                    cursor: "pointer",
                  }}
                  onClick={() => done && setStep(s.num as Step)}
                >
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: done ? "#22C55E" : active ? "#4F46E5" : "#E5E7EB",
                      flexShrink: 0,
                    }}
                  >
                    {done ? (
                      <CheckIcon />
                    ) : (
                      <span style={{ fontSize: 13, fontWeight: 600, color: active ? "white" : "#9CA3AF" }}>{s.num}</span>
                    )}
                  </div>
                  <span style={{ fontSize: 14, fontWeight: active ? 600 : 400, color: active ? "#111827" : "#6B7280" }}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Main Panel */}
          <div
            style={{
              flex: 1,
              background: "white",
              borderRadius: 14,
              padding: "32px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
            }}
          >
            {/* Step 1: Course Details */}
            {step === 1 && (
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", margin: "0 0 24px" }}>Course Details</h2>

                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Course Name</label>
                  <input
                    style={inputStyle}
                    placeholder="e.g. Advanced Civil Engineering"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                  <div>
                    <label style={labelStyle}>Topic</label>
                    <input style={inputStyle} value={topic} onChange={(e) => setTopic(e.target.value)} />
                  </div>
                  <div>
                    <label style={labelStyle}>Level</label>
                    <input style={inputStyle} value={level} onChange={(e) => setLevel(e.target.value)} />
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Course Thumbnail</label>
                  <div
                    style={{
                      border: "2px dashed #D1D5DB",
                      borderRadius: 10,
                      padding: "36px 24px",
                      textAlign: "center",
                      cursor: "pointer",
                      background: "#FAFAFA",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
                      <UploadIcon />
                    </div>
                    <p style={{ fontSize: 14, fontWeight: 500, color: "#374151", margin: "0 0 4px" }}>
                      Click to upload or drag and drop
                    </p>
                    <p style={{ fontSize: 12, color: "#9CA3AF", margin: 0 }}>SVG, PNG, JPG or GIF (max. 800×400px)</p>
                  </div>
                </div>

                <div style={{ marginBottom: 32 }}>
                  <label style={labelStyle}>Description</label>
                  <textarea
                    style={{ ...inputStyle, minHeight: 100, resize: "vertical" }}
                    placeholder="Describe what students will learn..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div style={footerStyle}>
                  <button style={backBtnStyle}>Back</button>
                  <button style={primaryBtnStyle} onClick={() => setStep(2)}>
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Course Content */}
            {step === 2 && (
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", margin: "0 0 24px" }}>Course Content</h2>

                {modules.map((mod) => (
                  <div
                    key={mod.id}
                    style={{
                      border: "1px solid #E5E7EB",
                      borderRadius: 10,
                      padding: "16px",
                      marginBottom: 16,
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <span style={{ fontWeight: 600, fontSize: 15, color: "#111827" }}>{mod.title}</span>
                      <button
                        onClick={() => deleteModule(mod.id)}
                        style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}
                      >
                        <TrashIcon />
                      </button>
                    </div>

                    {mod.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          background: "white",
                          borderRadius: 8,
                          padding: "10px 14px",
                          marginBottom: 8,
                          border: "1px solid #E5E7EB",
                        }}
                      >
                        <div
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: 6,
                            background: "#EEF2FF",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 12,
                            fontWeight: 600,
                            color: "#4F46E5",
                            flexShrink: 0,
                          }}
                        >
                          {lesson.id}
                        </div>
                        <span style={{ flex: 1, fontSize: 14, color: "#374151" }}>{lesson.title}</span>
                        <span style={{ fontSize: 12, color: "#9CA3AF" }}>
                          {lesson.type} • {lesson.duration}
                        </span>
                      </div>
                    ))}

                    <button
                      onClick={() => addLesson(mod.id)}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1.5px dashed #D1D5DB",
                        borderRadius: 8,
                        background: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                        fontSize: 14,
                        color: "#6B7280",
                        fontWeight: 500,
                      }}
                    >
                      <PlusIcon /> Add Lesson
                    </button>
                  </div>
                ))}

                <button
                  onClick={addModule}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1.5px dashed #6366F1",
                    borderRadius: 10,
                    background: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    fontSize: 14,
                    color: "#4F46E5",
                    fontWeight: 500,
                    marginBottom: 28,
                  }}
                >
                  <PlusIcon /> Add New Module
                </button>

                <div style={footerStyle}>
                  <button style={backBtnStyle} onClick={() => setStep(1)}>
                    Back
                  </button>
                  <button style={primaryBtnStyle} onClick={() => setStep(3)}>
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Pricing & Publish */}
            {step === 3 && (
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", margin: "0 0 24px" }}>Pricing & Publish</h2>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
                  <div>
                    <label style={labelStyle}>Price ($)</label>
                    <p style={{ fontSize: 14, color: "#9CA3AF", margin: "6px 0 0", fontWeight: 400 }}>{price}</p>
                  </div>
                  <div>
                    <label style={labelStyle}>Discounted Price ($)</label>
                    <p style={{ fontSize: 14, color: "#9CA3AF", margin: "6px 0 0", fontWeight: 400 }}>{discountedPrice}</p>
                  </div>
                </div>

                <div
                  style={{
                    background: "#EEF2FF",
                    borderRadius: 10,
                    padding: "20px 20px",
                    marginBottom: 32,
                  }}
                >
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#4F46E5", margin: "0 0 8px" }}>Ready to publish?</p>
                  <p style={{ fontSize: 14, color: "#4F46E5", margin: 0, lineHeight: 1.6 }}>
                    Your course will be submitted for review. This usually takes 24-48 hours. Make sure all content is correct
                    before submitting.
                  </p>
                </div>

                <div style={footerStyle}>
                  <button style={backBtnStyle} onClick={() => setStep(2)}>
                    Back
                  </button>
                  <button style={primaryBtnStyle}>Publish Course</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 13,
  fontWeight: 500,
  color: "#374151",
  marginBottom: 6,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #E5E7EB",
  borderRadius: 8,
  fontSize: 14,
  color: "#374151",
  outline: "none",
  background: "white",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

const footerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const backBtnStyle: React.CSSProperties = {
  padding: "10px 22px",
  border: "1px solid #E5E7EB",
  borderRadius: 8,
  background: "white",
  fontSize: 14,
  fontWeight: 500,
  color: "#374151",
  cursor: "pointer",
  fontFamily: "inherit",
};

const primaryBtnStyle: React.CSSProperties = {
  padding: "10px 22px",
  border: "none",
  borderRadius: 8,
  background: "#4F46E5",
  color: "white",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  fontFamily: "inherit",
};