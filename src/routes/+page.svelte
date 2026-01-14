<script lang="ts">
  import ReceiptUploader from "$lib/components/ReceiptUploader.svelte";
  import ItemList from "$lib/components/ItemList.svelte";
  import ParticipantCard from "$lib/components/ParticipantCard.svelte";
  import AddParticipant from "$lib/components/AddParticipant.svelte";
  import ResultSummary from "$lib/components/ResultSummary.svelte";
  import { sessionState } from "$lib/stores.svelte";

  let activeTab = $state<"upload" | "split">("upload");
</script>

<svelte:head>
  <title>割り勘の神様 - レシートから簡単割り勘</title>
</svelte:head>

<div class="space-y-6 pb-20">
  <!-- タブ切り替え -->
  <div class="flex bg-gray-100 rounded-lg p-1">
    <button
      type="button"
      onclick={() => activeTab = "upload"}
      class="flex-1 py-2 rounded-md text-sm font-medium transition-colors
             {activeTab === 'upload' ? 'bg-white shadow text-blue-600' : 'text-gray-600'}"
    >
      📷 レシート読取
    </button>
    <button
      type="button"
      onclick={() => activeTab = "split"}
      class="flex-1 py-2 rounded-md text-sm font-medium transition-colors
             {activeTab === 'split' ? 'bg-white shadow text-blue-600' : 'text-gray-600'}"
    >
      👥 割り勘設定
    </button>
  </div>

  {#if activeTab === "upload"}
    <!-- レシートアップロード -->
    <section>
      <ReceiptUploader />
    </section>

    <!-- 商品リスト -->
    {#if sessionState.session.items.length > 0}
      <section>
        <ItemList />
      </section>
    {/if}
  {:else}
    <!-- 参加者リスト -->
    <section>
      <h2 class="font-bold text-gray-800 mb-3">参加者</h2>
      <div class="space-y-4">
        {#each sessionState.session.participants as participant (participant.id)}
          <ParticipantCard {participant} />
        {/each}
        <AddParticipant />
      </div>
    </section>

    <!-- 未割り当てアイテム -->
    {#if sessionState.session.items.filter(i => !i.assignedTo).length > 0}
      <section>
        <ItemList />
      </section>
    {/if}

    <!-- 結果サマリー -->
    {#if sessionState.session.items.length > 0}
      <section>
        <ResultSummary />
      </section>
    {/if}
  {/if}

  <!-- クイックアクション -->
  {#if sessionState.session.items.length > 0}
    <div class="fixed bottom-16 left-0 right-0 px-4">
      <div class="max-w-lg mx-auto flex gap-2">
        <button
          type="button"
          onclick={() => activeTab = activeTab === "upload" ? "split" : "upload"}
          class="flex-1 py-3 bg-blue-600 text-white rounded-xl font-medium shadow-lg"
        >
          {activeTab === "upload" ? "👥 割り勘設定へ" : "📷 レシートへ戻る"}
        </button>
        <button
          type="button"
          onclick={() => {
            if (confirm("リセットしますか？")) sessionState.reset();
          }}
          class="py-3 px-4 bg-gray-200 rounded-xl"
        >
          🔄
        </button>
      </div>
    </div>
  {/if}
</div>
