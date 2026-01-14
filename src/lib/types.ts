// 割り勘アプリの型定義

export interface ReceiptItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  assignedTo: string | null; // participant id
}

export interface Participant {
  id: string;
  name: string;
  color: string;
  emoji: string;
}

export interface Session {
  id: string;
  createdAt: string;
  items: ReceiptItem[];
  participants: Participant[];
  receiptImage?: string;
}

export interface SplitResult {
  participantId: string;
  participantName: string;
  items: ReceiptItem[];
  total: number;
}

export const DEFAULT_PARTICIPANTS: Participant[] = [
  { id: "p1", name: "自分", color: "#3b82f6", emoji: "😊" },
  { id: "p2", name: "友達1", color: "#10b981", emoji: "😄" },
  { id: "p3", name: "友達2", color: "#f59e0b", emoji: "😎" },
];

export const EMOJI_OPTIONS = ["😊", "😄", "😎", "🥳", "😺", "🐶", "🌟", "💫"];
export const COLOR_OPTIONS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];
