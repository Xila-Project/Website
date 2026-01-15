<script setup>
import { computed } from "vue";
import { getReferenceDisplayName } from "../utilities/reference";

const props = defineProps({
  crate: {
    type: String,
    required: true,
  },
});

const href = computed(() => {
  return `https://docs.rs/${props.crate}`;
});
const label = computed(() => getReferenceDisplayName(props.crate));
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
