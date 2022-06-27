<template>
<div class="dining page">
    <Header title=""></Header>
    <div class="scroll">
        <div class="iconBox">
            <div class="iconItem" @click="tableStatus = true">校内用餐</div>
            <div class="iconItem" @click="jumpPage()">校外用餐</div>
        </div>

        <div class="table" v-if="tableStatus">
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
    <div class="footer" v-if="tableStatus">
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
        name: "dining",
        components: {
            Header
        },
        data(){
            return {
                tableStatus: false,
                showPicker: false,

                tableForm: {
                    time: {
                        label: '请选择日期',
                        placeholder: '请选择',
                        type: 'time',
                        value: '',
                        content: []
                    },
                    breakfast: {
                        label: '早餐',
                        placeholder: '请选择',
                        type: 'stepper',
                        value: 0,
                    },
                    lunch: {
                        label: '中餐',
                        placeholder: '请选择',
                        type: 'stepper',
                        value: 0,
                    },
                    dinner: {
                        label: '晚餐',
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

            this.getJumpLink();
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
                        this.tableForm.time["content"] = res
                    }
                })
            },
            getJumpLink(){
                this.$httpRequest.post('api/Dining/url', {}, 'gameToken').then(res => {
                    this.link = res.data.url;

                })
            },
            jumpPage(){
                if (this.link.length > 0) {
                    window.location = this.link
                }
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
                if (tableForm.time.value == '') {
                    this.$toast('请选择日期')
                    return;
                }
                let params = {}
                for (let key in tableForm){
                    params[key] = tableForm[key].value
                }
                this.$httpRequest.post('api/Dining/add', params, 'gameToken').then(() => {
                    this.$toast('添加成功')

                    setTimeout(() => {
                        this.$router.push({
                            path: '/diningDetail'
                        })
                    }, 1000)

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
