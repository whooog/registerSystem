<template>
<div class="addHotelDetail page">
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
                                <div class="selectForm" @click="selectPicker(key)"><div class="text">{{item.value == '' ? item.placeholder : item.value}} </div> <van-icon name="arrow-down" /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tr" v-for="(item,index) in hotelRoomType" :key="index+'a'">
                <div class="td">{{item.type_name}}</div>
                <div class="td">
                    <div class="stepperBox">
                        <van-stepper v-model="item.num" />
                    </div>
                </div>
            </div>
        </div>
        <div class="tips">提醒：一经确认不可修改，有疑问请电话联系</div>
    </div>
    <div class="footer">
        <van-button block native-type="submit" @click="submitForm">提交</van-button>
    </div>

    <van-popup v-model="showPicker" position="bottom">
        <!--   选择酒店     -->
        <van-picker
                v-if="currentInfo.type == 'select'"
                show-toolbar
                :columns="currentInfo.content"
                @confirm="onConfirm"
                :default-index="currentInfo.defaultIndex"
                @cancel="showPicker = false"
        />

        <!--   选择时间     -->
        <van-datetime-picker
                v-else-if="currentInfo.type == 'time'"
                v-model="currentInfo.currentTime"
                type="date"
                title="选择年月日"
                @confirm="onConfirm"
                :min-date="minDate"
                :max-date="maxDate"
        />

        <!--     选择房型   -->
        <div class="selectRoom"  v-else-if="currentInfo.type == 'selectRoom'">
            <div class="title">请选择房型</div>
            <div class="content">
                <van-checkbox-group v-model="hotelRoomType">
                    <van-cell-group>
                        <van-cell
                                v-for="(item,index) in currentInfo.content"
                                clickable
                                :key="'room'+index"
                                :title="`${item.type_name}`"
                                @click="toggle(index)"
                        >
                            <template #right-icon>
                                <van-checkbox :name="item" ref="checkboxes" />
                            </template>
                        </van-cell>
                    </van-cell-group>
                </van-checkbox-group>
            </div>

            <div class="btnBox">
                <van-button round block type="info" size="small" @click="submitRoom">完成</van-button>
            </div>

        </div>

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
                minDate: '',
                maxDate: '',
                pickerIndex: 0,
                showPicker: false,
                currentInfo: {},

                // 房型列表
                hotelRoomType: []
            }
        },
        mounted() {
            this.minDate = new Date(this.$common.getNowTimeStamp(false))
            this.maxDate = new Date(2022, 11, 1)

        },
        methods: {
            //酒店列表
            getHotelList(){
                this.$httpRequest.post('api/Hotel/index', {
                    check_in: this.tableForm.check_in.time,
                    check_out:  this.tableForm.check_out.time
                }, 'gameToken').then(res => {
                    if (res.length>0){
                        // 格式化数组
                        res.forEach(item => {
                            item.text = item.hotel_name
                        })
                        this.tableForm.hotel_name.content = res;
                    }
                })
            },
            //酒店房型列表
            getRoomList(){
                this.$httpRequest.post('api/Hotel.Type/index', {
                    check_in: this.tableForm.check_in.time,
                    check_out:  this.tableForm.check_out.time
                }, 'gameToken').then(res => {
                    if (res.length>0){
                        // 格式化数组
                        res.forEach(item => {
                            item.num = 1;
                            item.name = item.type_name;
                        })
                        this.tableForm.selectRoom.content = res;
                    }
                })
            },
            toggle(index) {
                this.$refs.checkboxes[index].toggle();
            },
            selectPicker(index) {
                let item = this.tableForm[index]
                this.pickerIndex = index
                this.currentInfo = item
                this.showPicker = true;
            },
            onConfirm(value, index){
                let { pickerIndex, tableForm } = this;
                if (this.currentInfo.type === 'select') {
                    tableForm[pickerIndex].value = value.text;
                    tableForm[pickerIndex].id = value.hotel_id || '';
                    tableForm[pickerIndex].defaultIndex = index;
                }else {
                    tableForm[pickerIndex].value = this.timeFormat(value)
                    tableForm[pickerIndex].time = value.valueOf()
                }
                if (pickerIndex === 'is_stay') {
                    let bool = value.text === '是';
                    tableForm.check_in.showStatus = bool;
                    tableForm.check_out.showStatus = bool;
                }else if (pickerIndex === 'check_in' || pickerIndex === 'check_out'){
                    let bool = !this.$common.isEmpty(tableForm.check_in.value) && !this.$common.isEmpty(tableForm.check_out.value);
                    tableForm.table.showStatus = bool;
                    tableForm.hotel_name.showStatus = bool;
                    tableForm.selectRoom.showStatus = bool;
                    if (bool) {
                        this.getHotelList();
                        this.getRoomList();
                    }

                }
                this.showPicker = false;
                this.$forceUpdate()
            },

            // 选择房型
            submitRoom(){
                if (this.hotelRoomType.length == 0) {
                    this.$toast('请选择房型')
                    return;
                }
                let value = ''; // eslint-disable-line no-unused-vars
                this.hotelRoomType.forEach((item, index) => {
                    value += `${index>0 ? '、' : ''}${item.type_name}`
                })
                this.showPicker = false;
                this.tableForm[this.pickerIndex].value = value

                console.log(this.hotelRoomType)
            },
            timeFormat(time) {
                let year = time.getFullYear();
                let month = time.getMonth()+1;
                let day = time.getDate();
                return year + '年' + month + '月' + day + '日'
            },

            submitForm(){
                let { tableForm } = this;
                // eslint-disable-next-line no-unused-vars
                let params = {};
                params.is_stay = tableForm.is_stay.value
                if (tableForm.is_stay.value === '是'){
                    params.check_in = tableForm.check_in.time
                    params.check_out = tableForm.check_out.time
                    params.hotel_id = tableForm.hotel_name.id
                    params.hotel_name = tableForm.hotel_name.value
                    params.content = this.hotelRoomType


                    for (let key in params) {
                        if (this.$common.isEmpty(params[key])){
                            this.$toast(tableForm[key].placeholder)
                            return;
                        }
                    }
                }
                this.$dialog.confirm({
                    // title: '',
                    message: '一经确认不可修改， 请确认提交吗',
                })
                    .then(() => {
                        // on confirm
                        this.$httpRequest.post('api/Participant.Userhotel/add', params, 'gameToken').then(() => {
                            this.$toast('提交成功')
                            setTimeout(()=> {
                                this.$router.back()
                            }, 1000)
                        })
                    })
                    .catch(() => {
                        // on cancel
                    });


            }
        }
    }
</script>

<style scoped lang="scss">
.addHotelDetail {
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
                            .text {
                                width: 85%;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                margin-right: 5px;
                            }
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
    .selectRoom {
        .title {
            line-height: 120px;
            text-align: center;
            font-size: 30px;
            font-weight: bold;
        }
        .content{
            height: 510px;
            overflow-y: auto;
        }
        .btnBox {
            padding: 30px 50px;
        }
    }
}
</style>
