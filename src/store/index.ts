import { createStore } from 'vuex';

export default createStore({
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
