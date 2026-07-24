import React from 'react';
import { motion } from 'motion/react';
import { FileText, Activity, Trash2, Download } from 'lucide-react';
import { MedicalRecord } from '../../types';
import { formatDate } from '../../utils';
import { Badge } from './Badges';

interface TimelineProps {
  records: MedicalRecord[];
  onDownload?: (fileName: string, content: string) => void;
  onDelete?: (id: string) => void;
}

export const Timeline = React.memo(function Timeline({
  records,
  onDownload,
  onDelete,
}: TimelineProps) {
  if (records.length === 0) {
    return (
      <div className="text-center py-12 bg-white/5 border border-white/10 rounded-2xl p-6">
        <Activity className="w-8 h-8 text-slate-500 mx-auto mb-2" />
        <p className="text-xs text-slate-400">No medical timeline events recorded yet.</p>
      </div>
    );
  }

  return (
    <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
      {records.map((record, index) => (
        <motion.div
          key={record.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className="relative group"
        >
          {/* Timeline Dot */}
          <div className="absolute -left-6 top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-[#38bdf8] flex items-center justify-center group-hover:scale-125 transition-transform">
            <div className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
          </div>

          <div className="glass-card rounded-2xl p-4 border border-white/10 hover:border-[#38bdf8]/40 transition-all space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#38bdf8]" />
                <h4 className="text-xs sm:text-sm font-bold text-white">{record.title}</h4>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={record.trustBadge === 'verified_hospital' ? 'success' : 'info'}>
                  {record.trustBadge === 'verified_hospital' ? 'Hospital Verified' : 'Direct Upload'}
                </Badge>
                <span className="text-[10px] text-slate-400 font-mono">{formatDate(record.createdAt)}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{record.description}</p>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5 text-[10px] text-slate-400">
              <div className="flex items-center gap-2">
                <span>Category: <strong className="text-slate-200">{record.category}</strong></span>
                <span>•</span>
                <span>By: <strong className="text-slate-200">{record.uploadedByUserName}</strong></span>
              </div>

              <div className="flex items-center gap-2">
                {onDownload && (
                  <button
                    onClick={() => onDownload(record.fileName, record.fileContent)}
                    className="flex items-center gap-1 text-[#38bdf8] hover:underline font-bold cursor-pointer"
                  >
                    <Download className="w-3 h-3" /> Download
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(record.id)}
                    className="text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
});
