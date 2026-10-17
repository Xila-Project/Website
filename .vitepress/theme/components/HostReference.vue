<script setup>
import { ReferenceArchitecture } from "../utilities/reference";
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
  symbol: {
    type: String,
    required: false,
  },
  member: {
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
    :symbol="symbol"
    :member="member"
  >
    <slot />
  </Reference>
</template>
