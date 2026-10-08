import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image as ImageIcon, Plus, Trash2, UploadCloud, X, AlertCircle } from 'lucide-react';
import { api } from '../../services/api';
import { GalleryItem } from '../../types';

export const AdminGallery: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'RUNWAY' | 'EDITORIAL' | 'BTS' | 'WORKSHOP'>('RUNWAY');

  const loadData = async () => {
    try {
      const data = await api.getGallery();
      setItems(data || []);
    } catch {}
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this gallery photo?')) return;
    try {
      await api.deleteGalleryItem(id);
      setItems(items.filter((i) => i.id !== id));
    } catch {
      alert('Error removing image');
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      alert('Please enter a look title');
      return;
    }

    setUploading(true);

    try {
      let imageUrl = '/images/shoots/shoot-20260403-sd0-8440.jpg';

      if (selectedFile) {
        const formData = new FormData();
        formData.append('image', selectedFile);
        const uploadRes = await api.uploadGalleryImage(formData);
        imageUrl = uploadRes.imageUrl;
      }

      const created = await api.createGalleryItem({
        title,
        category,
        imageUrl,
        aspectRatio: category === 'BTS' ? '16:9' : '3:4',
      });

      setItems([created, ...items]);
      setModalOpen(false);
      setTitle('');
      setSelectedFile(null);
    } catch (err: any) {
      alert(err.response?.data?.error?.message || 'Error uploading photo');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-vogue-gold/20">
        <div>
          <span className="font-script text-3xl text-vogue-gold block">Visual Archive</span>
          <h1 className="font-serif text-3xl font-bold text-vogue-ivory">
            Manage Gallery Media
          </h1>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-vogue-gold text-vogue-black text-xs font-bold uppercase tracking-wider hover:bg-vogue-gold-light transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Upload New Photo</span>
        </button>
      </div>

      {/* Grid Showcase */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-vogue-dark border border-vogue-gold/20 rounded-sm overflow-hidden flex flex-col justify-between group"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-vogue-black">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-2 left-2">
                <span className="px-2 py-0.5 bg-vogue-black/80 border border-vogue-gold text-[9px] uppercase font-bold text-vogue-gold">
                  {item.category}
                </span>
              </div>
            </div>

            <div className="p-3.5 flex items-center justify-between">
              <span className="text-xs font-serif font-bold text-vogue-ivory truncate max-w-[160px]">
                {item.title}
              </span>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-1.5 text-red-400 hover:text-red-300 transition-colors"
                title="Delete Photo"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-vogue-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-vogue-dark border border-vogue-gold/40 p-6 sm:p-8 max-w-md w-full rounded-sm shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-vogue-champagne hover:text-vogue-gold"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl font-bold text-vogue-ivory mb-6">
              Upload Gallery Photo
            </h3>

            <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block uppercase tracking-wider text-vogue-champagne font-bold mb-1">
                  Look / Event Title *
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Spectra 2025 Gold Finale"
                  className="w-full bg-vogue-black border border-vogue-gold/30 px-3 py-2 text-vogue-ivory"
                  required
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-vogue-champagne font-bold mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-vogue-black border border-vogue-gold/30 px-3 py-2 text-vogue-ivory"
                >
                  <option value="RUNWAY">Runway</option>
                  <option value="EDITORIAL">Editorial</option>
                  <option value="BTS">Behind The Scenes (BTS)</option>
                  <option value="WORKSHOP">Workshop</option>
                </select>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-vogue-champagne font-bold mb-1">
                  Choose Photo File (Max 10MB)
                </label>
                <div className="border-2 border-dashed border-vogue-gold/30 p-6 text-center hover:border-vogue-gold transition-colors cursor-pointer bg-vogue-black/50">
                  <UploadCloud className="w-8 h-8 text-vogue-gold mx-auto mb-2" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    className="w-full text-xs text-vogue-champagne/80"
                  />
                  {selectedFile && (
                    <span className="block mt-2 text-vogue-gold font-mono text-[10px]">
                      Selected: {selectedFile.name}
                    </span>
                  )}
                </div>
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
                  disabled={uploading}
                  className="px-6 py-2 bg-vogue-gold text-vogue-black uppercase font-bold hover:bg-vogue-gold-light disabled:opacity-50"
                >
                  {uploading ? 'Uploading...' : 'Save & Publish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
