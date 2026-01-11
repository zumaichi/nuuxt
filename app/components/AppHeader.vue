<template>
  <header>
    {{ totalItems }}
  </header>
</template>

<script setup lang="ts">
const { totalItems } = useCart();
</script>
