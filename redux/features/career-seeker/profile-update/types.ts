export type UserRole = "career_seeker" | "employer" | "trainer" | "trade_person";

export interface CreateRoleCahgeRequestPayload {
  subject: string;
  message: string;
  requested_role: UserRole;
}

export interface RoleCahgeRequestResponse {
  id: number;
  user: string;
  subject: string;
  message: string;
  requested_role: UserRole;
  approved_by: string | null;
  is_approved: boolean;
  is_rejected: boolean;
  created_at: string;
  updated_at: string;
}

// Orders Apis
export interface OrderUser {
  user_id: number;
  user_full_name: string;
  user_email: string;
  user_phone_number: string | null;
}

export interface OrderItem {
  order_item_id: number;
  tool_id: number;
  tool_name: string;
  quantity: number;
  amount: number;
  quantity_total_price: number;
}

export interface ShippingAddressDetails {
  shipping_address_id: number;
  address: string;
  phone_number: string;
}

export interface Order {
  order_id: number;
  user: OrderUser;
  order_items: OrderItem[];
  shipping_address_details: ShippingAddressDetails;
}

export type OrdersResponse = Order[];

export interface CareerSeekerProfile {
  full_name: string;
  address: string | null;
  linkedin: string | null;
  email: string;
  phone_number: string | null;
  professional_summary: string | null;
  skills: string[];
  salary_expectation: number | null;
  profile_image: string | null;
  educational_background: EducationalBackground[];
  job_experience: JobExperience[];
}

export interface EducationalBackground {
  [key: string]: unknown;
}

export interface JobExperience {
  [key: string]: unknown;
}

export interface ResumeResponse {
  id: number;
  user: number;
  resume: string;
}