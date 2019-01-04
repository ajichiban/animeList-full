<template>
    <form @submit.prevent="submitReady()" @keyup="verifica($event)" >
        <div class="form-group d-flex flex-column align-content-center">
            <input @blur="fieldsValidate(username,'username')" v-model="username" type="text" class="form-control" placeholder="Usuario" autocomplete="on">
            <small class="text-center" >
                (min 6 alphanumeric characters  , without special characters )
            </small>
        </div>
        <div v-if="tipo === 'register'" class="form-group">
            <input @blur="fieldsValidate(email,'email')" v-model="email" type="email" class="form-control" placeholder="Correo" autocomplete="true">
        </div>
        <div class="form-group d-flex flex-column align-content-center">
            <input @blur="fieldsValidate(pass,'pass')" v-model="pass" type="password" class="form-control" placeholder="Contraseña">
            <small class="text-center" >
                (min 8 alphanumeric characters  , without special characters )
            </small>
        </div>
        <div v-if="tipo === 'register'" class="form-group">
            <input @blur="fieldsValidate(passConfi,'passConfi')" v-model="passConfi" type="password" class="form-control" placeholder="Confirma contraseña">
        </div>
        <div class="d-flex justify-content-center mb-2">
            <button 
                type="submit"
                :class="[tipo=== 'register'? 'btn-outline-success':'btn-outline-danger']" 
                class="btn " 
                :disabled="disable">{{tipo}}
            </button>
            
        </div>
        <div class="d-flex justify-content-center">
            <preloader v-if="preloader" class="text-center" />
        </div>
        <!-- Errors -->
        <div class="errors" v-if="errors !== []" >
            <ul>
                <li class="text-danger" v-for="(err, index) in errors"  :key="index"><pre class="text-white">{{err}}</pre></li>
            </ul>
        </div>
        <!-- Client Errors -->
        <div class="errors" v-if="clientErrors !== []" >
            <ul>
                <li class="text-danger" v-for="(err, index) in clientErrors"  :key="index"><pre class="text-light">{{err}}</pre> </li>
            </ul>
        </div>


        <div class="d-flex justify-content-center mt-3">
            <small v-if="tipo === 'register'">You register or <router-link to="/login">Login</router-link></small>
            <small v-else >You login or <router-link to="/register">Register</router-link></small>
        </div>
    </form>
</template>

<script>
import axios from 'axios'
import { mapActions, mapMutations, mapState } from 'vuex'
import Preloader from '@/components/ui/Preloader.vue'
export default {
    props:{tipo: String},
    components:{Preloader},
    data(){
        return {
            disable: true,
            username: '',
            email: '',
            pass: '',
            passConfi: '',
            errors: [],
            /* ...mapState(['clientErrors']) */
            
        }
    },
    computed:{
        ...mapState(['clientErrors','preloader']) 
    },
    methods:{
        verifica(e){
            // Register Validations
            if(this.tipo === 'register'){
                if(this.username.trim() != '' && this.email.trim() != '' 
                    && this.pass.trim() != '' && this.passConfi.trim() != ''){
                    this.disable = false
                        
                }else{
                    this.disable = true
                }
            // Login Validations
            }else{
                console.log('login')
                if(this.username.trim() != '' && this.pass.trim() != ''){
                    this.disable = false
                }else{
                    this.disable = true
                }
            }
        },
        fieldsValidate(field,fieldExpReg){

            this.cleanErrors()

            let expRegs = {
                username : /^[\w]{6,12}$/,
                email: /^\w[\w\.-_]{5,16}@[\w]{4,6}\.[\w]{2,4}/,
                pass : /^[\w]{6,12}$/,
                },
                errMsgs = {
                   username : 'Username invalid!, min 6 alphanumeric characters, without special characters' ,
                   email: 'email addres incorrect',
                   pass : 'Password invalid !,min 6 alphanumeric characters, without special characters' ,
                   passConfi: 'Password and password confirm fields should matching' 
                }

            // Passconfi Field validate
            if(field === this.passConfi){
                if(this.pass != this.passConfi){
                    if(!this.errors.includes(errMsgs[fieldExpReg])){
                        this.errors.push(errMsgs[fieldExpReg])
                    }
                }else{
                    if(this.errors.includes(errMsgs[fieldExpReg])){
                        let index = this.errors.indexOf(errMsgs[fieldExpReg])
                        this.errors.splice(index,1)
                    }
                }
            // the rest fields
            }else{
                if(!field.match(expRegs[fieldExpReg])){
                    if(!this.errors.includes(errMsgs[fieldExpReg])){
                        this.errors.push(errMsgs[fieldExpReg])
                    }
                }else{
                    if(this.errors.includes(errMsgs[fieldExpReg])){
                        let index = this.errors.indexOf(errMsgs[fieldExpReg])
                        this.errors.splice(index,1)
                    }
                }
            }
        },
        async submitReady(){

            this.togglePreloader()
            if(this.errors.length === 0){

                switch(this.tipo){
                    case 'register':
                        let data = {
                            username :this.username,
                            email :this.email,
                            password :this.pass
                        }
                        axios.post('http://localhost:3000/user', data)
                            .then(data=>{
                                this.togglePreloader()
                                this.$router.push('login')
                             })
                            .catch( err => {
                                /* console.log(err.response.data.Error) */
                                /* this.clientErrors.push(err) */
                                this.togglePreloader()
                                let errors = {
                                    username: err.response.data.Error.errors.username || null,
                                    email: err.response.data.Error.errors.email || null
                                }
                                if(errors.email){
                                   this.addError(errors.email.message) 
                                }
                                if(errors.username){
                                    this.addError(errors.username.message) 
                                }
                            })
                        break

                    case 'login':
                        let dataLogin = {
                            username: this.username,
                            password: this.pass
                        }
                        await this.tryLogin(dataLogin)
                                .then(()=>{
                                    this.togglePreloader()
                                    console.log('pasar  a webapp')
                                    this.$router.push('webapp')
                                })
                        break
                }
                
                /* this.$router.push('/webapp') */
            }else{
                this.togglePreloader()
                console.log('fallo')
                return false
            }
            
        },
        ...mapActions(['tryLogin']),
        ...mapMutations(['addError','cleanErrors','togglePreloader'])
    }
}
</script>

<style scoped lang="scss">
form {
    padding : 70px 50px 50px 50px;
    background: rgba(26, 25, 25, 0.692);

    @media(min-width:480px){
        width: 60vw;
    }
}
input{
    border-radius: 30px;
    padding: 23px;
    background: transparent;
    border-color: #db2226;
    color: white;

    &:focus{
        border-color: rgb(238, 235, 235);
        background: transparent;
        box-shadow: none;
    }
}
button{
   border-radius: 30px;
   padding: 12px 23px; 
   text-transform: capitalize;
}
small{
    color: white;
    a{
        text-decoration: underline;
        color: rgb(224, 40, 40);
    }
}
</style>
