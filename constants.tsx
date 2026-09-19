
import { SlackMessage } from './types';

export const MOCK_MESSAGES: SlackMessage[] = [
  { id: '1', sender: 'Sarah Miller', channel: '#product-roadmap', timestamp: '09:15 AM', text: 'Hey @nidhi, could you check the latest designs for the onboarding flow? We need feedback by EOD tomorrow.', mentions: ['@nidhi'] },
  { id: '2', sender: 'John Chen', channel: '#engineering-general', timestamp: '10:30 AM', text: 'Decided to switch to Postgres for the new analytics service. Scaling issues with the previous choice were too risky.', mentions: [] },
  { id: '3', sender: 'HR Team', channel: '#announcements', timestamp: '11:00 AM', text: 'Reminder: Friday is a focus day. Please keep meetings to a minimum.', mentions: [] },
  { id: '4', sender: 'Marketing Bot', channel: '#social-feed', timestamp: '11:45 AM', text: 'New blog post published: Why AI is changing Slack workflows.', mentions: [] },
  { id: '5', sender: 'Alex Reed', channel: '#client-updates', timestamp: '01:20 PM', text: 'The client for project Orion just approved the budget increase for Phase 2.', mentions: [] },
  { id: '6', sender: 'Sarah Miller', channel: '#product-roadmap', timestamp: '02:00 PM', text: '@nidhi just following up on the design review. Let me know if you have questions!', mentions: ['@nidhi'] },
  { id: '7', sender: 'Tom Hughes', channel: '#general', timestamp: '02:30 PM', text: 'Who wants to grab coffee at 3pm? ☕', mentions: [] },
  { id: '8', sender: 'Director of Ops', channel: '#leadership', timestamp: '03:00 PM', text: 'Critical update: The Q3 kickoff meeting is moved from Monday to Wednesday at 10 AM.', mentions: [] },
  { id: '9', sender: 'DevOps Sam', channel: '#engineering-general', timestamp: '03:15 PM', text: 'Deployed the fix for the memory leak in the dashboard service. Monitoring now.', mentions: [] },
  { id: '10', sender: 'Emily Davis', channel: '#product-roadmap', timestamp: '03:45 PM', text: 'I added some comments to the Figma file. @nidhi, some of the spacing looks off on mobile.', mentions: ['@nidhi'] },
  { id: '11', sender: 'Security Bot', channel: '#alerts', timestamp: '04:00 PM', text: 'New login detected from unusual IP: 192.168.1.45 (San Francisco, CA)', mentions: [] },
  { id: '12', sender: 'Legal Team', channel: '#general', timestamp: '04:10 PM', text: 'Please ensure all internal docs are tagged with the new privacy classification by end of week.', mentions: [] },
  { id: '13', sender: 'Mark Zuckerberg (AI)', channel: '#general', timestamp: '04:20 PM', text: 'Testing the new meta-interop. Is anyone seeing this?', mentions: [] },
  { id: '14', sender: 'Sarah Miller', channel: '#product-roadmap', timestamp: '04:30 PM', text: '@nidhi we are meeting in 10 mins to discuss the onboarding flow. Can you join?', mentions: ['@nidhi'] },
  { id: '15', sender: 'Engineer Mike', channel: '#engineering-general', timestamp: '04:45 PM', text: 'Anyone else seeing 500s on the staging environment?', mentions: [] },
  { id: '16', sender: 'Engineer Mike', channel: '#engineering-general', timestamp: '04:50 PM', text: 'Fixed. It was just a config mismatch in the last deploy.', mentions: [] },
  { id: '17', sender: 'Support Team', channel: '#client-updates', timestamp: '05:05 PM', text: 'New ticket from HighPriority Client: They need a custom report export by tomorrow morning.', mentions: [] },
  { id: '18', sender: 'Project Manager Pete', channel: '#client-updates', timestamp: '05:15 PM', text: '@nidhi tagging you on the HighPriority report request. Can we handle this?', mentions: ['@nidhi'] },
  { id: '19', sender: 'Office Manager', channel: '#announcements', timestamp: '05:30 PM', text: 'The office fridge will be cleaned out this Friday. Please remove all items.', mentions: [] },
  { id: '20', sender: 'Finance Bot', channel: '#announcements', timestamp: '05:45 PM', text: 'Monthly expense reports are due by Monday morning.', mentions: [] },
  { id: '21', sender: 'Designer Chloe', channel: '#product-roadmap', timestamp: '06:00 PM', text: 'Uploaded the new icons to the shared drive. Let me know what you think.', mentions: [] },
  { id: '22', sender: 'CEO Bob', channel: '#leadership', timestamp: '06:15 PM', text: 'Great work on the Q2 numbers everyone. Dinner on me next week!', mentions: [] },
  { id: '23', sender: 'Director of Ops', channel: '#leadership', timestamp: '06:30 PM', text: 'Agreed. Let’s confirm the venue by Friday.', mentions: [] },
  { id: '24', sender: 'Sarah Miller', channel: '#product-roadmap', timestamp: '06:45 PM', text: 'Feedback on icons: The "home" one looks a bit like a barn. Can we tweak?', mentions: [] },
  { id: '25', sender: 'Nidhi Jain', channel: '#general', timestamp: '07:00 PM', text: 'Is it Friday yet?', mentions: [] }
];

export const CHANNEL_UNREADS: Record<string, number> = {
  '#product-roadmap': 6,
  '#engineering-general': 4,
  '#announcements': 3,
  '#general': 4,
  '#leadership': 3,
  '#client-updates': 3,
  '#social-feed': 1,
  '#alerts': 1
};

export const SLACK_THEME = {
  purple: '#4A154B',
  activeBlue: '#1264A3',
  hoverGray: '#F8F8F8',
  border: '#E8E8E8',
  text: '#1D1C1D',
  accent: '#36C5F0',
  red: '#E01E5A',
  green: '#2EB67D',
  yellow: '#ECB22E'
};
