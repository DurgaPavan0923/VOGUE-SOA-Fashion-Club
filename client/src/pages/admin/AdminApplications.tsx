import React, { useEffect, useState } from 'react';
import { Download, Search, Filter, CheckCircle, XCircle, Clock, Trash2, ExternalLink } from 'lucide-react';
import { api } from '../../services/api';
import { Application } from '../../types';

export const AdminApplications: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filtered, setFiltered] = useState<Application[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const data = await api.getApplications();
      setApplications(data || []);
      setFiltered(data || []);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    let list = applications;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      list = list.filter(
        (a) =>
          a.fullName.toLowerCase().includes(term) ||
          a.regNumber.toLowerCase().includes(term) ||
          a.email.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== 'ALL') {
      list = list.filter((a) => a.status === statusFilter);
    }

    if (categoryFilter !== 'ALL') {
      list = list.filter((a) => a.category === categoryFilter);
    }

    setFiltered(list);
  }, [searchTerm, statusFilter, categoryFilter, applications]);

  const handleStatusChange = async (id: string, newStatus: 'PENDING' | 'SHORTLISTED' | 'REJECTED') => {
    try {
      await api.updateApplicationStatus(id, newStatus);
      setApplications(
        applications.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
      );
    } catch {
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Remove this application record?')) return;
    try {
      await api.deleteApplication(id);
      setApplications(applications.filter((a) => a.id !== id));
    } catch {
      alert('Error deleting application');
    }
  };

  const handleExport = () => {
    const token = localStorage.getItem('vogue_admin_token');
    window.open(`/api/applications/export/csv?token=${token}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-vogue-gold/20">
        <div>
          <span className="font-script text-3xl text-vogue-gold block">Recruitment Roster</span>
          <h1 className="font-serif text-3xl font-bold text-vogue-ivory">
            Audition Applications ({applications.length})
          </h1>
        </div>

        <button
          onClick={handleExport}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-vogue-gold text-vogue-black text-xs font-bold uppercase tracking-wider hover:bg-vogue-gold-light transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Download Roster (CSV)</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-vogue-dark p-4 border border-vogue-gold/20 rounded-sm">
        <div className="relative">
          <Search className="w-4 h-4 text-vogue-gold absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search candidate name or reg number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-vogue-black border border-vogue-gold/30 pl-9 pr-3 py-2 text-xs text-vogue-ivory focus:outline-none focus:border-vogue-gold font-sans"
          />
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-vogue-black border border-vogue-gold/30 px-3 py-2 text-xs text-vogue-ivory focus:outline-none focus:border-vogue-gold font-sans"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending Review</option>
            <option value="SHORTLISTED">Shortlisted</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>

        <div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full bg-vogue-black border border-vogue-gold/30 px-3 py-2 text-xs text-vogue-ivory focus:outline-none focus:border-vogue-gold font-sans"
          >
            <option value="ALL">All Categories</option>
            <option value="RUNWAY_MODEL">Runway Model</option>
            <option value="STYLING">Styling &amp; Makeup</option>
            <option value="PR_BTS">PR &amp; Media Operations</option>
            <option value="DESIGN">Design &amp; Illustration</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-vogue-dark border border-vogue-gold/20 rounded-sm overflow-x-auto">
        <table className="w-full text-left text-xs font-sans">
          <thead className="border-b border-vogue-gold/20 bg-vogue-black/60 text-vogue-gold uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Candidate</th>
              <th className="py-3 px-4">Reg No</th>
              <th className="py-3 px-4">Branch / Year</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Audition Slot</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-vogue-gold/10">
            {filtered.map((app) => (
              <tr key={app.id} className="hover:bg-vogue-black/40">
                <td className="py-3.5 px-4 font-semibold text-vogue-ivory">
                  <div>{app.fullName}</div>
                  <div className="text-[11px] text-vogue-muted font-normal">{app.email} · {app.phone}</div>
                </td>
                <td className="py-3.5 px-4 font-mono text-vogue-champagne">
                  {app.regNumber}
                </td>
                <td className="py-3.5 px-4 text-vogue-champagne/80">
                  {app.branchYear}
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 bg-vogue-black border border-vogue-gold/40 text-vogue-gold font-bold uppercase text-[9px]">
                    {app.category}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-vogue-muted text-[11px] max-w-[180px]">
                  {app.auditionSlot}
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`px-2.5 py-0.5 text-[9px] font-bold uppercase rounded ${
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
                <td className="py-3.5 px-4 text-right space-x-1.5">
                  <button
                    onClick={() => handleStatusChange(app.id, 'SHORTLISTED')}
                    className="p-1.5 text-emerald-400 hover:text-emerald-300"
                    title="Shortlist"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleStatusChange(app.id, 'REJECTED')}
                    className="p-1.5 text-amber-400 hover:text-amber-300"
                    title="Reject"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(app.id)}
                    className="p-1.5 text-red-400 hover:text-red-300"
                    title="Delete Record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
