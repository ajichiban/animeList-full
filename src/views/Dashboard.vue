<template>
    <div class="container-fluid">
        <header-ichi user='ichiban'/>
        <div class="container-fluid mt-5">
            <div class="row">
                <div class="panelLists col-md-2 col-lg-3">
                    <panel-lists />
                </div>
                <div class="col-md-10 col-lg-9">
                    <!-- <container-anime /> -->
                    <router-view></router-view>
                </div>
            </div>
        </div>
        <modal/>
    </div>
</template>

<script>
import HeaderIchi from '@/components/ui/Header.vue'
import ContainerAnime from '@/components/ui/ContainerAnime.vue'
import PanelLists from '@/components/ui/PanelLists.vue'
import Modal from '@/components/ui/ModalPoster.vue'
export default {
    name: 'dashboard',
    components:{HeaderIchi, ContainerAnime, PanelLists, Modal}
}
</script>

<style scoped lang="scss">
    .panelLists{
        padding: 0;
        /* position: relative; */
    }
</style>
