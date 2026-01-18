<template>
  <div v-if="house" class="house-detail">
    <button class="back-btn" @click="$router.back()">← Volver</button>

    <img
      v-if="house.image"
      :src="house.image"
      :alt="house.name"
      class="house-hero-image"
    />

    <div class="house-header">
      <h1>{{ house.name }}</h1>
      <div class="location">
        📍 {{ house.address }}, {{ house.city }}, {{ house.country }}
      </div>
    </div>

    <div class="house-info">
      <div class="price-box">
        <span class="price">{{ house.price }} €</span>
        <span class="period">/noche</span>
      </div>

      <div class="stats">
        <div class="stat">
          <span class="icon">🛏️</span>
          <span>{{ house.bedrooms }} habitaciones</span>
        </div>
        <div class="stat">
          <span class="icon">🛌</span>
          <span>{{ house.beds }} camas</span>
        </div>
        <div class="stat">
          <span class="icon">🛁</span>
          <span>{{ house.bathrooms }} baños</span>
        </div>
      </div>
    </div>

    <div class="action-buttons">
      <button class="btn btn-primary" @click="handleReserve">
        📅 Reservar Ahora
      </button>
    </div>

    <div class="description">
      <h2>Descripción</h2>
      <p>{{ house.description }}</p>
    </div>

    <div class="amenities">
      <h2>Servicios</h2>
      <div class="amenities-grid">
        <span v-for="amenity in house.amenities" :key="amenity" class="amenity">
          ✓ {{ amenity }}
        </span>
      </div>
    </div>

    <div v-if="house.reviews.length" class="reviews">
      <h2>Reseñas ({{ house.reviews.length }})</h2>
      <div class="reviews-list">
        <article
          v-for="review in house.reviews"
          :key="review.id"
          class="review"
        >
          <div class="review-header">
            <strong>{{ review.author }}</strong>
            <span class="rating">⭐ {{ review.rating }}/5</span>
          </div>
          <div class="review-date">{{ formatDate(review.date) }}</div>
          <p class="review-comment">{{ review.comment }}</p>
        </article>
      </div>
    </div>
  </div>
  <div v-else class="loading">Cargando...</div>
</template>

<script setup lang="ts">
const route = useRoute();
const { id } = route.params;

const { data: house } = await useFetch(`/api/products/${id}`);

// Importar el composable useCart
const { addToCart, totalItems } = useCart();

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const handleReserve = () => {
  if (house.value) {
    const productForCart = {
      id: parseInt(house.value.id),
      name: house.value.name,
      description: house.value.description,
      price: house.value.price,
    };

    addToCart(productForCart, 1);
  }
};

useSeoMeta({
  title: house.value ? `${house.value.name} - Casa Rural` : "Casa Rural",
  description: house.value?.description || "Detalle de casa rural",
});
</script>

<style scoped>
.house-detail {
  max-width: 900px;
  margin: 0 auto;
}

.house-hero-image {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 24px;
}

.back-btn {
  background: #f3f4f6;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 20px;
  font-size: 14px;
}

.back-btn:hover {
  background: #e5e7eb;
}

.house-header {
  margin-bottom: 24px;
}

.house-header h1 {
  margin-bottom: 8px;
  color: #1f2937;
}

.location {
  color: #6b7280;
  font-size: 16px;
}

.house-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.price-box {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.price {
  font-size: 28px;
  font-weight: 700;
  color: #6a6120;
}

.period {
  color: #6b7280;
  font-size: 14px;
}

.stats {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.stat {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #4b5563;
}

.icon {
  font-size: 20px;
}

.action-buttons {
  margin: 24px 0;
}

.btn {
  padding: 14px 32px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  width: 100%;
  max-width: 300px;
}

.btn-primary {
  background: #6a6120;
  color: white;
}

.btn-primary:hover {
  background: #545013;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(106, 97, 32, 0.3);
}

.description {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
}

.description h2,
.amenities h2,
.reviews h2 {
  font-size: 20px;
  margin-bottom: 16px;
  color: #1f2937;
}

.description p {
  color: #4b5563;
  line-height: 1.6;
}

.amenities {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
}

.amenities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.amenity {
  color: #4b5563;
  padding: 8px;
  background: #f9fafb;
  border-radius: 6px;
}

.reviews {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
}

.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.review {
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
  flex-wrap: wrap;
  gap: 8px;
}

.review-header strong {
  color: #1f2937;
}

.rating {
  color: #6a6120;
  font-size: 14px;
}

.review-date {
  color: #9ca3af;
  font-size: 14px;
  margin-bottom: 8px;
}

.review-comment {
  color: #4b5563;
  line-height: 1.5;
  margin: 0;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #6b7280;
}

@media (max-width: 720px) {
  .house-info {
    flex-direction: column;
    align-items: flex-start;
  }

  .stats {
    width: 100%;
  }

  .amenities-grid {
    grid-template-columns: 1fr;
  }
}
</style>
