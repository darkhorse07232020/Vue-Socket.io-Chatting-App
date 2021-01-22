<template>

    <div class="styx-chat__line" :class="own ? 'styx-chat__line__own' : 'styx-chat__line__other'">

        <div class="styx-chat__line__user">{{user.name}}</div>

        <p class="styx-chat__line__text" v-html="text"></p>

        <time class="styx-chat__line__time" datetime="2008-02-14 20:00">{{date}}</time>

    </div>

</template>

<script>

    export default {
        
        props:[
            'id',
            'socket',
            'date',
            'text',
            'state',
            'own'
        ],
    
        data() {
             
            return {

                user:''

            }

        },

        mounted() {

            this.$nextTick(() => {

                if(this.own){

                    this.user = this.$store.getters.getLoginUser

                } else {

                    this.user = this.$store.getters.getUserBySocket(this.socket)

                }
                
                this.$emit('scrollToBottom')

            })

        },

    }

</script>