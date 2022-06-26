<template>
    <div class="newsDetail page">
        <Header :title="title"></Header>
        <div class="scroll">
           <div class="advisory">
               <div class="subTitle">{{detail.title}}</div>
               <div class="content" v-html="detail.content"></div>
           </div>

            </div>
    </div>
</template>

<script>
    import Header from "@/components/header.vue"

    export default {
        name: "newsDetail",
        components: {
            Header
        },
        data(){
            return {
                id: '',
                // 1- 新闻资讯  2- 赛事指南
                pageType: 1,

                title: '',

                detail: [],

            }
        },
        mounted() {
            let {id, pageType} = this.$route.query
            this.id = id
            this.pageType = pageType
            this.title = pageType == 1 ?  '新闻详情' : '指南详情'
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
                   this.detail = res.data;
                }).catch(() => {

                })
            },
        }
    }
</script>

<style lang="scss">
.newsDetail {

    .scroll {
        padding: 20px 30px;
        .subTitle {
            font-size: 28px;
            text-align: center;
            margin-top: 40px;
        }
        .content {
            border: 1px solid #ccc;
            width: 90%;
            margin: 50px auto;
            padding: 5px 20px;
            * {
                word-wrap: break-word;
                word-break: normal;
            }
        }
    }
}
</style>
