<template>
    <div class="addHotel page">
        <Header title=""></Header>
        <div class="scroll">

            <div class="table">
                <div class="tr" v-for="(item,key) in tableForm" :key="key">
                    <div class="td">{{item.label}}</div>
                    <div class="td">
                        <div class="selectForm" v-if="item.type === 'time'"  @click="selectPicker(key)">{{item.time == '' ? item.placeholder : item.time}}  <van-icon name="arrow-down" /></div>
                        <div class="stepperBox" v-else>
                            <van-stepper v-model="item.value" min="0" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="footer">
            <van-button block native-type="submit" @click="submitBtn">保存</van-button>
        </div>
        <van-popup v-model="showPicker" position="bottom">
            <!--   选择时间     -->
            <van-picker
                    show-toolbar
                    :columns="currentInfo.content"
                    @confirm="onConfirm"
                    :default-index="currentInfo.defaultIndex"
                    @cancel="showPicker = false"
            />
        </van-popup>
    </div>
</template>

<script>
    import Header from "@/components/header.vue"

    export default {
        name: "addHotel",
        components: {
            Header
        },
        data(){
            return {
                showPicker: false,

                tableForm: {
                    sign_time: {
                        label: '请选择日期',
                        placeholder: '请选择',
                        type: 'time',
                        time: '',
                        value: '',
                        content: []
                    },
                    // 老师单人房
                    teacher_single: {
                        label: '老师单人房',
                        placeholder: '请选择',
                        type: 'stepper',
                        value: 0,
                    },
                    // 老师双人房
                    teacher_double: {
                        label: '老师双人房',
                        placeholder: '请选择',
                        type: 'stepper',
                        value: 0,
                    },
                    //学生单人房
                    students_single: {
                        label: '学生单人房',
                        placeholder: '请选择',
                        type: 'stepper',
                        value: 0,
                    },
                    //学生双人房
                    students_double: {
                        label: '学生双人房',
                        placeholder: '请选择',
                        type: 'stepper',
                        value: 0,
                    },
                    //领导单人房
                    leadership_single: {
                        label: '领导单人房',
                        placeholder: '请选择',
                        type: 'stepper',
                        value: 0,
                    },
                    //领导双人房
                    leadership_double: {
                        label: '领导双人房',
                        placeholder: '请选择',
                        type: 'stepper',
                        value: 0,
                    },

                },
                pickerIndex: 0,
                currentInfo: {},

                link: ''
            }
        },
        mounted() {
            this.getTimeList();
        },
        methods: {

            // 获取可选时间列表
            getTimeList(){
                this.$api.getTimeList().then(res => {
                    console.log(res)
                    // 格式化数组
                    if (res.length > 0) {
                        res.forEach(item => {
                            item.text = item.datename
                        })
                        this.tableForm.sign_time["content"] = res
                    }
                })
            },
            selectPicker(index) {
                let item = this.tableForm[index]
                this.pickerIndex = index
                this.currentInfo = item
                this.showPicker = true;
            },
            onConfirm(value){
                let {tableForm, pickerIndex} = this
                tableForm[pickerIndex].value =  value.datetime
                tableForm[pickerIndex].time = value.text
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
                let { tableForm } = this;
                if (tableForm.sign_time.value == '') {
                    this.$toast('请选择日期')
                    return;
                }
                let params = {}
                for (let key in tableForm){
                    params[key] = tableForm[key].value
                }
                this.$httpRequest.post('api/Hotel.Room/add', params, 'gameToken').then(() => {
                    this.$toast('添加成功')

                    setTimeout(() => {
                        this.$router.back()
                    }, 1000)

                })

            }
        }
    }
</script>

<style scoped lang="scss">
    .addHotel {
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
