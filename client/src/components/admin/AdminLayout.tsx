import React from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Trophy,
  Calendar,
  Image as ImageIcon,
  Users,
  Mail,
  LogOut,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, path: '/admin/dashboard' },
    { label: 'Audition Applications', icon: <Users className="w-4 h-4" />, path: '/admin/applications' },
    { label: 'Achievements', icon: <Trophy className="w-4 h-4" />, path: '/admin/achievements' },
    { label: 'Gallery Showcase', icon: <ImageIcon className="w-4 h-4" />, path: '/admin/gallery' },
    { label: 'Events & Calendar', icon: <Calendar className="w-4 h-4" />, path: '/admin/events' },
    { label: 'Inquiry Inbox', icon: <Mail className="w-4 h-4" />, path: '/admin/messages' },
  ];

  return (
    <div className="min-h-screen bg-vogue-black text-vogue-ivory flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-vogue-dark border-r border-vogue-gold/20 flex flex-col justify-between shrink-0">
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-vogue-gold/15 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-vogue-gold/50 p-0.5 bg-vogue-black shrink-0">
                <img src="/images/vogue-logo.png" alt="VOGUE" className="w-full h-full object-cover rounded-full" />
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-vogue-ivory block leading-none">
                  VOGUE SOA
                </span>
                <span className="text-[9px] uppercase tracking-widest text-vogue-gold font-sans font-semibold">
                  Executive Suite
                </span>
              </div>
            </Link>
          </div>

          {/* User Badge */}
          <div className="px-6 py-4 bg-vogue-black/40 border-b border-vogue-gold/10">
            <span className="text-[10px] uppercase tracking-wider text-vogue-muted block font-sans">
              Signed in as
            </span>
            <span className="text-xs font-bold text-vogue-champagne block truncate">
              {user?.username || 'vogue_admin'}
            </span>
            <span className="inline-block mt-1 px-2 py-0.5 rounded bg-vogue-gold/20 text-vogue-gold text-[9px] font-bold uppercase tracking-wider">
              {user?.role || 'SUPERADMIN'}
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 font-sans text-xs">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-none uppercase tracking-wider font-semibold transition-all ${
                    isActive
                      ? 'bg-vogue-gold text-vogue-black shadow-md shadow-vogue-gold/10 font-bold'
                      : 'text-vogue-champagne/80 hover:bg-vogue-black hover:text-vogue-gold'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-vogue-gold/15 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-4 py-2.5 text-xs text-vogue-champagne/70 hover:text-vogue-gold hover:bg-vogue-black transition-all"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              Public Website
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-red-300 hover:bg-red-950/40 border border-red-500/20 transition-all text-left"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>End Session</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Viewport */}
      <main className="flex-1 p-6 sm:p-10 bg-vogue-black overflow-y-auto flex flex-col justify-between">
        <div>
          <Outlet />
        </div>

        {/* Persistent Admin Footer Credit */}
        <div className="mt-12 pt-6 border-t border-vogue-gold/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-vogue-muted">
          <span>VOGUE – SOA Fashion Club Management Suite</span>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-vogue-gold/30 bg-vogue-dark/90">
            <div className="w-5 h-5 rounded-full overflow-hidden bg-white p-0.5 flex items-center justify-center shrink-0">
              <img src="/images/gdgoc-iter-logo.png" alt="Google Developer Group @SOA, ITER Chapter" className="w-full h-full object-contain" />
            </div>
            <span className="text-vogue-champagne text-[11px] font-medium">
              Website crafted by <strong className="text-vogue-gold font-bold">GDGoC ITER</strong>
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};
