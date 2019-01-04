<template>
    <div class="Poster">
        <div  v-if="animeInLists" class="statusAnime" :class="styleClass">{{ statusName }}</div>
        <img :src="anime.img" alt="">
        <div class="addToList">
            <span @click="toggleOptions()" class="buttonAdd">+</span>
            <ul class="addOptions" :class="[options? 'showOptions':'']">
                <template v-if="!animeInLists">
                    <li @click="callModal('complete')">add to Completed  </li>
                    <li @click="callModal('watching')">add to Watching</li>
                    <li @click="callModal('abandoned')">add to Abandoned</li>
                </template>
                <li v-if="animeInLists" @click="callRemoveAnime()"> remove from list </li>
                <li @click="toggleOptions()">Exit...</li>
            </ul>
        </div>
        <div class="title">
            {{anime.title || anime.name}}
        </div>
    </div>


</template>

<script>
import {mapMutations, mapState, mapActions} from 'vuex'
/* import {bus} from '@/main' */
export default {
    name:'poster-anime',
    props:['anime', 'tipo'],

    /* --- Hooks --- */
    async mounted(){
        this.animeTypeVerify()
    },
    /* beforeUpdate(){
        this.animeTypeVerify()
    }, */
    
    data(){
        return {
            options: false,
            statusName : '',
            styleClass :'',
            animeInLists : false,
            /* itIsInList: false, */
        }
    },
    computed:{
        ...mapState(['typeContentList'])
    },
    watch :{
        anime:{
            deep: true,
            handler(newValue, oldValue){
                this.animeTypeVerify()
            }
        }
    },
    methods:{
        toggleOptions(){
            this.options = !this.options;
        },
        callRemoveAnime(){
            let name = this.anime.title || this.anime.name
            let question = `Do you wish to remove  ${name} from the list ?`,
                listName = this.anime.list
            if(window.confirm(question)){
                let data = {
                    id : this.anime._id,
                    name : name,
                    list : this.anime.list
                }
                this.removeAnime(data).then(()=>{
                    this.options = false
                })
            }else{
               this.options = false 
            }
        },
        callModal(list){
            this.toggleOptions()//Close options

            let anime = {
                type:'poster',
                info: this.anime,
                list
            }
            this.showModal(anime)
        },
        animeTypeVerify(){
            switch(this.anime.list){
                case 'complete':
                    this.animeInLists = true
                    this.statusName = this.anime.list
                    this.styleClass = 'statusComplete'
                    break
                
                case 'watching':
                    this.animeInLists = true
                    this.statusName = this.anime.list
                    this.styleClass = 'statusWatching'
                    break

                case 'abandoned':
                    this.animeInLists = true
                    this.statusName = this.anime.list
                    this.styleClass = 'statusAbandoned'
                    break

                case 'notFound':
                    this.animeInLists = false
                    break
            }
        },
        ...mapMutations(['showModal']),
        ...mapActions(['checkAnime','removeAnime'])
    }

}
</script>

<style scoped lang="scss">
    .Poster{
        position: relative;
        border-radius: 5px;
        box-shadow: 0 0 12px black;
        height: 300px;
       margin: 10px 10px;
       /* padding: 0 5px; */
       overflow: hidden;
        img {
            width: 100%;
            height: 100%;
        }
    }

    .statusAnime{
        font-weight: bold;
        /* border : 3px solid white; */
        padding: 5px 10px;
        border-radius: 5px;
        text-transform: uppercase;
        color: white;
        background: rgba(29, 28, 28, 0.767);
        position: absolute;
    }

    .statusComplete {
        border-color: rgb(29, 167, 29);
        color: rgb(29, 167, 29)
    }
    .statusWatching{
        border-color: rgb(21, 105, 216);
        color: rgb(21, 105, 216)
    }
    .statusAbandoned{
       border-color: rgb(216, 21, 21);
        color: rgb(216, 21, 21);
    }
    .addToList{
        position: absolute;
        z-index: 100;
        top: 0;
        right: 0;
        background: red;
        
    }
    .buttonAdd{
        position: absolute;
        width: 40px;
        height: 40px;
        line-height: 30px;
        top: 10px;
        cursor: pointer;
        right: 10px;
        color: white;
        text-align: center;
        border: 3px solid white;
        border-radius: 50%;
        opacity: .7;
        font-size: 2em;
        transition: all .4s ease;
        &:hover{
            opacity: 1; 
            transform: scale(1.2)
        }
        /* &:hover + .addOptions{
            transform: scale(1);
        } */
    }

    .addOptions{
        transition: all .4s ease;
        transform: scale(0);
        background: rgba(24, 23, 23, 0.883);
        color: white;
        border: 1px dashed black;
        position: absolute;
        z-index: 200;
        top: 41px;
        right: 0;
        width: 170px;
        padding: 10px 0px;
        text-align: center;
        cursor: pointer;

        /* &:hover{
            transform: scale(1);
        } */
        li{
            transition: all .4s ease;
            list-style: none;

            &:hover{
                background: white;
                color: black;
            }
        }
        
    }

    .title{
        text-align: center;
        position: absolute;
        background: rgba(0, 0, 0, 0.767);
        color: white;
        bottom: 0;
        width: 100%;
        padding: 10px;
    }

    /* --- Unit Class --- */
    .showOptions{
        transform: scale(1);
    }
    
</style>
