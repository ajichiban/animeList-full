<template>
    <div class="preloader"></div>
</template>

<script>
export default {

}
</script>

<style scoped >
    .preloader {
        width: 70px;
        height: 70px;
        border: 10px solid ;
        border-top: 10px solid rgb(199, 57, 57);
        border-radius: 50%;
        animation-name: girar;
        animation-duration: 2s;
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
