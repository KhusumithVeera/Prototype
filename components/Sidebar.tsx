
import React from 'react';
import { SLACK_THEME } from '../constants';
import { AppState } from '../types';

interface SidebarProps {
  activeTab: AppState;
  unreads: Record<string, number>;
  onReset: () => void;
  onCatchUpClick: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, unreads, onReset, onCatchUpClick }) => {
  return (
    <div 
      className="w-64 flex flex-col h-full text-white/80 select-none z-10" 
      style={{ backgroundColor: SLACK_THEME.purple }}
    >
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <h1 className="font-bold text-white tracking-tight flex items-center">
            <span className="mr-2 opacity-50">#</span> Hello PM
        </h1>
        <div className="w-8 h-8 rounded bg-white/20 flex items-center justify-center border border-white/10 cursor-pointer hover:bg-white/30 transition-colors">
            <span className="text-[10px] font-bold">NJ</span>
        </div>
      </div>

      <div className="p-2 space-y-1 overflow-y-auto flex-1 custom-scrollbar">
        <div 
            onClick={onReset}
            className={`flex items-center space-x-2 p-2 rounded cursor-pointer transition-colors ${activeTab === AppState.IDLE ? 'bg-white/10 text-white' : 'hover:bg-white/5'}`}
        >
          <span className="text-sm">🏠 Home</span>
        </div>
        
        <div className="mt-6 border-t border-white/10 pt-4 px-2 mb-4">
            <div 
                onClick={onCatchUpClick}
                className={`group relative p-3 rounded-lg flex items-center space-x-3 cursor-pointer transition-all border-l-4 overflow-hidden ${
                    activeTab === AppState.DASHBOARD || activeTab === AppState.ANALYZING || activeTab === AppState.ALL_CAUGHT_UP
                    ? 'bg-indigo-500/30 border-indigo-400 text-white shadow-lg' 
                    : 'bg-white/5 border-transparent hover:bg-white/10'
                }`}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite] pointer-events-none"></div>
                <div className="text-lg">✨</div>
                <div>
                    <div className="text-xs font-black leading-none uppercase tracking-tighter">Smart Catch-Up</div>
                    <div className="text-[10px] text-white/50 mt-1 italic">Gemini Powered</div>
                </div>
            </div>
        </div>

        <div>
          <p className="text-[10px] font-black text-white/30 px-2 uppercase tracking-widest mb-3 flex items-center justify-between">
            <span>Channels</span>
            <span className="text-[14px] leading-none">+</span>
          </p>
          <div className="space-y-0.5">
            {Object.keys(unreads).map(ch => (
              <div key={ch} className="group flex items-center justify-between p-2 text-sm hover:bg-white/5 rounded cursor-pointer transition-colors">
                <span className={`flex items-center ${unreads[ch] > 0 ? 'text-white font-bold' : 'text-white/60'}`}>
                  <span className="mr-2 opacity-30">#</span> {ch.replace('#', '')}
                </span>
                {unreads[ch] > 0 && (
                   <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded-full font-bold min-w-[20px] text-center">
                     {unreads[ch]}
                   </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="text-[10px] font-black text-white/30 px-2 uppercase tracking-widest mb-3">Direct Messages</p>
          <div className="space-y-0.5 opacity-60">
            {['Sarah Miller', 'John Chen', 'Slackbot'].map(user => (
              <div key={user} className="flex items-center space-x-2 p-2 text-sm hover:bg-white/5 rounded cursor-pointer">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>{user}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-white/10 bg-black/10 flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs text-white font-bold">Nidhi Jain</span>
        </div>
      </div>
      
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};
