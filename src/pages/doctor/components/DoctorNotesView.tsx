import React, { useState } from 'react';
import { 
  BookOpen, Plus, Trash2, Edit3, Search, Clock, Check
} from 'lucide-react';
import { GlassCard, PrimaryButton, SecondaryButton, SearchBar, EmptyState } from '../../../components/ui';

interface DoctorNote {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
}

interface DoctorNotesViewProps {
  patientId: string;
}

export default function DoctorNotesView({ patientId }: DoctorNotesViewProps) {
  const [notes, setNotes] = useState<DoctorNote[]>([
    {
      id: 'note-1',
      title: 'Initial Clinical Observation',
      content: 'Patient reported mild recurring headache. Vitals normal. Advised hydration and sleep hygiene.',
      category: 'General',
      createdAt: new Date().toISOString(),
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddOrUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    if (editingId) {
      setNotes(notes.map(n => n.id === editingId ? { ...n, title, content, category } : n));
      setEditingId(null);
    } else {
      const newNote: DoctorNote = {
        id: `note-${Date.now()}`,
        title,
        content,
        category,
        createdAt: new Date().toISOString(),
      };
      setNotes([newNote, ...notes]);
    }

    setTitle('');
    setContent('');
    setCategory('General');
  };

  const handleEdit = (note: DoctorNote) => {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
    setCategory(note.category);
  };

  const handleDelete = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#38bdf8]" /> Private Clinician Progress Notes
          </h2>
          <p className="text-xs text-slate-400">Keep confidential clinical observations and treatment notes for {patientId}.</p>
        </div>

        <div className="w-full sm:w-64">
          <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search notes..." onClear={() => setSearchQuery('')} />
        </div>
      </div>

      {/* Add / Edit Form */}
      <GlassCard className="p-6 space-y-4">
        <h3 className="text-xs font-bold font-mono text-[#38bdf8] uppercase tracking-wider">
          {editingId ? 'Edit Clinical Note' : 'Add New Confidential Clinical Note'}
        </h3>

        <form onSubmit={handleAddOrUpdate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Note Title (e.g. Follow-up Assessment)"
                className="w-full px-3.5 py-2.5 rounded-xl premium-input text-xs text-white outline-none"
              />
            </div>
            <div>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl premium-input text-xs text-white outline-none cursor-pointer"
              >
                <option value="General">General</option>
                <option value="Diagnosis">Diagnosis</option>
                <option value="Surgical">Surgical</option>
                <option value="Medication">Medication</option>
                <option value="Follow-up">Follow-up</option>
              </select>
            </div>
          </div>

          <textarea
            required
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Write clinical details, treatment observations, or diagnostic notes..."
            rows={3}
            className="w-full px-3.5 py-2.5 rounded-xl premium-input text-xs text-white outline-none resize-none"
          />

          <div className="flex justify-end gap-2">
            {editingId && (
              <SecondaryButton
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setTitle('');
                  setContent('');
                }}
              >
                Cancel
              </SecondaryButton>
            )}
            <PrimaryButton type="submit">
              {editingId ? 'Update Note' : 'Save Clinical Note'}
            </PrimaryButton>
          </div>
        </form>
      </GlassCard>

      {/* Notes List */}
      {filteredNotes.length === 0 ? (
        <EmptyState
          title="No Clinical Notes"
          description="No clinical notes match your search or have been created for this patient."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNotes.map(n => (
            <GlassCard key={n.id} className="p-5 space-y-3 relative hover:border-[#38bdf8]/30 transition">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono font-bold text-[#38bdf8] bg-[#38bdf8]/10 px-2.5 py-0.5 rounded uppercase">
                  {n.category}
                </span>
                <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {new Date(n.createdAt).toLocaleDateString()}
                </span>
              </div>

              <h4 className="font-bold text-white text-sm">{n.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">{n.content}</p>

              <div className="flex justify-end gap-2 pt-2 border-t border-white/5">
                <button
                  onClick={() => handleEdit(n)}
                  className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(n.id)}
                  className="p-1.5 hover:bg-rose-500/10 rounded-lg text-slate-400 hover:text-rose-400 transition cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

    </div>
  );
}
