<script lang="ts">
  import { sessionState } from "$lib/stores.svelte";
  import { EMOJI_OPTIONS, COLOR_OPTIONS } from "$lib/types";

  let showForm = $state(false);
  let name = $state("");
  let selectedEmoji = $state(EMOJI_OPTIONS[0]);
  let selectedColor = $state(COLOR_OPTIONS[0]);

  function addParticipant() {
    if (name.trim()) {
      sessionState.addParticipant(name.trim(), selectedEmoji, selectedColor);
      name = "";
      showForm = false;
    }
  }

  function cancel() {
    name = "";
    showForm = false;
  }

  function getColorName(color: string): string {
    const colorNames: Record<string, string> = {
      '#3B82F6': '青',
      '#10B981': '緑',
      '#F59E0B': 'オレンジ',
      '#EF4444': '赤',
      '#8B5CF6': '紫',
      '#EC4899': 'ピンク',
    };
    return colorNames[color] || color;
  }
</script>

{#if showForm}
  <div class="bg-white rounded-xl shadow-md p-4 border-2 border-dashed border-blue-300">
    <h3 class="font-bold mb-3">参加者を追加</h3>
    
    <input
      type="text"
      placeholder="名前を入力"
      bind:value={name}
      class="w-full border rounded-lg px-3 py-2 mb-3"
      aria-label="参加者の名前"
    />

    <div class="mb-3">
      <p class="text-sm text-gray-600 mb-1">アイコン</p>
      <div class="flex gap-2 flex-wrap">
        {#each EMOJI_OPTIONS as emoji}
          <button
            type="button"
            onclick={() => selectedEmoji = emoji}
            class="text-xl p-1 rounded {selectedEmoji === emoji ? 'bg-blue-100 ring-2 ring-blue-400' : ''}"
            aria-label="{emoji}を選択"
          >
            {emoji}
          </button>
        {/each}
      </div>
    </div>

    <div class="mb-4">
      <p class="text-sm text-gray-600 mb-1">カラー</p>
      <div class="flex gap-2">
        {#each COLOR_OPTIONS as color}
          <button
            type="button"
            onclick={() => selectedColor = color}
            class="w-8 h-8 rounded-full {selectedColor === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''}"
            style="background-color: {color}"
            aria-label="{getColorName(color)}を選択"
          ></button>
        {/each}
      </div>
    </div>

    <div class="flex gap-2">
      <button
        type="button"
        onclick={cancel}
        class="flex-1 py-2 border rounded-lg"
      >
        キャンセル
      </button>
      <button
        type="button"
        onclick={addParticipant}
        disabled={!name.trim()}
        class="flex-1 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
      >
        追加
      </button>
    </div>
  </div>
{:else}
  <button
    type="button"
    onclick={() => showForm = true}
    class="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl
           text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors"
  >
    <span class="text-2xl">➕</span>
    <span class="block text-sm mt-1">参加者を追加</span>
  </button>
{/if}
