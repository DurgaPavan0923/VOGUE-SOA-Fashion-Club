import React, { useEffect, useState } from 'react';
import { Mail, Trash2, CheckCircle2, CircleDot } from 'lucide-react';
import { api } from '../../services/api';
import { ContactMessage } from '../../types';

export const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const data = await api.getContactMessages();
      setMessages(data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleRead = async (id: string, currentStatus: boolean) => {
    try {
      await api.markContactRead(id, !currentStatus);
      setMessages(
        messages.map((m) => (m.id === id ? { ...m, isRead: !currentStatus } : m))
      );
    } catch {
      alert('Error updating status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete message from inbox?')) return;
    try {
      await api.deleteContactMessage(id);
      setMessages(messages.filter((m) => m.id !== id));
    } catch {
      alert('Error deleting message');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-vogue-gold/20">
        <div>
          <span className="font-script text-3xl text-vogue-gold block">Correspondence</span>
          <h1 className="font-serif text-3xl font-bold text-vogue-ivory">
            Inquiry Inbox ({messages.length})
          </h1>
        </div>
      </div>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="p-12 text-center text-xs text-vogue-muted bg-vogue-dark border border-vogue-gold/20 rounded-sm">
            No inquiries received yet.
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-6 rounded-sm border transition-all ${
                msg.isRead
                  ? 'bg-vogue-dark/60 border-vogue-gold/15 opacity-75'
                  : 'bg-vogue-dark border-vogue-gold/40 shadow-lg'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-lg font-bold text-vogue-ivory">
                    {msg.name}
                  </span>
                  <span className="text-xs text-vogue-champagne/80 font-sans">
                    ({msg.email})
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 bg-vogue-black border border-vogue-gold/30 text-vogue-gold text-[10px] font-bold uppercase">
                    {msg.queryType}
                  </span>
                  <span className="text-[11px] text-vogue-muted font-mono">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {msg.subject && (
                <div className="text-xs font-semibold text-vogue-champagne mb-2">
                  Subject: {msg.subject}
                </div>
              )}

              <p className="text-xs sm:text-sm text-vogue-champagne/90 font-sans leading-relaxed bg-vogue-black/40 p-4 border border-vogue-gold/10 rounded-sm">
                {msg.message}
              </p>

              <div className="mt-4 pt-3 border-t border-vogue-gold/10 flex items-center justify-between">
                <button
                  onClick={() => handleToggleRead(msg.id, msg.isRead)}
                  className="inline-flex items-center gap-1.5 text-xs text-vogue-champagne hover:text-vogue-gold font-sans"
                >
                  {msg.isRead ? (
                    <>
                      <CircleDot className="w-3.5 h-3.5 text-vogue-muted" />
                      <span>Mark as Unread</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Mark as Read</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleDelete(msg.id)}
                  className="text-red-400 hover:text-red-300 text-xs p-1"
                  title="Delete message"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
