<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-4">
          <v-card-title>
            <h2>User Profile</h2>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="profile-container">
            <div class="avatar-container">
              <v-avatar size="192">
                <img :src="avatarURL" alt="Avatar" :width="192" />
              </v-avatar>
            </div>
            <div class="fields-container">
              <v-list dense>
                <v-list-item>
                  <v-list-item-title><strong>First Name:</strong> {{ formData.firstName }}</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title><strong>Last Name:</strong> {{ formData.lastName }}</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title><strong>Email:</strong> {{ formData.email }}</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title><strong>Phone:</strong> {{ formData.phone }}</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title><strong>Birthday:</strong> {{ formatDate(formData.birthday) }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </div>
          </v-card-text>
          <v-divider class="my-4"></v-divider>
          <v-card-text>
            <h3 class="mb-3">About:</h3>
            <pre>{{ formData.about }}</pre>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const formData = computed(() => store.state.formData);
const avatarURL = computed(() => {
  if (formData.value.avatar) {
    return `data:image/jpeg;base64, ${formData.value.avatar}`;
  }
  return 'https://via.placeholder.com/192';
});

function formatDate(dateString: string) {
  if (!dateString) return '';
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

onMounted(() => {
  store.dispatch('fetchUserProfile');
});
</script>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
}

.avatar-container {
  margin: auto;
}

.fields-container {
  display: flex;
  flex-direction: column;
}

@media screen and (max-width: 600px) {
  .avatar-container {
    margin-bottom: 16px;
  }
}

@media screen and (min-width: 600px) {
  .profile-container {
    flex-direction: row;
    justify-content: center;
  }

  .avatar-container {
    order: 2;
    margin-right: 16px;
    margin-left: 16px;
  }

  .fields-container {
    order: 1;
    flex-grow: 1;
  }
}
</style>
