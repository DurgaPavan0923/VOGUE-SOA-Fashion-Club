import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const applicationSchema = z.object({
  fullName: z.string().trim().min(2, 'Full name must be at least 2 characters').max(100, 'Name is too long'),
  regNumber: z.string().trim().regex(/^[a-zA-Z0-9]{4,20}$/, 'Valid alphanumeric SOA registration number is required (4-20 characters)'),
  email: z.string().trim().email('Valid student email address is required'),
  phone: z.string().trim().regex(/^(\+91[\-\s]?)?[0-9]{10}$/, 'Valid 10-digit Indian mobile number is required'),
  branchYear: z.string().trim().min(2, 'Branch and Year are required (e.g., CSE 2nd Year)'),
  category: z.enum(['RUNWAY_MODEL', 'STYLING', 'PR_BTS', 'DESIGN'], {
    errorMap: () => ({ message: 'Please select a valid role category' }),
  }),
  heightFeet: z.string().trim().max(20).optional(),
  instagramHandle: z.string().trim().max(50).optional(),
  portfolioUrl: z.string().trim().url('Invalid portfolio URL format').optional().or(z.literal('')),
  auditionSlot: z.string().trim().min(2, 'Please select an audition slot'),
});

export const contactMessageSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  queryType: z.enum(['GENERAL', 'SPONSORSHIP', 'INVITATION']).default('GENERAL'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
});

export const achievementSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  position: z.string().min(2, 'Position is required'),
  institution: z.string().min(2, 'Institution is required'),
  year: z.number().int().min(2015).max(2035),
  category: z.string().default('RUNWAY'),
  description: z.string().optional(),
  badgeUrl: z.string().optional(),
  isHighlight: z.boolean().default(false),
  displayOrder: z.number().int().default(0),
});

export const eventSchema = z.object({
  title: z.string().min(2, 'Event title is required'),
  category: z.string().default('RAMP_SHOW'),
  eventDate: z.string().or(z.date()),
  venue: z.string().min(2, 'Venue is required'),
  description: z.string().min(5, 'Description is required'),
  registrationUrl: z.string().optional(),
  coverImageUrl: z.string().optional(),
  status: z.enum(['UPCOMING', 'COMPLETED', 'CANCELLED']).default('UPCOMING'),
  displayOrder: z.number().int().default(0),
});

export const themeSchema = z.object({
  slug: z.string().min(2),
  name: z.string().min(2),
  tagline: z.string().min(2),
  narrative: z.string().min(10),
  paletteTokens: z.string(),
  coverImageUrl: z.string().optional(),
  displayOrder: z.number().int().default(0),
});
