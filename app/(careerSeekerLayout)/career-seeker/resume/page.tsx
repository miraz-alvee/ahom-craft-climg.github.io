"use client"

import { useState } from "react";

/* ─── Default Data ─────────────────────────────────────────── */
const DEFAULT = {
  name: "John Doe",
  title: "Senior Software Engineer",
  email: "john.doe@email.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  linkedin: "linkedin.com/in/johndoe",
  summary:
    "Passionate software engineer with 5+ years of experience building scalable web applications. Specialized in full-stack development with React and Node.js. Strong background in distributed systems and cloud architecture.",
  experience: [
    {
      id: 1, role: "Senior Software Engineer", company: "Tech Corp",
      location: "San Francisco, CA", start: "Jan 2024", end: "Present",
      bullets: [
        "Led development of microservices architecture serving 1M+ daily users",
        "Mentored team of 5 junior developers, improving velocity by 30%",
        "Implemented CI/CD pipelines reducing deployment time by 60%",
      ],
    },
    {
      id: 2, role: "Software Engineer", company: "StartupXYZ",
      location: "Remote", start: "Jun 2022", end: "Dec 2023",
      bullets: [
        "Built full-stack features using React and Node.js",
        "Reduced page load time by 40% through optimization",
      ],
    },
    {
      id: 3, role: "Junior Developer", company: "Digital Agency",
      location: "New York, NY", start: "Aug 2020", end: "May 2022",
      bullets: [
        "Developed responsive web applications for 20+ clients",
        "Maintained and improved legacy codebase",
      ],
    },
  ],
  education: [
    { id: 1, degree: "Master of Science in Computer Science", school: "Stanford University", start: "2018", end: "2020" },
    { id: 2, degree: "Bachelor of Science in Computer Science", school: "UC Berkeley", start: "2014", end: "2018" },
  ],
  skills: ["React", "Node.js", "TypeScript", "Python", "AWS", "Docker", "PostgreSQL", "GraphQL"],
};

const STATUS_COLOR = { "Interview Scheduled": "#2563eb", "Under Review": "#d97706", "Offer Received": "#16a34a", "Rejected": "#dc2626" };

