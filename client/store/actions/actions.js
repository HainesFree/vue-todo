export default {
  //mutation是同步修改，action是异步修改数据
  //接收store对象
  updateCountAsync(store,data) {
    setTimeout(()=>{
      store.commit('updateCount',{
        num:data.num
      })
    },data.time)
  }
}