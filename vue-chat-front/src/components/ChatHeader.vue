<template>

    <div class="styx-chat__header">

        <div class="styx-chat__header__logo">

            <Logo/>

        </div>

        <ChatLogged v-if="login" />

    </div>

</template>

<script>

    import ChatLogged from '@/components/ChatLogged'
    import Logo from '@/assets/svg/logo.svg'
    import { mapGetters } from 'vuex'

    export default {

        components: {
            Logo,
            ChatLogged
        },
        
        computed: {

            ...mapGetters({
                login: 'getLogin'
            })

        }

    }

</script>

<style lang="scss" scoped>

</style>