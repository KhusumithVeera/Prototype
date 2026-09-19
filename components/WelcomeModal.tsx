
import React from 'react';

interface WelcomeModalProps {
  unreadCount: number;
  awayTime: string;
  onViewCatchUp: () => void;
  onSkip: () => void;
  onSettings: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ unreadCount, awayTime, onViewCatchUp, onSkip, onSettings }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        <div className="p-8 text-center">
          <div className="text-5xl mb-6">👋</div>
          <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Welcome back</h2>
          
          <div className="space-y-4 mb-8">
            <p className="text-slate-600 leading-relaxed">
              You were away for <span className="font-bold text-slate-900">{awayTime}</span>.<br />
              There were <span className="font-bold text-slate-900">{unreadCount} new messages</span> across your channels.
            </p>
            <p className="text-slate-500 text-sm italic">
              Want a quick summary of what matters?
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button 
              onClick={onViewCatchUp}
              className="w-full py-4 bg-indigo-600 text-white rounded-xl font-black text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98]"
            >
              View Catch-Up
            </button>
            <button 
              onClick={onSkip}
              className="w-full py-3 bg-white text-slate-500 rounded-xl font-bold hover:bg-slate-50 transition-all"
            >
              Skip for now
            </button>
          </div>
        </div>

        <div className="bg-slate-50 px-8 py-4 border-t flex justify-center">
          <button 
            onClick={onSettings}
            className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors flex items-center"
          >
            Customize what’s included → Settings
          </button>
        </div>
      </div>
    </div>
  );
};
