<script lang="ts">
  import { sessionState } from "$lib/stores.svelte";
  import type { Participant } from "$lib/types";

  interface Props {
    participant: Participant;
  }

  let { participant } = $props<Props>();

  let assignedItems = $derived(
    sessionState.session.items.filter((item) => item.assignedTo === participant.id)
  );

  let total = $derived(
    assignedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  function formatPrice(price: number): string {
    return price.toLocaleString("ja-JP");
  }

  function removeItem(itemId: string) {
    sessionState.assignItem(itemId, null);
  }
</script>

{#if assignedItems.length > 0}
  <div
    class="bg-white rounded-xl shadow-md overflow-hidden"
    style="border-left: 4px solid {participant.color}"
  >
    <!-- ヘッダー -->
    <div class="p-3 flex items-center gap-3 bg-gray-50">
      <span class="text-2xl">{participant.emoji}</span>
      <span class="flex-1 font-bold text-gray-800">{participant.name}</span>
      <div class="text-right">
        <p class="font-bold text-lg" style="color: {participant.color}">
          ¥{formatPrice(total)}
        </p>
      </div>
    </div>

    <!-- 割り当て済み商品リスト -->
    <div class="p-2 space-y-1">
      {#each assignedItems as item (item.id)}
        <div class="flex items-center justify-between bg-gray-50 rounded px-2 py-1 text-sm">
          <span class="truncate flex-1">{item.name}</span>
          <span class="font-medium ml-2">¥{formatPrice(item.price * item.quantity)}</span>
          <button
            type="button"
            onclick={() => removeItem(item.id)}
            class="ml-2 text-gray-400 hover:text-red-500"
            aria-label="{item.name}を削除"
          >
            ×
          </button>
        </div>
      {/each}
    </div>
  </div>
{/if}
