<template>
  <div class="info-cards">
    <CircularLoader v-if="loading" />
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="!loading && !error" class="cards-container">
      <div v-for="card in cards" :key="card.id" class="card" @click="openModal(card)">
        <img :src="card.urls.small" :alt="card.alt_description" class="card-image" />
        <div class="card-content">
          <h3>{{ card.alt_description }}</h3>
          <p>Photo by {{ card.user.name }}</p>
        </div>
      </div>
    </div>
    <Teleport to="body">
      <ModalComponent :card="selectedCard" :isOpen="isModalOpen" @close="closeModal" />
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import ModalComponent from '../../shared/ui/ModalComponent.vue';
import CircularLoader from '../../shared/ui/CircularLoader.vue';

const cards = ref([]);
const loading = ref(false);
const error = ref(null);
const selectedCard = ref(null);
const isModalOpen = ref(false);
const cardItems = 24

const fetchData = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await axios.get('https://api.unsplash.com/photos', {
      params: {
        client_id: '15rsVEBMvb9cWBOrHEi9k4HaXq9lflKmfff1n46__cA',
        per_page: cardItems,
      },
    });
    cards.value = response.data;
  } catch (err) {
    error.value = 'Error fetching data.';
  } finally {
    loading.value = false;
  }
};

const openModal = (card) => {
  selectedCard.value = card;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.info-cards {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.loading, .error {
  font-size: 18px;
  color: #333;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.card {
  width: 200px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.card.expanded {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  width: 50%;
  height: 50%;
  background: white;
  border-radius: 0;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
}

.card-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.card-content {
  padding: 10px;
  text-align: center;
}

.card-content h3 {
  font-size: 16px;
  margin: 10px 0 5px;
}

.card-content p {
  font-size: 14px;
  color: #666;
}
</style>
