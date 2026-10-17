<script setup>
import { computed } from "vue";
import {
  getReferenceDisplayName,
  ReferenceArchitecture,
} from "../utilities/reference";
import {
  getReferenceTargetPath,
  getReferenceViewerHref,
} from "../utilities/reference-path.mjs";

const props = defineProps({
  architecture: {
    type: String,
    required: true,
  },
  crate: {
    type: String,
    required: true,
  },
  kind: {
    type: String,
    required: false,
  },
  symbol: {
    type: String,
    required: false,
  },
  member: {
    type: String,
    required: false,
  },
});

const href = computed(() => {
  const targetPath = getReferenceTargetPath(
    props.crate,
    props.kind,
    props.symbol,
    props.member,
  );

  return getReferenceViewerHref(props.architecture, targetPath);
});

const label = computed(() =>
  getReferenceDisplayName(props.crate, props.kind, props.symbol),
);
</script>

<template>
  <a :href="href" class="reference-link">
    <slot><span v-html="label"></span></slot>
  </a>
</template>

<style scoped>
.reference-link {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.reference-link:hover {
  color: var(--vp-c-brand-2);
  text-decoration: underline;
}
</style>
