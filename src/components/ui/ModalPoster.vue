<template>
    <div v-show="this.modal.active" class="backgroudModal" @click="checkModal('bg',$event)">
        <div class="containerModal">
            <!-- Type Poster -->
            <template v-if="modal.type === 'poster'">
                <div class="infoModal">
                    <img  :src="this.modal.anime.img" alt="">
                    <h4 class="titleModal">{{this.modal.anime.title}}</h4>
                </div>
                <div class="confirmModal">
                    <p class="questionModal">
                        Do you want add it to "<b>{{this.modal.listName}}</b>" list?
                    </p>
                    <div class="aswerModal d-flex justify-content-around ">
                        <button @click="closeModal()" class="btnModal btn btn-danger">No</button>
                        <button @click="callAddAnime()" class="btnModal btn btn-outline-success">Yes</button>
                    </div>
                </div>
            </template>

           <!--  Type Change Image -->
           <template v-else >
               <div class="img-perfil">
                   <img :src="imgPerfil" alt="">
               </div>
               <div class="form-group">
                   <input @change="loadImg($event)" type="file" class="form-control">
               </div>
               <div v-if="imgPerfil" class="confirmModal">
                    <p class="questionModal">
                        Do you want upload image ?
                    </p>
                    <div class="aswerModal d-flex justify-content-around ">
                        <button @click="closeModal()" class="btnModal btn btn-danger">No</button>
                        <button  class="btnModal btn btn-outline-success">Yes</button>
                    </div>
                </div>
           </template>
        </div>
    </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'

import img from '@/assets/h.png'
export default {
    data(){
        return {
            img,
            imagePerfil:''
        }
    },
    computed:{
        imgPerfil(){
            return this.imagePerfil
        },
        ...mapState(['modal'])
    },
    methods: {
        checkModal(type,e){
            if(e.target.className === 'backgroudModal' && type === 'bg'){
                this.closeModal()
            }
        },
        loadImg(e){
           this.imagePerfil = e.target.files[0].name
        },
        callAddAnime(){
            console.log('call add anime method')
            this.addAnime()
                .then(()=> this.closeModal)
        },
        ...mapMutations(['closeModal']),
        ...mapActions(['addAnime'])

    }
}
</script>

<style scoped lang="scss">
    .backgroudModal{

        background: rgba(20, 20, 20, 0.829);
        width: 100%;
        height: 100%;
        position: fixed;
        top:0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .containerModal{
        width: 100vw;
        /* width: auto; */
        height: 70vh;
        position: relative;
        background: white;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
       /*  overflow: hidden; */
        /* justify-content: center; */
        text-align: center;

        @media(min-width: 480px){
            width: 60vw;
            height: 60vh;
        }
        @media(min-width: 768px){
            width: 35vw;
            height: 60vh;
        }
    }

    /* .closeModal{
        position: absolute;
        align-self: flex-end;
        padding-right: 20px;
        padding-top: 6px;
        cursor: pointer;
        top: 0;
        transition: all .4s ease;

        &:hover{
            transform: scale(1.2);
        }
    } */

    
    .infoModal{
        width: 80%;
        overflow: hidden;
        height: 60%;
        position: relative;
        z-index: 100;
        margin-top: 3%;
        border-radius: 8px 8px 0 0;
        img{
            width: 100%;
            height: 100%;
            /* position: absolute; */
        }

    }
    .titleModal{
        width: 100%;
        background: rgba(206, 53, 53, 0.856);
        padding: 4px 10px;
        bottom: 2px;
        position: absolute;
        color: white;
        font-size: .8em;
    }
    .confirmModal{
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
        @media(min-width: 820px){
            margin-bottom: 10px;
        }
    }
    .aswerModal{
        width: 100%;
    }

    .btnModal {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }

    .isClosed{
        display: none;
    }
</style>
