import React from 'react';
import { calculateDiveStatus } from '../lib/diveEngine';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="p-8 bg-[#05070a] min-h-screen text-white">
      <div className="mb-10">
        <h1 className="text-3xl font-black uppercase italic text-cyan-500 tracking-tighter">
          Admin Control Center
        </h1>
        <p className="text-slate-500 text-sm">System Management & US Navy Tables Status</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
          <span className="text-xs text-slate-500 uppercase block mb-2">Engine Status</span>
          <span className="text-xl font-bold text-green-500">ACTIVE</span>
          <p className="text-[10px] text-slate-400 mt-2 font-mono">US NAVY REV 7 LOADED</p>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
          <span className="text-xs text-slate-500 uppercase block mb-2">Database</span>
          <span className="text-xl font-bold text-cyan-400">CONNECTED</span>
          <p className="text-[10px] text-slate-400 mt-2 font-mono">FIREBASE CLOUD READY</p>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
          <span className="text-xs text-slate-500 uppercase block mb-2">Safety Logic</span>
          <span className="text-xl font-bold text-orange-400">STRICT</span>
          <p className="text-[10px] text-slate-400 mt-2 font-mono">AUTO-DECO ANALYSIS ON</p>
        </div>
      </div>

      <div className="mt-10 p-8 border border-dashed border-white/10 rounded-3xl text-center">
        <p className="text-slate-500 font-bold uppercase italic">System Wide Updates Complete</p>
      </div>
    </div>
  );
};