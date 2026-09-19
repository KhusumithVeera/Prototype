
import React from 'react';

interface SettingsViewProps {
  selectedChannels: string[];
  unreads: Record<string, number>;
  setSelectedChannels: React.Dispatch<React.SetStateAction<string[]>>;
  minInactivity: string;
  setMinInactivity: (val: string) => void;
  tone: 'brief' | 'detailed';
  setTone: (val: 'brief' | 'detailed') => void;
  onBack: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ 
  selectedChannels, 
  unreads,
  setSelectedChannels, 
  minInactivity,
  setMinInactivity,
  tone,
  setTone,
  onBack 
}) => {
  const toggleChannel = (channel: string) => {
    setSelectedChannels(prev => 
      prev.includes(channel) 
        ? prev.filter(c => c !== channel) 
        : [...prev, channel]
    );
  };

  const selectAll = () => setSelectedChannels(Object.keys(unreads));
  const deselectAll = () => setSelectedChannels([]);

  return (
    <div className="p-12 max-w-2xl mx-auto w-full animate-in fade-in slide-in-from-left-4 duration-500 pb-24">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Catch-Up Settings</h2>
          <p className="text-slate-500 mt-2">Personalize your Gemini summary experience.</p>
        </div>
        <button 
          onClick={onBack}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          title="Close and return"
        >
          <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <div className="space-y-10">
        {/* CHANNELS */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Included Channels</h3>
            <div className="space-x-4">
              <button onClick={selectAll} className="text-xs font-bold text-indigo-600 hover:underline">Select All</button>
              <button onClick={deselectAll} className="text-xs font-bold text-slate-400 hover:underline">Deselect All</button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-2 bg-slate-50 p-4 rounded-2xl border border-slate-100 max-h-60 overflow-y-auto custom-scrollbar">
            {Object.keys(unreads).map(channel => (
              <label 
                key={channel} 
                className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                  selectedChannels.includes(channel) ? 'bg-white shadow-sm ring-1 ring-slate-200' : 'opacity-60 grayscale'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
                    selectedChannels.includes(channel) ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-200 text-slate-400'
                  }`}>
                    #
                  </div>
                  <div>
                    <div className="text-sm font-black text-slate-800">{channel}</div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">{unreads[channel]} messages unread</div>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  checked={selectedChannels.includes(channel)}
                  onChange={() => toggleChannel(channel)}
                />
              </label>
            ))}
          </div>
        </section>

        {/* INACTIVITY TIME */}
        <section>
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Minimum Inactivity Time</h3>
          <div className="grid grid-cols-3 gap-3">
            {['1 hr', '3 hrs', '1 day'].map(time => (
              <button
                key={time}
                onClick={() => setMinInactivity(time)}
                className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all ${
                  minInactivity === time 
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-200'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-slate-400 mt-2 italic px-1">Summarize only if I've been away for at least this long.</p>
        </section>

        {/* TONE */}
        <section>
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Summary Tone</h3>
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button
              onClick={() => setTone('brief')}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
                tone === 'brief' 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Brief
            </button>
            <button
              onClick={() => setTone('detailed')}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
                tone === 'detailed' 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Detailed
            </button>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 italic px-1">
            {tone === 'brief' ? 'Single bullet points focusing only on absolute essentials.' : 'Full context with reasoning and impact statements for each item.'}
          </p>
        </section>
      </div>

      <div className="mt-12 flex items-center space-x-4">
        <button 
          onClick={onBack}
          className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95"
        >
          Save and Exit
        </button>
      </div>
    </div>
  );
};
