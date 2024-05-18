import { createStore } from 'vuex';
import api from '../services/api';

interface State {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    birthday: string;
    about: string;
    avatar: string;
  };
}

function loadState(): State['formData'] {
  const state = sessionStorage.getItem('formData');
  return state ? JSON.parse(state) : {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthday: '',
    about: '',
    avatar: '',
  };
}

function saveState(state: State['formData']) {
  sessionStorage.setItem('formData', JSON.stringify(state));
}

export default createStore<State>({
  state: {
    formData: loadState(),
  },
  mutations: {
    setFormData(state, data) {
      state.formData = data;
      saveState(state.formData);
    },
  },
  actions: {
    async fetchUserProfile({ commit }) {
      try {
        const response = await api.getUserProfile();
        commit('setFormData', response.data);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    },
    async saveUserProfile({ commit }, formData) {
      try {
        const response = await api.updateUserProfile(formData);
        commit('setFormData', response.data);
      } catch (error) {
        console.error('Failed to save user profile:', error);
      }
    },
  },
});
