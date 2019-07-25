import Vuex from 'vuex';
import defaultState from './state/state'
import mutations from './mutation/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development';
export default () =>{
  return new Vuex.Store({
    strict: !isDev,//开发环境下使用,避免直接修改数据:this.$store.state.count = 6;
    state: defaultState,
    mutations,
    getters,
    actions
  });
};