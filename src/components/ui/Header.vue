<template>
    <div class="Header d-flex justify-content-end " @click="goHome($event)" title="go home" >
        <div class="WelcomeUser align-self-start d-flex justify-content-center">
            <div @click="toggleOptionsAdmin()" class="UserImg">
                <img :src="img " alt="">
            </div>
            <span class="User"> {{ user.personal.username}}</span>
            <ul class="opcionsAdmin" :class="{isActive: isOptionsAdmin}">  
                <li v-if="isDashboard">
                    <router-link to="/dashboard">My Lists</router-link>
                </li>
                <li @click="callModal()">Change Image</li>
                <li @click="logOut()">
                    <a>Logout</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import img from '@/assets/bg.png'
    import {mapMutations, mapState} from  'vuex'
    export default {
        name: 'header-ichi',
        /* props:['user'], */
        data(){
            return {
                img: img,
                isOptionsAdmin: false,
            }
        },
        computed:{
            isDashboard(){
                if(this.$route.name === 'webapp'){
                    return true
                }else{
                    return false
                }
            },
            ...mapState(['user'])
        },
        methods:{
            ...mapMutations(['showModal', 'userLogOut']),
            toggleOptionsAdmin(){
                console.log(this.isOptionsAdmin)
                this.isOptionsAdmin = !this.isOptionsAdmin
            },
            callModal(){
               let tipo = {type:'change-image'}
               this.showModal(tipo)
               console.log('ready')
            },
            async logOut(){
                await this.userLogOut()
                await console.log('...log out , bye!')
                this.$router.push({name:'login'})       
            },
            goHome(e){
                console.log('target  :',e.target)
                if(e.target.classList.contains('Header')){
                    this.$router.push({path:'/webapp'})
                } 
            }
              
        }
    }
</script>


<style scoped lang="scss">
.Header{
    background : {
        image: url("../../assets/header.jpg");
        position: center top;
        size: cover;
        repeat: no-repeat;
        
    }
    cursor: pointer;
    height: 70vh;

    @media(min-width: 380px){
        height: 100vh;
    }
}

.WelcomeUser{
    padding: 12px 20px 12px 50px;
    background: rgba(27, 26, 26, 0.767);
    box-shadow: 0px 0px 10px  white;
    color: white;
    border-radius: 50%;
    height: 70px;
    margin-top: 10px;
    margin-right: 10px;
    position: relative;
    
    span{
        display: none;
        @media(min-width: 380px){
            display: block;
            margin-left: 15px;
        }
    }
    @media(min-width:380px){
        height: auto;
        border-radius: 30px 0 0 30px;
        margin-right: 0;
    }
}
 .UserImg{
     
     border-radius: 50%;
     position: absolute;
     width: 66px;
     height: 66px;
     overflow: hidden;
     top: 3%;
     left: 3%;
     transition: all .4s ease;
    cursor: pointer;
     &:hover{
        transform: scale(1.1);
    }
    img {
        width: 100%;
        height: 100%;
    }
    @media(min-width:380px){
        height: 44px;
        width: 44px;
        top: 4%;
        left: 2%;
    }  
 }

 .opcionsAdmin{
     position: absolute;
     transition: all .4s ease;
     transform: translateX(100%);
     background: rgba(19, 18, 18, 0.788);
     color: white;
     padding: 10px 0;
     margin-left: 0;
     width: 100%;
     text-align: center;
     cursor: pointer;
     top: 100%;
     display: none;
     
     & li{
        list-style: none;
         
        &:hover{
            background: white;
            color: black;
        }
     }
 }
 .isActive{
     display: block;
     transform: translateX(-11%);
     
 }
</style>
