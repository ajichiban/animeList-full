<template>
    <div class="container">
        <form class="d-flex justify-content-center">
            <div class="InputContainer d-flex justify-content-center">
            <input type="text" class="InputText form-control" placeholder="Search your animes here!" v-model="forSearch">
                <input  type="button" class="InputButton form-control btn btn-danger" value="Search" >
            </div>
        </form>
    </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'

export default {
    name:'form-search',
    data(){
        return{
            forSearch:''
        }
    },
    watch:{
        forSearch(newV, oldV){
            if(newV.trim().length >=3){
                this.changeTypeContentList('search')
                this.cleanSearchList()
                this.searchAnime(newV)
            }
            if(newV.trim().length === 0){
                this.changeTypeContentList('init')
            }
        }
    },
    methods:{
        ...mapMutations(['changeTypeContentList','cleanSearchList']),
        ...mapActions(['searchAnime'])
    }
}
</script>

<style scoped lang="scss">
    .container{
        margin-bottom: 25px;
        padding: 0;
    }
    .InputContainer{
        position: relative;
        width: 100vw;
    }
    .InputText{
        padding: 22px;
        border-radius: 30px;
        border-color: #DC3545;

        &:focus{
            box-shadow: none;
            border-color: #DC3545;
        }
    }
    .InputButton{
        display: block;
        border-radius: 30px;
        position: absolute;
        width: 124px;
        top: 7%;
        right: 4px;
        padding: 1px;
        height: 40px;

    }
</style>
