<template>
  <div>
    <h2>User Profile</h2>
    <div v-if="formData">
      <div>
        <img :src="avatarURL" alt="Avatar" />
      </div>
      <div>
        <p><strong>First Name:</strong> {{ formData.firstName }}</p>
        <p><strong>Last Name:</strong> {{ formData.lastName }}</p>
        <p><strong>Email:</strong> {{ formData.email }}</p>
        <p><strong>Phone:</strong> {{ formData.phone }}</p>
        <p><strong>Birthday:</strong> {{ formatDate(formData.birthday) }}</p>
        <p><strong>About:</strong> {{ formData.about }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const formData = computed(() => store.state.formData);
const avatarURL = computed(() => {
  if (formData.value.avatar) {
    return `data:image/jpeg;base64, ${formData.value.avatar}`;
  }
});

function formatDate(dateString) {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}
</script>

<style lang="scss" scoped>
div {
  margin: 20px auto;
  max-width: 600px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

img {
  display: block;
  margin: 0 auto 20px;
  max-width: 100%;
  border-radius: 50%;
}
</style>
