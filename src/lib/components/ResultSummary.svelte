<script lang="ts">
  import { sessionState } from "$lib/stores.svelte";

  let showDetails = $state(false);

  function formatPrice(price: number): string {
    return price.toLocaleString("ja-JP");
  }

  function copyResults() {
    const text = sessionState.results
      .filter((r) => r.participantId !== "unassigned" && r.total > 0)
      .map((r) => `${r.participantName}: ¥${formatPrice(r.total)}`)
      .join("\n");
    
    navigator.clipboard.writeText(text);
    alert("コピーしました！");
  }
</script>

<div class="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-4 text-white">
  <div class="flex items-center justify-between mb-3">
    <h2 class="font-bold text-lg">💰 割り勘結果</h2>
    <button
      type="button"
      onclick={copyResults}
      class="text-sm bg-white/20 rounded-lg px-3 py-1 hover:bg-white/30"
    >
      📋 コピー
    </button>
  </div>

  <div class="space-y-2">
    {#each sessionState.results.filter((r) => r.participantId !== "unassigned") as result}
      {@const participant = sessionState.session.participants.find(p => p.id === result.participantId)}
      <div class="flex items-center justify-between bg-white/10 rounded-lg p-2">
        <div class="flex items-center gap-2">
          <span class="text-xl">{participant?.emoji || "👤"}</span>
          <span>{result.participantName}</span>
        </div>
        <span class="font-bold text-lg">¥{formatPrice(result.total)}</span>
      </div>
    {/each}
  </div>

  {#if sessionState.unassignedAmount > 0}
    <div class="mt-3 pt-3 border-t border-white/20">
      <div class="flex items-center justify-between text-yellow-200">
        <span>⚠️ 未割り当て</span>
        <span>¥{formatPrice(sessionState.unassignedAmount)}</span>
      </div>
    </div>
  {/if}

  <div class="mt-3 pt-3 border-t border-white/20">
    <div class="flex items-center justify-between">
      <span class="font-bold">合計</span>
      <span class="font-bold text-xl">¥{formatPrice(sessionState.totalAmount)}</span>
    </div>
  </div>

  <!-- 詳細トグル -->
  <button
    type="button"
    onclick={() => showDetails = !showDetails}
    class="mt-3 w-full text-center text-sm text-white/70 hover:text-white"
  >
    {showDetails ? "▲ 詳細を隠す" : "▼ 詳細を表示"}
  </button>

  {#if showDetails}
    <div class="mt-3 space-y-3">
      {#each sessionState.results.filter((r) => r.participantId !== "unassigned" && r.items.length > 0) as result}
        <div class="bg-white/10 rounded-lg p-2">
          <p class="font-medium mb-1">{result.participantName}</p>
          <ul class="text-sm text-white/80 space-y-1">
            {#each result.items as item}
              <li class="flex justify-between">
                <span>{item.name}</span>
                <span>¥{formatPrice(item.price * item.quantity)}</span>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  {/if}
</div>
