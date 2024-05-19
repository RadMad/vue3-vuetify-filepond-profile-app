<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-4">
          <v-card-title>
            <h2>Edit Your Profile</h2>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-form @submit.prevent="submitForm" enctype="multipart/form-data" ref="form" v-model="isFormValid" lazy-validation>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="formData.firstName" label="First Name*" maxlength="16" required :rules="[rules.required, rules.noEmptySpaces]"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="formData.lastName" label="Last Name*" maxlength="16" required :rules="[rules.required, rules.noEmptySpaces]"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="formData.email" label="Email*" maxlength="20" required :rules="[rules.required, rules.email]"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="formData.phone" label="Phone" pattern="[0-9]{9}" maxlength="9" placeholder="123456789" :rules="[rules.phone]"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-date-input v-model="formData.birthday" id="birthday" label="Birthday" maxlength="10" prepend-icon="" :min="minDate" :max="todayDateFormatted" :rules="[rules.birthday]"></v-date-input>
                </v-col>
                <v-col cols="12">
                  <v-textarea v-model="formData.about" label="About" maxlength="1000"></v-textarea>
                </v-col>
                <v-col cols="12">
                  <div class="filepond-container"><file-pond
                    v-model:files="filePondFiles"
                    :allow-file-encode="true"
                    label-idle="Click or drag HERE to upload avatar"
                    multiple="false"
                    accepted-file-types="image/jpeg"
                    max-file-size="1MB"
                    image-transform-output-quality="0.8"
                    image-transform-output-max-height="300"
                    image-transform-output-max-width="300"
                    @addfile="onAddFile"
                  /></div>
                  
                </v-col>
                <v-col cols="12">
                  <v-btn :disabled="!isFormValid" type="submit" color="primary">Submit</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import moment from 'moment';
import { ref, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { setupFilePond } from '../plugins/filePondSetup';

const FilePond = setupFilePond();

const store = useStore();
const router = useRouter();

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

const todayDateFormatted = moment().toISOString().split('T')[0];
const minDate = '1900-01-01';

const rules = {
  required: (value: string) => !!value || 'This field is required.',
  noEmptySpaces: (value: string) => value.trim().length > 0 || 'This field cannot be just spaces.',
  email: (value: string) => /.+@.+\..+/.test(value) || 'E-mail must be valid.',
  phone: (value: string) => value === '' || /^[0-9]{9}$/.test(value) || 'Phone must be 9 digits long.',
  birthday: (value: string) => {
    if (!value) return true;
    const date = moment(value, "MM/DD/YYYY", true);
    if (!date.isValid()) return 'Birthday must be in "MM/DD/YYYY" format.';
    if (date.isBefore(minDate) || date.isAfter(todayDateFormatted)) return `Birthday must be between ${moment(minDate).format("MM/DD/YYYY")} and ${moment(todayDateFormatted).format("MM/DD/YYYY")}.`;
    return true;
  },
};

const isFormValid = ref(false);

onMounted(async () => {
  await store.dispatch('fetchUserProfile');
  const userProfile = store.state.formData;
  userProfile.birthday = userProfile.birthday ? new Date(userProfile.birthday) : null;
  Object.assign(formData.value, userProfile);
  validateForm();
});

async function submitForm() {
    // @ts-ignore
  formData.value.birthday = document.getElementById('birthday').value;
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

function validateForm() {
  isFormValid.value = true;
  if (!(rules.required(formData.value.firstName) === true && rules.noEmptySpaces(formData.value.firstName) === true && rules.required(formData.value.lastName) === true && rules.noEmptySpaces(formData.value.lastName) === true && rules.required(formData.value.email) === true && rules.email(formData.value.email) === true)) {
    isFormValid.value = false;
    return;
  }
  if (!((formData.value.phone === '' || rules.phone(formData.value.phone) === true) && (formData.value.birthday === null || rules.birthday(formData.value.birthday) === true))) {
    isFormValid.value = false;
  }
}

watch(() => formData.value, validateForm, { deep: true });
</script>
