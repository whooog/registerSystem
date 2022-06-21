<template>
<div class="addHotelDetail page">
    <Header title="住宿"></Header>
    <div class="scroll">
        <div class="table">
            <div v-for="(item,index) in tableForm" :key="index">
                <div class="hotelInfoTabke" v-if="item.type == 'table'">
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
                <div v-else>
                    <div class="tr">
                        <div class="td">{{item.label}}</div>
                        <div class="td">
                            <div class="stepperBox" v-if="item.type == 'stepper'">
                                <van-stepper v-model="item.value" />
                            </div>
                            <div class="selectForm" v-else @click="selectPicker(index)">{{item.value == '' ? item.placeholder : item.value}}  <van-icon name="arrow-down" /></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tips">提醒：一经确认不可修改，有疑问请电话联系</div>
    </div>
    <div class="footer">
        <van-button round block type="primary" native-type="submit" @click="submitBtn">提交</van-button>
    </div>

    <van-popup v-model="showPicker" position="bottom">
        <van-picker
                v-if="currentInfo.type == 'select'"
                show-toolbar
                :columns="currentInfo.content"
                @confirm="onConfirm"
                :default-index="currentInfo.defaultIndex"
                @cancel="showPicker = false"
        />

        <van-datetime-picker
                v-else-if="currentInfo.type == 'time'"
                v-model="currentInfo.currentTime"
                type="date"
                title="选择年月日"
                @confirm="onConfirm"
                :min-date="minDate"
                :max-date="maxDate"
        />

    </van-popup>
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
            return{
                tableForm: [
                    {
                        label: '是否需要入住酒店',
                        placeholder: '请选择',
                        type: 'select',
                        defaultIndex: 0,
                        value: '',
                        id: '',
                        content: [{
                            text: '是',
                            id: 1
                        },{
                            text: '否',
                            id: 0
                        }]
                    },
                    {
                        label: '入住日期',
                        placeholder: '请选择',
                        type: 'time',
                        defaultIndex: 0,
                        value: '',
                        id: '',
                        content: [{
                            text: '是',
                            id: 1
                        },{
                            text: '否',
                            id: 0
                        }]
                    },
                    {
                        label: '退房日期',
                        placeholder: '请选择',
                        type: 'time',
                        defaultIndex: 0,
                        value: '',
                        id: '',
                        content: [{
                            text: '是',
                            id: 1
                        },{
                            text: '否',
                            id: 0
                        }]
                    },
                    {
                        type: 'table'
                    },
                    {
                        label: '选择酒店',
                        placeholder: '请选择',
                        type: 'select',
                        defaultIndex: 0,
                        value: '',
                        id: '',
                        content: [{
                            text: '酒店1',
                            id: 1
                        },{
                            text: '酒店2',
                            id: 0
                        }]
                    },
                    {
                        label: '选择房型',
                        placeholder: '请选择',
                        type: 'select',
                        defaultIndex: 0,
                        value: '',
                        id: '',
                        content: [{
                            text: '房型1',
                            id: 1
                        },{
                            text: '房型2',
                            id: 0
                        }]
                    },
                    {
                        label: '标准双床房',
                        placeholder: '',
                        type: 'stepper',
                        value: '1',
                    },
                    {
                        label: '大床房',
                        placeholder: '',
                        type: 'stepper',
                        value: '1',
                    },
                ],
                minDate: '',
                maxDate: '',
                pickerIndex: 0,
                showPicker: false,
                currentInfo: {},
            }
        },
        mounted() {
            this.minDate = new Date(this.$common.getNowTimeStamp(false))
            this.maxDate = new Date(2022, 11, 1)
        },
        methods: {
            selectPicker(index) {
                let item = this.tableForm[index]
                this.pickerIndex = index
                this.currentInfo = item
                this.showPicker = true;
            },
            onConfirm(value, index){
                let { pickerIndex } = this;
                if (this.currentInfo.type == 'select') {
                    this.tableForm[pickerIndex].value = value.text;
                    this.tableForm[pickerIndex].defaultIndex = index;
                    this.tableForm[pickerIndex].id = value.id;
                }else {
                    this.tableForm[pickerIndex].value = this.timeFormat(value)
                }
                this.showPicker = false;
                this.$forceUpdate()
            },
            timeFormat(time) {
                let year = time.getFullYear();
                let month = time.getMonth()+1;
                let day = time.getDate();
                return year + '年' + month + '月' + day + '日'
            }
        }
    }
</script>

<style scoped lang="scss">
.addHotelDetail {
    .scroll {
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
                        }
                        .stepperBox {
                            width: 100%;
                            display: flex;
                            justify-content: right;
                        }
                    }

                }
                &.tr2 {
                    padding-right: 55px;
                    .td:nth-child(1) {
                        width: 30%;
                    }
                    .td:nth-child(2) {
                        width: 70%;
                    }
                }
            }
        }
        .hotelInfoTabke {
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
         padding: 30px 25px;
     }
}
</style>
