
import React, { useState, useCallback, useRef, useMemo } from 'react';
import { generateCatchUpSummary } from './services/geminiService';
import { AppState, CatchUpSummary, SlackMessage } from './types';
import { MOCK_MESSAGES, CHANNEL_UNREADS } from './constants';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { LandingView } from './components/LandingView';
import { WelcomeModal } from './components/WelcomeModal';
import { SettingsView } from './components/SettingsView';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  const [summary, setSummary] = useState<CatchUpSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [highlightedMessageId, setHighlightedMessageId] = useState<string | null>(null);
  const [selectedChannels, setSelectedChannels] = useState<string[]>(Object.keys(CHANNEL_UNREADS));
  
  // New Settings State
  const [minInactivity, setMinInactivity] = useState<string>('3 hrs');
  const [tone, setTone] = useState<'brief' | 'detailed'>('detailed');
  
  // State for unread counts so they can be cleared
  const [currentUnreads, setCurrentUnreads] = useState<Record<string, number>>(CHANNEL_UNREADS);
  
  const dashboardRef = useRef<HTMLDivElement>(null);

  // Exact stats based on current unreads
  const stats = useMemo(() => {
    const total = Object.values(currentUnreads).reduce((acc, curr) => acc + curr, 0);
    return {
      unreadCount: total,
      awayTime: "9 hours and 45 minutes"
    };
  }, [currentUnreads]);

  const handleRunCatchUp = useCallback(async () => {
    setShowWelcome(false);
    setAppState(AppState.ANALYZING);
    setError(null);
    try {
      const filteredMessages = MOCK_MESSAGES.filter(m => selectedChannels.includes(m.channel));
      // In a real app, we'd pass `tone` and `minInactivity` to the service here
      const result = await generateCatchUpSummary(filteredMessages);
      setSummary(result);
      setAppState(AppState.DASHBOARD);
    } catch (err) {
      console.error(err);
      setError("Failed to generate catch-up. Please try again.");
      setAppState(AppState.IDLE);
    }
  }, [selectedChannels, tone]);

  const handleCloseSummary = () => {
    setAppState(AppState.IDLE);
    setSummary(null);
    setHighlightedMessageId(null);
  };

  const handleMarkAsRead = () => {
    const cleared = { ...currentUnreads };
    Object.keys(cleared).forEach(k => cleared[k] = 0);
    setCurrentUnreads(cleared);
    
    setAppState(AppState.ALL_CAUGHT_UP);
    setSummary(null);
    setHighlightedMessageId(null);
  };

  const handleMessageJump = (messageId: string) => {
    setHighlightedMessageId(messageId);
  };

  const reset = () => {
    setAppState(AppState.IDLE);
    setSummary(null);
    setError(null);
    setHighlightedMessageId(null);
    setShowWelcome(false);
  };

  const openSettings = () => {
    setShowWelcome(false);
    setAppState(AppState.SETTINGS);
  };

  const handleSettingsBack = () => {
    // If we have unread messages and were analyzing/in dashboard, return there.
    // Otherwise return to the appropriate "caught up" or "idle" state.
    if (summary) {
      setAppState(AppState.DASHBOARD);
    } else if (stats.unreadCount === 0) {
      setAppState(AppState.ALL_CAUGHT_UP);
    } else {
      setAppState(AppState.IDLE);
    }
  };

  const handleSidebarCatchUpClick = () => {
    if (stats.unreadCount === 0) {
      setAppState(AppState.ALL_CAUGHT_UP);
      return;
    }
    
    if (appState === AppState.DASHBOARD) return;
    handleRunCatchUp();
  };

  const handleSkip = () => {
    setShowWelcome(false);
    setAppState(AppState.IDLE);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white relative">
      <Sidebar 
        activeTab={appState} 
        unreads={currentUnreads}
        onReset={reset} 
        onCatchUpClick={handleSidebarCatchUpClick}
      />

      <main className="flex-1 flex flex-col relative overflow-y-auto" ref={dashboardRef}>
        {error && (
          <div className="m-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        {appState === AppState.IDLE && (
          <LandingView messages={MOCK_MESSAGES} />
        )}

        {appState === AppState.SETTINGS && (
          <SettingsView 
            selectedChannels={selectedChannels} 
            unreads={currentUnreads}
            setSelectedChannels={setSelectedChannels} 
            minInactivity={minInactivity}
            setMinInactivity={setMinInactivity}
            tone={tone}
            setTone={setTone}
            onBack={handleSettingsBack} 
          />
        )}

        {appState === AppState.ANALYZING && (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-slate-800">Synthesizing messages...</h2>
              <p className="text-slate-500 text-sm mt-1 max-w-xs">Building your personalized catch-up dashboard.</p>
            </div>
          </div>
        )}

        {appState === AppState.DASHBOARD && summary && (
          <Dashboard 
            summary={summary} 
            onCloseSummary={handleCloseSummary}
            onMarkAsRead={handleMarkAsRead} 
            onJumpToMessage={handleMessageJump}
            onOpenSettings={openSettings}
            highlightedMessageId={highlightedMessageId}
            messages={MOCK_MESSAGES}
          />
        )}

        {appState === AppState.ALL_CAUGHT_UP && (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-5xl mb-6 shadow-sm">
              ✨
            </div>
            <h2 className="text-3xl font-bold text-slate-800">You're all caught up!</h2>
            <p className="text-slate-500 mt-4 max-w-md text-lg">
              No new unread messages to summarize.
            </p>
            <div className="mt-8 flex items-center space-x-4">
              <button 
                  onClick={reset}
                  className="px-6 py-2 border border-slate-200 rounded-full text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
              >
                  Return to Feed
              </button>
              <button 
                  onClick={openSettings}
                  className="px-6 py-2 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-slate-800 transition-all"
              >
                  Settings
              </button>
            </div>
          </div>
        )}
      </main>

      {showWelcome && (
        <WelcomeModal 
          unreadCount={stats.unreadCount}
          awayTime={stats.awayTime}
          onViewCatchUp={handleRunCatchUp} 
          onSkip={handleSkip}
          onSettings={openSettings}
        />
      )}
    </div>
  );
};

export default App;
