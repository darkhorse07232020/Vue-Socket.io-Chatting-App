<template>

    <div class="styx-chat__user">

        <div class="styx-chat__user__avatar">

            <img :src="avatar" >

        </div>

        <div class="styx-chat__user__name">

            {{name}}

        </div>

    </div>

</template>

<script>
    export default {

        props: ['name','avatar']
        
    }
</script>

<style lang="scss">

</style>