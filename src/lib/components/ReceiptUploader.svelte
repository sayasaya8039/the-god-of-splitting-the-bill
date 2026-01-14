<script lang="ts">
  import { sessionState, apiKeyState } from "$lib/stores.svelte";
  import { analyzeReceipt, fileToBase64, resizeImage } from "$lib/utils/ocr";

  let isProcessing = $state(false);
  let error = $state<string | null>(null);
  let isDragOver = $state(false);
  let fileInput: HTMLInputElement;
  let showApiKeyModal = $state(false);
  let tempApiKey = $state("");

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      error = "画像ファイルを選択してください";
      return;
    }

    if (!apiKeyState.hasApiKey) {
      showApiKeyModal = true;
      return;
    }

    isProcessing = true;
    error = null;

    try {
      const base64 = await fileToBase64(file);
      const resized = await resizeImage(base64);
      sessionState.setReceiptImage(resized);

      const result = await analyzeReceipt(resized, apiKeyState.apiKey);

      if (result.success && result.items.length > 0) {
        sessionState.addItems(result.items);
      } else {
        error = result.error || "商品を読み取れませんでした";
      }
    } catch (e) {
      error = e instanceof Error ? e.message : "処理中にエラーが発生しました";
    } finally {
      isProcessing = false;
    }
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    isDragOver = false;
    const file = e.dataTransfer?.files[0];
    if (file) handleFile(file);
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
    isDragOver = true;
  }

  function handleDragLeave() {
    isDragOver = false;
  }

  function handleInputChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) handleFile(file);
  }

  function saveApiKey() {
    if (tempApiKey.trim()) {
      apiKeyState.setApiKey(tempApiKey.trim());
      showApiKeyModal = false;
      tempApiKey = "";
    }
  }
</script>

<div class="space-y-4">
  <!-- API Key設定ボタン -->
  <button
    type="button"
    onclick={() => showApiKeyModal = true}
    class="text-sm text-blue-600 underline"
  >
    {apiKeyState.hasApiKey ? "API Key設定済み ✓" : "Gemini API Keyを設定"}
  </button>

  <!-- アップロードエリア -->
  <div
    role="button"
    tabindex="0"
    ondrop={handleDrop}
    ondragover={handleDragOver}
    ondragleave={handleDragLeave}
    onclick={() => fileInput.click()}
    onkeydown={(e) => e.key === "Enter" && fileInput.click()}
    class="border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer
           {isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
           {isProcessing ? 'opacity-50 pointer-events-none' : ''}"
  >
    {#if isProcessing}
      <div class="animate-pulse">
        <div class="text-4xl mb-2">🔍</div>
        <p class="text-gray-600">レシートを読み取り中...</p>
      </div>
    {:else}
      <div class="text-4xl mb-2">📷</div>
      <p class="text-gray-700 font-medium">レシートをアップロード</p>
      <p class="text-sm text-gray-500 mt-1">
        タップして撮影 / 画像をドラッグ＆ドロップ
      </p>
    {/if}
  </div>

  <input
    type="file"
    accept="image/*"
    capture="environment"
    bind:this={fileInput}
    onchange={handleInputChange}
    class="hidden"
  />

  {#if error}
    <div class="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
      {error}
    </div>
  {/if}

  <!-- レシートプレビュー -->
  {#if sessionState.session.receiptImage}
    <div class="relative">
      <img
        src={sessionState.session.receiptImage}
        alt="レシート"
        class="w-full rounded-lg shadow-md"
      />
      <button
        type="button"
        onclick={() => sessionState.setReceiptImage("")}
        class="absolute top-2 right-2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center"
      >
        ×
      </button>
    </div>
  {/if}
</div>

<!-- API Key モーダル -->
{#if showApiKeyModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl p-6 max-w-sm w-full">
      <h3 class="text-lg font-bold mb-4">Gemini API Key設定</h3>
      <p class="text-sm text-gray-600 mb-4">
        Google AI Studioで無料のAPI Keyを取得できます。
        <a
          href="https://aistudio.google.com/apikey"
          target="_blank"
          rel="noopener"
          class="text-blue-600 underline"
        >
          取得はこちら
        </a>
      </p>
      <input
        type="password"
        placeholder="API Key を入力"
        bind:value={tempApiKey}
        class="w-full border rounded-lg px-3 py-2 mb-4"
      />
      <div class="flex gap-2">
        <button
          type="button"
          onclick={() => showApiKeyModal = false}
          class="flex-1 py-2 border rounded-lg"
        >
          キャンセル
        </button>
        <button
          type="button"
          onclick={saveApiKey}
          class="flex-1 py-2 bg-blue-600 text-white rounded-lg"
        >
          保存
        </button>
      </div>
    </div>
  </div>
{/if}
