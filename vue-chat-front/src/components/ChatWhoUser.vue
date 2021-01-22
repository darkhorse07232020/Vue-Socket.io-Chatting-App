<template>

    <div class="styx-chat__who__user">

        <div class="styx-chat__who__user__name">{{name}} is typing</div>
        <div class="styx-chat__who__user__avatar">

            <img :src="avatar" :alt="name">

        </div>

        <svg class="styx-chat__who__user__countdown"
            :height="radius * 2"
            :width="radius * 2"
            :viewBox="`0 0 ${radius * 2} ${radius * 2}`"
        >

            <circle
                stroke="black"
                :stroke-dasharray="circumference + ' ' + circumference"
                :style="{ strokeDashoffset: strokeDashoffset }"
                :stroke-width="stroke"
                fill="transparent"
                :r="normalizedRadius"
                :cx="radius"
                :cy="radius"
            />

        </svg>

    </div>

</template>

<script>

    export default {
        
        props: ['id','name','avatar','socket'],

        data() {

            return {

                userremove: null,
                radius: 23,
                normalizedRadius: null,
                circumference: null,
                progress: 0,
                progress_step: 100 / 18,
                stroke: 1.3,
                notifyloops: 0,
                notify: null

            }

        },

        methods: {

            removeThisUser() {

                this.$store.commit('REMOVE_WHO_USER', this.socket)

            },

            circleNotify() {

                this.notifyloops++
                this.progress += this.progress_step

                if(this.notifyloops > 18) {

                    clearInterval(this.notify)
                    this.removeThisUser()

                }

            }

        },

        created() {

            this.normalizedRadius = this.radius - this.stroke * 2,
            this.circumference = this.normalizedRadius * 2 * Math.PI

        },

        computed: {

            strokeDashoffset() {

                return this.circumference - this.progress / 100 * this.circumference;

            }

        },
        
        mounted() {

            this.$nextTick(() => {

                this.notify = setInterval(() => this.circleNotify(), 200)

            })

        }

    }

</script>

<style lang="scss" scoped>

</style>