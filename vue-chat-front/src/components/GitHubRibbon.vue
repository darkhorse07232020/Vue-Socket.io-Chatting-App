<template>
    <div class="github-ribbon">
        <a href="https://github.com/IbanMM/vue-chat" target="_blank"><GithubLogo /></a>
    </div>
</template>

<script>

    import GithubLogo from '@/assets/svg/github.svg'

    export default {

        components: {

            GithubLogo

        }
        
    }

</script>

<style lang="scss" scoped>

    .github-ribbon {

        background-color: #000;
        fill: #fff;
        display: inline-block;
        position: relative;
        margin-left: 43px;
        padding: 4px 40px;
        transform: rotate(45deg);
        position: fixed;
        top: 32px;
        right: -2px;
        max-height: 42px;
        border-right: 1px solid #000;
        border-left: 1px solid #000;

        &:before {

            content: "";
            width: 0;
            height: 0;
            border-bottom: 43px solid #000;
            border-left: 43px solid transparent;
            position: absolute;
            top: 0;
            left: -42px;

        }

        &:after {

            content: "";
            width: 0;
            height: 0;
            border-bottom: 43px solid #000;
            border-right: 43px solid transparent;
            position: absolute;
            top: 0;
            right: -42px;

        }

    }

</style>