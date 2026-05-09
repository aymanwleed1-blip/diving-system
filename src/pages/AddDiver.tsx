import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { diveService } from '../firebase/dives';
import { calculateDiveStatus } from '../lib/diveEngine';

export const AddDiver: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ diverName: '', targetDepth: 0 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // استخدام المحرك الجديد لحساب الـ NDL قبل الحفظ
    const status = calculateDiveStatus(Number(formData.targetDepth), 0);
    
    await diveService.addDive({
      ...formData,
      status: 'active',
      ndl: status.ndl,
      startTime: null
    });
    navigate('/live');
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-[#0d121d] rounded-3xl border border-white/5 mt-10">
      <h2 className="text-2xl font-black text-white mb-6 uppercase italic">Add New Diver</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" placeholder="Diver Name" 
          className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500"
          onChange={(e) => setFormData({...formData, diverName: e.target.value})}
        />
        <input 
          type="number" placeholder="Target Depth (M)" 
          className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500"
          onChange={(e) => setFormData({...formData, targetDepth: Number(e.target.value)})}
        />
        <button type="submit" className="w-full py-4 bg-cyan-500 text-black font-black uppercase rounded-xl hover:bg-cyan-400 transition-all">
          Deploy Diver
        </button>
      </form>
    </div>
  );
};