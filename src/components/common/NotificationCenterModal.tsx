import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, ShieldAlert, Activity, CheckCircle, Clock, Trash2, X, Check, 
  Key, Shield, AlertTriangle, Layers, Filter
} from 'lucide-react';
import { Notification } from '../../types';

interface NotificationCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  unreadCount: number;
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
  onClearNotification?: (id: string) => void;
}

export default function NotificationCenterModal({
  isOpen,
  onClose,
  notifications = [],
  unreadCount = 0,
  onMarkRead,
  onMarkAllRead,
  onClearNotification,
}: NotificationCenterModalProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'medical' | 'system' | 'security' | 'requests' | 'critical'>('all');

  if (!isOpen) return null;

  // Categorize notifications
  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !n.read;
    const type = (n.type || '').toLowerCase();
    const title = (n.title || '').toLowerCase();
    const msg = (n.message || '').toLowerCase();

    if (activeTab === 'medical') return type.includes('medical') || title.includes('report') || title.includes('prescription');
    if (activeTab === 'system') return type.includes('system') || title.includes('sync') || title.includes('update');
    if (activeTab === 'security') return type.includes('security') || title.includes('auth') || title.includes('login');
    if (activeTab === 'requests') return type.includes('access') || title.includes('clearance') || title.includes('request');
    if (activeTab === 'critical') return type.includes('critical') || title.includes('emergency') || title.includes('urgent');
    return true;
  });

  const getCategoryIcon = (n: Notification) => {
    const title = (n.title || '').toLowerCase();
    if (title.includes('clearance') || title.includes('access')) return <Key className="w-4 h-4 text-[#38bdf8]" />;
    if (title.includes('emergency') || title.includes('urgent')) return <ShieldAlert className="w-4 h-4 text-rose-400" />;
    if (title.includes('prescription') || title.includes('report')) return <Activity className="w-4 h-4 text-emerald-400" />;
    return <Bell className="w-4 h-4 text-purple-400" />;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020617]/80 backdrop-blur-md animate-fade-in">
        
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="w-full max-w-2xl bg-slate-950 border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col h-[75vh]"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-slate-900/80">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#38bdf8]/10 text-[#38bdf8] rounded-xl border border-[#38bdf8]/20">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white font-display">Notification Center</h2>
                <p className="text-xs text-slate-400">Clinical ledger updates, access clearance alerts & security notifications.</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={onMarkAllRead}
                  className="px-3 py-1.5 bg-[#38bdf8]/10 hover:bg-[#38bdf8]/20 text-[#38bdf8] text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  Mark All Read ({unreadCount})
                </button>
              )}
              <button onClick={onClose} className="p-1.5 hover:bg-white/10 text-slate-400 hover:text-white rounded-xl transition">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Filter Categories */}
          <div className="p-3 bg-slate-900/50 border-b border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
            {[
              { id: 'all', label: 'All Inbox' },
              { id: 'unread', label: `Unread (${unreadCount})` },
              { id: 'medical', label: 'Medical' },
              { id: 'requests', label: 'Clearance' },
              { id: 'critical', label: 'Critical' },
              { id: 'security', label: 'Security' },
              { id: 'system', label: 'System' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition shrink-0 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#38bdf8] text-slate-950 shadow-md'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* List of Notifications */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-16 space-y-2">
                <Bell className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-sm font-bold text-white">No Notifications</p>
                <p className="text-xs text-slate-400">You have no alerts matching the "{activeTab}" filter.</p>
              </div>
            ) : (
              filteredNotifications.map(n => (
                <div
                  key={n.id}
                  onClick={() => { if (!n.read) onMarkRead(n.id); }}
                  className={`p-4 rounded-2xl border transition cursor-pointer flex gap-3 items-start justify-between ${
                    !n.read 
                      ? 'bg-[#38bdf8]/10 border-[#38bdf8]/30 hover:border-[#38bdf8]/60' 
                      : 'bg-slate-900/40 border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-slate-950 border border-white/10 mt-0.5">
                      {getCategoryIcon(n)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className={`text-xs font-bold ${!n.read ? 'text-white' : 'text-slate-300'}`}>
                          {n.title}
                        </h4>
                        {!n.read && (
                          <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-ping" />
                        )}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{n.message}</p>
                      <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {new Date(n.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {!n.read && (
                      <button
                        onClick={(e) => { e.stopPropagation(); onMarkRead(n.id); }}
                        className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition"
                        title="Mark Read"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    {onClearNotification && (
                      <button
                        onClick={(e) => { e.stopPropagation(); onClearNotification(n.id); }}
                        className="p-1.5 hover:bg-rose-500/10 rounded-lg text-slate-500 hover:text-rose-400 transition"
                        title="Dismiss"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-white/10 bg-slate-950 text-right">
            <span className="text-[10px] font-mono text-slate-500">
              HEALTHORBIT ENTERPRISE NOTIFICATION CENTER • AUTO-SYNCED
            </span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
