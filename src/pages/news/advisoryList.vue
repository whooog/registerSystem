<template>
    <div class="advisoryList page">
        <Header title="赛事咨询" :main-color="false"></Header>
        <div class="scroll">
           <div class="advisory">
               <div class="subTitle">
                   新闻资讯
               </div>
               <div class="advisoryList">
                   <div class="advisoryItem content" @click="jumpPage(item.newslist_id, 1)" v-for="(item, index) in newslist" :key="index+'a'">
                       <div class="text">{{item.title}}</div>
                   </div>
               </div>
           </div>
        </div>
    </div>
</template>

<script>
    import Header from "../../components/header.vue"

    export default {
        name: "advisoryList",
        components: {
            Header
        },
        data(){
            return {
                newslist: [],
                eventGuideList: []
            }
        },
        mounted() {
            //

            this.getList()
        },
        methods: {
            getList(){
                this.$httpRequest.post('api/NewsList/index',{}).then(res => {
                   this.newslist = res.data.data;
                }).catch(() => {

                })
            },
            jumpPage(id, type){
                // 1- 新闻资讯  2- 赛事指南
                this.$router.push({
                    path: '/newsDetail',
                    query: {
                        id,
                        pageType: type
                    }
                })
            },

        }
    }
</script>

<style scoped lang="scss">
.advisoryList {
    .scroll {
        background: #0035fc;
        color: #fff;
        padding-top: 10px;
        .subTitle {
            line-height: 80px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 25px;
            font-weight: bold;
            padding: 0 30px;
            .more {
                color: #333;
                .icon {
                    font-size: 16px;
                    transform: rotate(270deg);
                }

            }

        }
        .advisoryList {
            padding: 0 15px;
            .advisoryItem {
                padding: 15px 15px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 25px;
                font-weight: bold;
                border: none;
                border-top: 1px solid #8b8dac;
                &:first-child {
                    margin-top: 0;
                    border-top: none;
                    padding-top: 10px;
                }
            }
        }
    }
}
</style>
