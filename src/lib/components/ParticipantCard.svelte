<script lang="ts">
  import { dndzone, TRIGGERS, SHADOW_ITEM_MARKER_PROPERTY_NAME } from "svelte-dnd-action";
  import { sessionState } from "$lib/stores.svelte";
  import type { Participant, ReceiptItem } from "$lib/types";
  import { EMOJI_OPTIONS, COLOR_OPTIONS } from "$lib/types";

  interface Props {
    participant: Participant;
  }

  let { participant } = $props<Props>();
  let isEditing = $state(false);
  let editName = $state("");
  let showEmojiPicker = $state(false);

  interface DndItem {
    id: string;
    data: ReceiptItem;
    [SHADOW_ITEM_MARKER_PROPERTY_NAME]?: boolean;
  }

  let assignedItems = $derived(
    sessionState.session.items
      .filter((item) => item.assignedTo === participant.id)
      .map((item) => ({ id: item.id, data: item }))
  );

  let total = $derived(
    assignedItems.reduce((sum, item) => sum + item.data.price * item.data.quantity, 0)
  );

  const flipDurationMs = 200;

  function handleDndConsider(e: CustomEvent<{ items: DndItem[]; info: { trigger: string } }>) {
    // ドラッグ中のプレビュー
  }

  function handleDndFinalize(e: CustomEvent<{ items: DndItem[] }>) {
    // ドロップ完了 - アイテムを割り当て
    for (const item of e.detail.items) {
      if (!item[SHADOW_ITEM_MARKER_PROPERTY_NAME]) {
        sessionState.assignItem(item.id, participant.id);
      }
    }
  }

  function removeItem(itemId: string) {
    sessionState.assignItem(itemId, null);
  }

  function startEdit() {
    editName = participant.name;
    isEditing = true;
  }

  function saveName() {
    if (editName.trim()) {
      sessionState.updateParticipant(participant.id, { name: editName.trim() });
    }
    isEditing = false;
  }

  function selectEmoji(emoji: string) {
    sessionState.updateParticipant(participant.id, { emoji });
    showEmojiPicker = false;
  }

  function formatPrice(price: number): string {
    return price.toLocaleString("ja-JP");
  }
</script>

<div
  class="bg-white rounded-xl shadow-md overflow-hidden"
  style="border-left: 4px solid {participant.color}"
>
  <!-- ヘッダー -->
  <div class="p-3 flex items-center gap-3 bg-gray-50">
    <button
      type="button"
      onclick={() => showEmojiPicker = !showEmojiPicker}
      class="text-2xl hover:scale-110 transition-transform"
      aria-label="絵文字を変更"
    >
      {participant.emoji}
    </button>

    {#if isEditing}
      <input
        type="text"
        bind:value={editName}
        onblur={saveName}
        onkeydown={(e) => e.key === "Enter" && saveName()}
        class="flex-1 border rounded px-2 py-1 text-sm"
        aria-label="名前を編集"
      />
    {:else}
      <button
        type="button"
        onclick={startEdit}
        class="flex-1 text-left font-bold text-gray-800 hover:text-blue-600"
        aria-label="名前を編集"
      >
        {participant.name}
      </button>
    {/if}

    <div class="text-right">
      <p class="font-bold text-lg" style="color: {participant.color}">
        ¥{formatPrice(total)}
      </p>
    </div>
  </div>

  <!-- 絵文字ピッカー -->
  {#if showEmojiPicker}
    <div class="p-2 bg-gray-100 flex gap-2 flex-wrap justify-center">
      {#each EMOJI_OPTIONS as emoji}
        <button
          type="button"
          onclick={() => selectEmoji(emoji)}
          class="text-xl hover:scale-125 transition-transform"
          aria-label="{emoji}を選択"
        >
          {emoji}
        </button>
      {/each}
    </div>
  {/if}

  <!-- ドロップゾーン -->
  <div
    use:dndzone={{
      items: assignedItems,
      flipDurationMs,
      dropTargetStyle: { outline: "2px dashed " + participant.color },
      type: "item",
    }}
    onconsider={handleDndConsider}
    onfinalize={handleDndFinalize}
    class="min-h-[60px] p-2 space-y-1"
  >
    {#if assignedItems.length === 0}
      <div class="text-center py-4 text-gray-400 text-sm">
        ここに商品をドロップ
      </div>
    {:else}
      {#each assignedItems as item (item.id)}
        <div
          class="flex items-center justify-between bg-gray-50 rounded px-2 py-1 text-sm"
        >
          <span class="truncate flex-1">{item.data.name}</span>
          <span class="font-medium ml-2">¥{formatPrice(item.data.price)}</span>
          <button
            type="button"
            onclick={() => removeItem(item.id)}
            class="ml-2 text-gray-400 hover:text-red-500"
            aria-label="{item.data.name}を削除"
          >
            ×
          </button>
        </div>
      {/each}
    {/if}
  </div>
</div>
