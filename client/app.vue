<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <!--<p>{{count}}</p>-->
    <p>{{fullName}} --- {{counter}}</p>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from './layout/header.vue'
  import Footer from './layout/footer.jsx'
  import Todo from './views/todo/todo.vue'

  import {mapState, mapGetters} from 'vuex';

  export default {
    mounted(){
      console.log(this.$store);
      let i = 1;
      // setInterval(()=> {
      //   this.$store.commit('updateCount',i++)
      // },1000)
    },
    computed:{
      ...mapState({
        counter:(state) => state.count
      }),
      //mapState是语法糖
      // count(){
      //   return this.$store.state.count
      // },
      ...mapGetters(['fullName'])
      // fullName(){
      //   return this.$store.getters.fullName
      // }
    },
    components: {
      Header,
      Footer,
      Todo
    }
  }
</script>

<style lang="stylus" scoped>
  #app
    position absolute
    left 0
    right 0
    top 0
    bottom 0

    #cover
      position absolute
      left 0
      right 0
      top 0
      bottom 0
      background-color #999
      opacity 0.2
      z-index -1

</style>
