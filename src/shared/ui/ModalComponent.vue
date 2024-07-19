<template>
  <div class="modal-overlay" @click.self="closeModal" v-if="props.isOpen">
    <div class="modal">
      <img v-if="props.card && props.card.urls" :src="props.card.urls.regular" :alt="props.card.alt_description" class="modal-image" />
      <div class="modal-content">
        <h2 v-if="props.card">{{ props.card.alt_description }}</h2>
        <p v-if="props.card">Photo by {{ props.card.user.name }}</p>
        <button @click="$emit('close')">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  card: {
    type: Object,
    default: () => ({}),
  },
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: white;
  padding: 20px;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.modal-image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
}

.modal-content {
  text-align: center;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}
</style>
