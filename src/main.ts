import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';

const useApi = false;

import apiStore from './store/storeApi';
import sessionStore from './store/storeSession';

const store = useApi ? apiStore : sessionStore;

createApp(App)
    .use(store)
    .use(router)
    .use(vuetify)
    .mount("#app");
