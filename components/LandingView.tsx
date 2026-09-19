
import React from 'react';
import { SlackMessage } from '../types';

interface LandingViewProps {
  messages: SlackMessage[];
}

export const LandingView: React.FC<LandingViewProps> = ({ messages }) => {
  // Filter messages specifically for the general channel for this view
  const generalMessages = messages.filter(m => m.channel === '#general');

  return (
    <div className="flex flex-col h-full bg-white animate-in fade-in duration-500">
      {/* Channel Header */}
      <div className="px-6 py-4 border-b flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-sm z-10">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center">
            <span className="text-slate-400 mr-2">#</span> general
          </h2>
          <p className="text-slate-500 text-xs">Company-wide announcements and work-based matters.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-7 h-7 rounded bg-slate-200 border-2 border-white flex items-center justify-center text-[9px] font-bold text-slate-500">
                U{i}
              </div>
            ))}
          </div>
          <button className="p-2 hover:bg-slate-100 rounded text-slate-400 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </button>
        </div>
      </div>

      {/* Message Feed */}
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-slate-50">
          {generalMessages.length > 0 ? (
            generalMessages.map(msg => (
              <div key={msg.id} className="px-6 py-4 hover:bg-slate-50/50 transition-colors group">
                <div className="flex items-start">
                  <div className="w-9 h-9 rounded bg-slate-100 flex items-center justify-center text-slate-600 font-bold mr-3 shrink-0 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                    {msg.sender.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline space-x-2">
                      <span className="font-black text-sm text-slate-900">{msg.sender}</span>
                      <span className="text-[10px] text-slate-400 font-medium">{msg.timestamp}</span>
                    </div>
                    <div className="mt-1">
                      <p className="text-sm text-slate-700 leading-relaxed break-words">{msg.text}</p>
                    </div>
                  </div>
                  {msg.mentions.includes('@nidhi') && (
                    <div className="ml-2">
                      <span className="text-[9px] bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded font-black border border-orange-200 uppercase tracking-tighter">
                        Mention
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <p className="text-slate-400 text-sm">No messages in this channel yet.</p>
            </div>
          )}
        </div>

        {/* End of Feed Sentinel */}
        <div className="py-12 px-6 flex flex-col items-center">
          <div className="w-full h-px bg-slate-100 relative mb-8">
             <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
               End of History
             </span>
          </div>
          <p className="text-xs text-slate-400 text-center max-w-xs">
            You're all caught up on <span className="font-bold">#general</span>. 
            Want to see what happened in other channels? Use the <span className="text-indigo-600 font-bold">Smart Catch-Up</span> assistant.
          </p>
        </div>
      </div>
    </div>
  );
};
