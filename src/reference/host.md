---
layout: page
docType: reference
title: Host API
description: Generated Rust reference for Xila host runtime services.
footer: false
---

<script setup>
import { ref, onMounted } from 'vue'
import { getReferenceIframeSrc } from '../../.vitepress/theme/utilities/reference-path.mjs'

const iframeSrc = ref('https://documentation.xila.dev/host/xila/index.html')

onMounted(() => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search)
    const path = params.get('path')
    if (path) {
      iframeSrc.value = getReferenceIframeSrc('host', path)
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