/* ─── Tiny helpers ─────────────────────────────────────────── */
function Inp({ val, onChange, style, wide }) {
  return (
    <input value={val} onChange={e => onChange(e.target.value)}
      style={{ fontFamily: "inherit", fontSize: "inherit", color: "inherit", fontWeight: "inherit",
        background: "#f0f4ff", border: "1.5px dashed #a5b4fc", borderRadius: 5, outline: "none",
        padding: "2px 7px", width: wide ? "100%" : "auto", ...style }} />
  );
}
function Textarea({ val, onChange, rows = 3 }) {
  return (
    <textarea value={val} onChange={e => onChange(e.target.value)} rows={rows}
      style={{ fontFamily: "inherit", fontSize: 13.5, color: "#374151", lineHeight: 1.7,
        width: "100%", background: "#f0f4ff", border: "1.5px dashed #a5b4fc", borderRadius: 6,
        padding: "8px 10px", outline: "none", resize: "vertical" }} />
  );
}
function Divider({ title }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 14, fontWeight: 800, color: "#111827", marginBottom: 5, letterSpacing: "0.01em" }}>{title}</div>
      <div style={{ height: 1.5, background: "linear-gradient(to right,#4f63e7,#e5e7eb)" }} />
    </div>
  );
}
function PanelSection({ title, children }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>{title}</div>
      {children}
    </div>
  );
}
function PanelBtn({ label, icon, onClick, variant = "ghost" }) {
  const styles = {
    ghost: { bg: "#f3f4f6", color: "#374151", border: "1px solid #e5e7eb" },
    primary: { bg: "#4f63e7", color: "#fff", border: "none" },
    danger: { bg: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca" },
    success: { bg: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" },
  };
  const s = styles[variant];
  return (
    <button onClick={onClick}
      style={{ display: "flex", alignItems: "center", gap: 7, width: "100%", padding: "9px 12px",
        borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: "pointer",
        background: s.bg, color: s.color, border: s.border, transition: "opacity 0.15s" }}
      onMouseEnter={e => e.currentTarget.style.opacity = "0.82"}
      onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
      <span style={{ fontSize: 15 }}>{icon}</span>{label}
    </button>
  );
}

/* ─── Main Component ───────────────────────────────────────── */
export default function ResumePage() {
  const [data, setData] = useState(DEFAULT);
  const [editing, setEditing] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [activePanel, setActivePanel] = useState("edit"); // edit | tips

  const set = (f, v) => setData(d => ({ ...d, [f]: v }));
  const updExp = (id, f, v) => setData(d => ({ ...d, experience: d.experience.map(e => e.id === id ? { ...e, [f]: v } : e) }));
  const updBullet = (id, i, v) => setData(d => ({ ...d, experience: d.experience.map(e => e.id === id ? { ...e, bullets: e.bullets.map((b, j) => j === i ? v : b) } : e) }));
  const addBullet = id => setData(d => ({ ...d, experience: d.experience.map(e => e.id === id ? { ...e, bullets: [...e.bullets, ""] } : e) }));
  const delBullet = (id, i) => setData(d => ({ ...d, experience: d.experience.map(e => e.id === id ? { ...e, bullets: e.bullets.filter((_, j) => j !== i) } : e) }));
  const addExp = () => setData(d => ({ ...d, experience: [...d.experience, { id: Date.now(), role: "New Role", company: "Company", location: "City", start: "Month Year", end: "Present", bullets: ["Achievement here"] }] }));
  const delExp = id => setData(d => ({ ...d, experience: d.experience.filter(e => e.id !== id) }));
  const updEdu = (id, f, v) => setData(d => ({ ...d, education: d.education.map(e => e.id === id ? { ...e, [f]: v } : e) }));
  const addEdu = () => setData(d => ({ ...d, education: [...d.education, { id: Date.now(), degree: "Degree", school: "University", start: "Year", end: "Year" }] }));
  const delEdu = id => setData(d => ({ ...d, education: d.education.filter(e => e.id !== id) }));
  const addSkill = () => { if (newSkill.trim()) { setData(d => ({ ...d, skills: [...d.skills, newSkill.trim()] })); setNewSkill(""); } };
  const delSkill = i => setData(d => ({ ...d, skills: d.skills.filter((_, j) => j !== i) }));
  const resetData = () => { setData(DEFAULT); setEditing(false); };

  return (
    <div style={{ minHeight: "100vh", background: "#f4f6fb", fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>
      <div style={{ padding: "24px 24px 32px" }}>
        {/* Page Header */}
        <div className="no-print" style={{ marginBottom: 22 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#111827" }}>My Resume</h1>
          <p style={{ fontSize: 13.5, color: "#6b7280", marginTop: 3 }}>Create and manage your professional resume</p>
        </div>

        <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>

          {/* ── Left: Resume Preview ── */}
          <div style={{ flex: 1, background: "#fff", borderRadius: 16, border: "1px solid #f3f4f6", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", overflow: "hidden" }}>

            {/* Resume Header */}
            <div style={{ background: "linear-gradient(90deg, #3B82F6 40%, #6366F1 100%)", padding: "32px 36px 28px", position: "relative", overflow: "hidden" }}>
              {/* <div style={{ position: "absolute", top: -30, right: -30, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
              <div style={{ position: "absolute", bottom: -10, right: 80, width: 90, height: 90, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} /> */}

              {/* Name & Title */}
              {editing ? (
                <>
                  <Inp val={data.name} onChange={v => set("name", v)} style={{ fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 6, display: "block" }} wide />
                  <Inp val={data.title} onChange={v => set("title", v)} style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", marginBottom: 18, display: "block" }} wide />
                </>
              ) : (
                <>
                  <div style={{ fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 5 }}>{data.name}</div>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", marginBottom: 18 }}>{data.title}</div>
                </>
              )}

              {/* Contact row */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px 20px", fontSize: 12.5, color: "rgba(255,255,255,0.8)" }}>
                {[
                  { f: "email", ico: "✉" },
                  { f: "phone", ico: "📞" },
                  { f: "location", ico: "📍" },
                  { f: "linkedin", ico: "🔗" },
                ].map(({ f, ico }, i) => (
                  <span key={f} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    {i > 0 && <span style={{ color: "rgba(255,255,255,0.3)", marginRight: 2 }}>•</span>}
                    <span>{ico}</span>
                    {editing
                      ? <Inp val={data[f]} onChange={v => set(f, v)} style={{ fontSize: 12.5, color: "rgba(255,255,255,0.9)", minWidth: 120 }} />
                      : data[f]}
                  </span>
                ))}
              </div>
            </div>

            {/* Resume Body */}
            <div style={{ padding: "28px 36px 36px" }}>

              {/* Summary */}
              <div style={{ marginBottom: 26 }}>
                <Divider title="Professional Summary" />
                {editing
                  ? <Textarea val={data.summary} onChange={v => set("summary", v)} rows={3} />
                  : <p style={{ fontSize: 13.5, color: "#374151", lineHeight: 1.75 }}>{data.summary}</p>}
              </div>

              {/* Experience */}
              <div style={{ marginBottom: 26 }}>
                <Divider title="Work Experience" />
                {data.experience.map((exp) => (
                  <div key={exp.id} style={{ marginBottom: 22, position: "relative" }}>
                    {editing && (
                      <button onClick={() => delExp(exp.id)} style={{ position: "absolute", top: 0, right: 0, background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>× Remove</button>
                    )}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingRight: editing ? 90 : 0, marginBottom: 2 }}>
                      {editing ? <Inp val={exp.role} onChange={v => updExp(exp.id, "role", v)} style={{ fontSize: 14, fontWeight: 700, color: "#111827" }} wide />
                        : <div style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{exp.role}</div>}
                      {editing
                        ? <div style={{ display: "flex", gap: 4, flexShrink: 0, marginLeft: 8 }}>
                            <Inp val={exp.start} onChange={v => updExp(exp.id, "start", v)} style={{ width: 75, fontSize: 12.5, color: "#6b7280", textAlign: "center" }} />
                            <span style={{ color: "#9ca3af", fontSize: 12 }}>–</span>
                            <Inp val={exp.end} onChange={v => updExp(exp.id, "end", v)} style={{ width: 75, fontSize: 12.5, color: "#6b7280", textAlign: "center" }} />
                          </div>
                        : <div style={{ fontSize: 12.5, color: "#6b7280", flexShrink: 0 }}>{exp.start} – {exp.end}</div>}
                    </div>
                    {editing
                      ? <div style={{ display: "flex", gap: 5, marginBottom: 8 }}>
                          <Inp val={exp.company} onChange={v => updExp(exp.id, "company", v)} style={{ fontSize: 13, color: "#4f63e7", fontWeight: 600 }} />
                          <span style={{ color: "#4f63e7" }}>·</span>
                          <Inp val={exp.location} onChange={v => updExp(exp.id, "location", v)} style={{ fontSize: 13, color: "#4f63e7" }} />
                        </div>
                      : <div style={{ fontSize: 13, color: "#4f63e7", fontWeight: 600, marginBottom: 8 }}>{exp.company} · {exp.location}</div>}
                    <ul style={{ paddingLeft: 0, listStyle: "none" }}>
                      {exp.bullets.map((b, bi) => (
                        <li key={bi} style={{ display: "flex", alignItems: "flex-start", gap: 6, fontSize: 13.5, color: "#374151", lineHeight: 1.65, marginBottom: 4 }}>
                          <span style={{ color: "#9ca3af", marginTop: 3, flexShrink: 0 }}>•</span>
                          {editing
                            ? <div style={{ display: "flex", flex: 1, gap: 5 }}>
                                <Inp val={b} onChange={v => updBullet(exp.id, bi, v)} wide style={{ fontSize: 13, color: "#374151" }} />
                                <button onClick={() => delBullet(exp.id, bi)} style={{ color: "#dc2626", background: "none", border: "none", cursor: "pointer", fontSize: 16, flexShrink: 0 }}>×</button>
                              </div>
                            : b}
                        </li>
                      ))}
                    </ul>
                    {editing && <button onClick={() => addBullet(exp.id)} style={{ marginTop: 4, fontSize: 12, color: "#4f63e7", background: "none", border: "none", cursor: "pointer", fontWeight: 700 }}>+ Add bullet</button>}
                  </div>
                ))}
                {editing && (
                  <button onClick={addExp} style={{ fontSize: 13, color: "#4f63e7", background: "#eff2ff", border: "1px dashed #c7d2fe", borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontWeight: 700 }}>+ Add Experience</button>
                )}
              </div>

              {/* Education */}
              <div style={{ marginBottom: 26 }}>
                <Divider title="Education" />
                {data.education.map((edu) => (
                  <div key={edu.id} style={{ marginBottom: 14, position: "relative" }}>
                    {editing && <button onClick={() => delEdu(edu.id)} style={{ position: "absolute", top: 0, right: 0, background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>× Remove</button>}
                    <div style={{ display: "flex", justifyContent: "space-between", paddingRight: editing ? 90 : 0, alignItems: "center" }}>
                      {editing ? <Inp val={edu.degree} onChange={v => updEdu(edu.id, "degree", v)} wide style={{ fontSize: 14, fontWeight: 700, color: "#111827" }} />
                        : <div style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{edu.degree}</div>}
                      {editing
                        ? <div style={{ display: "flex", gap: 4, flexShrink: 0, marginLeft: 8 }}>
                            <Inp val={edu.start} onChange={v => updEdu(edu.id, "start", v)} style={{ width: 55, fontSize: 12.5, color: "#6b7280", textAlign: "center" }} />
                            <span style={{ color: "#9ca3af", fontSize: 12 }}>–</span>
                            <Inp val={edu.end} onChange={v => updEdu(edu.id, "end", v)} style={{ width: 55, fontSize: 12.5, color: "#6b7280", textAlign: "center" }} />
                          </div>
                        : <div style={{ fontSize: 12.5, color: "#6b7280" }}>{edu.start} – {edu.end}</div>}
                    </div>
                    {editing ? <Inp val={edu.school} onChange={v => updEdu(edu.id, "school", v)} style={{ fontSize: 13, color: "#4f63e7", fontWeight: 600, marginTop: 3 }} wide />
                      : <div style={{ fontSize: 13, color: "#4f63e7", fontWeight: 600, marginTop: 2 }}>{edu.school}</div>}
                  </div>
                ))}
                {editing && <button onClick={addEdu} style={{ fontSize: 13, color: "#4f63e7", background: "#eff2ff", border: "1px dashed #c7d2fe", borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontWeight: 700 }}>+ Add Education</button>}
              </div>

              {/* Skills */}
              <div>
                <Divider title="Skills" />
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {data.skills.map((s, i) => (
                    <span key={i} style={{ fontSize: 12.5, fontWeight: 600, background: "#eff2ff", color: "#4f63e7", border: "1px solid #c7d2fe", padding: "4px 12px", borderRadius: 99, display: "flex", alignItems: "center", gap: 5 }}>
                      {s}
                      {editing && <button onClick={() => delSkill(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#818cf8", fontSize: 14, padding: 0 }}>×</button>}
                    </span>
                  ))}
                  {editing && (
                    <div style={{ display: "flex", gap: 5 }}>
                      <input value={newSkill} onChange={e => setNewSkill(e.target.value)} onKeyDown={e => e.key === "Enter" && addSkill()}
                        placeholder="Add skill…"
                        style={{ fontSize: 12.5, background: "#f0f4ff", border: "1.5px dashed #a5b4fc", borderRadius: 99, padding: "4px 12px", outline: "none", fontFamily: "inherit", width: 100 }} />
                      <button onClick={addSkill} style={{ fontSize: 13, color: "#4f63e7", background: "#eff2ff", border: "1px solid #c7d2fe", borderRadius: 99, padding: "4px 12px", cursor: "pointer", fontWeight: 700 }}>+</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Control Panel ── */}
          <div className="no-print" style={{ width: 240, flexShrink: 0, display: "flex", flexDirection: "column", gap: 14 }}>

            {/* Panel Tabs */}
            <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #f3f4f6", padding: 4, display: "flex", gap: 3, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
              {["edit", "tips"].map(t => (
                <button key={t} onClick={() => setActivePanel(t)}
                  style={{ flex: 1, padding: "8px 0", borderRadius: 9, border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", background: activePanel === t ? "#4f63e7" : "transparent", color: activePanel === t ? "#fff" : "#6b7280", transition: "all 0.15s", textTransform: "capitalize" }}>
                  {t === "edit" ? "✏️ Edit" : "💡 Tips"}
                </button>
              ))}
            </div>

            {/* Panel Card */}
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f3f4f6", padding: "20px 16px", boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}>

              {activePanel === "edit" ? (
                <>
                  <PanelSection title="Editing">
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <PanelBtn label={editing ? "Done Editing" : "Edit Resume"} icon={editing ? "✅" : "✏️"} onClick={() => setEditing(e => !e)} variant={editing ? "success" : "primary"} />
                      <PanelBtn label="Reset to Default" icon="🔄" onClick={resetData} variant="danger" />
                    </div>
                  </PanelSection>

                  <div style={{ height: 1, background: "#f3f4f6", margin: "4px 0 18px" }} />

                  <PanelSection title="Sections">
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {[
                        { label: "Add Experience", icon: "💼", action: () => { setEditing(true); addExp(); } },
                        { label: "Add Education", icon: "🎓", action: () => { setEditing(true); addEdu(); } },
                        { label: "Add Skill", icon: "⚡", action: () => { setEditing(true); } },
                      ].map(({ label, icon, action }) => (
                        <PanelBtn key={label} label={label} icon={icon} onClick={action} variant="ghost" />
                      ))}
                    </div>
                  </PanelSection>

                  <div style={{ height: 1, background: "#f3f4f6", margin: "4px 0 18px" }} />

                  <PanelSection title="Export">
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <PanelBtn label="Print / Save PDF" icon="🖨️" onClick={() => window.print()} variant="primary" />
                    </div>
                  </PanelSection>

                  {/* Completeness */}
                  <div style={{ height: 1, background: "#f3f4f6", margin: "4px 0 18px" }} />
                  <div style={{ fontSize: 11, fontWeight: 800, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Completeness</div>
                  {[
                    { label: "Contact Info", done: !!(data.email && data.phone && data.location) },
                    { label: "Summary", done: data.summary.length > 30 },
                    { label: "Work Experience", done: data.experience.length > 0 },
                    { label: "Education", done: data.education.length > 0 },
                    { label: "Skills", done: data.skills.length >= 5 },
                  ].map(({ label, done }) => (
                    <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", background: done ? "#f0fdf4" : "#f9fafb", border: `2px solid ${done ? "#86efac" : "#e5e7eb"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {done && <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                      </div>
                      <span style={{ fontSize: 12.5, color: done ? "#374151" : "#9ca3af", fontWeight: done ? 600 : 400 }}>{label}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 12, background: "#f3f4f6", borderRadius: 99, height: 6, overflow: "hidden" }}>
                    <div style={{ height: "100%", borderRadius: 99, background: "linear-gradient(to right,#4f63e7,#818cf8)", width: `${([!!(data.email && data.phone && data.location), data.summary.length > 30, data.experience.length > 0, data.education.length > 0, data.skills.length >= 5].filter(Boolean).length / 5) * 100}%`, transition: "width 0.4s" }} />
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: "#111827", marginBottom: 14 }}>Resume Tips 💡</div>
                  {[
                    { tip: "Use numbers", detail: "Quantify achievements — '40% faster', '1M users'." },
                    { tip: "Action verbs", detail: "Start bullets with Led, Built, Reduced, Designed." },
                    { tip: "Keep it 1 page", detail: "For <10 years experience, one page is ideal." },
                    { tip: "Tailor it", detail: "Match keywords from each job description." },
                    { tip: "ATS friendly", detail: "Avoid tables/graphics — plain text scans better." },
                    { tip: "Strong summary", detail: "3-4 sentences: who you are, what you do, value." },
                  ].map(({ tip, detail }) => (
                    <div key={tip} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: "1px solid #f3f4f6" }}>
                      <div style={{ fontSize: 12.5, fontWeight: 700, color: "#4f63e7", marginBottom: 2 }}>✓ {tip}</div>
                      <div style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.5 }}>{detail}</div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

