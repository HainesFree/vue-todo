import Vuex from 'vuex';

const Store = new Vuex.Store({
  state: {
    count : 0
  },
  mutations:{
    updateCount(state,num){
      state.count = num
    }
  }
});

export default Store;