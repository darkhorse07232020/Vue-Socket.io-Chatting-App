<template>

    <div class="loading">

        <svg
            :height="radius * 2"
            :width="radius * 2"
        >

            <circle
                :stroke-dasharray="circumference + ' ' + circumference"
                :style="{ strokeDashoffset: strokeDashoffset }"
                :stroke-width="stroke"
                :stroke="'#000'"
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
    
    props: {

        radius: Number,
        progress: Number,
        stroke: Number

    },

    data() {

        const normalizedRadius = this.radius - this.stroke * 2;
        const circumference = normalizedRadius * 2 * Math.PI;

        return {

            normalizedRadius,
            circumference
            
        }

    },

    computed: {

        strokeDashoffset() {

            return this.circumference - this.progress / 100 * this.circumference;

        }

    }

}
</script>

<style lang="scss">

    .loading {

        transform-origin: 50% 50%;
        animation: loading 1s linear infinite forwards normal;
        position: relative;
        stroke: #000;

        svg {

            position: absolute;
            top: 50;
            left: 50%;
            transform: translate(-50%,-50%);
            

        }

    }

    @keyframes loading {
        
        0% {

            transform: rotate(0deg);

        }

        100% {

            transform: rotate(360deg);

        }
        
    }


</style>
