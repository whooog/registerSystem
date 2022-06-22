<template>
<div class="pioneerGame page">
    <Header title="参赛报名"></Header>
    <div class="scroll">
        <div class="iconBox">
            <div class="iconItem" @click="jumpPage('/addHotel')">住宿ICON</div>
            <div class="iconItem" @click="jumpPage('/addTrafficInfo')">交通ICON</div>
        </div>
        <div class="btnGroup">
            <van-button round class="btn" size="small" block @click="jumpPage(item.path, item.params)" v-for="(item,index) in btnList" :key="index">{{item.text}}</van-button>
        </div>
    </div>
</div>
</template>

<script>
    import Header from "@/components/header.vue"

    export default {
        name: "pioneerGame",
        components: {
            Header
        },
        data(){
            return {
                btnList: [
                    {
                        text: '分管创业工作校领导',
                        path: '/addLeaderInfo',
                        params: {
                            title: '分管创业工作校领导',
                            type: 'leader'
                        }
                    },
                    {
                        text: '大赛工作部门主要负责人',
                        path: '/addLeaderInfo',
                        params: {
                            title: '大赛工作部门主要负责人',
                            type: 'principal'
                        }
                    },
                    {
                        text: '项目名称1',
                        path: '/addLeaderInfo',
                        params: {}
                    },
                    {
                        text: '+新增参赛项目',
                        path: '/addProjectInfo',
                        params: {}
                    }
                ]
            }
        },
        mounted() {
        },
        methods: {
            jumpPage(path, query={}){
                this.$router.push({
                    path: path,
                    query: query
                })
            }
        }
    }
</script>

<style lang="scss">
    .pioneerGame {
        .iconBox {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 80%;
            margin: 30px auto 0;
            .iconItem {
                width: 40%;
                height: 180px;
                background: #0035fc;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 60px;
            }
        }
        .btnGroup {
            margin: 60px 30px;
            .btn {
                margin-bottom: 40px;
                background: #15cd63;
                color: #fff;
                &:nth-child(3) {
                    background: #0035fc;
                }
                &:nth-child(4) {
                    background: #fff;
                    border: 6px solid #0035fc;
                    color: #000;
                }
            }
        }
    }

</style>
