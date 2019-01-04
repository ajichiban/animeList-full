import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    modal:{
      active: false,
      anime:'',
      listName:'',
      type: ''
    },
    typeContentList : 'offline',
    listsRender:{
      init:'',
      search:'',
    },
    user:{
      auth: false,
      personal :{},
      lists: {
        complete :'',
        watching: '',
        abandoned: ''
      }
      
    },
    clientErrors: [],
    preloader : false
  },

  mutations: {
    /* --- Preloader --- */
    togglePreloader(state){
      state.preloader = !state.preloader
    },
    /* --- Lists --- */
    changeTypeContentList(state,list){
      state.typeContentList = list
    },
    cleanSearchList(state){
      state.listsRender.search = ''
    },
    fillListInit(state,list){
      state.listsRender.init = list
    },
    fillSearchList(state, list){
      state.listsRender.search = list
    },
    
    /* --- Unit Methods --- */
    returnListsInArray(state){
      let complete = state.user.lists.complete,
          abandoned = state.user.lists.abandoned,
          watching = state.user.lists.watching

      const arrLists =[complete, abandoned, watching]
      return arrLists
    },
    updateAfterAdd(state, data){
      state.listsRender.init.forEach(anime =>{
        if(anime.title == data.animeName){
          anime.list = data.listName
        }
      })
      
    },
    /* --- Modal --- */
    closeModal(state){
      state.modal.active = false,
      state.modal.img = '',
      state.modal.title = '',
      state.modal.listName = ''
    },
    showModal(state, anime){

      if(anime.type === 'poster'){
        state.modal.active = true,
        state.modal.anime = anime.info
        state.modal.listName = anime.list,
        state.modal.type = anime.type
      }else{
        state.modal.active = true,
        state.modal.type = anime.type
      }
    },
    
    /* --- Users --- */
    userAuth(state){
      state.user.auth = true
    },

    userLogOut(state){
      state.user.auth = false
      localStorage.removeItem('apiToken')
      console.log('saliendo ...')
    },

    fillPersonalUser(state, data){
      state.user.personal = data
      console.log('filldata: ', state.user.personal)
    },

    /* --- Client Errors --- */
    addError(state,err){
      state.clientErrors.push(err)
    },

    cleanErrors(state){
      state.clientErrors = []
    },

    /* --- Anime Actions --- */
    updateAfterRemove(state, data){
      console.log('updateafterRemove , data :', data)
      let arrayOriginal = state.user.lists[data.list].animes
      
      // removerlo visualmente de la lista (complete, wat , etc...)
      state.user.lists[data.list].animes = arrayOriginal.filter( anime => {
        return anime.name != data.name
      })

      // removerlo de la list init
      state.listsRender.init.forEach(anime =>{
        if(anime.title == data.name ){
          anime.list = 'notFound'
        }
      })

      state.listsRender.search.forEach(anime =>{
        if(anime.title == data.name ){
          anime.list = 'notFound'
        }
      })
      
    }
  },

  actions: {

    /* --- Unit Methods --- */
    
    async updateAfterAddSync({commit,state}, data){
      //  verify init list dont be empty
      if(state.listsRender.init != ''){
        await state.listsRender.init.forEach(anime =>{
          if(anime.title == data.animeName){
            anime.list = data.listName
          }
        })
      }

      //  verify search list dont be empty
      if(state.listsRender.search != ''){
        await state.listsRender.search.forEach(anime =>{
          if(anime.title == data.animeName){
            anime.list = data.listName
          }
        })
      }
    },

    /* --- Lists --- */
    async fillListInitAsync(context){
      let animes = []
      axios.get('https://api.jikan.moe/v3/season/2018/winter')
            .then(async(res)=>{
                await res.data.anime.forEach(async (anime) =>{
                  let genres= [],
                    list = ''
                  await anime.genres.forEach(genre =>{
                    genres.push(genre.name)
                  })
                  
                  // verificar si esta en alguna lista del user
                  let data = await context.dispatch('checkAnime', anime.title)

                  let ele = {
                    title : anime.title,
                    img : anime.image_url,
                    genres : genres.join(),
                    date : anime.airing_start,
                    description: anime.synopsis,
                    list : data.list,
                    _id: data.id
                  }
                  animes.push(ele)
                })
                context.commit('fillListInit', animes)
            })
    }, 

    async checkAnime({state},animeName){
      let complete = state.user.lists.complete,
          abandoned = state.user.lists.abandoned,
          watching = state.user.lists.watching,
          found = {}

      const arrLists =[complete, abandoned, watching]

      await arrLists.forEach(list =>{
        if(list.animes){
          
          list.animes.forEach(anime =>{
            if(anime.title == animeName || anime.name == animeName ){
              found = {
                list: list.name,
                id: anime._id
              }
            }
          })
        } 
      })
      
      if(found != {}){
        return found
      }else{
        found = {
          list: 'notFound',
          id: 'notFound'
        }
        return found
      }
      
    },
    

    /* --- Users --- */
    async tryLogin({commit, dispatch},data){
      await axios.post('http://localhost:3000/login', data)
        .then(async (res) =>{
          /* console.log(res.data) */
          localStorage.setItem('apiToken', res.data.token)
          console.log('user_token : ', localStorage.apiToken)
          await commit('fillPersonalUser',res.data.user)
          console.log('llenar lista!')
          await dispatch('fillUserLists')
          await commit('userAuth')
          dispatch('fillListInitAsync')
          

        })
        .catch(err => {
          let error = err.response.data.message
          commit('addError', error)
        })
      console.log('fin')
    },
    async fillUserLists({state}){
      let user = state.user.personal._id,
        config = {
          headers:{token: localStorage.apiToken}
        }

      await axios.get(`http://localhost:3000/user/${user}/lists`,config)
        .then(async res =>{ 
           let lists = res.data.lists
          await lists.forEach(list=> {
            switch(list.name){
              case 'complete':
                list.animes.forEach(anime =>{
                  anime.list = 'complete'
                })
                state.user.lists.complete = list
                break

              case 'watching':
                list.animes.forEach(anime =>{
                  anime.list = 'watching'
                })
                state.user.lists.watching = list
                break

              case 'abandoned':
                list.animes.forEach(anime =>{
                  anime.list = 'abandoned'
                })
                state.user.lists.abandoned = list
                break
            }
          })
        })
        .catch(err => console.log(err))
      console.log('User_lists : ', state.user.lists)
      
    },
    getUserData({commit, dispatch}){
      let config={
          headers :
          {
            'Accept':'application/json',
            token : localStorage.apiToken
          }
        }
      axios.post('http://localhost:3000/user/token',null, config)
        .then(async (res) =>{
          commit('fillPersonalUser',res.data.user)
          await dispatch('fillUserLists')
          dispatch('fillListInitAsync')
        })
        .catch(err =>{ console.log('axios err: ', err)})
    },

    /* --- Anime --- */
    async searchAnime({commit, dispatch}, anime){

      commit('changeTypeContentList','search')
      let config={
        headers :
        {
          'Access-Control-Allow-Origin':'*',
          'Accept':'application/json',
        }
      }
      
      axios.get(`https://api.jikan.moe/v2/search/anime/${anime}`)
        .then(async (res)=>{
          console.log('respuesta:', res.data.result)
          let animes = []
          await res.data.result.forEach(async (anime) =>{
            /* let genres= []
            anime.genres.forEach(genre =>{
              genres.push(genre.name)
            }) */
            let data = await dispatch('checkAnime', anime.title)
            let ele = {
              title : anime.title,
              img : anime.image_url,
              genres : '...',
              date : anime.airing_start,
              description: anime.description,
              _id : data.id,
              list: data.list
            }
            animes.push(ele)
          })

          commit('fillSearchList', animes)
        })
        .catch(err => console.log('Error:', err))
    },

    async addAnime({state, commit, dispatch}){
      let id = state.user.personal._id,
        listName = state.modal.listName,
        data = {
          name: state.modal.anime.title,
          genre: state.modal.anime.genres,
          img: state.modal.anime.img,
          description: state.modal.anime.description,
          date: state.modal.anime.date,
        },
        toUpdate ={
          listName,
          animeName : data.name
        },
        config = {
          headers :
          {
            /* 'Accept':'application/json', */
            token : localStorage.apiToken
          }
        }

      console.log('anime: ', data)
      await axios.put(`http://localhost:3000/user/${id}/lists/${listName}`, data, config)
        .then(async ()=>{
           
           dispatch('updateAfterAddSync', toUpdate)
           console.log('anime añadido') 
          })
        .catch(err=> console.log('error : ', err))
      
      commit('closeModal')
      dispatch('fillUserLists')
    },

    async removeAnime({commit, state, dispatch}, data){
      let id = state.user.personal._id,
          config = {
          headers :
          {
            'Accept':'application/json',
            token : localStorage.apiToken
          }
        }

      await axios.delete(`http://localhost:3000/user/${id}/lists/${data.list}/${data.id}`, config)
        .then(async ()=>{
          await commit('updateAfterRemove', data)
          console.log('anime eliminado')
        })
        .catch(err=> console.log('error : ', err))
      dispatch('fillUserLists')
    }

  }
})
