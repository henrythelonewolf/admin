let state = {
  currentUser: {},
  ordered: [],

  loading: false,
  error: false,
}

let formState = {
  chosenCompany: '',
}

// const listeners = [];

export default {
  // universal state
  getState(){
    return state;
  },
  setState(newState){
    state = { ...state, ...newState };
  },

  // form state
  getFormState(){
    return formState;
  },
  setFormState(newFormState){
    formState = { ...formState, ...newFormState };
  },

  // on change listener
  // onChange(newListener){
  //   listeners.push(newListener);
  //   return () => listeners.filter(listener => listener !== newListener);
  // },
};
