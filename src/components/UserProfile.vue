<template>
    <div>
      <h2>User Profile</h2>
      <div v-if="formData">
        <div>
          <img :src="avatarURL" alt="Avatar" style="max-width: 200px; border-radius: 50%;" />
        </div>
        <div>
          <p><strong>First Name:</strong> {{ formData.firstName }}</p>
          <p><strong>Last Name:</strong> {{ formData.lastName }}</p>
          <p><strong>Email:</strong> {{ formData.email }}</p>
          <p><strong>Phone:</strong> {{ formData.phone }}</p>
          <p><strong>Birthday:</strong> {{ formData.birthday }}</p>
          <p><strong>About:</strong> {{ formData.about }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useStore } from 'vuex';
  
  const store = useStore();
  
  const formData = computed(() => store.state.formData);
  const avatarURL = computed(() => {
    if (formData.value.avatar) {
      return URL.createObjectURL(formData.value.avatar);
    }
  });
  </script>

<style scoped>
div {
  margin: 20px auto;
  max-width: 600px;
  padding: 20px;
  border: 1px solid #ccc;
}

img {
  display: block;
  margin: 0 auto 20px;
}

@media screen and (max-width: 600px) {
  div {
    padding: 10px;
  }

  img {
    max-width: 100%;
  }
}
</style>

  