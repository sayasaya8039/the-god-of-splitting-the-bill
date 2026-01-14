<script lang="ts">
  import '../app.css';
  
  let { children } = $props();
</script>

<div class="min-h-screen bg-gradient-to-b from-blue-50 to-white">
  <header class="bg-white shadow-sm border-b border-gray-100">
    <div class="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
      <h1 class="text-xl font-bold text-blue-600 flex items-center gap-2">
        <span class="text-2xl">🧾</span>
        割り勘の神様
      </h1>
      <span class="text-xs text-gray-400">v0.1.0</span>
    </div>
  </header>
  
  <main class="max-w-lg mx-auto px-4 py-6">
    {@render children()}
  </main>
  
  <footer class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-2">
    <p class="text-center text-xs text-gray-400">
      Powered by Gemini Vision API
    </p>
  </footer>
</div>
