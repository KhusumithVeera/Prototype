
import { GoogleGenAI, Type } from "@google/genai";
import { SlackMessage, CatchUpSummary } from "../types";

export const generateCatchUpSummary = async (messages: SlackMessage[]): Promise<CatchUpSummary> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    Analyze the following list of unread Slack messages and generate a structured catch-up summary.
    The user is Nidhi Jain (@nidhi). Focus on clarity, direct action, and decision-awareness.
    
    CRITICAL: For every action item, need-to-know, or decision you identify, you MUST provide the 'id' of the most relevant original message from the list as 'sourceMessageId'.
    
    Messages:
    ${JSON.stringify(messages, null, 2)}
    
    Identify:
    1. Direct Action Items (specifically where @nidhi is mentioned or implied tasks for Nidhi Jain).
    2. Need-to-Know (high impact status changes or announcements relevant to Nidhi Jain).
    3. Decisions & Timeline (changes in plans, dates, or tech choices).
    
    Rules:
    - Do NOT hallucinate.
    - Be concise.
    - Confidence levels should be High, Medium, or Low.
    - Always link to the source message id.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            startTime: { type: Type.STRING, description: "Start of inactivity window" },
            endTime: { type: Type.STRING, description: "End of inactivity window" },
            unreadCount: { type: Type.NUMBER, description: "Count of messages" },
            actionItems: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  taskSummary: { type: Type.STRING },
                  whoMentioned: { type: Type.STRING },
                  channel: { type: Type.STRING },
                  deadline: { type: Type.STRING },
                  confidenceLevel: { type: Type.STRING },
                  sourceMessageId: { type: Type.STRING }
                },
                required: ["taskSummary", "whoMentioned", "channel", "confidenceLevel", "sourceMessageId"]
              }
            },
            needToKnow: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  point: { type: Type.STRING },
                  sourceMessageId: { type: Type.STRING }
                },
                required: ["point", "sourceMessageId"]
              }
            },
            decisionsUpdates: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  time: { type: Type.STRING },
                  decision: { type: Type.STRING },
                  impact: { type: Type.STRING },
                  sourceMessageId: { type: Type.STRING }
                },
                required: ["time", "decision", "impact", "sourceMessageId"]
              }
            }
          },
          required: ["startTime", "endTime", "unreadCount", "actionItems", "needToKnow", "decisionsUpdates"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) throw new Error("Empty response from AI");
    
    return JSON.parse(resultText) as CatchUpSummary;
  } catch (error) {
    console.error("Error generating catch-up:", error);
    throw error;
  }
};
