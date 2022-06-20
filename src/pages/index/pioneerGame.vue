<template>
<div class="pioneerGame page">
    <Header title="参赛报名"></Header>
    <div class="scroll">
        <div class="iconBox">
            <div class="iconItem" @click="jumpPage('/addHotel')">住宿ICON</div>
            <div class="iconItem" @click="jumpPage('/addTrafficInfo')">交通ICON</div>
        </div>
        <div class="btnGroup">
            <van-button round block :type="item.btnType" @click="jumpPage(item.path, item.params)" v-for="(item,index) in btnList" :key="index">{{item.text}}</van-button>
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
                        btnType: 'primary',
                        path: '/addLeaderInfo',
                        params: {
                            title: '分管创业工作校领导',
                            type: 'leader'
                        }
                    },
                    {
                        text: '大赛工作部门主要负责人',
                        btnType: 'info',
                        path: '/addLeaderInfo',
                        params: {
                            title: '大赛工作部门主要负责人',
                            type: 'principal'
                        }
                    },
                    {
                        text: '项目名称1',
                        btnType: 'danger',
                        path: '/addLeaderInfo',
                        params: {}
                    },
                    {
                        text: '+新增参赛项目',
                        btnType: 'warning',
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
            .van-button {
                margin-bottom: 20px !important;
            }
        }
    }

</style>
