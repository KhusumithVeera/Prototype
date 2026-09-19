
export interface SlackMessage {
  id: string;
  sender: string;
  channel: string;
  timestamp: string;
  text: string;
  mentions: string[];
}

export interface ActionItem {
  taskSummary: string;
  whoMentioned: string;
  channel: string;
  deadline?: string;
  confidenceLevel: 'High' | 'Medium' | 'Low';
  sourceMessageId?: string; // Link back to original message
}

export interface NeedToKnow {
  point: string;
  sourceMessageId?: string;
}

export interface DecisionUpdate {
  time: string;
  decision: string;
  impact: string;
  sourceMessageId?: string;
}

export interface CatchUpSummary {
  startTime: string;
  endTime: string;
  unreadCount: number;
  actionItems: ActionItem[];
  needToKnow: NeedToKnow[];
  decisionsUpdates: DecisionUpdate[];
}

export enum AppState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  DASHBOARD = 'DASHBOARD',
  ALL_CAUGHT_UP = 'ALL_CAUGHT_UP',
  SETTINGS = 'SETTINGS'
}
