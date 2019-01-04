<template>
   <!--  <div class="otherContainer"> -->
        <div class="superContainer">
            <div v-if="isActiveOffCanvas" class="bg-offCanvas" @click="toggleMenu()"></div>
            <div 
                @click="toggleMenu()" 
                class="btn mobileLits"
                :class="{'moveMobileLists':isActiveOffCanvas }">
                List
            </div>
            <div class="ContainerLists btn-dark" :class="{'moveOffCanvas' : isActiveOffCanvas}">
                <div class="myLists">
                    <h4>My Lists</h4>
                    <ul class="d-flex flex-column align-items-center">
                        <li @click="callLists('complete')" 
                            class="bg-dark" 
                            :class="{activeList:activeList.complete}">
                            Completed
                        </li>
                        <li @click="callLists('watching')" 
                            class="bg-dark" 
                            :class="{'activeList':activeList.watching}">
                            watching
                        </li>
                        <li @click="callLists('abandoned')" 
                            class="bg-dark" 
                            :class="{'activeList':activeList.abandoned}">
                            Abandoned
                        </li>
                        <li v-if="animeTotal > 0">
                            <small>
                                total : {{animeTotal}}
                            </small>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    <!-- </div> -->
</template>

<script>
import {mapState, mapMutations } from 'vuex'
export default {
    name:'panel-list',
    data(){
        return {
            isActiveOffCanvas: false,
            activeList:{
                complete: false,
                abandoned: false,
                watching: false
            }
        }
    },
    computed:{
        ...mapState(['typeContentList','user']),
        animeTotal(){
            switch(this.typeContentList){
                case 'list-complete':
                    return this.user.lists.complete.animes.length
                    break

                case 'list-watching':
                    return this.user.lists.watching.animes.length
                    break
                
                case 'list-abandoned':
                    return this.user.lists.abandoned.animes.length
                    break
            }
        }
    },
    methods:{

        changeActiveList(list){
            /* console.log('change list') */
            for(let i in this.activeList){
                if(i == list){
                    this.activeList[i] = true
                }else{
                    this.activeList[i] = false
                }
            }
        },
        toggleMenu(){
            this.isActiveOffCanvas = !this.isActiveOffCanvas
        },
        callLists(list){
            this.changeActiveList(list)

            let l = `list-${list}`
            this.changeTypeContentList(l)
            this.$router.push({name: list})
            this.isActiveOffCanvas = false

            
            
        },
        ...mapMutations(['changeTypeContentList'])
    }
}
</script>

<style scoped lang="scss">
    .bg-offCanvas{
        /* display: none; */
        width: 100%;
        height: 100%;
        background: rgba(233, 30, 30, 0.787);
        position: fixed;
        top:0;
        /* z-index: 300; */

        @media(min-width: 768px){
            
        }
    }
    .superContainer{
        overflow: hidden;
        position:fixed;
        top: 0;
        height: 100%;
        z-index: 200;
        @media(min-width: 768px){
            box-shadow: 0 0 12px black;
            position: initial;
        }
    }
    .ContainerLists{
        transform: translateX(-100%);
        color: white;
        padding: 10px 0px;
        transition : all .5s ease;
        
        /* border-radius: 9px; */

        @media(min-width: 768px){
           height: 100%; 
           transform: translateX(0)
        }

    }
    .myLists{
        
        ul{
            padding: 0;

            li{
                list-style: none;
                width:100%;
                padding: 10px 30px;
                border-bottom: 1px rgb(114, 109, 109) solid;
                cursor: pointer;
                transition: transform, background-color  ease .4s;
                
                &:hover{
                    border-bottom: 1px rgb(212, 41, 41) solid;
                    /* transform: scale(1.2) */
                }
            }
        }
    }
    .mobileLits{
        position: relative;
        transition: all .4s ease;
        width:120px;
        transform: translateX(-40px);
        padding: 12px 20px 12px 50px;
        background: rgba(27, 26, 26, 0.767);
        box-shadow: 0px 0px 10px white;
        height: auto;
        color: white;
        z-index: 100;
        border-radius: 0 30px 30px 0;
        margin-top: 10px;

        @media(min-width: 768px){
            display: none;
        }
    }
    .moveMobileLists{
       transform: translateX(0); 
    }
    .moveOffCanvas{
        transform: translateX(0);
        box-shadow: 0 0 12px black;
    }
    /* --- Unit Class --- */
    .activeList {
        background-color: rgb(221, 25, 25) !important ;
    }
</style>
