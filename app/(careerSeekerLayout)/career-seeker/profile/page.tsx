"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Globe, DollarSign, Users, Pencil, Save, X, Upload, FileText, Loader2, ExternalLink, UserCheck, Package,
  Send, Briefcase, GraduationCap,} from "lucide-react";

import { toast } from "sonner";

// 1. Profile APIs
import {
  useGetCareerSeekerProfileQuery, 
  usePatchCareerSeekerProfileMutation,} from "@/redux/features/career-seeker/profile-update/profileUpdateApis";

// 2. Resume APIs
import {
  useGetCareerSeekerResumeQuery,
  usePatchCareerSeekerResumeMutation,
} from "@/redux/features/career-seeker/profile-update/updateResumeApis";

// 3. Applications API
import { useGetMyApplicationsQuery } from "@/redux/features/job-apply/jobApplyApis";

// 4. Role Change Request API
import { useCreateRequestPostMutation } from "@/redux/features/career-seeker/profile-update/roleChangeApi";

// 5. My Orders API
import { useGetOrdersQuery as useGetMyProfileOrdersQuery } from "@/redux/features/career-seeker/profile-update/myOrdersApis";

import { UserRole } from "@/redux/features/career-seeker/profile-update/types";

export default function PersonalInfo() {
  // Queries & Mutations
  const {
    data: profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
    refetch: refetchProfile,
  } = useGetCareerSeekerProfileQuery();

  const [patchProfile, { isLoading: isProfileUpdating }] =
    usePatchCareerSeekerProfileMutation();

  const {
    data: resume,
    isLoading: isResumeLoading,
    isError: isResumeError,
  } = useGetCareerSeekerResumeQuery();

  const [patchResume, { isLoading: isResumeUpdating }] =
    usePatchCareerSeekerResumeMutation();

  const {
    data: applications,
    isLoading: isApplicationsLoading,
    isError: isApplicationsError,
  } = useGetMyApplicationsQuery();

  const [createRoleRequest, { isLoading: isRoleRequesting }] =
    useCreateRequestPostMutation();

  const {
    data: orders,
    isLoading: isOrdersLoading,
    isError: isOrdersError,
  } = useGetMyProfileOrdersQuery();

  // Local State
  const [isEditing, setIsEditing] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedResume, setSelectedResume] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    full_name: "",
    address: "",
    linkedin: "",
    email: "",
    phone_number: "",
    professional_summary: "",
    salary_expectation: "",
  });

  const [roleForm, setRoleForm] = useState<{
    requested_role: UserRole;
    subject: string;
    message: string;
  }>({
    requested_role: "employer",
    subject: "",
    message: "",
  });

  // Sync profile data into edit form
  useEffect(() => {
    if (!profile) return;
    setFormData({
      full_name: profile.full_name ?? "",
      address: profile.address ?? "",
      linkedin: profile.linkedin ?? "",
      email: profile.email ?? "",
      phone_number: profile.phone_number ?? "",
      professional_summary: profile.professional_summary ?? "",
      salary_expectation:
        profile.salary_expectation !== null && profile.salary_expectation !== undefined
          ? String(profile.salary_expectation)
          : "",
    });
  }, [profile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Profile Update Handler
  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await patchProfile({
        full_name: formData.full_name,
        address: formData.address || null,
        linkedin: formData.linkedin || null,
        email: formData.email,
        phone_number: formData.phone_number || null,
        professional_summary: formData.professional_summary || null,
        salary_expectation: formData.salary_expectation
          ? Number(formData.salary_expectation)
          : null,
      }).unwrap();

      toast.success("Profile updated successfully!");
      setIsEditing(false);
      refetchProfile();
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  // Resume Handlers
  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedResume(file);
  };

  const handleResumeUpload = async () => {
    if (!selectedResume) return;
    try {
      const data = new FormData();
      data.append("resume", selectedResume);
      await patchResume(data).unwrap();
      toast.success("Resume uploaded successfully!");
      setSelectedResume(null);
    } catch (error) {
      console.error("Failed to update resume:", error);
      toast.error("Failed to upload resume.");
    }
  };

  // Role Change Request Handler
  const handleRoleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleForm.subject.trim() || !roleForm.message.trim()) {
      toast.error("Please fill in subject and message.");
      return;
    }

    try {
      await createRoleRequest({
        requested_role: roleForm.requested_role,
        subject: roleForm.subject.trim(),
        message: roleForm.message.trim(),
      }).unwrap();

      toast.success("Role change request submitted successfully!");
      setShowRoleModal(false);
      setRoleForm({ requested_role: "employer", subject: "", message: "" });
    } catch (err) {
      console.error("Failed to submit role change request:", err);
      toast.error("Failed to submit role change request.");
    }
  };

  if (isProfileLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f6fb]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (isProfileError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f6fb] p-6">
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Failed to load profile
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Something went wrong while loading your profile details.
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
            HEADER & ACTIONS
        ======================================================= */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Personal Information
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your profile, resume, orders, and role settings.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Request Role Change Button */}
            <button
              onClick={() => setShowRoleModal(true)}
              className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition shadow-2xs"
            >
              <UserCheck className="h-4 w-4 text-blue-600" />
              <span>Request Role Change</span>
            </button>

            {/* Edit Profile Button */}
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 shadow-sm"
              >
                <Pencil className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>

        {/* ======================================================
            PROFILE CARD
        ======================================================= */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-100">
          <div className="bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white text-2xl font-bold text-blue-600 shadow-lg ring-4 ring-white/20">
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
                <p className="mt-1 text-sm text-blue-100">{profile?.email}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {isEditing ? (
              <form onSubmit={handleUpdateProfile} className="space-y-6">
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
                    label="Salary Expectation ($)"
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
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
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
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InfoItem icon={<Users />} label="Full Name" value={profile?.full_name} />
                <InfoItem icon={<Mail />} label="Email" value={profile?.email} />
                <InfoItem icon={<Phone />} label="Phone Number" value={profile?.phone_number} />
                <InfoItem icon={<MapPin />} label="Address" value={profile?.address} />
                <InfoItem icon={<Globe />} label="LinkedIn" value={profile?.linkedin} />
                <InfoItem
                  icon={<DollarSign />}
                  label="Salary Expectation"
                  value={
                    profile?.salary_expectation !== null && profile?.salary_expectation !== undefined
                      ? `$${profile.salary_expectation}`
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
        <SectionCard title="Professional Summary" description="Your introduction for employers">
          <div className="rounded-xl bg-slate-50 p-5 border border-slate-100">
            <p className="text-sm leading-relaxed text-slate-600">
              {profile?.professional_summary || "No professional summary added yet."}
            </p>
          </div>
        </SectionCard>

        {/* ======================================================
            SKILLS
        ======================================================= */}
        <SectionCard title="Skills" description="Your technical & trade capabilities">
          {profile?.skills?.length ? (
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700 border border-blue-100"
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
          description="Degrees, certifications & academic history"
        >
          {profile?.educational_background?.length ? (
            <div className="space-y-3">
              {profile.educational_background.map((edu: any, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3.5 rounded-xl border border-slate-100 bg-white p-4 shadow-2xs"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-slate-900">
                      {edu.degree || edu.institution || edu.title || `Education #${index + 1}`}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {edu.field_of_study || edu.description || JSON.stringify(edu)}
                    </p>
                  </div>
                </div>
              ))}
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
          description="Work history & professional roles"
        >
          {profile?.job_experience?.length ? (
            <div className="space-y-3">
              {profile.job_experience.map((exp: any, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3.5 rounded-xl border border-slate-100 bg-white p-4 shadow-2xs"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-slate-900">
                      {exp.company || exp.role || exp.title || `Experience #${index + 1}`}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {exp.description || exp.duration || JSON.stringify(exp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyText text="No job experience added yet." />
          )}
        </SectionCard>

        {/* ======================================================
            MY TOOL ORDERS (myOrdersApis.ts)
        ======================================================= */}
        <SectionCard
          title="My Tool Orders"
          description="Recent equipment & tools order history"
          rightContent={
            orders && orders.length > 0 ? (
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {orders.length} {orders.length === 1 ? "Order" : "Orders"}
              </span>
            ) : undefined
          }
        >
          {isOrdersLoading ? (
            <LoadingText text="Loading orders..." />
          ) : isOrdersError ? (
            <p className="text-sm text-rose-500">Failed to load order history.</p>
          ) : !orders || orders.length === 0 ? (
            <EmptyText text="No tool orders found." />
          ) : (
            <div className="space-y-3">
              {orders.map((order) => {
                const orderItems = order.order_items || [];
                return (
                  <div
                    key={order.order_id}
                    className="flex flex-col justify-between gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-2xs sm:flex-row sm:items-center"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <Package className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-slate-900">
                            Order #{order.order_id}
                          </h4>
                          <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700 capitalize border border-amber-200">
                            {(order as any).status || "Pending"}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          {orderItems.length} {orderItems.length === 1 ? "item" : "items"} •{" "}
                          {order.shipping_address_details?.address || "No address"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                      <div className="text-right">
                        <span className="block text-slate-400">Total</span>
                        <span className="font-bold text-blue-600 text-sm">
                          ${Number((order as any).total_amount || 0).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </SectionCard>

        {/* ======================================================
            RESUME MANAGEMENT (updateResumeApis.ts)
        ======================================================= */}
        <SectionCard title="Resume" description="Manage your active resume CV document">
          {isResumeLoading ? (
            <LoadingText text="Loading resume..." />
          ) : isResumeError ? (
            <p className="text-sm text-rose-500">Failed to load resume.</p>
          ) : (
            <div className="space-y-5">
              {resume?.resume && (
                <div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Current Resume</p>
                      <p className="text-xs text-gray-500">Document #{resume.id}</p>
                    </div>
                  </div>

                  <a
                    href={resume.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-2xs"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    View PDF Resume
                  </a>
                </div>
              )}

              {/* Upload Drop Area */}
              <label
                htmlFor="resume-upload"
                className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/60 px-6 py-8 text-center transition hover:border-blue-400 hover:bg-blue-50"
              >
                <Upload className="h-8 w-8 text-slate-400" />
                <span className="mt-2 text-xs font-semibold text-slate-700">
                  Upload new resume file
                </span>
                <span className="mt-0.5 text-[11px] text-slate-400">PDF, DOC, or DOCX</span>
                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleResumeChange}
                />
              </label>

              {/* Selected File Confirmation */}
              {selectedResume && (
                <div className="flex flex-col gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-xs font-semibold text-slate-900">{selectedResume.name}</p>
                      <p className="text-[11px] text-slate-500">
                        {(selectedResume.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedResume(null)}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleResumeUpload}
                      disabled={isResumeUpdating}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                    >
                      {isResumeUpdating ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="h-3.5 w-3.5" />
                          Confirm Upload
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
          description="Track the status of your submitted job applications"
          rightContent={
            !isApplicationsLoading ? (
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {applications?.length ?? 0}
              </span>
            ) : undefined
          }
        >
          {isApplicationsLoading ? (
            <LoadingText text="Loading applications..." />
          ) : isApplicationsError ? (
            <p className="text-sm text-rose-500">Failed to load applications.</p>
          ) : !applications?.length ? (
            <EmptyText text="You haven't applied for any jobs yet." />
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <ApplicationCard key={app.application_id} application={app} />
              ))}
            </div>
          )}
        </SectionCard>
      </div>

      {/* ======================================================
          ROLE CHANGE REQUEST MODAL (roleChangeApi.ts)
      ======================================================= */}
      {showRoleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <UserCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">Request Role Change</h3>
                  <p className="text-xs text-slate-500">Submit a request to change your account role</p>
                </div>
              </div>
              <button
                onClick={() => setShowRoleModal(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleRoleRequestSubmit} className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  Target Role
                </label>
                <select
                  value={roleForm.requested_role}
                  onChange={(e) =>
                    setRoleForm((prev) => ({
                      ...prev,
                      requested_role: e.target.value as UserRole,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-medium text-slate-800 outline-none focus:border-blue-600 focus:bg-white"
                >
                  <option value="employer">Employer</option>
                  <option value="trainer">Trainer</option>
                  <option value="trade_person">Trade Person</option>
                  <option value="career_seeker">Career Seeker</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Request to switch account to Employer"
                  value={roleForm.subject}
                  onChange={(e) =>
                    setRoleForm((prev) => ({ ...prev, subject: e.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  Reason / Details
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Explain why you would like to switch your account role..."
                  value={roleForm.message}
                  onChange={(e) =>
                    setRoleForm((prev) => ({ ...prev, message: e.target.value }))
                  }
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowRoleModal(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isRoleRequesting}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 disabled:opacity-50"
                >
                  {isRoleRequesting ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      Submit Request
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* Helper UI Sub-components */
function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string | null }) {
  return (
    <div className="flex items-start gap-3.5 rounded-xl border border-slate-100 bg-white p-4 shadow-2xs">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        <span className="h-5 w-5">{icon}</span>
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
        <p className="mt-0.5 truncate text-xs font-semibold text-slate-800">{value || "Not provided"}</p>
      </div>
    </div>
  );
}

function FormInput({
  label,
  name,
  type = "text",
  value,
  placeholder,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
      />
    </div>
  );
}

function SectionCard({
  title,
  description,
  children,
  rightContent,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  rightContent?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-gray-900">{title}</h2>
          {description && <p className="mt-0.5 text-xs text-gray-500">{description}</p>}
        </div>
        {rightContent}
      </div>
      {children}
    </div>
  );
}

function EmptyText({ text }: { text: string }) {
  return (
    <div className="rounded-xl bg-slate-50 px-5 py-6 text-center border border-slate-100">
      <p className="text-xs text-slate-400">{text}</p>
    </div>
  );
}

function LoadingText({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-6 text-xs text-slate-400">
      <Loader2 className="h-4 w-4 animate-spin" />
      {text}
    </div>
  );
}

function ApplicationCard({ application }: { application: any }) {
  const status = application.job?.job_progress || "in_progress";
  const statusClasses: Record<string, string> = {
    in_progress: "bg-amber-50 text-amber-700 border-amber-200",
    reviewed: "bg-blue-50 text-blue-700 border-blue-200",
    shortlisted: "bg-purple-50 text-purple-700 border-purple-200",
    rejected: "bg-rose-50 text-rose-700 border-rose-200",
    hired: "bg-emerald-50 text-emerald-700 border-emerald-200",
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-100 bg-white p-4 shadow-2xs hover:shadow-xs transition">
      <div className="flex flex-col gap-4 md:flex-row">
        {application.job?.job_banner && (
          <img
            src={application.job.job_banner}
            alt={application.job.title}
            className="h-24 w-full rounded-lg object-cover md:w-36 shrink-0"
          />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-col justify-between gap-2 sm:flex-row">
            <div>
              <h3 className="text-sm font-bold text-slate-900">{application.job?.title}</h3>
              <p className="mt-0.5 text-xs text-slate-500">{application.job?.job_location}</p>
            </div>
            <span
              className={`h-fit w-fit rounded-full px-3 py-0.5 text-[11px] font-semibold capitalize border ${
                statusClasses[status] || "bg-slate-50 text-slate-700"
              }`}
            >
              {status.replace("_", " ")}
            </span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
            <div>
              <span className="text-[10px] text-slate-400 block">Salary</span>
              <span className="font-semibold text-slate-800">{application.job?.salary_range || "N/A"}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Expected</span>
              <span className="font-semibold text-slate-800">{application.expected_salary || "N/A"}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Score</span>
              <span className="font-semibold text-blue-600">{application.score ?? 0}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Applied</span>
              <span className="font-semibold text-slate-800">
                {application.applied_at ? new Date(application.applied_at).toLocaleDateString() : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}