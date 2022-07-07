<template>
    <div class="index-section page">
        <div class="scroll">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" v-if="detail.banner && detail.banner.length > 0">
                <van-swipe-item v-for="(item,index) in detail.banner" :key="index">
                    <div class="img" :style="{'background':' url('+item.url+') no-repeat center center / cover'}"></div>
                </van-swipe-item>
            </van-swipe>
<!--            <div class="btnGroup">-->
<!--                <div class="btnContent">-->
<!--                    互联网+大学生创新创业大赛-->
<!--                    <div class="btn" @click="gotoChild(1)">立即报名</div>-->
<!--                </div>-->
<!--                <div class="btnContent">-->
<!--                    对接洽谈活动投资机构人员报名-->
<!--                    <div class="btn" @click="gotoChild(2)">立即报名</div>-->
<!--                </div>-->
<!--            </div>-->
            <div class="advisory" v-if="newslist.length>0">
                <div class="subTitle">
                    新闻资讯
                    <div class="more" @click="toAdvisory">more <van-icon name="down" class="icon"/>
                    </div></div>
                <div class="advisoryList">
                    <div class="advisoryItem content" @click="jumpPage(item.newslist_id, 1)" v-for="(item, index) in newslist" :key="index+'a'">
                        <div class="text">{{item.title}}</div>
                    </div>
                </div>
            </div>
            <div class="guide" v-if="eventGuideList.length>0">
                <div class="subTitle">赛事指南</div>
                <div class="guideList">
                    <div class="guideItem content" @click="jumpPage(item.eventguide_id, 2)" v-for="(item,index) in eventGuideList" :key="index+'b'">
                        {{item.title}}
                    </div>
                </div>
            </div>
<!--            <div v-if="detail.introduce">-->
<!--                <div class="subTitle">大赛介绍</div>-->
<!--                <img :src="detail.introduce" alt="" class="indexImg">-->
<!--            </div>-->
<!--            <div v-if="detail.milestone">-->
<!--                <div class="subTitle">大赛里程碑</div>-->
<!--                <img :src="detail.milestone" alt="" class="indexImg">-->
<!--            </div>-->
        </div>
    </div>
</template>

<script>
export default {
    components: {

    },
    data() {
        return {
            detail: {},

            newslist: [],
            eventGuideList: []
        }
    },
    computed: {

    },
    activated() {
        this.getDetail();

        this.getList()
        this.guideList()
    },
    methods: {
        getDetail(){
          this.$httpRequest.post('api/HomeList/index', {}).then(res => {
              this.detail = res.data;
          })
        },
        getList(){
            this.$httpRequest.post('api/NewsList/index',{}).then(res => {
                this.newslist = res.data.data;
            }).catch(() => {

            })
        },
        guideList(){
            this.$httpRequest.post('api/EventGuide/index',{}).then(res => {
                this.eventGuideList = res.data.data;
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
        toAdvisory(){
            this.$router.push({
                path: '/advisoryList'
            })
        },
        gotoChild(index){
            // this.$router.push({
            //     path:"/loginPage"
            // })
            let path = ''
            if (index == 1) {
                path = "/pioneerGame"
            }else {
                path = "/entryInfo"
            }
            this.$router.push({
                path: path,
                query: {
                    hasClose: true
                }
            })
        }
    }
}
</script>

<style lang="scss">
    .index-section {
        .scroll {
            background-image: linear-gradient(#002A9E 45%, #31A1F6);
            overflow: hidden;
            .my-swipe {
                margin: 25px 30px;
                .van-swipe-item {
                    color: #333;
                    font-size: 20px;
                    height: 120px;
                    text-align: center;
                    background: #fff;
                    width: 100%;
                    .img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .btnGroup {
                .btnContent {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 30px 0 60px;
                    width: 88%;
                    margin: 0 auto 25px;
                    height: 70px;
                    border-radius: 25px;
                    font-size: 24px;
                    background: #6955e8;
                    background: linear-gradient(90deg,#6955e8 30%, #4e7ae3);
                    box-shadow: 5px 1px 6px 0px #6E6E6E;

                    .btn {
                        /*color: #fff;*/
                        width: 180px;
                        height: 52px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 26px;
                        border-radius: 25px;
                        font-weight: bold;
                        color: #fff;
                        background: linear-gradient(148deg, #012a9e 50%, #2284de 91%);
                        box-shadow: 0px -1px 3px 0px #f6f6f6;
                    }
                }
            }
            /*.subTitle {*/
            /*    height: 80px;*/
            /*    line-height: 80px;*/
            /*    padding: 0 30px;*/
            /*    font-size: 26px;*/
            /*    font-weight: bold;*/
            /*    color: #fff;*/
            /*}*/
            /*.indexImg {*/
            /*    width: 100%;*/
            /*}*/
            .subTitle {
                line-height: 80px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 25px;
                font-weight: bold;
                padding: 0 30px;
                color: #fff;
                .more {
                    color: #333;
                    .icon {
                        font-size: 16px;
                        transform: rotate(270deg);
                    }

                }

            }
            .advisory {
                margin-top: 80px;
                .advisoryList {
                    padding: 0 15px;
                    color: #fff;
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
            }

            .guide {
                color: #fff;
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
