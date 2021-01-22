<template>

    <div class="styx-chat__logged">

        <div class="styx-chat__logged__avatar">

            <img :src="user.avatar">

        </div>

    </div>

</template>

<script>

    import { mapGetters } from 'vuex'

    export default {
        
        computed: {

            ...mapGetters({
                user: 'getLoginUser',
            })

        }

    }
</script>

<style lang="scss" scoped>

</style>