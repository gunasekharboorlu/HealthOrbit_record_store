import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell } from 'lucide-react';
import { Notification } from '../../types';

interface NotificationDropdownProps {
  notifications: Notification[];
  unreadCount: number;
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
}

export default function NotificationDropdown({
  notifications,
  unreadCount,
  onMarkRead,
  onMarkAllRead,
}: NotificationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] rounded-xl transition-all cursor-pointer"
        title="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white ring-2 ring-white">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-80 overflow-hidden rounded-2xl border border-[#E5E5E7] bg-white shadow-xl z-50"
            >
              <div className="flex items-center justify-between border-b border-[#E5E5E7] bg-[#F5F5F7] px-4 py-3">
                <span className="text-xs font-bold text-[#1D1D1F] font-sans">Notifications</span>
                {unreadCount > 0 && (
                  <button
                    onClick={() => {
                      onMarkAllRead();
                      setIsOpen(false);
                    }}
                    className="text-[10px] font-medium text-[#0071E3] hover:underline cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-[#F5F5F7]">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center px-4">
                    <Bell className="w-8 h-8 text-[#86868B] mb-2" />
                    <p className="text-xs text-[#6E6E73]">No notifications.</p>
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        if (!n.read) onMarkRead(n.id);
                      }}
                      className={`p-3 text-xs cursor-pointer hover:bg-[#F5F5F7] transition-colors ${
                        !n.read ? 'bg-sky-50/50 border-l-2 border-[#0071E3]' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className={`text-[11px] font-semibold ${!n.read ? 'text-[#1D1D1F]' : 'text-[#6E6E73]'}`}>
                          {n.title}
                        </span>
                        <span className="text-[9px] text-[#86868B] font-mono">
                          {new Date(n.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-[#6E6E73] text-[10px] leading-normal">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
