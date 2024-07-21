<template>
  <div class="info-cards">
    <CircularLoader v-if="loading" />
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="!loading && !error" class="cards-container">
      <div v-for="card in cards" :key="card.id" class="card" @click="openModal(card)">
        <img v-if="card.image" :src="card.image" :alt="card.name" class="card-image" />
        <div class="card-content">
          <h3>{{card.name}}</h3>
          <p>{{card.price}}</p>
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
import ModalComponent from '../../shared/ui/ModalComponent.vue';
import CircularLoader from '../../shared/ui/CircularLoader.vue';
import api from '../../api/axios.js';

const cards = ref([]);
const loading = ref(false);
const error = ref(null);
const selectedCard = ref(null);
const isModalOpen = ref(false);

const fetchData = async () => {
  try {
    const response = await api.get('/main');
    cards.value = response.data.items;
    console.log(cards.value, 'items.value-------')
  } catch (err) {
    error.value = err.message || 'Ошибка при загрузке данных';
  }
};

const openModal = (card) => {
  console.log(card, 'card-------card====')
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
