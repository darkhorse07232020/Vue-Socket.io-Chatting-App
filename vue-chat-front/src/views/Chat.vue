<template>

    <div class="styx-chat__layout">

        <section ref="shch" class="styx-chat">

            <section ref="timelinescroll" class="styx-chat__timeline__wrapper">

                <section class="styx-chat__timeline">

                    <ChatMessage v-for="(message,index) in messages" :key="index"
                        :id="message.index"
                        :socket="message.socket"
                        :date="message.date"
                        :text="message.text"
                        :state="message.state"
                        :own="message.own"
                        @scrollToBottom="scrollToBottom"
                    />

                </section>

            </section>

            <section class="styx-chat__form">

                <div class="styx-chat__whoistyping">

                    <ChatWhoUser v-for="(user,index) in whoistyping" :key="index"
                        :id="user.id"
                        :name="user.name"
                        :avatar="user.avatar"
                    />

                </div>

                <form class="styx-chat__form__inputgroup" @submit.prevent="newMessage">

                    <input type="text" v-model="message" class="styx-chat__form__input" @>

                    <button type="submit" class="styx-chat__form__submit">

                        <PaperPlane />

                    </button>

                </form>

            </section>

        </section>

        <section class="styx-chat__users">

            <h4 class="styx-chat__users_title">Users online: {{users.length}}</h4>

            <ChatUser v-for="(user,index) in users" :key="index"
                :name="user.name"
                :avatar="user.avatar"
            />

        </section>

    </div>
    
</template>

<script>

    import { mapGetters } from 'vuex'
    import Chat from '@/libraries/Chat'
    import ChatMessage from '@/components/ChatMessage'
    import ChatUser from '@/components/ChatUser'
    import ChatWhoUser from '@/components/ChatWhoUser'
    import PaperPlane from '@/assets/svg/send-message.svg'
    import { isMobile } from 'mobile-device-detect'

    export default {

        data () {

            return {

                chat: new Chat(),
                message: '',
                messages_render: null,
                istyping: false,
                mobile: isMobile,
                originalSize: window.innerHeight + window.innerWidth

            }

        },

        components: {

            ChatMessage,
            ChatUser,
            ChatWhoUser,
            PaperPlane

        },

        methods: {

            newMessage() {

                if(this.message !== '') {
                    
                    this.chat.emitNewMessage(this.message,this.user.socket)

                    this.message = ''

                    this.istyping = false

                }

            },

            scrollToBottom() {

                let timeline = this.$refs.timelinescroll

                timeline.scrollTop = timeline.scrollHeight

            }

        },

        computed: {

            ...mapGetters({
                user: 'getLoginUser',
                users: 'getUsers',
                messages: 'getMessages',
                whoistyping: 'getWhoIsTyping'
            })

        },

        watch: {

            message: function(val) {

                if(val.length > 3 && !this.istyping) {

                    this.istyping = true

                    this.chat.emitWhoIsTyping()

                } else if( val.length == 0) {

                    this.istyping = false

                }

            }

        },

        mounted() {

            this.$nextTick(() => {

                if(this.mobile) {

                    this.$refs.shch.style.height = window.innerHeight - 75 + 'px'

                    let body = document.getElementsByTagName('body')[0]
                    let html = document.getElementsByTagName('body')[0]
                    let app = document.getElementById('app')

                    // Work around for the virtual keyboard
                    window.addEventListener('resize',() => {
                        
                        window.scroll(0,0)
                        body.scroll(0,0)
                        html.scroll(0,0)

                        app.style.height = window.innerHeight + 'px'
                        this.$refs.shch.style.height = window.innerHeight - 75 + 'px'

                    })

                }

            })

        },

        created() {

            this.messages_render = this.messages.reverse()

        }
        
    }

</script>