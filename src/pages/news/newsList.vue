<template>
    <div class="newsList page">
        <Header :hasClose="false" title="赛事咨询" :main-color="false"></Header>
        <div class="scroll">
           <div class="advisory">
               <div class="subTitle">
                   新闻咨询
                   <div class="more" @click="toAdvisory">more <van-icon name="down" class="icon"/>
               </div></div>
               <div class="advisoryList">
                   <div class="advisoryItem content" @click="jumpPage(item.newslist_id, 1)" v-for="(item, index) in newslist" :key="index+'a'">
                       <div class="text">{{item.title}}</div>
                   </div>
               </div>
           </div>
            <div class="guide">
                <div class="subTitle">赛事指南</div>
                <div class="guideList">
                    <div class="guideItem content" @click="jumpPage(item.eventguide_id, 2)" v-for="(item,index) in eventGuideList" :key="index+'b'">
                        {{item.title}}
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
            this.guideList()
        },
        methods: {
            getList(){
                this.$httpRequest.post('api/NewsList/index',{}).then(res => {
                   this.newslist = res.data;
                }).catch(() => {

                })
            },
            guideList(){
                this.$httpRequest.post('api/EventGuide/index',{}).then(res => {
                    this.eventGuideList = res.data;
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
            toAdvisory(){
                this.$router.push({
                    path: '/advisoryList'
                })
            }
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
            padding: 0 15px;
            .advisoryItem {
                padding: 15px 15px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 25px;
                font-weight: bold;
                border-top: 1px solid #8b8dac;
                &:first-child {
                    margin-top: 0;
                    border-top: none;
                    padding-top: 10px;
                }
            }
        }
        .guide {
            .subTitle {
                margin-top: 110px;
            }
            .guideList {
                padding: 20px 15px;
                .guideItem {
                    padding: 15px 15px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 25px;
                    font-weight: bold;
                    border-top: 1px solid #8b8dac;
                    &:first-child {
                        margin-top: 0;
                        border-top: none;
                    }
                }
            }
        }

    }
}
</style>
