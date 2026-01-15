<script setup>
import { computed } from "vue";
import {
  getReferenceDisplayName,
  getReferencePath,
  ReferenceArchitecture,
} from "../utilities/reference";

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
});

const href = computed(() => {
  let file = "index.html";

  if (props.kind) {
    if (props.symbol === undefined) {
      throw new Error("Symbol is required when kind is provided");
    }
    file = getReferencePath(props.kind, props.symbol);
  } else {
    if (props.symbol !== undefined) {
      throw new Error("Symbol should not be provided when kind is missing");
    }
  }

  const path = `${props.crate}/${file}`;

  if (props.architecture === ReferenceArchitecture.Host) {
    return `/host-reference?path=${encodeURIComponent(path)}`;
  } else {
    return `/wasm-reference?path=${encodeURIComponent(path)}`;
  }
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
