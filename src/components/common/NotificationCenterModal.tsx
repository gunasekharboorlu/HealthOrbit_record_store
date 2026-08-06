import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, ShieldAlert, Activity, Clock, Trash2, X, Check, 
  Key
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

  const filteredNotifications = (notifications || []).filter(n => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !n.read;
    const type = (n.type || '').toLowerCase();
    const title = (n.title || '').toLowerCase();

    if (activeTab === 'medical') return type.includes('medical') || title.includes('report') || title.includes('prescription');
    if (activeTab === 'system') return type.includes('system') || title.includes('sync') || title.includes('update');
    if (activeTab === 'security') return type.includes('security') || title.includes('auth') || title.includes('login');
    if (activeTab === 'requests') return type.includes('access') || title.includes('clearance') || title.includes('request');
    if (activeTab === 'critical') return type.includes('critical') || title.includes('emergency') || title.includes('urgent');
    return true;
  });

  const getCategoryIcon = (n: Notification) => {
    const title = (n.title || '').toLowerCase();
    if (title.includes('clearance') || title.includes('access')) return <Key className="w-4 h-4 text-[#0071E3]" />;
    if (title.includes('emergency') || title.includes('urgent')) return <ShieldAlert className="w-4 h-4 text-rose-600" />;
    if (title.includes('prescription') || title.includes('report')) return <Activity className="w-4 h-4 text-emerald-600" />;
    return <Bell className="w-4 h-4 text-[#1D1D1F]" />;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-xs">
          
          <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          className="w-full max-w-2xl bg-white border border-[#E5E5E7] rounded-3xl shadow-xl overflow-hidden z-10 flex flex-col h-[75vh]"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#E5E5E7] flex items-center justify-between bg-[#F5F5F7]">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#1D1D1F] text-white rounded-2xl">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#1D1D1F]">Notification Center</h2>
                <p className="text-xs text-[#6E6E73] font-normal">Clinical updates, clearance alerts & notifications.</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={onMarkAllRead}
                  className="px-3 py-1.5 bg-[#1D1D1F] text-white hover:bg-black text-xs font-semibold rounded-full transition cursor-pointer"
                >
                  Mark All Read ({unreadCount})
                </button>
              )}
              <button onClick={onClose} className="p-1.5 hover:bg-[#E8E8ED] text-[#86868B] hover:text-[#1D1D1F] rounded-full transition cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Filter Categories */}
          <div className="p-3 bg-[#F5F5F7] border-b border-[#E5E5E7] flex gap-1.5 overflow-x-auto no-scrollbar">
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
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition shrink-0 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#1D1D1F] text-white shadow-xs'
                    : 'bg-white text-[#6E6E73] border border-[#E5E5E7] hover:bg-[#F5F5F7]'
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
                <Bell className="w-8 h-8 text-[#86868B] mx-auto" />
                <p className="text-sm font-bold text-[#1D1D1F]">No Notifications</p>
                <p className="text-xs text-[#6E6E73]">You have no alerts matching the "{activeTab}" filter.</p>
              </div>
            ) : (
              filteredNotifications.map(n => (
                <div
                  key={n.id}
                  onClick={() => { if (!n.read) onMarkRead(n.id); }}
                  className={`p-4 rounded-2xl border transition cursor-pointer flex gap-3 items-start justify-between ${
                    !n.read 
                      ? 'bg-blue-50/50 border-blue-200 hover:border-blue-300' 
                      : 'bg-[#FBFBFD] border-[#E5E5E7] hover:bg-[#F5F5F7]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-white border border-[#E5E5E7] mt-0.5">
                      {getCategoryIcon(n)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className={`text-xs font-semibold ${!n.read ? 'text-[#1D1D1F]' : 'text-[#6E6E73]'}`}>
                          {n.title}
                        </h4>
                        {!n.read && (
                          <span className="w-2 h-2 rounded-full bg-[#0071E3]" />
                        )}
                      </div>
                      <p className="text-xs text-[#6E6E73] leading-relaxed font-normal">{n.message}</p>
                      <span className="text-[10px] text-[#86868B] font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {new Date(n.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {!n.read && (
                      <button
                        onClick={(e) => { e.stopPropagation(); onMarkRead(n.id); }}
                        className="p-1.5 hover:bg-[#E5E5E7] rounded-lg text-[#86868B] hover:text-[#1D1D1F] transition cursor-pointer"
                        title="Mark Read"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    {onClearNotification && (
                      <button
                        onClick={(e) => { e.stopPropagation(); onClearNotification(n.id); }}
                        className="p-1.5 hover:bg-rose-50 rounded-lg text-[#86868B] hover:text-rose-600 transition cursor-pointer"
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
          <div className="p-3 border-t border-[#E5E5E7] bg-[#F5F5F7] text-right">
            <span className="text-[10px] font-mono text-[#86868B]">
              HEALTHORBIT NOTIFICATION CENTER • AUTO-SYNCED
            </span>
          </div>

        </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
