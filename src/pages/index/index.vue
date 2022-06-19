<template>
    <div class="index-section page">
        <Header :showBg="false">
            <div>第八届互联网+大学生创新创业大赛</div>
        </Header>
        <div class="scroll">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item>1</van-swipe-item>
                <van-swipe-item>2</van-swipe-item>
                <van-swipe-item>3</van-swipe-item>
                <van-swipe-item>4</van-swipe-item>
            </van-swipe>
            <div class="btnGroup">
                <div class="btnContent">
                    互联网+大学生创新创业大赛
                    <div class="btn">立即报名</div>
                </div>
                <div class="btnContent">
                    对接洽谈活动投资机构人员报名
                    <div class="btn" @click="gotoChild">立即报名</div>
                </div>
            </div>
            <div class="subTitle">大赛介绍</div>
            <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F4k%2Fs%2F02%2F2109242312005c1-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658226222&t=2593bd14ec26731e6292ecfcdfd6f971" alt="" class="indexImg">
            <div class="subTitle">大赛里程杯</div>
            <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F4k%2Fs%2F02%2F2109242312005c1-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658226222&t=2593bd14ec26731e6292ecfcdfd6f971" alt="" class="indexImg">
        </div>
    </div>
</template>

<script>
import Header from "../../components/header.vue"
export default {
    components: {
        Header
    },
    data() {
        return {
            
        }
    },
    computed: {
        
    },
    activated() {
        

    },
    methods: {
        gotoChild(){
            this.$router.push({
                path:"/"
            })
        }
    }
}
</script>

<style lang="scss">
    .index-section {
        .scroll {
            background-color: #39a9ed;
            overflow: hidden;
            .my-swipe {
                margin: 25px 30px;
                .van-swipe-item {
                    color: #333;
                    font-size: 20px;
                    line-height: 150px;
                    text-align: center;
                    background: #fff;
                }
            }
            .btnGroup {
                .btnContent {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 40px 0 80px;
                    width: 88%;
                    margin: 0 auto 25px;
                    height: 80px;
                    border-radius: 40px;
                    background: #fff;
                    font-size: 24px;
                    .btn {
                        background: #9a6e3a;
                        color: #fff;
                        width: 140px;
                        height: 40px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 20px;
                        border-radius: 20px;
                    }
                }
            }
            .subTitle {
                height: 80px;
                line-height: 80px;
                padding: 0 30px;
                font-size: 26px;
                font-weight: bold;
            }
            .indexImg {
                width: 100%;
            }
        }

    }
</style>