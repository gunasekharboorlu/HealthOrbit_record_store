import React, { useState, useMemo } from 'react';
import { 
  Bell, CheckCheck, ShieldAlert, Key, Lock, Search, 
  Filter, Check, Clock, AlertCircle, Info 
} from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { GlassCard, PrimaryButton, SecondaryButton, SearchBar, Badge, EmptyState } from '../../components/ui';
import { Notification } from '../../types';

interface NotificationsPageProps {
  notifications: Notification[];
  unreadCount: number;
  handleMarkRead?: (id: string) => void;
  handleMarkAllRead?: () => void;
  onNavigateTab: (tab: string) => void;
}

export default function NotificationsPage({
  notifications = [],
  unreadCount = 0,
  handleMarkRead,
  handleMarkAllRead,
  onNavigateTab,
}: NotificationsPageProps) {
  const [category, setCategory] = useState<'All' | 'Clearances' | 'Security' | 'System'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotifications = useMemo(() => {
    return notifications.filter((n) => {
      const titleLower = n.title.toLowerCase();
      const msgLower = n.message.toLowerCase();
      const query = searchQuery.toLowerCase();
      const matchesSearch = titleLower.includes(query) || msgLower.includes(query);

      if (!matchesSearch) return false;

      if (category === 'Clearances') {
        return titleLower.includes('clearance') || titleLower.includes('access') || titleLower.includes('request');
      } else if (category === 'Security') {
        return titleLower.includes('security') || titleLower.includes('session') || titleLower.includes('password');
      } else if (category === 'System') {
        return titleLower.includes('system') || titleLower.includes('ledger') || titleLower.includes('update');
      }
      return true;
    });
  }, [notifications, category, searchQuery]);

  return (
    <div className="space-y-6 animate-fade-in pb-12 max-w-4xl mx-auto">
      {/* Page Header */}
      <PageHeader
        portalName="Patient Portal"
        activeTab="notifications"
        tabLabel="Notifications"
        title="Notifications Center"
        subtitle="Stay updated on doctor access clearances, vault updates, and ledger security logs."
        actions={
          unreadCount > 0 && handleMarkAllRead ? (
            <SecondaryButton
              icon={CheckCheck}
              size="sm"
              onClick={handleMarkAllRead}
            >
              Mark All as Read ({unreadCount})
            </SecondaryButton>
          ) : undefined
        }
        onNavigateHome={() => onNavigateTab('dashboard')}
      />

      {/* Toolbar Search & Category Filter */}
      <GlassCard className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full md:w-80">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search notifications..."
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          {(['All', 'Clearances', 'Security', 'System'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition cursor-pointer shrink-0 ${
                category === cat
                  ? 'bg-[#38bdf8] text-slate-950 shadow-md shadow-[#38bdf8]/20'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <EmptyState
          title="No Notifications Found"
          message="You have no notifications matching your search or category filter."
        />
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((item) => {
            const isUnread = !item.read;
            return (
              <GlassCard
                key={item.id}
                onClick={() => isUnread && handleMarkRead && handleMarkRead(item.id)}
                hoverEffect
                className={`p-5 transition-all duration-200 ${
                  isUnread
                    ? 'border-l-4 border-l-[#38bdf8] bg-[#38bdf8]/5'
                    : 'opacity-80'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                        isUnread
                          ? 'bg-[#38bdf8]/20 text-[#38bdf8]'
                          : 'bg-white/5 text-slate-400'
                      }`}
                    >
                      <Bell className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-white">{item.title}</h4>
                        {isUnread && (
                          <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-ping" />
                        )}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{item.message}</p>
                    </div>
                  </div>

                  <span className="text-[10px] text-slate-400 font-mono shrink-0">
                    {new Date(item.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
