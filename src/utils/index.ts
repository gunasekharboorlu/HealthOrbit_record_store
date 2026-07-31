import { MedicalRecord } from '../types';

/**
 * Format ISO date string into readable date (e.g. 'Oct 24, 2026')
 */
export function formatDate(dateString?: string): string {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}

/**
 * Format ISO date string into full readable date and time
 */
export function formatDateTime(dateString?: string): string {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch {
    return dateString;
  }
}

/**
 * Format relative time (e.g., '2 hours ago', 'Just now')
 */
export function formatRelativeTime(dateString?: string): string {
  if (!dateString) return 'Just now';
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return formatDate(dateString);
  } catch {
    return 'Just now';
  }
}

/**
 * Sanitize and format file names for secure storage
 */
export function sanitizeFileName(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9.\-_]/g, '-')
    .replace(/\.{2,}/g, '.')
    .slice(0, 80);
}

/**
 * Format file sizes (bytes to KB/MB)
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/**
 * Extract 2-letter initials from name
 */
export function getAvatarInitials(name?: string): string {
  if (!name) return 'HO';
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length === 0) return 'HO';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Generate a deterministic color background based on user name
 */
export function getAvatarBgColor(name?: string): string {
  if (!name) return 'from-[#38bdf8] to-[#22d3ee]';
  const colors = [
    'from-sky-500 to-cyan-400',
    'from-blue-600 to-cyan-400',
    'from-indigo-500 to-sky-400',
    'from-sky-400 to-emerald-400',
    'from-blue-500 to-indigo-400',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

/**
 * Email validation helper
 */
export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Password strength validator
 */
export function validatePassword(password: string): { valid: boolean; error?: string } {
  if (password.length < 8) {
    return { valid: false, error: 'Password must be at least 8 characters long' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, error: 'Password must contain at least one uppercase letter (A-Z)' };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, error: 'Password must contain at least one lowercase letter (a-z)' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, error: 'Password must contain at least one number (0-9)' };
  }
  if (!/[!@#$%^&*()]/.test(password)) {
    return { valid: false, error: 'Password must contain at least one special character (!@#$%^&*())' };
  }
  return { valid: true };
}

/**
 * Sort medical records by creation timestamp
 */
export function sortRecordsByDate(records: MedicalRecord[], order: 'asc' | 'desc' = 'desc'): MedicalRecord[] {
  return [...records].sort((a, b) => {
    const timeA = new Date(a.createdAt).getTime();
    const timeB = new Date(b.createdAt).getTime();
    return order === 'desc' ? timeB - timeA : timeA - timeB;
  });
}

/**
 * Search medical records by query text
 */
export function searchRecords(records: MedicalRecord[], query: string): MedicalRecord[] {
  if (!query.trim()) return records;
  const q = query.toLowerCase().trim();
  return records.filter(
    (r) =>
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q) ||
      r.uploadedByUserName.toLowerCase().includes(q) ||
      r.fileName.toLowerCase().includes(q)
  );
}

/**
 * Filter records by medical category
 */
export function filterRecordsByCategory(records: MedicalRecord[], category: string): MedicalRecord[] {
  if (!category || category === 'All') return records;
  return records.filter((r) => r.category === category);
}
