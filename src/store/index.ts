// store/index.ts

import { createStore } from 'vuex';

interface State {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    birthday: string;
    about: string;
    avatar: File | null;
  };
}

export default createStore<State>({
  state: {
    formData: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      birthday: '',
      about: '',
      avatar: null,
    },
  },
  mutations: {
    setFormData(state, data) {
      state.formData = data;
    },
  },
});
