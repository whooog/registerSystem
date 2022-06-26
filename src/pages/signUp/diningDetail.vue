<template>
<div class="diningDetail page">
    <Header :hasClose="false"></Header>
    <div class="scroll">
        <div class="date">5月30日</div>
        <div class="table">
            <div class="tr" v-for="(value,key) in tableForm" :key="key">
                <div class="td">{{value.label}}</div>
                <div class="td">
                    <div class="stepperBox">
                        <div class="value">{{value.value}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div style="margin: 80px 30px 25px;">
            <van-button round block plain class="addNumber" size="small" @click="$router.back()">+ 添加用餐</van-button>
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
        name: "diningDetail",
        components: {
            Header
        },
        data(){
            return {

                tableForm: {
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
            }
        },
        mounted() {
        },
        methods: {
            submitBtn(){

            }
        }
    }
</script>

<style scoped lang="scss">
.diningDetail {
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
                    .value {
                        width: 120px;
                        height: 43px;
                        line-height: 43px;
                        border: 1px solid #ddd;
                        text-align: center;
                    }
                }
            }
        }
    }
    .addNumber {
        border: 6px solid #0035fc !important;
    }
    .footer {
        .van-button {
            background: #87c785;
        }
    }
}
</style>
