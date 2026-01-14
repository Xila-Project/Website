<script setup>
import { computed } from "vue";
import {
  getReferencePath,
  ReferenceArchitecture,
  ReferenceCrate,
  ReferenceKind,
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
  identifier: {
    type: String,
    required: false,
  },
});

const href = computed(() => {
  let path = "index.html";

  if (props.kind) {
    if (props.identifier === undefined) {
      throw new Error("Identifier is required when kind is provided");
    }
    path = getReferencePath(props.kind, props.identifier);
  } else {
    // if (props.identifier !== undefined) {
    //   throw new Error("Identifier should not be provided when kind is missing");
    // }
  }

  if (props.architecture === ReferenceArchitecture.Host) {
    return `/host-reference?path=${encodeURIComponent(path)}`;
  } else {
    return `/wasm-reference?path=${encodeURIComponent(path)}`;
  }
});
</script>

<template>
  <a :href="href" class="wasm-reference-link">
    <slot>{{ identifier }}</slot>
  </a>
</template>

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
