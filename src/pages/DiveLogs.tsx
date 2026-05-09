import React, { useEffect, useState } from 'react';
import { diveService, Dive } from '../firebase/dives';
import { FileDown, Search, Calendar } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const DiveLogs: React.FC = () => {
  const [logs, setLogs] = useState<Dive[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      const data = await diveService.getDives();
      // جلب الغوصات المنتهية فقط للتقارير
      setLogs(data.filter(d => d.status === 'completed'));
    };
    fetchLogs();
  }, []);

  // دالة إنشاء ملف الـ PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // إعدادات العنوان
    doc.setFontSize(18);
    doc.text('OFFSHORE DIVE CONTROL SYSTEM - LOG REPORT', 14, 20);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 28);
    doc.text('Standard: US Navy Revision 7', 14, 33);

    // تجهيز بيانات الجدول
    const tableData = logs.map(dive => [
      dive.diverName,
      `${dive.currentDepth} MSW`,
      dive.startTime ? new Date(dive.startTime).toLocaleDateString() : 'N/A',
      dive.group || '-',
      'Completed'
    ]);

    autoTable(doc, {
      head: [['Diver Name', 'Max Depth', 'Date', 'End Group', 'Status']],
      body: tableData,
      startY: 40,
      theme: 'grid',
      headStyles: { fillColor: [0, 188, 212] } // لون Cyan للرأس
    });

    doc.save(`Dive_Log_${new Date().getTime()}.pdf`);
  };

  const filteredLogs = logs.filter(log => 
    log.diverName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-[#05070a] min-h-screen text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter text-cyan-500">Dive Logs & Reports</h1>
          <p className="text-slate-500">History of all offshore operations</p>
        </div>
        
        <button 
          onClick={exportToPDF}
          className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-cyan-500 transition-colors"
        >
          <FileDown size={20} />
          Export PDF Report
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8 max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
        <input 
          type="text" 
          placeholder="Search by diver name..."
          className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-cyan-500"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Logs Table */}
      <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="p-5 text-xs font-black uppercase text-slate-400">Diver</th>
              <th className="p-5 text-xs font-black uppercase text-slate-400">Depth</th>
              <th className="p-5 text-xs font-black uppercase text-slate-400">Date</th>
              <th className="p-5 text-xs font-black uppercase text-slate-400">Group</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="p-5 font-bold">{log.diverName}</td>
                <td className="p-5 text-cyan-400 font-mono">{log.currentDepth} MSW</td>
                <td className="p-5 text-slate-400 flex items-center gap-2">
                  <Calendar size={14} />
                  {log.startTime ? new Date(log.startTime).toLocaleDateString() : 'N/A'}
                </td>
                <td className="p-5"><span className="bg-white/10 px-3 py-1 rounded text-sm">{log.group || 'N/A'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredLogs.length === 0 && (
          <div className="p-20 text-center text-slate-600 font-bold uppercase italic">
            No records found
          </div>
        )}
      </div>
    </div>
  );
};