import React, { useState } from 'react';
import ProfessionalTimeline, { TimelineRecordItem } from '../../../components/common/ProfessionalTimeline';
import UniversalReportViewer from '../../../components/common/UniversalReportViewer';

interface MedicalTimelineViewProps {
  records: any[];
  prescriptions: any[];
  onRequestAccess?: (recordId: string, title: string) => void;
}

export default function MedicalTimelineView({ records = [], prescriptions = [], onRequestAccess }: MedicalTimelineViewProps) {
  const [selectedReport, setSelectedReport] = useState<any | null>(null);

  // Map to TimelineRecordItem format
  const formattedItems: TimelineRecordItem[] = [
    ...records.map(r => ({
      id: r.id,
      type: 'record' as const,
      title: r.title,
      category: r.category || 'Lab Report',
      description: r.description,
      createdAt: r.uploadedAt || r.createdAt || new Date().toISOString(),
      isSensitive: r.isSensitive,
      isLocked: r.isLocked,
      fileName: r.fileName,
      fileSize: r.fileSize,
      fileContent: r.fileContent,
      hospitalName: r.hospitalName || 'HealthOrbit Partner Network',
      doctorName: r.doctorName || 'Attending Physician',
    })),
    ...prescriptions.map(p => ({
      id: p.id,
      type: 'prescription' as const,
      title: `Rx Prescription: ${p.diagnosis || 'Clinical Order'}`,
      category: 'Prescription',
      description: p.medications?.map((m: any) => `${m.name} (${m.dosage})`).join(', '),
      createdAt: p.createdAt || new Date().toISOString(),
      isSensitive: false,
      isLocked: false,
      medications: p.medications,
      diagnosis: p.diagnosis,
      doctorName: p.doctorName || 'Prescribing Doctor',
      hospitalName: p.hospitalName || 'HealthOrbit Network',
    })),
  ];

  const handleDownload = (fileName: string, base64Content: string) => {
    const link = document.createElement('a');
    link.href = base64Content;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <UniversalReportViewer
        item={selectedReport}
        isOpen={Boolean(selectedReport)}
        onClose={() => setSelectedReport(null)}
        onDownload={handleDownload}
      />

      <ProfessionalTimeline
        items={formattedItems}
        onOpenViewer={(item) => setSelectedReport(item)}
        onRequestAccess={onRequestAccess}
        onDownload={handleDownload}
      />
    </div>
  );
}

