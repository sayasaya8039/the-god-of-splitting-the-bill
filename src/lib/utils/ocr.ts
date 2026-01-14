// Gemini Vision API を使用したレシートOCR
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { ReceiptItem } from "../types";

export interface OcrResult {
  success: boolean;
  items: Omit<ReceiptItem, "id" | "assignedTo">[];
  rawText?: string;
  error?: string;
}

const OCR_PROMPT = `
あなたはレシート画像を解析するAIです。
画像からすべての商品名と金額を抽出してください。

以下のJSON形式で出力してください（JSONのみ、説明不要）:
{
  "items": [
    { "name": "商品名", "price": 金額(数値), "quantity": 数量(数値) }
  ]
}

注意点:
- 金額は数値のみ（円マーク不要）
- 税込み価格を使用
- 割引がある場合は割引後の価格
- 小計、合計、消費税の行は除外
- 数量が記載されていない場合は1
`;

export async function analyzeReceipt(
  imageBase64: string,
  apiKey: string
): Promise<OcrResult> {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Base64データからMIMEタイプを取得
    const mimeMatch = imageBase64.match(/^data:(image\/\w+);base64,/);
    const mimeType = mimeMatch ? mimeMatch[1] : "image/jpeg";
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");

    const result = await model.generateContent([
      OCR_PROMPT,
      {
        inlineData: {
          mimeType,
          data: base64Data,
        },
      },
    ]);

    const response = result.response;
    const text = response.text();
    
    // JSONを抽出
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return {
        success: false,
        items: [],
        rawText: text,
        error: "JSONの抽出に失敗しました",
      };
    }

    const parsed = JSON.parse(jsonMatch[0]);
    
    if (!parsed.items || !Array.isArray(parsed.items)) {
      return {
        success: false,
        items: [],
        rawText: text,
        error: "商品リストの取得に失敗しました",
      };
    }

    // バリデーションと正規化
    const items = parsed.items
      .filter((item: unknown) => {
        if (typeof item !== "object" || item === null) return false;
        const i = item as Record<string, unknown>;
        return typeof i.name === "string" && typeof i.price === "number";
      })
      .map((item: { name: string; price: number; quantity?: number }) => ({
        name: item.name.trim(),
        price: Math.round(item.price),
        quantity: item.quantity || 1,
      }));

    return {
      success: true,
      items,
      rawText: text,
    };
  } catch (error) {
    console.error("OCR Error:", error);
    return {
      success: false,
      items: [],
      error: error instanceof Error ? error.message : "OCR処理中にエラーが発生しました",
    };
  }
}

// 画像をBase64に変換
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// 画像をリサイズ（APIコスト削減のため）
export async function resizeImage(
  base64: string,
  maxWidth = 1024,
  maxHeight = 1024
): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;
      
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }
      
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.8));
      } else {
        resolve(base64);
      }
    };
    img.src = base64;
  });
}
