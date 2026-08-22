"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Calendar,
  DollarSign,
  Users,
  Pencil,
  Save,
  X,
  Upload,
  FileText,
  Loader2,
  Briefcase,
  ExternalLink,
  Award,
} from "lucide-react";
import { useGetCareerSeekerProfileQuery, usePatchCareerSeekerProfileMutation } from "@/redux/features/career-seeker/profile-update/profileUpdateApis";
import { useGetCareerSeekerResumeQuery, usePatchCareerSeekerResumeMutation } from "@/redux/features/career-seeker/profile-update/updateResumeApis";
import { useGetMyApplicationsQuery } from "@/redux/features/job-apply/jobApplyApis";



export default function PersonalInfo() {
  // ============================================================
  // PROFILE
  // ============================================================

  const {
    data: profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
    refetch: refetchProfile,
  } = useGetCareerSeekerProfileQuery();

  const [
    patchProfile,
    { isLoading: isProfileUpdating },
  ] = usePatchCareerSeekerProfileMutation();

  // ============================================================
  // RESUME
  // ============================================================

  const {
    data: resume,
    isLoading: isResumeLoading,
    isError: isResumeError,
  } = useGetCareerSeekerResumeQuery();

  const [
    patchResume,
    { isLoading: isResumeUpdating },
  ] = usePatchCareerSeekerResumeMutation();

  // ============================================================
  // APPLICATIONS
  // ============================================================

  const {
    data: applications,
    isLoading: isApplicationsLoading,
    isError: isApplicationsError,
  } = useGetMyApplicationsQuery();

  // ============================================================
  // STATES
  // ============================================================

  const [isEditing, setIsEditing] = useState(false);

  const [selectedResume, setSelectedResume] =
    useState<File | null>(null);

  const [formData, setFormData] = useState({
    full_name: "",
    address: "",
    linkedin: "",
    email: "",
    phone_number: "",
    professional_summary: "",
    salary_expectation: "",
  });

  // ============================================================
  // SET PROFILE DATA
  // ============================================================

  useEffect(() => {
    if (!profile) return;

    setFormData({
      full_name: profile.full_name ?? "",
      address: profile.address ?? "",
      linkedin: profile.linkedin ?? "",
      email: profile.email ?? "",
      phone_number: profile.phone_number ?? "",
      professional_summary:
        profile.professional_summary ?? "",
      salary_expectation:
        profile.salary_expectation !== null &&
        profile.salary_expectation !== undefined
          ? String(profile.salary_expectation)
          : "",
    });
  }, [profile]);

  // ============================================================
  // HANDLE INPUT
  // ============================================================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ============================================================
  // UPDATE PROFILE
  // ============================================================

  const handleUpdateProfile = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      await patchProfile({
        full_name: formData.full_name,
        address: formData.address || null,
        linkedin: formData.linkedin || null,
        email: formData.email,
        phone_number: formData.phone_number || null,
        professional_summary:
          formData.professional_summary || null,
        salary_expectation: formData.salary_expectation
          ? Number(formData.salary_expectation)
          : null,
      }).unwrap();

      setIsEditing(false);

      await refetchProfile();
    } catch (error) {
      console.error(
        "Failed to update career seeker profile:",
        error
      );
    }
  };

  // ============================================================
  // RESUME SELECT
  // ============================================================

  const handleResumeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setSelectedResume(file);
  };

  // ============================================================
  // RESUME UPLOAD
  // ============================================================

  const handleResumeUpload = async () => {
    if (!selectedResume) return;

    try {
      const formData = new FormData();

      formData.append("resume", selectedResume);

      await patchResume(formData).unwrap();

      setSelectedResume(null);
    } catch (error) {
      console.error("Failed to update resume:", error);
    }
  };

  // ============================================================
  // PROFILE LOADING
  // ============================================================

  if (isProfileLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f6fb]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // ============================================================
  // PROFILE ERROR
  // ============================================================

  if (isProfileError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f6fb]">
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Failed to load profile
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Something went wrong while loading your profile.
          </p>

          <button
            onClick={() => refetchProfile()}
            className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f6fb] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* ======================================================
            HEADER
        ======================================================= */}

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Personal Information
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage your profile, resume and job applications.
            </p>
          </div>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              <Pencil className="h-4 w-4" />
              Edit Profile
            </button>
          )}
        </div>

        {/* ======================================================
            PROFILE CARD
        ======================================================= */}

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

          {/* Profile Header */}

          <div className="bg-linear-to-r from-blue-600 to-blue-500 px-6 py-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

              {/* Profile Image */}

              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white text-2xl font-bold text-blue-600 shadow-lg">
                {profile?.profile_image ? (
                  <img
                    src={profile.profile_image}
                    alt={profile.full_name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  profile?.full_name
                    ?.split(" ")
                    .map((name) => name[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()
                )}
              </div>

              <div className="text-white">
                <h2 className="text-2xl font-bold">
                  {profile?.full_name || "Your Name"}
                </h2>

                <p className="mt-1 text-sm text-blue-100">
                  {profile?.email}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">

            {/* ==================================================
                EDIT FORM
            =================================================== */}

            {isEditing ? (
              <form
                onSubmit={handleUpdateProfile}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                  <FormInput
                    label="Full Name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                  />

                  <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />

                  <FormInput
                    label="Phone Number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                  />

                  <FormInput
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />

                  <FormInput
                    label="LinkedIn"
                    name="linkedin"
                    type="url"
                    placeholder="https://linkedin.com/in/..."
                    value={formData.linkedin}
                    onChange={handleChange}
                  />

                  <FormInput
                    label="Salary Expectation"
                    name="salary_expectation"
                    type="number"
                    value={formData.salary_expectation}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Professional Summary
                  </label>

                  <textarea
                    name="professional_summary"
                    value={formData.professional_summary}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell employers about yourself..."
                    className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isProfileUpdating}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isProfileUpdating ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* ==================================================
                  PROFILE DETAILS
              =================================================== */

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <InfoItem
                  icon={<Users />}
                  label="Full Name"
                  value={profile?.full_name}
                />

                <InfoItem
                  icon={<Mail />}
                  label="Email"
                  value={profile?.email}
                />

                <InfoItem
                  icon={<Phone />}
                  label="Phone Number"
                  value={profile?.phone_number}
                />

                <InfoItem
                  icon={<MapPin />}
                  label="Address"
                  value={profile?.address}
                />

                <InfoItem
                  icon={<Globe />}
                  label="LinkedIn"
                  value={profile?.linkedin}
                />

                <InfoItem
                  icon={<DollarSign />}
                  label="Salary Expectation"
                  value={
                    profile?.salary_expectation !== null &&
                    profile?.salary_expectation !== undefined
                      ? String(profile.salary_expectation)
                      : null
                  }
                />
              </div>
            )}
          </div>
        </div>

        {/* ======================================================
            PROFESSIONAL SUMMARY
        ======================================================= */}

        <SectionCard
          title="Professional Summary"
          description="Your professional introduction"
        >
          <div className="rounded-xl bg-gray-50 p-5">
            <p className="text-sm leading-7 text-gray-600">
              {profile?.professional_summary ||
                "No professional summary has been added yet."}
            </p>
          </div>
        </SectionCard>

        {/* ======================================================
            SKILLS
        ======================================================= */}

        <SectionCard
          title="Skills"
          description="Your professional skills"
        >
          {profile?.skills?.length ? (
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <EmptyText text="No skills added yet." />
          )}
        </SectionCard>

        {/* ======================================================
            EDUCATIONAL BACKGROUND
        ======================================================= */}

        <SectionCard
          title="Educational Background"
          description="Your educational history"
        >
          {profile?.educational_background?.length ? (
            <div className="space-y-3">
              {profile.educational_background.map(
                (education, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-gray-100 p-4"
                  >
                    <pre className="overflow-auto text-xs text-gray-600">
                      {JSON.stringify(
                        education,
                        null,
                        2
                      )}
                    </pre>
                  </div>
                )
              )}
            </div>
          ) : (
            <EmptyText text="No educational background added yet." />
          )}
        </SectionCard>

        {/* ======================================================
            JOB EXPERIENCE
        ======================================================= */}

        <SectionCard
          title="Job Experience"
          description="Your professional experience"
        >
          {profile?.job_experience?.length ? (
            <div className="space-y-3">
              {profile.job_experience.map(
                (experience, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-gray-100 p-4"
                  >
                    <pre className="overflow-auto text-xs text-gray-600">
                      {JSON.stringify(
                        experience,
                        null,
                        2
                      )}
                    </pre>
                  </div>
                )
              )}
            </div>
          ) : (
            <EmptyText text="No job experience added yet." />
          )}
        </SectionCard>

        {/* ======================================================
            RESUME
        ======================================================= */}

        <SectionCard
          title="Resume"
          description="Manage your current resume"
        >
          {isResumeLoading ? (
            <LoadingText text="Loading resume..." />
          ) : isResumeError ? (
            <p className="text-sm text-red-500">
              Failed to load resume.
            </p>
          ) : (
            <div className="space-y-5">

              {/* Current Resume */}

              {resume?.resume && (
                <div className="flex flex-col justify-between gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4 sm:flex-row sm:items-center">

                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                      <FileText className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Current Resume
                      </p>

                      <p className="text-xs text-gray-500">
                        Resume #{resume.id}
                      </p>
                    </div>
                  </div>

                  <a
                    href={resume.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Resume
                  </a>
                </div>
              )}

              {/* Upload */}

              <label
                htmlFor="resume-upload"
                className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 px-6 py-10 text-center transition hover:border-blue-400 hover:bg-blue-50"
              >
                <Upload className="h-8 w-8 text-gray-400" />

                <span className="mt-3 text-sm font-medium text-gray-700">
                  Upload a new resume
                </span>

                <span className="mt-1 text-xs text-gray-500">
                  PDF, DOC or DOCX
                </span>

                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleResumeChange}
                />
              </label>

              {/* Selected Resume */}

              {selectedResume && (
                <div className="flex flex-col gap-4 rounded-xl border border-blue-100 bg-blue-50 p-4 sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-600" />

                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedResume.name}
                      </p>

                      <p className="text-xs text-gray-500">
                        {(
                          selectedResume.size /
                          1024 /
                          1024
                        ).toFixed(2)}{" "}
                        MB
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedResume(null)
                      }
                      className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={handleResumeUpload}
                      disabled={isResumeUpdating}
                      className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
                    >
                      {isResumeUpdating ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4" />
                          Upload
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </SectionCard>

        {/* ======================================================
            JOB APPLICATIONS
        ======================================================= */}

        <SectionCard
          title="My Applications"
          description="Jobs you have applied for"
          rightContent={
            !isApplicationsLoading ? (
              <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                {applications?.length ?? 0}
              </span>
            ) : undefined
          }
        >
          {isApplicationsLoading ? (
            <LoadingText text="Loading applications..." />
          ) : isApplicationsError ? (
            <p className="text-sm text-red-500">
              Failed to load applications.
            </p>
          ) : !applications?.length ? (
            <EmptyText text="You haven't applied for any jobs yet." />
          ) : (
            <div className="space-y-4">

              {applications.map((application) => (
                <ApplicationCard
                  key={application.application_id}
                  application={application}
                />
              ))}

            </div>
          )}
        </SectionCard>

      </div>
    </div>
  );
}

/* ==============================================================
   APPLICATION CARD
============================================================== */

interface ApplicationCardProps {
  application: {
    application_id: number;
    score: number;
    resume: string;
    expected_salary: string;
    applied_at: string;
    job: {
      job_id: number;
      title: string;
      job_location: string;
      salary_range: string;
      job_banner: string;
      job_progress:
        | "in_progress"
        | "reviewed"
        | "shortlisted"
        | "rejected"
        | "hired";
    };
  };
}

function ApplicationCard({
  application,
}: ApplicationCardProps) {
  const status = application.job.job_progress;

  const statusClasses = {
    in_progress:
      "bg-yellow-50 text-yellow-700",
    reviewed:
      "bg-blue-50 text-blue-700",
    shortlisted:
      "bg-purple-50 text-purple-700",
    rejected:
      "bg-red-50 text-red-700",
    hired:
      "bg-green-50 text-green-700",
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white transition hover:shadow-sm">

      <div className="flex flex-col gap-4 p-4 md:flex-row">

        {/* Job Banner */}

        <img
          src={application.job.job_banner}
          alt={application.job.title}
          className="h-32 w-full rounded-lg object-cover md:h-24 md:w-36"
        />

        {/* Content */}

        <div className="min-w-0 flex-1">

          <div className="flex flex-col justify-between gap-2 sm:flex-row">

            <div>
              <h3 className="text-base font-semibold text-gray-900">
                {application.job.title}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                {application.job.job_location}
              </p>
            </div>

            <span
              className={`h-fit w-fit rounded-full px-3 py-1 text-xs font-medium capitalize ${
                statusClasses[status]
              }`}
            >
              {status.replace("_", " ")}
            </span>

          </div>

          {/* Application Details */}

          <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">

            <ApplicationDetail
              icon={<DollarSign />}
              label="Salary"
              value={application.job.salary_range}
            />

            <ApplicationDetail
              icon={<DollarSign />}
              label="Expected"
              value={application.expected_salary}
            />

            <ApplicationDetail
              icon={<Award />}
              label="Score"
              value={`${application.score}`}
            />

            <ApplicationDetail
              icon={<Calendar />}
              label="Applied"
              value={new Date(
                application.applied_at
              ).toLocaleDateString()}
            />

          </div>

          {/* Footer */}

          <div className="mt-4 flex flex-wrap gap-3">

            <a
              href={application.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700"
            >
              <FileText className="h-3.5 w-3.5" />
              View Submitted Resume
            </a>

            <span className="text-xs text-gray-400">
              Application #{application.application_id}
            </span>

          </div>
        </div>
      </div>
    </div>
  );
}

/* ==============================================================
   APPLICATION DETAIL
============================================================== */

interface ApplicationDetailProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function ApplicationDetail({
  icon,
  label,
  value,
}: ApplicationDetailProps) {
  return (
    <div>
      <div className="flex items-center gap-1 text-gray-400">
        <span className="h-3.5 w-3.5">
          {icon}
        </span>

        <span className="text-xs">
          {label}
        </span>
      </div>

      <p className="mt-1 truncate text-sm font-medium text-gray-800">
        {value}
      </p>
    </div>
  );
}

/* ==============================================================
   INFO ITEM
============================================================== */

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value?: string | null;
}

function InfoItem({
  icon,
  label,
  value,
}: InfoItemProps) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-gray-100 p-4">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        <span className="h-5 w-5">
          {icon}
        </span>
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
          {label}
        </p>

        <p className="mt-1 wrap-break-words text-sm font-medium text-gray-800">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
}

/* ==============================================================
   FORM INPUT
============================================================== */

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

function FormInput({
  label,
  name,
  type = "text",
  value,
  placeholder,
  onChange,
}: FormInputProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}

/* ==============================================================
   SECTION CARD
============================================================== */

interface SectionCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  rightContent?: React.ReactNode;
}

function SectionCard({
  title,
  description,
  children,
  rightContent,
}: SectionCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {title}
          </h2>

          {description && (
            <p className="mt-1 text-sm text-gray-500">
              {description}
            </p>
          )}
        </div>

        {rightContent}
      </div>

      {children}
    </div>
  );
}

/* ==============================================================
   EMPTY
============================================================== */

function EmptyText({
  text,
}: {
  text: string;
}) {
  return (
    <div className="rounded-xl bg-gray-50 px-5 py-8 text-center">
      <p className="text-sm text-gray-500">
        {text}
      </p>
    </div>
  );
}

/* ==============================================================
   LOADING
============================================================== */

function LoadingText({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center justify-center gap-2 py-8 text-sm text-gray-500">
      <Loader2 className="h-4 w-4 animate-spin" />
      {text}
    </div>
  );
}