<template>
<div class="pioneerGame page">
    <Header title=""></Header>
    <div class="scroll">
        <div class="iconBox">
            <div class="iconItem" @click="jumpPage('/diningDetail')">
                <img src="@/assets/images/tabIcon1.png" alt="">
            </div>
            <div class="iconItem" @click="jumpPage('/addHotelDetail')">
                <img src="@/assets/images/tabIcon2.png" alt="">
            </div>
            <div class="iconItem" @click="jumpPage('/addTrafficInfo')">
                <img src="@/assets/images/tabIcon3.png" alt="">
            </div>
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
                        text: '+新增参赛项目',
                        path: '/addProjectInfo',
                        params: {}
                    }
                ],

                // 是否显示返回按钮
                hasClose: false,
            }
        },
        mounted() {
            // let hasClose =  this.$route.query.hasClose
            // if (!this.$common.isEmpty(hasClose)) {
            //     this.hasClose = JSON.parse(hasClose)
            // }
            this.getProjectList()
        },
        methods: {
            getProjectList(){
              this.$httpRequest.post('api/Participant.Project/index', {}, 'gameToken').then(res => {
                  let response = res.data;
                  if (response.length>0){
                      let btnList = this.btnList
                      let lastItem = btnList.slice(btnList.length-1)
                      btnList.splice(btnList.length-1)

                      response.forEach((item) => {
                          btnList.push({
                              text: item.project_name,
                              path: '/addProjectInfo',
                              params: {
                                  title: item.project_name|| '',
                                  project_id: item.project_id,
                                  type: 'edit'
                              }
                          })
                      })
                      btnList.push(lastItem[0])
                      this.btnList = btnList

                  }
              })
            },
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
            width: 88%;
            margin: 30px auto 0;
            .iconItem {
                width: 29%;
                height: 180px;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 60px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .btnGroup {
            margin: 60px 30px;
            .btn {
                margin-bottom: 40px;
                background: #0035fc;
                color: #fff;
                &:nth-child(1), &:nth-child(2) {
                    background: #15cd63;
                }
                &:last-child {
                    background: #fff;
                    border: 6px solid #0035fc;
                    color: #000;
                }
            }
        }
    }

</style>
