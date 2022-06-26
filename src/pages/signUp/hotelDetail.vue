<template>
<div class="hotelDetail page">
    <Header :title="detail.hotel_name +'住宿详情'"></Header>
    <div class="scroll">
        <div class="table">
            <div v-for="(item,key,index) in tableForm" :key="key">
                <template v-if="item.type == 'table'">
                    <div class="hotelInfoTable"  v-if="item.content.length>0">
                        <div class="th" v-for="(row, i) in item.content" :key="i+'row'">
                            <div class="td" v-for="(tr, trIndex) in row" :key="trIndex+'tr'">{{tr.name}}</div>
                        </div>
                    </div>
                </template>
                <div v-else>
                    <div class="tr" :class="{'border' : index === 1 }">
                        <div class="td">{{item.label}}</div>
                        <div class="td">
                            <div class="selectForm">{{ item.value || ''}}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tr" v-for="(item,index) in hotelRoomType" :key="index+'a'">
                <div class="td">{{item.type_name}}</div>
                <div class="td">
                    <div class="stepperBox">
                       <div class="text">{{item.num}}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="payInfo">
            {{detail.hotel_name}}付款方式如下:
            <p v-if="detail.huming">户名: {{detail.huming}}</p>
            <p v-if="detail.account">账户: {{detail.account}}</p>
            <p v-if="detail.bank">开户行: {{detail.bank}}</p>
            <p v-if="detail.address">酒店地址: {{detail.address}}</p>
            <p v-if="detail.remark">付款请留言: {{detail.remark}}</p>
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
                userhotel_id: '',
                tableForm: {
                    check_in:{
                        label: '入住日期',
                        placeholder: '请选择入住日期',
                        type: 'time',
                        defaultIndex: 0,
                        value: '',
                        id: '',
                        time: '',
                    },
                    check_out:{
                        label: '退房日期',
                        placeholder: '请选择退房日期',
                        type: 'time',
                        defaultIndex: 0,
                        value: '',
                        id: '',
                        time: '',
                    },
                    table: {
                        type: 'table',
                        content: []
                    },
                    hotel_name:{
                        label: '选择酒店',
                        placeholder: '请选择酒店',
                        type: 'select',
                        defaultIndex: 0,
                        value: '',
                        id: '',
                        content: [],
                    },
                    selectRoom: {
                        label: '选择房型',
                        placeholder: '请选择房型',
                        type: 'selectRoom',
                        defaultIndex: 0,
                        value: '',
                        id: '',
                        content: [],
                    }
                },

                detail: {
                    hotel_name: ''
                },
                hotelRoomType: []
            }
        },
        mounted() {
            let { userhotel_id , hotel_name} = this.$route.query;
            if (!this.$common.isEmpty(userhotel_id)){
                this.userhotel_id = userhotel_id
                this.getDetail();
            }
            this.detail.hotel_name = hotel_name

        },
        methods: {
            //酒店详情
            getDetail(){
                this.$httpRequest.post('api/Participant.Userhotel/detail', {
                    userhotel_id: this.userhotel_id
                }, 'gameToken').then(res => {
                    let {tableForm} = this;
                    let list = res.data;
                    this.detail = list;
                    this.getHotelDetail();
                    for (let key in tableForm) {
                        if (tableForm[key].type === 'time') {
                            tableForm[key].value = this.$common.timeStampToDate(list[key])
                        }else {
                            tableForm[key].value = list[key]
                        }
                        // eslint-disable-next-line no-unused-vars
                        let content = JSON.parse(list.content), roomName = '';
                        if (content && content.length>0){
                            content.forEach(item => {
                                roomName+=item.name
                            })
                            tableForm.selectRoom.value = roomName;
                            this.hotelRoomType = content;
                        }

                    }
                })
            },
            // 获取酒店列表详情
            getHotelDetail(){
                this.$httpRequest.post('api/Hotel.Stock/table', {
                    check_in: this.detail.check_in,
                    check_out:  this.detail.check_out,
                }, 'gameToken').then(res => {
                    // eslint-disable-next-line no-unused-vars
                    let response = res.data
                    let arr = [];
                    if (response.type.length > 0) {
                        response.type.forEach(item => {item.name = item.type_name })
                        arr.push([
                            { name: '' },
                            ...response.type
                        ])
                    }
                    if (response.roomType.length>0){
                        // 格式化数组
                        response.roomType.forEach((item) => {
                            while (item.length <= (response.type.length)) {
                                item.push({
                                    name: ''
                                })
                            }
                        })
                        arr.push(... response.roomType)
                        this.tableForm.table.content = arr;
                    }
                }).catch(() => {
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
                            .text {
                                height: 45px;
                                line-height: 45px;
                                width: 100px;
                                text-align: center;
                                border: 1px solid #ddd;
                            }
                        }
                    }

                }
                &.border {
                    border-bottom: 2px solid #d2d2d2;
                }
            }
        }
        border {
            border-bottom: 2px solid #d2d2d2;
        }
        .payInfo {
            padding: 20px 30px;
        }
        .hotelInfoTable {
            margin: 30px 40px;
            border-top: 1px solid #E3E3E3;
            border-left: 1px solid #E3E3E3;
            border-right: 1px solid #E3E3E3;
            overflow-x: auto;
            .th {
                border-bottom: 1px solid #E3E3E3;
                display: flex;
                align-items: center;
                .td {
                    width: 24%;
                    flex-shrink: 0;
                    border-right: 1px solid #E3E3E3;
                    padding: 0 6px;
                    min-height: 70px;
                    display: flex;
                    align-items: center;
                    background: #F2F2F2;
                    .text {
                        height: 100%;
                    }
                }
                &:nth-child(2n) {
                    .td {
                        background: #fff;
                    }
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
