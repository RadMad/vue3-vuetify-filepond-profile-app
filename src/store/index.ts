import { createStore } from 'vuex';

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
});
