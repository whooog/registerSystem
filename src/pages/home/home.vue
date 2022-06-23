<template>
    <div class="home-section">
        <div class="tab-page cant-tab-page">
            <!-- <transition name="page-switch-fade"> -->
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
            <!-- </transition> -->
        </div>
        <van-tabbar
            class="tab-bar"
            v-model="$store.state.home.active"
            @change="tabChange"
        >
            <van-tabbar-item name="/home/index">
                <span>首页</span>

            </van-tabbar-item>
            <van-tabbar-item name="/home/newsList">
                <span>赛事咨询</span>

            </van-tabbar-item>
            <van-tabbar-item name="/home/pioneerGame">
                <span>赛事报名</span>

            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>

export default {
    name:'',
    components: {},
    data() {
        return {

        }
    },
    mounted() {

    },
    activated(){

    },
    methods: {
        tabChange(active){
            const router = this.$router
            // this.$store.commit("changeTabActive",active)
            router.push({
                path:active
            })
        }
    }
}
</script>
<style lang="scss">
    .home-section{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        .tab-page{
            &.cant-tab-page{
                height: calc(100% - 50px);
                overflow: hidden;
            }
        }
        .tab-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .van-tabbar-item {
            border: 1px solid #bbbbbb ;
            flex: none !important;
            width: 31%;
            height: 100%;
        }
        .tab-bar{
            position: relative;
        }
    }
</style>
