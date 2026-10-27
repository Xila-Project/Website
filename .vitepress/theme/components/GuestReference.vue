<script setup>
import { ReferenceArchitecture } from "../utilities/reference";
import Reference from "./Reference.vue";

defineProps({
  repo: { type: String, default: "core" },
  crate: { type: String, required: true },
  kind: String,
  symbol: String,
  member: String,
});
</script>

<template>
  <Reference
    :repo="repo"
    :architecture="ReferenceArchitecture.Guest"
    :crate="crate"
    :kind="kind"
    :symbol="symbol"
    :member="member"
  >
    <slot />
  </Reference>
</template>
