<template>
<div class="dining page">
    <Header title=""></Header>
    <div class="scroll">
        <div class="iconBox">
            <div class="iconItem" @click="tableStatus = true">校内用餐</div>
            <div class="iconItem">校外用餐</div>
        </div>

        <div class="table" v-if="tableStatus">
            <div class="tr" v-for="(item,key) in tableForm" :key="key">
                <div class="td">{{item.label}}</div>
                <div class="td">
                    <div class="selectForm" v-if="item.type === 'time'"  @click="selectPicker(key)">{{item.value == '' ? item.placeholder : item.value}}  <van-icon name="arrow-down" /></div>
                    <div class="stepperBox" v-else>
                        <van-stepper v-model="item.value" />
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div class="footer" v-if="tableStatus">
        <van-button block native-type="submit" @click="submitBtn">保存</van-button>
    </div>
    <van-popup v-model="showPicker" position="bottom">
        <!--   选择时间     -->
        <van-datetime-picker
                v-model="currentInfo.time"
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
        name: "dining",
        components: {
            Header
        },
        data(){
            return {
                tableStatus: false,
                showPicker: false,

                tableForm: {
                    date: {
                        label: '请选择日期',
                        placeholder: '请选择',
                        type: 'time',
                        value: ''
                    },
                    breakfast: {
                        label: '早餐',
                        placeholder: '请选择',
                        type: 'stepper',
                        value: 1,
                    },
                    breakfast2: {
                        label: '中餐',
                        placeholder: '请选择',
                        type: 'stepper',
                        value: 1,
                    },
                    breakfast3: {
                        label: '晚餐',
                        placeholder: '请选择',
                        type: 'stepper',
                        value: 1,
                    },
                },
                pickerIndex: 0,
                currentInfo: {},

                minDate: '',
                maxDate: ''
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
            onConfirm(value){
                let {tableForm, pickerIndex} = this
                tableForm[pickerIndex].value = this.timeFormat(value)
                tableForm[pickerIndex].time = value.valueOf()
                this.showPicker = false
                this.$forceUpdate();
            },
            timeFormat(time) {
                let year = time.getFullYear();
                let month = time.getMonth()+1;
                let day = time.getDate();
                return year + '年' + month + '月' + day + '日'
            },
            submitBtn(){
                this.$router.push({
                    path: '/diningDetail'
                })
            }
        }
    }
</script>

<style scoped lang="scss">
.dining {
    .iconBox {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 70%;
        margin: 30px auto 0;
        .iconItem {
            width: 40%;
            height: 180px;
            background: #0035fc;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 60px;
        }
    }
    .table {
        border-top: 2px solid #d2d2d2;
        margin-top: 90px;
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
                        display: flex;
                        align-items: center;
                        justify-content: right;
                    }
                }
                .stepperBox {
                    width: 100%;
                    display: flex;
                    justify-content: right;
                }
            }
        }
    }
    .footer {
        .van-button {
            background: #87c785;
        }
    }
}
</style>
