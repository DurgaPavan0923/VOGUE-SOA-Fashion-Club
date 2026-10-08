export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: string;
}

export interface Achievement {
  id: string;
  title: string;
  position: string;
  institution: string;
  year: number;
  category: string;
  description?: string;
  badgeUrl?: string;
  isHighlight: boolean;
  displayOrder: number;
  createdAt: string;
}

export interface EventItem {
  id: string;
  title: string;
  category: string;
  eventDate: string;
  venue: string;
  description: string;
  registrationUrl?: string;
  coverImageUrl?: string;
  status: 'UPCOMING' | 'COMPLETED' | 'CANCELLED';
  displayOrder: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'RUNWAY' | 'EDITORIAL' | 'BTS' | 'WORKSHOP';
  themeId?: string | null;
  imageUrl: string;
  videoUrl?: string;
  isVideo?: boolean;
  aspectRatio: string;
  isFeatured: boolean;
  displayOrder: number;
  theme?: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface Theme {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  narrative: string;
  paletteTokens: string[];
  coverImageUrl?: string;
  displayOrder: number;
  galleryItems?: GalleryItem[];
}

export interface Member {
  id: string;
  fullName: string;
  roleTitle: string;
  category: 'FOUNDER' | 'FACULTY' | 'LEAD_MODEL' | 'CORE';
  bio?: string;
  avatarUrl?: string;
  instagramUrl?: string;
  displayOrder: number;
}

export interface Application {
  id: string;
  fullName: string;
  regNumber: string;
  email: string;
  phone: string;
  branchYear: string;
  category: 'RUNWAY_MODEL' | 'STYLING' | 'PR_BTS' | 'DESIGN';
  heightFeet?: string;
  instagramHandle?: string;
  portfolioUrl?: string;
  auditionSlot: string;
  status: 'PENDING' | 'SHORTLISTED' | 'REJECTED';
  notes?: string;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  queryType: 'GENERAL' | 'SPONSORSHIP' | 'INVITATION';
  subject?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  meta?: {
    timestamp: string;
    totalCount?: number;
  };
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}
