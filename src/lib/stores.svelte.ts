// Svelte 5 Runes を使用した状態管理
import { nanoid } from "nanoid";
import type { ReceiptItem, Participant, Session, SplitResult } from "./types";
import { DEFAULT_PARTICIPANTS } from "./types";

// セッション状態
function createSessionState() {
  let session = $state<Session>({
    id: nanoid(10),
    createdAt: new Date().toISOString(),
    items: [],
    participants: [...DEFAULT_PARTICIPANTS],
  });

  // 割り勘計算結果
  let results = $derived.by(() => {
    const resultMap = new Map<string, SplitResult>();
    
    // 各参加者の結果を初期化
    for (const p of session.participants) {
      resultMap.set(p.id, {
        participantId: p.id,
        participantName: p.name,
        items: [],
        total: 0,
      });
    }
    
    // 未割り当てアイテム用
    resultMap.set("unassigned", {
      participantId: "unassigned",
      participantName: "未割り当て",
      items: [],
      total: 0,
    });
    
    // アイテムを分配
    for (const item of session.items) {
      const key = item.assignedTo || "unassigned";
      const result = resultMap.get(key);
      if (result) {
        result.items.push(item);
        result.total += item.price * item.quantity;
      }
    }
    
    return Array.from(resultMap.values());
  });

  // 合計金額
  let totalAmount = $derived(
    session.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  // 未割り当て金額
  let unassignedAmount = $derived(
    session.items
      .filter((item) => !item.assignedTo)
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  return {
    get session() { return session; },
    get results() { return results; },
    get totalAmount() { return totalAmount; },
    get unassignedAmount() { return unassignedAmount; },
    
    // アイテムを追加
    addItems(items: Omit<ReceiptItem, "id" | "assignedTo">[]) {
      const newItems = items.map((item) => ({
        ...item,
        id: nanoid(8),
        assignedTo: null,
      }));
      session.items = [...session.items, ...newItems];
    },
    
    // アイテムを割り当て
    assignItem(itemId: string, participantId: string | null) {
      session.items = session.items.map((item) =>
        item.id === itemId ? { ...item, assignedTo: participantId } : item
      );
    },
    
    // 参加者を追加
    addParticipant(name: string, emoji: string, color: string) {
      const newParticipant: Participant = {
        id: nanoid(6),
        name,
        emoji,
        color,
      };
      session.participants = [...session.participants, newParticipant];
    },
    
    // 参加者を削除
    removeParticipant(id: string) {
      session.participants = session.participants.filter((p) => p.id !== id);
      // その参加者に割り当てられたアイテムを未割り当てに
      session.items = session.items.map((item) =>
        item.assignedTo === id ? { ...item, assignedTo: null } : item
      );
    },
    
    // 参加者名を更新
    updateParticipant(id: string, updates: Partial<Participant>) {
      session.participants = session.participants.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      );
    },
    
    // アイテムをクリア
    clearItems() {
      session.items = [];
    },
    
    // セッションをリセット
    reset() {
      session = {
        id: nanoid(10),
        createdAt: new Date().toISOString(),
        items: [],
        participants: [...DEFAULT_PARTICIPANTS],
      };
    },
    
    // レシート画像を設定
    setReceiptImage(imageData: string) {
      session.receiptImage = imageData;
    },
  };
}

export const sessionState = createSessionState();

// API Key管理
function createApiKeyState() {
  let apiKey = $state<string>("");
  
  // localStorageから読み込み（ブラウザのみ）
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("gemini_api_key");
    if (stored) {
      apiKey = stored;
    }
  }
  
  return {
    get apiKey() { return apiKey; },
    get hasApiKey() { return apiKey.length > 0; },
    
    setApiKey(key: string) {
      apiKey = key;
      if (typeof window !== "undefined") {
        localStorage.setItem("gemini_api_key", key);
      }
    },
    
    clearApiKey() {
      apiKey = "";
      if (typeof window !== "undefined") {
        localStorage.removeItem("gemini_api_key");
      }
    },
  };
}

export const apiKeyState = createApiKeyState();
