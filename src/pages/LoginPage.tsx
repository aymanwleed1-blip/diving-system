import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { Waves, LogIn, ShieldCheck, Zap, Globe } from 'lucide-react';
import { motion } from 'motion/react';

export const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const { login } = useAuth();

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-200 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Immersive Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none opacity-50" />
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-[#0d121d]/80 backdrop-blur-3xl border border-white/5 rounded-3xl p-12 shadow-[0_30px_70px_rgba(0,0,0,0.8)] relative z-10"
      >
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-16 h-16 bg-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.3)] mb-8">
            <div className="w-8 h-8 border-4 border-white rotate-45" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-white uppercase mb-2">RSEAS</h1>
          <p className="text-cyan-400/60 text-[10px] font-black tracking-[0.4em] uppercase">{t('app_name')}</p>
        </div>

        <div className="space-y-8">
          <button
            onClick={login}
            className="group w-full bg-white text-black font-black py-5 rounded-xl flex items-center justify-center gap-3 hover:bg-cyan-400 transition-all active:scale-[0.98] shadow-2xl uppercase tracking-widest text-xs"
          >
            <LogIn className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            {t('login_with_google')}
          </button>

          <div className="pt-8 border-t border-white/5 space-y-6">
            <LoginFeature icon={<ShieldCheck className="text-cyan-400" />} label="Identity Secured" desc="Advanced role-based access for offshore teams." />
            <LoginFeature icon={<Zap className="text-amber-400" />} label="Live-Sync Link" desc="US Navy Table calculations synced in milliseconds." />
          </div>
        </div>
      </motion.div>

      <footer className="mt-16 text-center select-none space-y-2">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-700">Protocol Release 2.4.1</p>
        <p className="text-[8px] font-bold uppercase tracking-widest text-slate-800">Operational Integrity Guaranteed</p>
      </footer>
    </div>
  );
};

const LoginFeature = ({ icon, label, desc }: any) => (
  <div className="flex items-start gap-4">
    <div className="p-2.5 bg-white/5 rounded-lg border border-white/5 shrink-0">
      {icon}
    </div>
    <div className="space-y-1">
      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{label}</p>
      <p className="text-[10px] text-slate-500 leading-relaxed font-bold">{desc}</p>
    </div>
  </div>
);
