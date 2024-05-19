<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-form @submit.prevent="submitForm" enctype="multipart/form-data">
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field v-model="formData.firstName" label="First Name*" maxlength="16"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="formData.lastName" label="Last Name*" maxlength="16"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="formData.email" label="Email*" maxlength="20"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="formData.phone" label="Phone" pattern="[0-9]{9}" maxlength="9" placeholder="123456789"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-date-input
                v-model="formData.birthday"
                label="Birthday"
                prepend-icon=""
                :min="minDate"
                :max="todayDateFormatted"
              ></v-date-input>
            </v-col>
            <v-col cols="12">
              <v-textarea v-model="formData.about" label="About" maxlength="200"></v-textarea>
            </v-col>
            <v-col cols="12">
              <div class="filepond-container">
                <file-pond
                  v-model:files="filePondFiles"
                  :allow-file-encode="true"
                  multiple="false"
                  accepted-file-types="image/*"
                  max-file-size="1MB"
                  image-transform-output-quality="0.8"
                  image-transform-output-max-height="300"
                  image-transform-output-max-width="300"
                  @addfile="onAddFile"
                />
              </div>
            </v-col>
            <v-col cols="12">
              <v-btn type="submit" color="primary">Submit</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
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
  FilePondPluginFileEncode
);

const store = useStore();
const router = useRouter();

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  birthday: null,
  about: '',
  avatar: '',
});

const filePondFiles = ref<File[]>([]);

const todayDateFormatted = new Date().toISOString().split('T')[0];
const minDate = '1900-01-01';

onMounted(async () => {
  await store.dispatch('fetchUserProfile');
  const userProfile = store.state.formData;
  userProfile.birthday = new Date(userProfile.birthday);
  Object.assign(formData.value, userProfile);
});

async function submitForm() {
  await store.dispatch('saveUserProfile', formData.value);
  router.push({ path: '/view-profile' });
}

function onAddFile(error: Error, file: File) {
  if (!error) {
    // @ts-ignore
    const base64String = file.getFileEncodeBase64String();
    formData.value.avatar = base64String;
  }
}
</script>

<style lang="scss" scoped>
.filepond-container {
  margin-bottom: 10px;
}
</style>
