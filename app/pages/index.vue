<template>
  <div>
    <h1>Casas Rurales</h1>

    <div class="grid">
      <article v-for="house in houses" :key="house.id" class="card">
        <div class="row">
          <h2 class="title">
            <NuxtLink class="link" :to="`/products/${house.id}`">{{
              house.name
            }}</NuxtLink>
          </h2>
          <span class="price">{{ house.price }} €/noche</span>
        </div>
        <p class="desc">{{ house.description }}</p>
        <div class="info">
          <span>🛏️ {{ house.bedrooms }} habitaciones</span>
          <span>🛁 {{ house.bathrooms }} baños</span>
          <span>📍 {{ house.city }}</span>
        </div>
        <div class="row end">
          <button type="button" class="btn" @click="viewDetails(house.id)">
            Ver detalles
          </button>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();

useSeoMeta({
  title: `${config.public.siteName} · Casas Rurales`,
  description:
    "Encuentra las mejores casas rurales de España. Alquiler de casas con piscina, jardín y todas las comodidades.",
});

const { data: houses } = await useFetch("/api/products");

const viewDetails = (id: string) => {
  navigateTo(`/products/${id}`);
};
</script>

<style scoped>
.hint {
  color: #6b7280;
  margin: 6px 0 20px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}
.card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  justify-content: start;
}
.title {
  font-size: 18px;
}
.link {
  color: #6a6120;
  text-decoration: none;
}
.link:hover {
  text-decoration: underline;
}
.desc {
  margin: 0.8rem 0;
  color: #4b5563;
}
.info {
  display: flex;
  gap: 12px;
  margin: 8px 0;
  font-size: 14px;
  color: #6b7280;
  flex-wrap: wrap;
}
.info span {
  display: flex;
  align-items: center;
  gap: 4px;
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
.row.end {
  margin-top: auto;
  justify-content: flex-end;
}
.price {
  font-weight: 700;
}
.error {
  background: #fff7ed;
  border: 1px solid #fed7aa;
  padding: 12px;
  border-radius: 12px;
}
@media (max-width: 720px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
