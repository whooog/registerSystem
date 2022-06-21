<template>
    <div class="newsList page">
        <Header title="咨询详情"></Header>
        <div class="scroll">
           <div class="advisory">
               <div class="subTitle">新闻咨询</div>
               <div class="advisoryTitle">{{detail.title}}</div>
               <div class="content" v-html="detail.content"></div>
           </div>

            </div>
    </div>
</template>

<script>
    import Header from "@/components/header.vue"

    export default {
        name: "newsList",
        components: {
            Header
        },
        data(){
            return {
                id: '',
                // 1- 新闻咨询  2- 赛事指南
                pageType: 1,

                title: '',

                detail: [],

            }
        },
        mounted() {
            let {id, pageType} = this.$route.query
            this.id = id
            this.pageType = pageType
            this.title = pageType == 1 ?  '咨询详情' : '指南详情'
            this.getDetail()
        },
        methods: {
            getDetail(){
                let params = {}, url = '';
                if (this.pageType == 1) {
                    params.newslist_id = this.id
                    url = 'api/NewsList/detail'
                }else {
                    params.eventguide_id = this.id
                    url = 'api/EventGuide/detail'
                }
                this.$httpRequest.post(url,params).then(res => {
                   this.detail = res;
                }).catch(() => {

                })
            },
        }
    }
</script>

<style scoped lang="scss">
.newsList {
    .scroll {
        padding: 20px 30px;
        .subTitle {
            height: 80px;
            line-height: 90px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 26px;
            font-weight: bold;
            .van-icon {
                font-size: 18px;
            }
        }
        .advisoryList {
            .advisoryItem {
                line-height: 45px;

            }
        }
        .content {
            line-height: 50px;
        }
    }
}
</style>
