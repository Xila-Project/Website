---
layout: page
footer: false
---

<script setup>
import { ref, onMounted } from 'vue'

const iframeSrc = ref('https://documentation.xila.dev/guest/wasm/index.html')

onMounted(() => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search)
    const path = params.get('path')
    if (path) {
      iframeSrc.value = `https://documentation.xila.dev/guest/${path}`
    }
  }
})
</script>

<div style="height: calc(100vh - 64px); width: 100%;">
  <iframe
    :src="iframeSrc"
    style="width: 100%; height: 100%; border: none;">
  </iframe>
</div>
