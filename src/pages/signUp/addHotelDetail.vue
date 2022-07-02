<template>
    <div class="addHotelDetail page">
        <Header></Header>
        <div class="scroll">
            <div class="box" v-for="(item,index) in list" :key="index">
                <div class="date">{{item.mddate}}</div>
                <div class="table">
                    <div class="tr">
                        <div class="td">老师单人房</div>
                        <div class="td">
                            <div class="stepperBox">
                                <div class="value">{{item.teacher_single}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="tr">
                        <div class="td">老师双人房</div>
                        <div class="td">
                            <div class="stepperBox">
                                <div class="value">{{item.teacher_double}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="tr">
                        <div class="td">学生单人房</div>
                        <div class="td">
                            <div class="stepperBox">
                                <div class="value">{{item.students_single}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="tr">
                        <div class="td">学生双人房</div>
                        <div class="td">
                            <div class="stepperBox">
                                <div class="value">{{item.students_double}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="tr">
                        <div class="td">领导单人房</div>
                        <div class="td">
                            <div class="stepperBox">
                                <div class="value">{{item.leadership_single}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="tr">
                        <div class="td">领导双人房</div>
                        <div class="td">
                            <div class="stepperBox">
                                <div class="value">{{item.leadership_double}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="addNumberBox">
                <van-button round block plain class="addNumber" size="small" @click="$router.push({path: '/addHotel'})">+ 添加用餐</van-button>
            </div>
        </div>
        <div class="footer">
            <van-button block native-type="submit" @click="$router.push({path: '/home/index'})">首页</van-button>
        </div>
    </div>
</template>

<script>
    import Header from "@/components/header.vue"

    export default {
        name: "addHotelDetail",
        components: {
            Header
        },
        data(){
            return {
                list: []
            }
        },
        mounted() {
            this.getDetail()
        },
        methods: {
            getDetail(){
                this.$httpRequest.post('api/Hotel.Room/index', {}, 'gameToken').then(res => {
                    this.list = res.data.data;
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .addHotelDetail {
        .box {
            margin-bottom: 60px;
            &:last-child {
                margin-bottom: 0px;
            }
        }
        .date {
            text-align: center;
            font-size: 28px;
            line-height: 75px;
            border-top: 1px solid #d2d2d2;
        }
        .table {
            border-top: 2px solid #d2d2d2;
            .tr {
                padding: 0 30px;
                height: 80px;
                border-bottom: 2px solid #d2d2d2;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .td {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    &:nth-child(1) {
                        width: 30%;
                        border-right: 2px solid #d2d2d2;
                        .label {
                            font-size: 20px;
                        }
                    }
                    &:nth-child(2) {
                        width: 70%;
                        text-align: right;
                        .inputItem {
                            height: 100%;
                            width: 100%;
                            input {
                                height: 100%;
                                width: 100%;
                                border: none;
                                outline: none;
                                text-align: right;
                                font-size: 24px;
                            }
                        }
                        .selectForm {
                            width: 100%;
                            text-align: right;
                        }
                    }
                    .stepperBox {
                        width: 100%;
                        text-align: right;
                        .value {
                            width: 120px;
                            height: 43px;
                            line-height: 43px;
                            border: 1px solid #ddd;
                            text-align: center;
                            display: inline-block;
                        }
                    }
                }
            }
        }
        .addNumberBox {
            margin: 90px 30px 25px;
            .addNumber {
                border: 6px solid #0035fc !important;
            }
        }

        .footer {
            .van-button {
                background: #87c785;
            }
        }
    }
</style>
