<script setup>
import {
  ReferenceArchitecture,
  ReferenceCrate,
  ReferenceKind,
} from "../utilities/reference";
import Reference from "./Reference.vue";

const props = defineProps({
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
</script>

<template>
  <Reference
    :architecture="ReferenceArchitecture.Host"
    :crate="crate"
    :kind="kind"
    :identifier="identifier"
  >
    <slot />
  </Reference>
</template>
