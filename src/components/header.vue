<template>
    <div class="header" :class="{bgImg: showBg}">
        <div class="header-bg">
            <div class="header-content" >
                <div class="header-back">
                    <div class="back" @click="handleTitleBack" v-if="hasClose">
                        <i class="iconfont icon-arrowthin"></i>
                    </div>
                </div>
                <div class="header-title">
                    <div class="title">{{title}}</div>
                </div>
                <div class="header-right">
                </div>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: [String],
            default: ''
        },
        showBg: {
            type: [Boolean],
            default: true
        },
        hasClose: {
            type: [Boolean],
            default: true
        }
    },
    mounted() {

    },
    methods: {
        handleTitleBack(){
            this.$router.back()
        }
    }
}
</script>
<style scoped lang="scss">
    .header{
        width: 100%;
        height: 100px;
        .header-bg{
            width: 100%;
            height: 100%;
            /*background-image: url(../assets/images/header-bg.png);*/
            /*background-repeat: no-repeat;*/
            /*background-position: left top;*/
            /*background-size: 100% auto;*/
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 32px;
            font-weight: bold;
            color: #333;
        }
        &.bgImg {
            /*background: linear-gradient(to right, #4c2af0,#1269eb);*/
            .header-bg {
                /*color: #fff;*/
            }
        }
    }
</style>
