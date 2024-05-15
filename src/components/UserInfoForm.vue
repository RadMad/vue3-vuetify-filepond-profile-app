<template>
    <form @submit.prevent="submitForm">
      <div>
        <label for="firstName">First Name:</label>
        <input id="firstName" type="text" v-model="formData.firstName" required />
      </div>
      <div>
        <label for="lastName">Last Name:</label>
        <input id="lastName" type="text" v-model="formData.lastName" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input id="email" type="email" v-model="formData.email" required />
      </div>
      <div>
        <label for="phone">Phone:</label>
        <input id="phone" type="tel" v-model="formData.phone" required />
      </div>
      <div>
        <label for="birthday">Birthday:</label>
        <input id="birthday" type="date" v-model="formData.birthday" required />
      </div>
      <div>
        <label for="about">About:</label>
        <textarea id="about" v-model="formData.about"></textarea>
      </div>
      <div>
        <label for="avatar">Avatar:</label>
        <input id="avatar" type="file" accept="image/*" @change="handleAvatarChange" />
      </div>
      <button type="submit">Submit</button>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  
  const store = useStore();
  
  const formData = ref({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthday: '',
    about: '',
    avatar: null,
  });
  
  function submitForm() {
    store.commit('setFormData', formData.value);
  }
  
  function handleAvatarChange(event) {
    const file = event.target.files[0];
    formData.value.avatar = file;
  }
  </script>
  
  <style scoped>
form {
  max-width: 400px;
  margin: 0 auto;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="email"],
input[type="tel"],
textarea,
button {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

@media screen and (max-width: 600px) {
  form {
    padding: 20px;
  }
}
</style>

  