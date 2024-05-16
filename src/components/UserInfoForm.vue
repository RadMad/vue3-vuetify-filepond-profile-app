<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="firstName">First Name*</label>
      <input id="firstName" type="text" v-model="formData.firstName" required maxlength="16"/>
    </div>
    <div>
      <label for="lastName">Last Name*</label>
      <input id="lastName" type="text" v-model="formData.lastName" required maxlength="16"/>
    </div>
    <div>
      <label for="email">Email*</label>
      <input id="email" type="email" v-model="formData.email" required maxlength="20"/>
    </div>
    <div>
      <label for="phone">Phone</label>
      <input id="phone" type="tel" v-model="formData.phone" pattern="[0-9]{9}" maxlength="9" placeholder="123456789"/>
    </div>
    <div>
      <label for="birthday">Birthday</label>
      <input id="birthday" type="date" v-model="formData.birthday" min="1900-01-01" :max="todayDateFormatted"/>
    </div>
    <div>
      <label for="about">About</label>
      <textarea id="about" v-model="formData.about" maxlength="200"></textarea>
    </div>
    <file-pond
      v-model:files="filePondFiles"
      :options="filePondOptions"
      @init="handleFilePondInit"
    />
    <button type="submit">Submit</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import vueFilePond from 'vue-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

// Import styles
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

// Initialize FilePond
const FilePond = vueFilePond(FilePondPluginImagePreview, FilePondPluginFileValidateType);

const store = useStore();

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  birthday: '',
  about: '',
  avatar: null as File | null,
});

const filePondFiles = ref<File[]>([]);
const filePondOptions = {
  allowMultiple: false,
  maxFileSize: '1MB',
};

const todayDateFormatted = new Date().toISOString().split('T')[0];

function submitForm() {
  store.commit('setFormData', formData.value);
}

function handleFilePondInit() {
  console.log('FilePond initialized');
}
</script>

<style lang="scss" scoped>
form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
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
</style>
