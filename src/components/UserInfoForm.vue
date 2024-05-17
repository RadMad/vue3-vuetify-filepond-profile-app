<template>
  <form @submit.prevent="submitForm" enctype="multipart/form-data">
    <div>
      <label for="firstName">First Name*</label>
      <input id="firstName" type="text" v-model="formData.firstName" maxlength="16"/>
    </div>
    <div>
      <label for="lastName">Last Name*</label>
      <input id="lastName" type="text" v-model="formData.lastName" maxlength="16"/>
    </div>
    <div>
      <label for="email">Email*</label>
      <input id="email" type="email" v-model="formData.email" maxlength="20"/>
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
      :allow-file-encode="true"
      multiple="false"
      accepted-file-types="image/*"
      max-file-size="1MB"
      image-transform-output-quality="0.8"
      image-transform-output-max-height="300"
      image-transform-output-max-width="300"
      @init="handleFilePondInit"
      @addfile="onAddFile"
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
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

// Initialize FilePond
const FilePond = vueFilePond(
  FilePondPluginImagePreview, 
  FilePondPluginFileValidateType, 
  FilePondPluginFileValidateSize, 
  FilePondPluginImageTransform, 
  FilePondPluginFileEncode);

const store = useStore();

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  birthday: '',
  about: '',
  avatar: '',
});

const filePondFiles = ref<File[]>([]);

const todayDateFormatted = new Date().toISOString().split('T')[0];

function submitForm() {
  store.commit('setFormData', formData.value);
}

function handleFilePondInit() {
  console.log('FilePond initialized');
}

function onAddFile(error: Error, file: File) {
  if(!error){
    // @ts-ignore
    const base64String = file.getFileEncodeBase64String();
    formData.value.avatar = base64String;
  }
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
