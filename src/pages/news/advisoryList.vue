<template>
    <div class="newsList page">
        <Header title="赛事咨询"></Header>
        <div class="scroll">
           <div class="advisory">
               <div class="subTitle">
                   新闻咨询
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
        name: "newsList",
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
                   this.newslist = res.data;
                }).catch(() => {

                })
            },
            jumpPage(id, type){
                // 1- 新闻咨询  2- 赛事指南
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
.newsList {
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
            .advisoryItem {
                padding: 10px 30px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 26px;
                margin-top: 30px;
                color: #000;
                background: #fff;
                &:first-child {
                    margin-top: 0;
                }
            }
        }
    }
}
</style>
