import React, { useEffect, useState } from 'react';
import { diveService, Dive } from '../firebase/dives';
import { calculateDiveStatus } from '../lib/diveEngine';
import { Activity, Clock, ArrowDown, AlertTriangle } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [activeDives, setActiveDives] = useState<Dive[]>([]);

  useEffect(() => {
    const unsubscribe = diveService.subscribeToDives((dives) => {
      setActiveDives(dives.filter(d => d.status === 'active'));
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="p-6 bg-[#05070a] min-h-screen text-white font-sans">
      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-3xl font-black uppercase italic text-cyan-500 tracking-tighter">
            Operations Command Center
          </h1>
          <p className="text-slate-500 text-sm">US Navy Rev 7 Logic Engine Active</p>
        </div>
        <div className="bg-white/5 p-3 rounded-xl border border-white/10">
          <span className="text-slate-400 text-xs block uppercase">Active Divers</span>
          <span className="text-2xl font-black text-cyan-400">{activeDives.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeDives.map((dive) => {
          const elapsedMinutes = dive.startTime 
            ? (Date.now() - dive.startTime) / 60000 
            : 0;
          const status = calculateDiveStatus(dive.currentDepth || 0, elapsedMinutes);

          return (
            <div key={dive.id} className={`relative overflow-hidden rounded-3xl border ${status.isDeco ? 'border-red-500/50 bg-red-500/5' : 'border-white/10 bg-white/5'} p-6 transition-all`}>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold uppercase">{dive.diverName}</h3>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest">ID: {dive.id?.slice(-4)}</span>
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${status.isDeco ? 'bg-red-500 text-white animate-pulse' : 'bg-green-500 text-black'}`}>
                  {status.isDeco ? 'Deco Required' : 'Within NDL'}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <ArrowDown size={14} />
                    <span className="text-[10px] uppercase font-bold text-cyan-500">Depth</span>
                  </div>
                  <span className="text-2xl font-black">{dive.currentDepth || 0}</span>
                  <span className="text-xs ml-1 text-slate-500">MSW</span>
                </div>
                <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <Clock size={14} />
                    <span className="text-[10px] uppercase font-bold text-cyan-500">Run Time</span>
                  </div>
                  <span className="text-2xl font-black">{Math.floor(elapsedMinutes)}</span>
                  <span className="text-xs ml-1 text-slate-500">MIN</span>
                </div>
              </div>

              <div className="mt-4 p-4 bg-white/5 rounded-2xl flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">NDL Limit</span>
                  <span className="font-bold text-orange-400">{status.ndl} min</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase">Group</span>
                  <span className="font-bold text-white text-xl">{status.group}</span>
                </div>
              </div>

              {status.isDeco && (
                <div className="mt-4 flex items-center gap-3 text-red-500 animate-bounce">
                  <AlertTriangle size={20} />
                  <span className="text-xs font-black uppercase italic">Action: {status.stops[0]?.depth}m @ {status.stops[0]?.time}min</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};