<template>
    <div class="ContainerAnime container">
        <div class="row">
            <!-- <pre>{{$data.fake.length}}</pre> -->
            <template v-if="listAnime.length > 0">
                <div 
                    v-for="(anime, index) in listAnime.slice(0,final)" 
                    :key="index"
                    class="col-12 col-sm-6 col-md-4 col-xl-3">
                    <poster  :anime="anime"/>
                </div>
            </template>
            <div v-if="listAnime.length <= 0" class="col-12 text-center d-flex justify-content-center p-5">
                <div class="preloader"></div>
            </div>
            
        </div >
    </div>
</template>

<script>

import img from '@/assets/poster.jpg'
import Poster from '@/components/ui/PosterAnime'

import { mapState, mapActions } from 'vuex'

export default {
    name: 'container-anime',
    components:{Poster},
    /* beforeMount(){
        
        this.initFill()
        
    }, */
    mounted(){
        this.infiniteScroll()  
    },
    data(){
        return {
            final: 0,
            img: img,
            listOffline:[
                {title:'Naruto', img, date: '2018', genres:'shonen, acction, adventue', description:'stnopsis'},
                {title:'One piece', img, date: '2018', genres:'shonen, acction, adventue', description:'stnopsis'},
                {title:'Bleach', img, date: '2018', genres:'shonen, acction, adventue', description:'stnopsis'},
                {title:'HunterXhunter', img, date: '2018', genres:'shonen, acction, adventue', description:'stnopsis'},
                {title:'Claymore', img, date: '2018', genres:'shonen, acction, adventue', description:'stnopsis'},
                {title:'One puch man', img, date: '2018', genres:'shonen, acction, adventue', description:'stnopsis'},
                {title:'Violet Evergarden', img, date: '2018', genres:'shonen, acction, adventue', description:'Violet Evergarden'},
            ]
            
        }
    },
    watch:{
        typeContentList(){
            this.initFill()
        }
         
    },
    computed:{
        ...mapState(['typeContentList','listsRender','user']),
        listAnime(){
            switch (this.typeContentList){
                case 'init':
                    /* return this.listOffline  */
                    return this.listsRender.init
                    break

                case 'search':
                    console.log('searching ...')
                    return this.listsRender.search
                    break

                case 'list-complete':
                    console.log('list-complete')
                    return this.user.lists.complete.animes
                    
                    break

                case 'list-watching':
                    console.log('list-watching')
                    return this.user.lists.watching.animes
                    
                    break
                
                case 'list-abandoned':
                    console.log('list-abandoned')
                    return this.user.lists.abandoned.animes
                    
                    break
                
                case 'offline':
                    
                    return this.listOffline 
                   
                    
                    break
            }
        }, 
    },
    methods:{
        initFill(){
            /* if(this.listAnime.length > 0){
                for(let i = this.startPoint; i < this.endPoint; i ++){
                    this.fake.push(this.listAnime[i])
                }
                this.startPoint ++
            } */
            this.final = this.listAnime.length < 5? this.listAnime.length: 5
        },
        infiniteScroll(){
            window.onscroll = () =>{
                let bottomOfWindow = document.documentElement.scrollTop + 
                    window.innerHeight === document.documentElement.offsetHeight
                
                if(bottomOfWindow){
                    this.final = (this.final +5 > this.listAnime.length)?
                        this.listAnime.length : this.final +5 
                
                    /* if(this.endPoint <= this.listAnime.length){
                        for(let i = this.startPoint; i < this.endPoint; i ++){
                            this.fake.push(this.listAnime[i])
                        }
                        this.startPoint = this.endPoint
                    } */
                    
                }
            }
        },
        ...mapActions(['fillListInitAsync'])
    },
    
}
</script>

<style scoped lang="scss">
    .ContainerAnime{
        border: 1px solid gray;
        border-radius: 8px;
        
    }

    .preloader {
        width: 70px;
        height: 70px;
        border: 10px solid #eee;
        border-top: 10px solid #666;
        border-radius: 50%;
        animation-name: girar;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }
    @keyframes girar {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
    }
</style>
