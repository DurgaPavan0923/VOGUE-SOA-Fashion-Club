import axios from 'axios';
import {
  ApiResponse,
  Achievement,
  EventItem,
  GalleryItem,
  Theme,
  Member,
  Application,
  ContactMessage,
  AdminUser,
} from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach admin token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('vogue_admin_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor for handling 401s
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && window.location.pathname.startsWith('/admin')) {
      localStorage.removeItem('vogue_admin_token');
      localStorage.removeItem('vogue_admin_user');
      if (window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export const api = {
  // Public Data
  getAchievements: async (params?: { year?: number; highlight?: boolean }) => {
    const res = await apiClient.get<ApiResponse<Achievement[]>>('/achievements', { params });
    return res.data.data;
  },

  getThemes: async () => {
    const res = await apiClient.get<ApiResponse<Theme[]>>('/themes');
    return res.data.data;
  },

  getGallery: async (params?: { category?: string; themeId?: string; featured?: boolean }) => {
    const res = await apiClient.get<ApiResponse<GalleryItem[]>>('/gallery', { params });
    return res.data.data;
  },

  getEvents: async (params?: { status?: string; category?: string }) => {
    const res = await apiClient.get<ApiResponse<EventItem[]>>('/events', { params });
    return res.data.data;
  },

  getTeam: async (params?: { category?: string }) => {
    const res = await apiClient.get<ApiResponse<Member[]>>('/members', { params });
    return res.data.data;
  },

  submitApplication: async (payload: Partial<Application>) => {
    const res = await apiClient.post<ApiResponse<{ id: string; fullName: string }>>('/applications', payload);
    return res.data;
  },

  submitContact: async (payload: Partial<ContactMessage>) => {
    const res = await apiClient.post<ApiResponse<{ id: string }>>('/contact', payload);
    return res.data;
  },

  // Admin Auth
  login: async (credentials: { username: string; password: string }) => {
    const res = await apiClient.post<ApiResponse<{ token: string; user: AdminUser }>>('/auth/login', credentials);
    return res.data.data;
  },

  getMe: async () => {
    const res = await apiClient.get<ApiResponse<AdminUser>>('/auth/me');
    return res.data.data;
  },

  // Admin Achievements CRUD
  createAchievement: async (data: Partial<Achievement>) => {
    const res = await apiClient.post<ApiResponse<Achievement>>('/achievements', data);
    return res.data.data;
  },

  updateAchievement: async (id: string, data: Partial<Achievement>) => {
    const res = await apiClient.put<ApiResponse<Achievement>>(`/achievements/${id}`, data);
    return res.data.data;
  },

  deleteAchievement: async (id: string) => {
    const res = await apiClient.delete<ApiResponse<null>>(`/achievements/${id}`);
    return res.data;
  },

  // Admin Events CRUD
  createEvent: async (data: Partial<EventItem>) => {
    const res = await apiClient.post<ApiResponse<EventItem>>('/events', data);
    return res.data.data;
  },

  updateEvent: async (id: string, data: Partial<EventItem>) => {
    const res = await apiClient.put<ApiResponse<EventItem>>(`/events/${id}`, data);
    return res.data.data;
  },

  deleteEvent: async (id: string) => {
    const res = await apiClient.delete<ApiResponse<null>>(`/events/${id}`);
    return res.data;
  },

  // Admin Gallery CRUD
  uploadGalleryImage: async (formData: FormData) => {
    const res = await apiClient.post<ApiResponse<{ imageUrl: string; filename: string }>>('/gallery/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data.data;
  },

  createGalleryItem: async (data: Partial<GalleryItem>) => {
    const res = await apiClient.post<ApiResponse<GalleryItem>>('/gallery', data);
    return res.data.data;
  },

  deleteGalleryItem: async (id: string) => {
    const res = await apiClient.delete<ApiResponse<null>>(`/gallery/${id}`);
    return res.data;
  },

  // Admin Applications
  getApplications: async (params?: { category?: string; status?: string; slot?: string }) => {
    const res = await apiClient.get<ApiResponse<Application[]>>('/applications', { params });
    return res.data.data;
  },

  updateApplicationStatus: async (id: string, status: string, notes?: string) => {
    const res = await apiClient.patch<ApiResponse<Application>>(`/applications/${id}/status`, { status, notes });
    return res.data.data;
  },

  deleteApplication: async (id: string) => {
    const res = await apiClient.delete<ApiResponse<null>>(`/applications/${id}`);
    return res.data;
  },

  exportApplicationsCsvUrl: () => {
    const token = localStorage.getItem('vogue_admin_token') || '';
    return `${API_BASE}/applications/export/csv?token=${encodeURIComponent(token)}`;
  },

  // Admin Contact Messages
  getContactMessages: async () => {
    const res = await apiClient.get<ApiResponse<ContactMessage[]>>('/contact');
    return res.data.data;
  },

  markContactRead: async (id: string, isRead: boolean) => {
    const res = await apiClient.patch<ApiResponse<ContactMessage>>(`/contact/${id}/read`, { isRead });
    return res.data.data;
  },

  deleteContactMessage: async (id: string) => {
    const res = await apiClient.delete<ApiResponse<null>>(`/contact/${id}`);
    return res.data;
  },
};
