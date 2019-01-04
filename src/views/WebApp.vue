<template>
    <div>
        <header-ichi imgUrl="../assets/logo.png" ></header-ichi>
        <h2 class="subtitle">Search your Animes</h2>
        <form-search/>
        <container-poster/>
        <modal-poster/>

        
    </div>
</template>

<script>
import HeaderIchi from '@/components/ui/Header.vue'
import FormSearch from '@/components/ui/FormSearch.vue'
import ContainerPoster from '@/components/ui/ContainerAnime.vue'
import ModalPoster from '@/components/ui/ModalPoster.vue'
export default {
    name:'webapp',
    components:{ HeaderIchi, FormSearch, ContainerPoster, ModalPoster}
}
</script>

<style>

</style>
