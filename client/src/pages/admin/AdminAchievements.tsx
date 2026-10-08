import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Trophy, Plus, Trash2, Edit2, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { api } from '../../services/api';
import { Achievement } from '../../types';
import { GoldButton } from '../../components/common/GoldButton';

const schema = z.object({
  title: z.string().min(2, 'Title is required'),
  position: z.string().min(2, 'Position is required (e.g. Champion, Runners Up)'),
  institution: z.string().min(2, 'Host institution is required'),
  year: z.coerce.number().min(2015).max(2035),
  category: z.string().default('NATIONAL_RUNWAY'),
  description: z.string().optional(),
  isHighlight: z.boolean().default(false),
  displayOrder: z.coerce.number().default(0),
});

type FormData = z.infer<typeof schema>;

export const AdminAchievements: React.FC = () => {
  const [items, setItems] = useState<Achievement[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Achievement | null>(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      year: 2026,
      category: 'NATIONAL_RUNWAY',
      isHighlight: false,
      displayOrder: 0,
    },
  });

  const loadData = async () => {
    try {
      const data = await api.getAchievements();
      setItems(data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    reset({
      title: '',
      position: '',
      institution: '',
      year: 2026,
      category: 'NATIONAL_RUNWAY',
      description: '',
      isHighlight: false,
      displayOrder: 0,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item: Achievement) => {
    setEditingItem(item);
    reset({
      title: item.title,
      position: item.position,
      institution: item.institution,
      year: item.year,
      category: item.category,
      description: item.description || '',
      isHighlight: item.isHighlight,
      displayOrder: item.displayOrder,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to remove this achievement?')) return;
    try {
      await api.deleteAchievement(id);
      setItems(items.filter((i) => i.id !== id));
      setFeedback('Achievement removed successfully');
    } catch {
      alert('Failed to delete achievement');
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      if (editingItem) {
        const updated = await api.updateAchievement(editingItem.id, data);
        setItems(items.map((i) => (i.id === editingItem.id ? updated : i)));
        setFeedback('Achievement updated successfully');
      } else {
        const created = await api.createAchievement(data);
        setItems([created, ...items]);
        setFeedback('Achievement added to trophy roster');
      }
      setModalOpen(false);
    } catch (err: any) {
      alert(err.response?.data?.error?.message || 'Error saving achievement');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-vogue-gold/20">
        <div>
          <span className="font-script text-3xl text-vogue-gold block">Hall of Fame</span>
          <h1 className="font-serif text-3xl font-bold text-vogue-ivory">
            Manage Achievements
          </h1>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-vogue-gold text-vogue-black text-xs font-bold uppercase tracking-wider hover:bg-vogue-gold-light transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Victory</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center justify-between">
          <span>{feedback}</span>
          <button onClick={() => setFeedback(null)} className="text-emerald-400">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-vogue-dark border border-vogue-gold/20 rounded-sm overflow-x-auto">
        <table className="w-full text-left text-xs font-sans">
          <thead className="border-b border-vogue-gold/20 bg-vogue-black/50 text-vogue-gold uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Title / Event</th>
              <th className="py-3 px-4">Position</th>
              <th className="py-3 px-4">Institution</th>
              <th className="py-3 px-4">Year</th>
              <th className="py-3 px-4">Highlight</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-vogue-gold/10">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-vogue-black/30">
                <td className="py-3.5 px-4 font-semibold text-vogue-ivory">
                  {item.title}
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 bg-vogue-gold/20 text-vogue-gold font-bold uppercase text-[10px]">
                    {item.position}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-vogue-champagne/80">
                  {item.institution}
                </td>
                <td className="py-3.5 px-4 font-mono text-vogue-champagne">
                  {item.year}
                </td>
                <td className="py-3.5 px-4">
                  {item.isHighlight ? (
                    <span className="text-emerald-400 font-semibold">Yes</span>
                  ) : (
                    <span className="text-vogue-muted">No</span>
                  )}
                </td>
                <td className="py-3.5 px-4 text-right space-x-2">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 text-vogue-champagne hover:text-vogue-gold"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 text-red-400 hover:text-red-300"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-vogue-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-vogue-dark border border-vogue-gold/40 p-6 sm:p-8 max-w-lg w-full rounded-sm shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-vogue-champagne hover:text-vogue-gold"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl font-bold text-vogue-ivory mb-6">
              {editingItem ? 'Edit Achievement' : 'Add New Achievement'}
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block uppercase tracking-wider text-vogue-champagne font-bold mb-1">
                  Title / Event Name *
                </label>
                <input
                  {...register('title')}
                  placeholder="e.g. Spectra Runway"
                  className="w-full bg-vogue-black border border-vogue-gold/30 px-3 py-2 text-vogue-ivory focus:outline-none focus:border-vogue-gold"
                />
                {errors.title && <span className="text-red-400">{errors.title.message}</span>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-vogue-champagne font-bold mb-1">
                    Position Won *
                  </label>
                  <input
                    {...register('position')}
                    placeholder="e.g. Champion / Winner"
                    className="w-full bg-vogue-black border border-vogue-gold/30 px-3 py-2 text-vogue-ivory focus:outline-none focus:border-vogue-gold"
                  />
                  {errors.position && <span className="text-red-400">{errors.position.message}</span>}
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-vogue-champagne font-bold mb-1">
                    Year *
                  </label>
                  <input
                    {...register('year')}
                    type="number"
                    placeholder="2026"
                    className="w-full bg-vogue-black border border-vogue-gold/30 px-3 py-2 text-vogue-ivory focus:outline-none focus:border-vogue-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-vogue-champagne font-bold mb-1">
                  Host Institution *
                </label>
                <input
                  {...register('institution')}
                  placeholder="e.g. Birla Global University (BGU)"
                  className="w-full bg-vogue-black border border-vogue-gold/30 px-3 py-2 text-vogue-ivory focus:outline-none focus:border-vogue-gold"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-vogue-champagne font-bold mb-1">
                  Description Notes
                </label>
                <textarea
                  {...register('description')}
                  rows={3}
                  placeholder="Details about choreography, team, theme..."
                  className="w-full bg-vogue-black border border-vogue-gold/30 px-3 py-2 text-vogue-ivory focus:outline-none focus:border-vogue-gold"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isHighlight"
                  {...register('isHighlight')}
                  className="accent-vogue-gold"
                />
                <label htmlFor="isHighlight" className="text-vogue-champagne uppercase font-bold text-[11px]">
                  Feature on Main Showcase Bento Counters
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-vogue-gold/30 text-vogue-champagne uppercase font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-vogue-gold text-vogue-black uppercase font-bold hover:bg-vogue-gold-light"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
