import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Plus, 
  Trash2, 
  GripVertical, 
  Save, 
  FilePlus, 
  Type, 
  Hash, 
  CheckSquare, 
  ChevronDown,
  Layout
} from 'lucide-react';
import { motion, Reorder } from 'motion/react';
import { cn } from '../lib/utils';

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'checkbox' | 'select';
  required: boolean;
  options?: string[];
}

export const FormBuilder: React.FC = () => {
  const { t } = useTranslation();
  const [formName, setFormName] = useState('New Custom Form');
  const [fields, setFields] = useState<FormField[]>([
    { id: '1', label: 'Safety Check completed', type: 'checkbox', required: true },
    { id: '2', label: 'Equipment Serial Number', type: 'text', required: false },
  ]);

  const addField = (type: FormField['type']) => {
    const newField: FormField = {
      id: Date.now().toString(),
      label: `New ${type} field`,
      type,
      required: false,
      options: type === 'select' ? ['Option 1', 'Option 2'] : undefined
    };
    setFields([...fields, newField]);
  };

  const removeField = (id: string) => {
    setFields(fields.filter(f => f.id !== id));
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between bg-[#0d121d]/80 border border-white/5 p-8 rounded-3xl backdrop-blur-md">
         <div className="space-y-1 flex-1 max-w-md">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Protocol Architect</p>
            <input 
              type="text" 
              value={formName}
              onChange={(e) => setFormName(e.target.value.toUpperCase())}
              className="text-3xl font-black bg-transparent border-none outline-none w-full placeholder:text-slate-800 text-white tracking-tighter"
              placeholder="TEMPLATE NAME"
            />
         </div>
         <button className="px-8 py-4 bg-cyan-600 text-black font-black rounded-lg flex items-center gap-2 hover:bg-cyan-500 transition-all shadow-lg shadow-cyan-500/20 uppercase tracking-widest text-[10px]">
            <Save className="w-4 h-4" />
            Archive Protocol
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Toolbox */}
        <div className="space-y-2">
           <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6 flex items-center gap-2">
              <Plus className="w-3 h-3 text-cyan-400" /> Protocol Components
           </h3>
           <ToolButton icon={<Type className="w-4 h-4" />} label="Text Matrix" onClick={() => addField('text')} />
           <ToolButton icon={<Hash className="w-4 h-4" />} label="Numeric Metric" onClick={() => addField('number')} />
           <ToolButton icon={<CheckSquare className="w-4 h-4" />} label="Logic Check" onClick={() => addField('checkbox')} />
           <ToolButton icon={<ChevronDown className="w-4 h-4" />} label="Selector" onClick={() => addField('select')} />
        </div>

        {/* Builder Area */}
        <div className="lg:col-span-3 space-y-4">
          <Reorder.Group axis="y" values={fields} onReorder={setFields} className="space-y-3">
            {fields.map((field) => (
              <Reorder.Item key={field.id} value={field}>
                <div className="bg-[#0d121d] border border-white/5 p-6 rounded-2xl flex items-center gap-6 group hover:border-cyan-500/20 transition-all backdrop-blur-sm">
                   <div className="cursor-grab active:cursor-grabbing text-slate-800 hover:text-slate-400 transition-colors">
                      <GripVertical className="w-5 h-5" />
                   </div>
                   
                   <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                         <p className="text-[9px] uppercase font-black tracking-widest text-slate-600">Field Segment label</p>
                         <input 
                           type="text" 
                           value={field.label}
                           onChange={(e) => updateField(field.id, { label: e.target.value.toUpperCase() })}
                           className="bg-transparent border-none outline-none font-black text-xs text-white uppercase tracking-tight w-full"
                         />
                      </div>
                      <div className="flex items-center justify-end gap-6 text-slate-500">
                         <div className="flex items-center gap-2">
                            <input 
                              type="checkbox" 
                              checked={field.required}
                              onChange={(e) => updateField(field.id, { required: e.target.checked })}
                              className="w-4 h-4 rounded border-white/10 bg-white/5 accent-cyan-500 cursor-pointer"
                            />
                            <span className="text-[9px] font-black uppercase tracking-widest">Mandatory</span>
                         </div>
                         <button 
                           onClick={() => removeField(field.id)}
                           className="p-2 text-slate-800 hover:text-red-500 transition-colors"
                         >
                            <Trash2 className="w-4 h-4" />
                         </button>
                      </div>
                   </div>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>

          {fields.length === 0 && (
            <div className="h-64 border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-slate-800 bg-white/[0.01]">
               <Layout className="w-12 h-12 mb-4 opacity-20" />
               <p className="text-[10px] font-black uppercase tracking-widest">Insert protocol components from toolbox</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ToolButton = ({ icon, label, onClick }: any) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center gap-4 px-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white/60 hover:text-white hover:border-white/20 transition-all hover:bg-white/10 group"
  >
    <div className="p-2 bg-white/5 rounded-lg group-hover:text-cyan-400 transition-colors">
      {icon}
    </div>
    <span className="text-sm font-medium">{label}</span>
  </button>
);
