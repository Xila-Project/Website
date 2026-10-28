<script setup>
import { computed } from "vue";
import { getSourceHref } from "../utilities/source-reference.mjs";

const props = defineProps({
  repo: { type: String, default: "core" },
  path: { type: String, required: true },
});

const href = computed(() => getSourceHref(props.repo, props.path));
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
