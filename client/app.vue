<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <p>{{fullName}} --- {{counter}}</p>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from './layout/header.vue'
  import Footer from './layout/footer.jsx'
  import Todo from './views/todo/todo.vue'

  import {mapState, mapGetters,mapActions,mapMutations} from 'vuex';

  export default {
    metaInfo:{
      title:'Haines todo app'
    },
    mounted(){
      console.log(this.$store);
      //actions的语法糖
      this.updateCountAsync({
        num:66,
        time:2000
      });
      // this.$store.dispatch('updateCountAsync',{
      //   num:11,
      //   time:2000
      // })
    },
    methods:{
      ...mapActions(['updateCountAsync']),
      ...mapMutations(['updateCount']),
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
