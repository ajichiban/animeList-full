<template>
    <div class="Login container-fluid d-flex justify-content-center align-items-center">
        <form-login tipo="register"></form-login>
    </div>
</template>

<script>
import formLogin from '@/components/ui/FormRegisterORLogin.vue'
export default {
    name: 'register',
    components:{
        formLogin
    }
}
</script>

<style scoped  lang="scss">
.Login {
    background : {
        image: url("../assets/bg.png");
        position: center center;
        size: cover;
    }
    height: 100vh;
}
</style>
