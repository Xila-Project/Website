<script setup>
import { computed } from "vue";
import { getReferenceDisplayName } from "../utilities/reference";

const props = defineProps({
  path: {
    type: String,
    required: true,
  },
});

const href = computed(() => {
  return `https://github.com/Xila-Project/Core/tree/main/${props.path}`;
});
const label = computed(() => `<code>${props.path}</code>`);
</script>

<template>
  <a :href="href" class="external-reference-link">
    <slot><span v-html="label"></span></slot>
  </a>
</template>

<style scoped>
.external-reference-link {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.external-reference-link:hover {
  color: var(--vp-c-brand-2);
  text-decoration: underline;
}
</style>
