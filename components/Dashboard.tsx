
import React, { useState, useEffect } from 'react';
import { CatchUpSummary, SlackMessage } from '../types';

interface DashboardProps {
  summary: CatchUpSummary;
  onCloseSummary: () => void;
  onMarkAsRead: () => void;
  onJumpToMessage: (id: string) => void;
  onOpenSettings: () => void;
  highlightedMessageId: string | null;
  messages: SlackMessage[];
}

export const Dashboard: React.FC<DashboardProps> = ({ 
    summary, 
    onCloseSummary,
    onMarkAsRead, 
    onJumpToMessage, 
    onOpenSettings,
    highlightedMessageId,
    messages 
}) => {
  const [selectedContextId, setSelectedContextId] = useState<string | null>(null);

  useEffect(() => {
    if (highlightedMessageId) {
        setSelectedContextId(highlightedMessageId);
    }
  }, [highlightedMessageId]);

  const findMessage = (id: string) => messages.find(m => m.id === id);

  const handleCardClick = (messageId?: string) => {
    if (messageId) {
        setSelectedContextId(messageId);
        onJumpToMessage(messageId);
    }
  };

  const closeSidebar = () => {
    setSelectedContextId(null);
  };

  const activeMessage = selectedContextId ? findMessage(selectedContextId) : null;

  return (
    <div className="flex h-full bg-white animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Main Dashboard Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto custom-scrollbar relative border-r bg-slate-50/30">
        <header className="px-8 py-6 border-b flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-sm z-20">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl animate-bounce-slow">✨</span>
              <h1 className="text-xl font-black text-slate-900 tracking-tighter uppercase italic">Slack Smart Catch-Up</h1>
            </div>
            <div className="flex items-center space-x-4 mt-1">
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest bg-slate-100 px-2 py-1 rounded">
                Window: {summary.startTime} – {summary.endTime}
              </div>
              <div className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded">
                {summary.unreadCount} Messages Scanned
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button 
                onClick={onCloseSummary}
                className="text-[10px] px-4 py-2 bg-slate-100 text-slate-600 rounded-full font-black uppercase hover:bg-slate-200 transition-all border border-slate-200"
            >
              Close Summary
            </button>
            <button 
                onClick={onMarkAsRead}
                className="text-[10px] px-4 py-2 bg-indigo-600 text-white rounded-full font-black uppercase shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all"
            >
              Mark All as Read
            </button>
          </div>
        </header>

        <div className="p-8 space-y-12 max-w-4xl mx-auto w-full">
          
          {/* ACTION ITEMS */}
          <section>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">A</div>
                    <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Priority Action Items</h2>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {summary.actionItems.length > 0 ? (
                summary.actionItems.map((item, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => handleCardClick(item.sourceMessageId)}
                    className={`group p-5 border rounded-2xl shadow-sm hover:shadow-xl transition-all bg-white relative overflow-hidden cursor-pointer border-l-8 ${
                        selectedContextId === item.sourceMessageId ? 'border-indigo-500 ring-2 ring-indigo-50' : 'border-slate-100 hover:border-indigo-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-black text-indigo-500 bg-indigo-50 px-2 py-1 rounded uppercase">{item.channel}</span>
                        <span className={`text-[10px] font-black px-2 py-1 rounded uppercase border ${
                          item.confidenceLevel === 'High' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                        }`}>
                          {item.confidenceLevel} Confidence
                        </span>
                      </div>
                      <div className="text-slate-300 group-hover:text-indigo-400 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </div>
                    </div>
                    <p className="text-base text-slate-800 font-bold leading-tight mb-4">{item.taskSummary}</p>
                    <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-50 pt-3">
                      <div className="flex items-center">
                        <div className="w-5 h-5 rounded-full bg-slate-200 mr-2 flex items-center justify-center text-[8px] font-bold">{item.whoMentioned.charAt(0)}</div>
                        Mentioned by <span className="font-black text-slate-700 ml-1">{item.whoMentioned}</span>
                      </div>
                      {item.deadline && (
                        <div className="flex items-center text-rose-500 font-black px-2 py-1 bg-rose-50 rounded">
                          <span className="mr-1">⏰</span> {item.deadline}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center p-8 border-2 border-dashed rounded-2xl text-slate-400">
                    No direct mentions found.
                </div>
              )}
            </div>
          </section>

          {/* NEED TO KNOW */}
          <section>
             <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">S</div>
                <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Need-to-Know Signal</h2>
            </div>
            <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
              <ul className="space-y-6">
                {summary.needToKnow.map((item, idx) => (
                  <li 
                    key={idx} 
                    onClick={() => handleCardClick(item.sourceMessageId)}
                    className="flex items-start space-x-4 group cursor-pointer"
                  >
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-emerald-400 group-hover:scale-150 transition-transform"></div>
                    <p className="text-sm text-slate-700 font-medium leading-relaxed group-hover:text-indigo-600 transition-colors">
                        {item.point}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* DECISIONS */}
          <section className="pb-12">
            <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 font-bold">D</div>
                <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Decision Timeline</h2>
            </div>
            <div className="relative ml-4 pl-10 border-l-2 border-slate-200 space-y-10 py-4">
              {summary.decisionsUpdates.map((item, idx) => (
                <div key={idx} className="relative group cursor-pointer" onClick={() => handleCardClick(item.sourceMessageId)}>
                  <div className={`absolute -left-[51px] top-1 w-5 h-5 rounded-full bg-white border-4 transition-all ${selectedContextId === item.sourceMessageId ? 'border-indigo-600 scale-125' : 'border-slate-300 group-hover:border-indigo-400'}`}></div>
                  <div className="text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">{item.time}</div>
                  <div className={`p-5 bg-white border rounded-2xl transition-all ${selectedContextId === item.sourceMessageId ? 'shadow-xl ring-1 ring-indigo-100' : 'shadow-sm group-hover:shadow-md'}`}>
                    <h4 className="font-black text-sm text-slate-900 mb-2">{item.decision}</h4>
                    <p className="text-xs text-slate-500 bg-slate-50 p-2 rounded-lg italic">Impact: {item.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Footer Navigation */}
          <div className="pt-12 pb-24 border-t border-slate-100 flex flex-col items-center">
             <button 
                onClick={onOpenSettings}
                className="text-xs font-black text-slate-400 hover:text-indigo-600 transition-colors flex items-center space-x-2 bg-slate-100/50 px-4 py-2 rounded-full"
             >
                <span>⚙️</span>
                <span>Adjust Summary Settings</span>
             </button>
             <p className="text-[10px] text-slate-400 mt-4 uppercase tracking-widest font-bold">Powered by Gemini 3</p>
          </div>
        </div>
      </div>

      {/* Message Context Sidebar - Only shown when activeMessage is set */}
      {activeMessage && (
        <div className="w-80 bg-slate-50 flex flex-col border-l shrink-0 animate-in slide-in-from-right duration-300 shadow-2xl relative z-30">
            <div className="p-4 border-b bg-white flex items-center justify-between">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Source Context</h3>
                <button 
                  onClick={closeSidebar}
                  className="p-1 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="bg-white p-4 rounded-xl border shadow-sm border-indigo-200">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-black text-indigo-600">{activeMessage.sender}</span>
                            <span className="text-[10px] text-slate-400">{activeMessage.timestamp}</span>
                        </div>
                        <div className="text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
                            {activeMessage.text}
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">In {activeMessage.channel}</span>
                            <button className="text-[10px] font-black text-indigo-600 uppercase">View Thread</button>
                        </div>
                    </div>
                    <div className="mt-8">
                         <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-1">Nearby Messages</h4>
                         <div className="space-y-3 opacity-60">
                            {messages.filter(m => m.channel === activeMessage.channel && m.id !== activeMessage.id).slice(0, 3).map(m => (
                                <div key={m.id} className="bg-white/50 p-3 rounded-lg border text-xs">
                                    <div className="font-bold mb-1">{m.sender}</div>
                                    <div className="line-clamp-2 text-slate-600">{m.text}</div>
                                </div>
                            ))}
                         </div>
                    </div>
                </div>
            </div>
        </div>
      )}

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-5%); }
          50% { transform: translateY(0); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.05);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};
