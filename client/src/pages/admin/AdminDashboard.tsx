import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Trophy,
  Image as ImageIcon,
  Calendar,
  Mail,
  Download,
  Plus,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { api } from '../../services/api';
import { Application, ContactMessage } from '../../types';

export const AdminDashboard: React.FC = () => {
  const [apps, setApps] = useState<Application[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [stats, setStats] = useState({
    applications: 0,
    pending: 0,
    achievements: 12,
    gallery: 6,
    messages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [appData, msgData, achData, galData] = await Promise.all([
          api.getApplications().catch(() => []),
          api.getContactMessages().catch(() => []),
          api.getAchievements().catch(() => []),
          api.getGallery().catch(() => []),
        ]);

        setApps(appData || []);
        setMessages(msgData || []);

        const pendingCount = (appData || []).filter((a: Application) => a.status === 'PENDING').length;

        setStats({
          applications: appData?.length || 0,
          pending: pendingCount,
          achievements: achData?.length || 12,
          gallery: galData?.length || 6,
          messages: msgData?.length || 0,
        });
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const handleExportCsv = () => {
    const token = localStorage.getItem('vogue_admin_token');
    const url = `/api/applications/export/csv?token=${token}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-8">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-vogue-gold/20">
        <div>
          <span className="font-script text-3xl text-vogue-gold block">Executive Overview</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-vogue-ivory">
            Control Center
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-vogue-gold text-vogue-black text-xs font-bold uppercase tracking-wider hover:bg-vogue-gold-light transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export Roster (CSV)</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Bento */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-vogue-dark border border-vogue-gold/30 rounded-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-vogue-muted font-sans font-bold">
              Audition Applications
            </span>
            <Users className="w-5 h-5 text-vogue-gold" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-serif text-4xl font-bold text-vogue-ivory">
              {stats.applications}
            </span>
            <span className="text-xs text-vogue-gold font-sans font-semibold">
              ({stats.pending} Pending)
            </span>
          </div>
        </div>

        <div className="p-6 bg-vogue-dark border border-vogue-gold/30 rounded-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-vogue-muted font-sans font-bold">
              Official Accolades
            </span>
            <Trophy className="w-5 h-5 text-vogue-gold" />
          </div>
          <div className="mt-4">
            <span className="font-serif text-4xl font-bold text-vogue-ivory">
              {stats.achievements}
            </span>
            <span className="text-xs text-vogue-champagne/70 block mt-1 font-sans">
              Verified Championships
            </span>
          </div>
        </div>

        <div className="p-6 bg-vogue-dark border border-vogue-gold/30 rounded-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-vogue-muted font-sans font-bold">
              Editorial Media
            </span>
            <ImageIcon className="w-5 h-5 text-vogue-gold" />
          </div>
          <div className="mt-4">
            <span className="font-serif text-4xl font-bold text-vogue-ivory">
              {stats.gallery}
            </span>
            <span className="text-xs text-vogue-champagne/70 block mt-1 font-sans">
              Runway &amp; BTS Looks
            </span>
          </div>
        </div>

        <div className="p-6 bg-vogue-dark border border-vogue-gold/30 rounded-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-vogue-muted font-sans font-bold">
              Inquiries &amp; Messages
            </span>
            <Mail className="w-5 h-5 text-vogue-gold" />
          </div>
          <div className="mt-4">
            <span className="font-serif text-4xl font-bold text-vogue-ivory">
              {stats.messages}
            </span>
            <span className="text-xs text-vogue-champagne/70 block mt-1 font-sans">
              Brand &amp; General Inquiries
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Applications & Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Applications (8 cols) */}
        <div className="lg:col-span-8 bg-vogue-dark border border-vogue-gold/25 p-6 rounded-sm space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-vogue-gold/15">
            <h3 className="font-serif text-xl font-bold text-vogue-ivory">
              Latest Audition Submissions
            </h3>
            <Link
              to="/admin/applications"
              className="text-xs text-vogue-gold hover:underline uppercase tracking-wider flex items-center gap-1 font-semibold"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {apps.length === 0 ? (
            <p className="text-xs text-vogue-muted py-8 text-center">
              No applications submitted yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead className="border-b border-vogue-gold/20 text-vogue-gold uppercase tracking-wider">
                  <tr>
                    <th className="py-2.5 px-3">Candidate</th>
                    <th className="py-2.5 px-3">Reg No</th>
                    <th className="py-2.5 px-3">Role</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-vogue-gold/10">
                  {apps.slice(0, 5).map((app) => (
                    <tr key={app.id} className="hover:bg-vogue-black/40">
                      <td className="py-3 px-3 font-semibold text-vogue-ivory">
                        {app.fullName}
                      </td>
                      <td className="py-3 px-3 text-vogue-champagne/80 font-mono">
                        {app.regNumber}
                      </td>
                      <td className="py-3 px-3 text-vogue-champagne/80">
                        {app.category}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded ${
                            app.status === 'SHORTLISTED'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                              : app.status === 'REJECTED'
                              ? 'bg-red-950 text-red-300 border border-red-500/40'
                              : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Messages (4 cols) */}
        <div className="lg:col-span-4 bg-vogue-dark border border-vogue-gold/25 p-6 rounded-sm space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-vogue-gold/15">
            <h3 className="font-serif text-xl font-bold text-vogue-ivory">
              Recent Inquiries
            </h3>
            <Link
              to="/admin/messages"
              className="text-xs text-vogue-gold hover:underline uppercase tracking-wider font-semibold"
            >
              Inbox
            </Link>
          </div>

          {messages.length === 0 ? (
            <p className="text-xs text-vogue-muted py-8 text-center">
              No inquiries in inbox.
            </p>
          ) : (
            <div className="space-y-3">
              {messages.slice(0, 4).map((msg) => (
                <div key={msg.id} className="p-3 bg-vogue-black/60 border border-vogue-gold/15 rounded-sm">
                  <div className="flex items-center justify-between text-[10px] text-vogue-gold font-bold uppercase">
                    <span>{msg.name}</span>
                    <span>{msg.queryType}</span>
                  </div>
                  <p className="text-xs text-vogue-champagne/90 font-sans mt-1 line-clamp-2">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
