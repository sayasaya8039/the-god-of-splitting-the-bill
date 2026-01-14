<script lang="ts">
  import { sessionState } from "$lib/stores.svelte";

  // 全商品を表示（割り当て済み含む）
  let allItems = $derived(sessionState.session.items);
  let participants = $derived(sessionState.session.participants);

  function formatPrice(price: number): string {
    return price.toLocaleString("ja-JP");
  }

  function handleAssign(itemId: string, participantId: string | null) {
    sessionState.assignItem(itemId, participantId === "" ? null : participantId);
  }

  function getParticipantEmoji(participantId: string | null): string {
    if (!participantId) return "❓";
    const p = participants.find(p => p.id === participantId);
    return p?.emoji || "👤";
  }

  function getParticipantColor(participantId: string | null): string {
    if (!participantId) return "#9CA3AF";
    const p = participants.find(p => p.id === participantId);
    return p?.color || "#9CA3AF";
  }
</script>

<div class="space-y-3">
  <div class="flex items-center justify-between">
    <h2 class="font-bold text-gray-800">商品リスト</h2>
    <span class="text-sm text-gray-500">
      {allItems.length}件 / 合計 ¥{formatPrice(sessionState.totalAmount)}
    </span>
  </div>

  {#if allItems.length === 0}
    <div class="text-center py-8 text-gray-400">
      <p class="text-3xl mb-2">📝</p>
      <p>レシートをアップロードすると</p>
      <p>商品が表示されます</p>
    </div>
  {:else}
    <div class="space-y-2">
      {#each allItems as item (item.id)}
        <div
          class="bg-white rounded-lg p-3 shadow-sm border-l-4 transition-all"
          style="border-left-color: {getParticipantColor(item.assignedTo)}"
        >
          <div class="flex items-center gap-3">
            <!-- 商品情報 -->
            <div class="flex-1 min-w-0">
              <p class="font-medium text-gray-800 truncate">{item.name}</p>
              {#if item.quantity > 1}
                <p class="text-xs text-gray-500">×{item.quantity}</p>
              {/if}
            </div>

            <!-- 価格 -->
            <div class="text-right">
              <p class="font-bold text-blue-600">
                ¥{formatPrice(item.price * item.quantity)}
              </p>
            </div>

            <!-- 割り当てドロップダウン -->
            <div class="relative">
              <select
                value={item.assignedTo || ""}
                onchange={(e) => handleAssign(item.id, e.currentTarget.value)}
                class="appearance-none bg-gray-100 rounded-lg pl-8 pr-6 py-2 text-sm
                       border-2 border-transparent focus:border-blue-400 focus:outline-none
                       cursor-pointer min-w-[100px]"
                style="border-color: {item.assignedTo ? getParticipantColor(item.assignedTo) : transparent}"
              >
                <option value="">未割当</option>
                {#each participants as p (p.id)}
                  <option value={p.id}>{p.emoji} {p.name}</option>
                {/each}
              </select>
              <!-- 絵文字表示 -->
              <span class="absolute left-2 top-1/2 -translate-y-1/2 text-lg pointer-events-none">
                {getParticipantEmoji(item.assignedTo)}
              </span>
              <!-- 矢印 -->
              <svg class="absolute right-1.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- 割り当て状況サマリー -->
    {#if sessionState.unassignedAmount > 0}
      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm">
        <p class="text-yellow-800">
          ⚠️ 未割り当て: ¥{formatPrice(sessionState.unassignedAmount)}
        </p>
      </div>
    {:else if allItems.length > 0}
      <div class="bg-green-50 border border-green-200 rounded-lg p-3 text-sm">
        <p class="text-green-800">
          ✅ すべての商品が割り当て済みです
        </p>
      </div>
    {/if}
  {/if}
</div>
