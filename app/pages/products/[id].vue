<template>
  <div>
    <h1>Product</h1>
    <button>Add to Cart</button>
  </div>
</template>
<script setup lang="ts">
  const { id } = useRoute().params;
  const { addToCart } = useCart();

  useSeoMeta({
    title: `Product ${id}`,
    description: `product ${id} description`,
  });
  </script>