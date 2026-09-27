import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useStore();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom duration-200 pointer-events-none">
      <div className="bg-[#101828] text-white px-4 py-3 rounded-lg shadow-xl border border-slate-700 flex items-center gap-3 text-xs max-w-sm pointer-events-auto">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <span className="font-medium text-slate-200">{toastMessage}</span>
      </div>
    </div>
  );
};
