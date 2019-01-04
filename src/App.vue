<template>
  <div id="app" class="container-fluid">
    <!-- <login></login> -->
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<script>

import Login from '@/views/Login'
import Home from '@/views/Home'
import { mapMutations, mapActions } from 'vuex'

  export default {
    components:{ Home},
    async created() {
      console.log('localStorage :', localStorage)
      if(localStorage.apiToken){
        console.log('token is exists')
        this.userAuth()
        await this.getUserData()
        this.$router.push('webapp')
      }else{
        this.$router.push('login')
      }
    },
    methods:{
      ...mapMutations(['userAuth','fillPersonalUser']),
      ...mapActions(['getUserData'])
    }

  }
</script>
<style scoped lang="scss">
  .container-fluid{
    padding: 0;
  }
</style>
