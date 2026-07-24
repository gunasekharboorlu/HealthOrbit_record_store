export const ROLES = {
  PATIENT: 'patient',
  DOCTOR: 'doctor',
  ADMIN: 'admin',
} as const;

export type RoleType = typeof ROLES[keyof typeof ROLES];

export const MEDICAL_CATEGORIES = [
  'Lab Report',
  'Prescription',
  'Scan',
  'Discharge Summary',
  'Other',
] as const;

export type MedicalCategoryType = typeof MEDICAL_CATEGORIES[number];

export const BLOOD_GROUPS = [
  'A-Positive',
  'A-Negative',
  'B-Positive',
  'B-Negative',
  'AB-Positive',
  'AB-Negative',
  'O-Positive',
  'O-Negative',
] as const;

export const GENDERS = ['Male', 'Female', 'Other', 'Prefer not to say'] as const;

export const TRUST_BADGES = {
  VERIFIED_HOSPITAL: 'verified_hospital',
  PATIENT_DIRECT: 'patient_direct',
} as const;

export const ACCESS_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;

export const ROUTES = {
  HOME: '/',
  FEATURES: '/features',
  ABOUT: '/about',
  HOW_IT_WORKS: '/how-it-works',
  SECURITY: '/security',
  FAQ: '/faq',
  CONTACT: '/contact',
  TERMS: '/terms',
  PRIVACY: '/privacy',
  LOGIN: '/login',
  REGISTER: '/register',
  APP_BASE: '/app',
  PATIENT_DASHBOARD: '/app/patient/dashboard',
  DOCTOR_DASHBOARD: '/app/doctor/dashboard',
  ADMIN_DASHBOARD: '/app/admin/dashboard',
  EMERGENCY: '/app/emergency',
} as const;

export const PERMISSIONS = {
  VIEW_OWN_RECORDS: 'view_own_records',
  UPLOAD_RECORDS: 'upload_records',
  DELETE_RECORDS: 'delete_records',
  GRANT_ACCESS: 'grant_access',
  REVOKE_ACCESS: 'revoke_access',
  SEARCH_PATIENTS: 'search_patients',
  WRITE_PRESCRIPTION: 'write_prescription',
  VERIFY_DOCTORS: 'verify_doctors',
  MANAGE_HOSPITALS: 'manage_hospitals',
  VIEW_AUDIT_LOGS: 'view_audit_logs',
} as const;

export const STATUS_COLORS = {
  approved: 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/30',
  pending: 'bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/30',
  rejected: 'bg-[#ef4444]/10 text-[#ef4444] border-[#ef4444]/30',
  verified: 'bg-[#38bdf8]/10 text-[#38bdf8] border-[#38bdf8]/30',
} as const;
