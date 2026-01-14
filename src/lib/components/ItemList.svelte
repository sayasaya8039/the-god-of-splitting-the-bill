<script lang="ts">
  import { dndzone } from "svelte-dnd-action";
  import { sessionState } from "$lib/stores.svelte";
  import type { ReceiptItem } from "$lib/types";

  interface DndItem {
    id: string;
    data: ReceiptItem;
  }

  let items = $derived(
    sessionState.session.items
      .filter((item) => !item.assignedTo)
      .map((item) => ({ id: item.id, data: item }))
  );

  const flipDurationMs = 200;

  function handleDndConsider(e: CustomEvent<{ items: DndItem[] }>) {
    // 一時的な状態変更は無視
  }

  function handleDndFinalize(e: CustomEvent<{ items: DndItem[] }>) {
    // ドロップ完了時の処理
  }

  function formatPrice(price: number): string {
    return price.toLocaleString("ja-JP");
  }
</script>

<div class="space-y-3">
  <div class="flex items-center justify-between">
    <h2 class="font-bold text-gray-800">商品リスト</h2>
    <span class="text-sm text-gray-500">
      {items.length}件 / 合計 ¥{formatPrice(sessionState.totalAmount)}
    </span>
  </div>

  {#if items.length === 0}
    <div class="text-center py-8 text-gray-400">
      <p class="text-3xl mb-2">📝</p>
      <p>レシートをアップロードすると</p>
      <p>商品が表示されます</p>
    </div>
  {:else}
    <div
      use:dndzone={{
        items,
        flipDurationMs,
        dropTargetStyle: {},
        type: "item",
      }}
      onconsider={handleDndConsider}
      onfinalize={handleDndFinalize}
      class="space-y-2"
    >
      {#each items as item (item.id)}
        <div
          class="bg-white rounded-lg p-3 shadow-sm border border-gray-100
                 flex items-center justify-between cursor-grab active:cursor-grabbing
                 hover:shadow-md transition-shadow"
        >
          <div class="flex-1 min-w-0">
            <p class="font-medium text-gray-800 truncate">{item.data.name}</p>
            {#if item.data.quantity > 1}
              <p class="text-xs text-gray-500">×{item.data.quantity}</p>
            {/if}
          </div>
          <div class="text-right ml-3">
            <p class="font-bold text-blue-600">
              ¥{formatPrice(item.data.price * item.data.quantity)}
            </p>
          </div>
          <div class="ml-2 text-gray-300">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"/>
            </svg>
          </div>
        </div>
      {/each}
    </div>

    {#if sessionState.unassignedAmount > 0}
      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm">
        <p class="text-yellow-800">
          💡 商品を下の参加者にドラッグして割り当ててください
        </p>
      </div>
    {/if}
  {/if}
</div>
