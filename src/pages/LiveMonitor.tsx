import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Play, Square, Activity, User, ArrowDownCircle, 
  Gauge, Waves, Monitor, ChevronRight, Wind, AlertOctagon
} from 'lucide-react';
import { motion } from 'motion/react';
import { calculateDiveStatus } from '../lib/diveEngine';
import { cn } from '../lib/utils';
import { diveService, DiveLog } from '../firebase/dives';

export const LiveMonitor: React.FC = () => {
  const { t } = useTranslation();
  const [activeDives, setActiveDives] = useState<DiveLog[]>([]);
  const [selectedDiveId, setSelectedDiveId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // حالة المحاكاة (للتحكم في العمق والوقت)
  const [depth, setDepth] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const unsubscribe = diveService.subscribeToActiveDives((dives) => {
      setActiveDives(dives);
      setLoading(false);
      if (dives.length > 0 && !selectedDiveId) {
        setSelectedDiveId(dives[0].id!);
      }
    });
    return () => unsubscribe();
  }, [selectedDiveId]);

  const selectedDive = activeDives.find(d => d.id === selectedDiveId);

  // عداد الوقت التلقائي بمجرد بدء الغوص
  useEffect(() => {
    let interval: any;
    if (selectedDive?.startTime) {
      interval = setInterval(() => {
        const start = selectedDive.startTime.toDate().getTime();
        const now = new Date().getTime();
        setElapsed(Math.floor((now - start) / 1000));
      }, 1000);
    } else {
      setElapsed(0);
    }
    return () => clearInterval(interval);
  }, [selectedDive]);

  const startDive = async () => {
    if (!selectedDiveId) return;
    await diveService.updateDive(selectedDiveId, { startTime: new Date() as any });
  };

  const endDive = async () => {
    if (!selectedDiveId || !selectedDive) return;
    const btMin = Math.ceil(elapsed / 60);
    await diveService.completeDive(selectedDiveId, selectedDive, {
      maxDepth: depth > 0 ? depth : selectedDive.targetDepth,
      bottomTime: btMin,
      endTime: new Date() as any,
      updatedAt: new Date() as any,
      extraNotes: selectedDive.extraNotes + `\n[FINISH] Depth: ${depth}m, BT: ${btMin}m`
    });
    setSelectedDiveId(null); setDepth(0); setElapsed(0);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  // منطق جداول US Navy
  const diveIntelligence = calculateDiveStatus(currentDepth || selectedDive?.targetDepth || 0, elapsedSeconds / 60);
const ndl = diveIntelligence.ndl;
const isDanger = diveIntelligence.isDeco;
const stops = diveIntelligence.stops;  const currentBT = elapsed / 60;
  const isSafe = currentBT <= ndl;

  if (loading) return <div className="h-full flex items-center justify-center text-cyan-500">Loading Fleet Data...</div>;

  return (
    <div className={cn(
      "flex gap-4 h-[calc(100vh-120px)] p-4 transition-all duration-500",
      !isSafe && "bg-red-950/20"
    )}>
      {/* القائمة اليسرى - اختيار الغواص */}
      <aside className="w-72 bg-[#0d121d] rounded-2xl border border-white/5 p-4 overflow-y-auto">
        <h3 className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Activity size={14} /> Active Divers
        </h3>
        {activeDives.map(dive => (
          <button 
            key={dive.id}
            onClick={() => setSelectedDiveId(dive.id!)}
            className={cn(
              "w-full p-4 mb-2 rounded-xl border transition-all text-left",
              selectedDiveId === dive.id ? "bg-cyan-500/20 border-cyan-500/50" : "bg-white/5 border-transparent hover:border-white/10"
            )}
          >
            <p className="text-xs font-bold text-white uppercase">{dive.diverName}</p>
            <p className="text-[9px] text-slate-500 uppercase italic">Target: {dive.targetDepth}m</p>
          </button>
        ))}
      </aside>

      {/* منطقة الشاشة الرئيسية - الحسابات المباشرة */}
      <main className="flex-1 bg-[#05070a] rounded-[32px] border border-white/10 relative overflow-hidden flex flex-col">
        {selectedDive ? (
          <>
            <div className="p-8 flex justify-between items-center border-b border-white/5">
              <div>
                <h2 className="text-3xl font-black text-white uppercase italic">{selectedDive.diverName}</h2>
                <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">Live Telemetry - RSEAS Offshore</p>
              </div>
              <div className={cn("px-6 py-2 rounded-full border text-xs font-black uppercase tracking-tighter", 
                isSafe ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-red-500/20 border-red-500/50 text-red-500 animate-pulse")}>
                {isSafe ? "Safe Operations" : "DECO REQUIRED"}
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center relative">
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em] mb-4">Sensor Depth (MSW)</p>
              <div className="text-[150px] font-mono font-black text-white leading-none flex items-baseline">
                {depth.toFixed(1)} <span className="text-xl text-slate-700 ml-4 uppercase">Meters</span>
              </div>

              <div className="flex gap-16 mt-12">
                <div className="text-center">
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Bottom Time</p>
                  <p className="text-4xl font-mono font-black text-white">{formatTime(elapsed)}</p>
                </div>
                <div className="text-center">
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">NDL Limit</p>
                  <p className={cn("text-4xl font-mono font-black", isSafe ? "text-cyan-400" : "text-red-500")}>
                    {Math.max(0, Math.floor(ndl - currentBT))} <span className="text-sm">min</span>
                  </p>
                </div>
              </div>

              {/* أزرار محاكاة العمق للمشرف */}
              {selectedDive.startTime && (
                <div className="absolute right-8 flex flex-col gap-4">
                  <button onClick={() => setDepth(d => d + 1)} className="p-4 bg-white/5 rounded-full hover:bg-cyan-500/20 border border-white/10 text-white"><ArrowDownCircle className="rotate-180" /></button>
                  <button onClick={() => setDepth(d => Math.max(0, d - 1))} className="p-4 bg-white/5 rounded-full hover:bg-cyan-500/20 border border-white/10 text-white"><ArrowDownCircle /></button>
                </div>
              )}
            </div>

            <div className="p-8 flex justify-center bg-white/5">
              {!selectedDive.startTime ? (
                <button onClick={startDive} className="px-12 py-5 bg-cyan-500 text-black font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-transform flex items-center gap-3">
                  <Play size={18} fill="black" /> Initiate Dive
                </button>
              ) : (
                <button onClick={endDive} className="px-12 py-5 bg-red-600 text-white font-black uppercase tracking-widest rounded-xl hover:bg-red-700 flex items-center gap-3">
                  <Square size={18} fill="white" /> Terminate & Log
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center opacity-20">
            <Monitor size={80} className="text-white mb-4" />
            <p className="text-sm font-bold text-white uppercase tracking-[0.5em]">Waiting for Mission Selection</p>
          </div>
        )}
      </main>

      {/* الجانب الأيمن - تفاصيل جداول US Navy */}
      <aside className="w-72 bg-[#0d121d] rounded-2xl border border-white/5 p-6">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
          <Gauge size={14} /> Dive Intelligence
        </h3>
        {selectedDive && (
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <p className="text-[8px] text-slate-500 uppercase font-black mb-1">Max Depth Plan</p>
              <p className="text-xl font-mono font-black text-white">{selectedDive.targetDepth} MSW</p>
            </div>
            {!isSafe && (
              <div className="space-y-2">
                <p className="text-[9px] font-black text-red-500 uppercase flex items-center gap-2"><AlertOctagon size={12}/> Deco Stops Required:</p>
                {getDecompressionSchedule(selectedDive.targetDepth, currentBT + rnt).stops.map((stop: any, i: number) => (
                  <div key={i} className="flex justify-between bg-red-500/10 p-2 rounded border border-red-500/20">
                    <span className="text-[10px] font-mono text-white">{stop.depth}M</span>
                    <span className="text-[10px] font-mono text-red-400">{stop.time} min</span>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-8 pt-6 border-t border-white/5">
               <p className="text-[7px] text-slate-600 font-black uppercase">System Signature</p>
               <p className="text-[9px] text-cyan-500/50 font-bold uppercase italic">Ayman Wleed - RSEAS Unit</p>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};