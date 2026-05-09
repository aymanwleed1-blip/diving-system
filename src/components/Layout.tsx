import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
  History, 
  FileBox, 
  Settings, 
  ShieldAlert, 
  Menu, 
  X, 
  LogOut, 
  Waves,
  Globe,
  Bell,
  Calculator,
  UserPlus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const { t, i18n } = useTranslation();
  const { profile, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const isRTL = i18n.dir() === 'rtl';

  const menuItems = [
    { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard, roles: ['viewer', 'supervisor', 'superintendent', 'admin'] },
    { id: 'add-diver', label: t('add_diver'), icon: UserPlus, roles: ['supervisor', 'superintendent', 'admin'] },
    { id: 'active', label: t('active_dives'), icon: Waves, roles: ['supervisor', 'superintendent', 'admin'] },
    { id: 'planner', label: 'Dive Planner', icon: Calculator, roles: ['supervisor', 'superintendent', 'admin'] },
    { id: 'logs', label: t('history'), icon: History, roles: ['viewer', 'supervisor', 'superintendent', 'admin'] },
    { id: 'reports', label: t('reports'), icon: FileBox, roles: ['supervisor', 'superintendent', 'admin'] },
    { id: 'admin', label: t('admin'), icon: ShieldAlert, roles: ['admin', 'superintendent'] },
  ];

  const filteredMenu = menuItems.filter(item => profile && item.roles.includes(profile.role));

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className={cn("h-screen bg-[#05070a] text-slate-200 flex overflow-hidden", isRTL && "flex-row-reverse")} dir={i18n.dir()}>
      {/* Sidebar - Using the deeper dark tone */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        className="bg-[#0a0f18] border-r border-white/5 flex flex-col z-50 h-full shadow-2xl"
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white rotate-45" />
          </div>
          {isSidebarOpen && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-black text-xl tracking-tighter text-white uppercase"
            >
              RSEAS
            </motion.span>
          )}
        </div>

        <nav className="flex-1 px-4 py-8 space-y-1">
          {filteredMenu.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium transition-all duration-200",
                activeTab === item.id 
                  ? "bg-cyan-500/10 text-cyan-400" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn("w-4 h-4", activeTab === item.id && "text-cyan-400")} />
              {isSidebarOpen && <span className="uppercase tracking-widest text-[11px]">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-1">
          <button 
            onClick={toggleLanguage}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-white text-xs font-bold uppercase tracking-widest"
          >
            <Globe className="w-4 h-4" />
            {isSidebarOpen && <span>{i18n.language === 'en' ? 'Arabic' : 'English'}</span>}
          </button>
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-red-400 text-xs font-bold uppercase tracking-widest"
          >
            <LogOut className="w-4 h-4" />
            {isSidebarOpen && <span>{t('logout')}</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col bg-immersive overflow-hidden">
        {/* Topbar */}
        <header className="h-16 border-b border-white/5 bg-[#0a0f18]/80 backdrop-blur-md px-8 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1 text-slate-500 hover:text-white"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-xs font-black uppercase tracking-[0.3em] text-cyan-400/80">{t(activeTab)}</h1>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase">Cloud Sync Active</span>
              <span className="text-xs text-slate-300 uppercase">{profile?.role}: {profile?.displayName || 'User'}</span>
            </div>
            <div className="w-10 h-10 rounded-full border border-cyan-500/50 bg-cyan-900/20 flex items-center justify-center text-cyan-400 font-bold">
              {profile?.displayName?.[0] || 'U'}
            </div>
          </div>
        </header>

        {/* Page Area */}
        <div className="flex-1 p-6 overflow-y-auto overflow-x-hidden">
          {children}
          
          <footer className="mt-16 h-10 border-t border-white/5 flex items-center justify-between text-[9px] uppercase tracking-[0.2em] font-medium text-slate-600">
            <div>Advanced Diving Management System</div>
            <div className="flex-1 mx-12 text-center text-[8px] opacity-40">
              Developed by: Ayman Wleed
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                SYSTEM: MASTER
              </span>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};
