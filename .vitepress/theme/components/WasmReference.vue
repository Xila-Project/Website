<template>
  <a :href="href" class="wasm-reference-link">
    <slot>{{ text }}</slot>
  </a>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  path: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    default: "",
  },
});

const href = computed(() => {
  return `/wasm-reference?path=${encodeURIComponent(props.path)}`;
});
</script>

<style scoped>
.wasm-reference-link {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.wasm-reference-link:hover {
  color: var(--vp-c-brand-2);
  text-decoration: underline;
}
</style>
