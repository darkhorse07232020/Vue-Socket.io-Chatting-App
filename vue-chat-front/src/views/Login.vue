<template>

    <div ref="shch" class="styx-chat__container styx-chat__login__container">

        <form class="styx-chat__login" action="" @submit.prevent="sendUser">

            <div class="styx-chat__form__inputgroup">
                <label class="styx-chat__login__label" for="User">User</label>
                <input class="styx-chat__login__input" v-model="user.name" type="text" >
            </div>

            <div class="styx-chat__form__inputgroup">
                <label class="styx-chat__login__label" for="User">Password</label>
                <input class="styx-chat__login__input" v-model="user.password" type="password">
            </div>

            <button clasS="styx-chat__login__submit" type="submit">

                <span v-if="!loading">

                    Login

                </span>

                <Loading v-else
                    :radius="20"
                    :stroke="3"
                    :progress="95"
                />

            </button>

            <div class="styx-chat__login__error" v-if="errors.length">

                <span v-for="(error,index) in errors" :key="index">
                    {{error}}
                </span>

            </div>

        </form>

    </div>

</template>

<script>

    import { isMobile } from 'mobile-device-detect'
    import axios from 'axios'
    import Loading from '@/components/Loading'

    export default {
        
        data() {

            return {

                user: {
                    name: '',
                    password: ''
                },
                loading: false,
                errors: [],
                api_url: 'https://',
                mobile: isMobile
            }

        },

        components: {

            Loading

        },

        created() {

            this.api_url += `${process.env.VUE_APP_API_DOMAIN}`

            if(process.env.VUE_APP_API_DOMAIN != '') {

                this.api_url += `:${process.env.VUE_APP_API_PORT}`

            }

        },

        mounted() {

            this.$nextTick(() => {

                if(this.mobile) {

                    this.$refs.shch.style.height = window.innerHeight - 150 + 'px'

                }

            })

        },

        methods: {

            sendUser() {

                this.errors = []
            
                axios.post(`${this.api_url}/user`,{
                    user: this.user
                })
                .then((res, error) => {

                    if(error) {
                        
                        this.errors.push(error)

                    }

                    if(res.status == 200) {

                        if(res.data.code == 200) {

                            this.$store.commit('SET_LOGIN', true)
                            this.$store.commit('SET_LOGIN_USER', res.data.user)
                            this.$router.push({name:'Chat'})

                        } else {

                            this.errors.push(res.data.error)

                        }

                    }

                })

            }

        }

    }

</script>

<style lang="scss">

</style>