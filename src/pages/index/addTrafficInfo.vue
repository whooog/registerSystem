<template>
    <div class="addTrafficInfo page">
        <Header title="交通"></Header>
        <div class="scroll">
            <div class="table">
                <div class="tr" v-for="(item,index) in tableForm" :key="index">
                    <div class="td">{{item.label}}</div>
                    <div class="td">
                        <div class="selectForm" @click="selectPicker(index)">{{item.value == '' ? item.placeholder : item.value}}  <van-icon name="arrow-down" /></div>
                    </div>
                </div>

                <div class="tr tr2" v-for="(item,index) in carNumberList" :key="index+'a'">
                    <div class="td">车牌号码 {{index > 0 ? index+1 : ''}}</div>
                    <div class="td">
                        <div class="inputItem">
                            <input type="text" v-model="item.value" placeholder="请填写">
                        </div>
                    </div>
                </div>
                <div style="margin: 80px 30px 25px;">
                    <van-button round block plain type="info" size="small" @click="addCarNumber">+ 新增车牌号码</van-button>
                </div>
            </div>
        </div>
        <div class="footer">
            <van-button round block type="primary" native-type="submit" @click="submitBtn">提交</van-button>
        </div>
        <van-popup v-model="showPicker" position="bottom">
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
        name: "addTrafficInfo",
        components: {
            Header
        },
        data(){
            return {
                tableForm: [
                    {
                        label: '是否需要大巴接送(酒店与赛场间)',
                        placeholder: '请选择',
                        type: 'select',
                        defaultIndex: 0,
                        value: '',
                        content: [{
                            text: '是',
                            id: 1
                        },{
                            text: '否',
                            id: 0
                        }]
                    },
                    {
                        label: '是否有自驾车辆',
                        placeholder: '请选择',
                        type: 'select',
                        defaultIndex: 0,
                        value: '',
                        content: [{
                            text: '是',
                            id: 1
                        },{
                            text: '否',
                            id: 0
                        }]
                    },
                ],
                carNumberList: [
                    {
                        value: ''
                    }
                ],
                pickerIndex: 0,
                showPicker: false,
                currentInfo: {},
            }
        },
        mounted() {
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
                this.tableForm[pickerIndex].value = value.text;
                this.tableForm[pickerIndex].defaultIndex = index;
                this.showPicker = false;
                this.$forceUpdate()
            },
            addCarNumber(){
                this.carNumberList.push({
                    value: ''
                })
            },
            submitBtn(){
                let { tableForm, carNumberList } = this;
                for (let i = 0; i<tableForm.length; i++) {
                    if (tableForm[i].value == '') {
                        this.$toast(tableForm[i].placeholder+tableForm[i].label);
                        return;
                    }
                }
                let index = 0
                carNumberList.forEach(item => {
                    if (item.value.trim() !== ''){
                        ++index;
                    }
                })
                if (index == 0) {
                    this.$toast('请输入车牌号码')
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .addTrafficInfo {
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

        }
        .footer {
            padding: 30px 25px;
        }
    }
</style>
