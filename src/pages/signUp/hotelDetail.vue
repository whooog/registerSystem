<template>
<div class="hotelDetail page">
    <Header title="住宿"></Header>
    <div class="scroll">
        <div class="table">
            <div v-for="(item,key,index) in tableForm" :key="key">
                <div v-if="item.showStatus">
                    <template v-if="item.type == 'table'">
                        <div class="hotelInfoTable">
                            <div class="th">
                                <div class="td" >酒店名称</div>
                                <div class="td" >酒店1</div>
                                <div class="td" >酒店1</div>
                                <div class="td" >酒店1</div>
                            </div>
                            <div class="th">
                                <div class="td" >222</div>
                                <div class="td" >222</div>
                                <div class="td" >222</div>
                                <div class="td" >222</div>
                            </div>
                        </div>
                    </template>
                    <div v-else>
                        <div class="tr" :class="{'border' : index == 2 }">
                            <div class="td">{{item.label}}</div>
                            <div class="td">
                                <div class="selectForm">{{ item.value || ''}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="footer">
        <van-button block native-type="submit" @click="$router.back()">首页</van-button>
    </div>

</div>
</template>

<script>
    import Header from "@/components/header.vue"

    export default {
        name: "hotelDetail",
        components: {
            Header
        },
        data(){
            return{
                hotel_id: '',
                tableForm: {
                    is_stay:{
                        label: '是否需要入住酒店',
                        placeholder: '请选择',
                        type: 'select',
                        defaultIndex: 0,
                        value: '',
                        id: '',
                        content: [{
                            text: '是'
                        }, {
                            text: '否'
                        }],
                        showStatus: true,
                    },
                    check_in:{
                        label: '入住日期',
                        placeholder: '请选择入住日期',
                        type: 'time',
                        defaultIndex: 0,
                        value: '',
                        id: '',
                        time: '',
                        showStatus: false,
                    },
                    check_out:{
                        label: '退房日期',
                        placeholder: '请选择退房日期',
                        type: 'time',
                        defaultIndex: 0,
                        value: '',
                        id: '',
                        time: '',
                        showStatus: false,
                    },
                    table: {
                        type: 'table',
                        showStatus: false,
                    },
                    hotel_name:{
                        label: '选择酒店',
                        placeholder: '请选择酒店',
                        type: 'select',
                        defaultIndex: 0,
                        value: '',
                        id: '',
                        content: [],
                        showStatus: false,
                    },
                    selectRoom: {
                        label: '选择房型',
                        placeholder: '请选择房型',
                        type: 'selectRoom',
                        defaultIndex: 0,
                        value: '',
                        id: '',
                        content: [],
                        showStatus: false,
                    }
                },

                table: [
                    {
                        company: '1',
                        roomType: [
                            {
                                name: '1'
                            },
                            {
                                name: '1'
                            }
                        ]
                    }
                ]
            }
        },
        mounted() {
            let { hotel_id } = this.$route.query;
            if (!this.$common.isEmpty(hotel_id)){
                this.hotel_id = hotel_id
                this.getDetail();

            }

        },
        methods: {
            //酒店详情
            getDetail(){
                this.$httpRequest.post('api/Participant.Userhotel/detail', {
                    hotel_id: this.hotel_id
                }, 'gameToken').then(res => {
                    console.log(JSON.stringify(res))
                })
            },

        }
    }
</script>

<style scoped lang="scss">
.hotelDetail {
    .scroll {
        .table {
            border-bottom: 2px solid #d2d2d2;
            .tr {
                padding: 0 30px;
                height: 80px;
                border-top: 2px solid #d2d2d2;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .td {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    &:nth-child(1) {
                        width: 60%;
                        border-right: 2px solid #d2d2d2;
                        .label {
                            font-size: 20px;
                        }
                    }
                    &:nth-child(2) {
                        width: 40%;
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
                            display: flex;
                            align-items: center;
                            justify-content: right;
                        }
                        .stepperBox {
                            width: 100%;
                            display: flex;
                            justify-content: right;
                        }
                    }

                }
                &.border {
                    border-bottom: 2px solid #d2d2d2;
                }
            }
        }

        .hotelInfoTable {
            margin: 30px 40px;
            border-top: 1px solid #E3E3E3;
            border-left: 1px solid #E3E3E3;
            .th {
                border-bottom: 1px solid #E3E3E3;
                background: #F2F2F2;
                display: flex;
                align-items: center;
                &:nth-child(2n) {
                    background: #fff;
                }
                .td {
                    height: 70px;
                    line-height: 70px;
                    width: calc(100% / 4);
                    border-right: 1px solid #E3E3E3;
                    padding: 0 6px;
                }
            }
        }
        .tips {
            font-size: 27px;
            color: red;
            line-height: 90px;
            padding: 0 30px;
        }
    }
    .footer {
         .van-button {
             background: #15cd63;
         }
     }
}
</style>
