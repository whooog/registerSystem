<template>
    <div class="entryInfo page">
        <Header title="洽谈信息录入"></Header>
        <div class="scroll">
            <div class="table">
                <div class="tr" v-for="(item,index) in tableForm" :key="index">
                    <div class="td">{{item.label}}</div>
                    <div class="td">
                        <div class="inputItem" v-if="item.type == 'text'">
                            <input type="text" v-model="item.value" :placeholder="item.placeholder">
                        </div>
                        <div class="inputItem" v-else-if="item.type == 'phone' || item.type == 'number'" >
                            <input type="number" v-model="item.value" :placeholder="item.placeholder">
                        </div>
                        <div class="selectForm" v-else-if="item.type == 'select' || item.type == 'time'" @click="selectPicker(index)">{{item.value == '' ? item.placeholder : item.value}}  <van-icon name="arrow-down" /></div>
                    </div>
                </div>
            </div>
            <div class="imgBox">
                <div class="addImg">
                    <div class="title">照片</div>
                    <van-uploader v-model="fileList" multiple :max-count="1" />

                </div>
                <div class="imgInfo">
                    <p>照片要求</p>
                    <p>1: 照片要求照片要求照片要求照片要求照片要求照片要求照片要求照片要求</p>
                    <p>2: 照片要求照片要求照片要求照片要求照片要求照片要求照片要求照片要求</p>
                </div>
            </div>
        </div>
        <div class="footer">
            <van-button block color="#15CD63" native-type="submit" @click="submitBtn">提交</van-button>
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
                    type="time"
                    title="选择时间"
                    @confirm="onConfirm"
                    :min-hour="10"
                    :max-hour="20"
            />
        </van-popup>


    </div>
</template>

<script>
    import Header from "@/components/header.vue"

    export default {
        name: "entryInfo",
        components: {
            Header
        },
        data(){
            return {
                /**
                 * tableForm
                 * type-  表单类型 text-文本框 select-选择框 phone-手机号 time-选择时间
                 * */
                tableForm: [
                    {
                        label: '投资机构单位名称',
                        placeholder: '请规范填写单位名称',
                        type: 'text',
                        defaultIndex: 0,
                        value: ''
                    },
                    {
                        label: '姓名',
                        placeholder: '请输入姓名',
                        type: 'text',
                        defaultIndex: 0,
                        value: ''
                    },
                    {
                        label: '部门及职位',
                        placeholder: '请输入部门职位',
                        type: 'text',
                        defaultIndex: 0,
                        value: ''
                    },
                    {
                        label: '性别',
                        placeholder: '请选择性别',
                        type: 'select',
                        defaultIndex: 0,
                        value: '',
                        content: [{
                            text: '男',
                            id: 1
                        },{
                            text: '女',
                            id: 2
                        }]
                    },
                    {
                        label: '手机号',
                        placeholder: '请输入手机号',
                        type: 'phone',
                        defaultIndex: 0,
                        value: ''
                    },
                    {
                        label: '身份证号、护照号',
                        placeholder: '请输入身份证号、护照号',
                        type: 'number',
                        defaultIndex: 0,
                        value: ''
                    },
                    {
                        label: '是否有粤康码绿码',
                        placeholder: '请选择是否有绿码',
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
                        label: '是否需要午餐',
                        placeholder: '请选择是否需要午餐',
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
                        label: '交通方式',
                        placeholder: '交通方式',
                        type: 'select',
                        defaultIndex: 0,
                        value: '',
                        content: [{
                            text: '自驾',
                            id: 1
                        },{
                            text: '公交',
                            id: 2
                        }]
                    },
                    {
                        label: '车牌号',
                        placeholder: '请输入车牌号',
                        type: 'number',
                        defaultIndex: 0,
                        value: '',
                    },
                    {
                        label: '抵达时间',
                        placeholder: '请选择抵达时间',
                        type: 'time',
                        defaultIndex: 0,
                        value: '',
                    },
                    {
                        label: '离开时间',
                        placeholder: '请选择离开时间',
                        type: 'time',
                        defaultIndex: 0,
                        value: '',
                    },
                    {
                        label: '备注',
                        placeholder: '请输入备注',
                        type: 'text',
                        defaultIndex: 0,
                        value: '',
                    },
                ],


                pickerIndex: 0,
                showPicker: false,
                currentInfo: {},

                fileList: []
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

                if (this.currentInfo.type == 'select') {
                    this.tableForm[pickerIndex].value = value.text;
                    this.tableForm[pickerIndex].defaultIndex = index;
                }else {
                    this.tableForm[pickerIndex].value = value
                }
                this.showPicker = false;
                this.$forceUpdate()
            },
            submitBtn(){
                let { tableForm, fileList } = this;
                for (let i = 0; i<tableForm.length; i++) {
                    if (tableForm[i].value == '') {
                        console.log(tableForm[i].placeholder)
                        this.$toast(tableForm[i].placeholder);
                        return;
                    }
                }
                if (fileList.length == 0) {
                    this.$toast('请上传照片');
                    return;
                }
                this.$router.back();
            }
        }
    }
</script>

<style lang="scss">
.entryInfo {
    /*修改header组件样式*/
    .header {
        background: #0035fc;
        .back i {
            color: #fff;
        }
        .title {
            color: #fff;
        }
    }
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
                        width: 34%;
                        border-right: 2px solid #d2d2d2;
                        .label {
                            font-size: 20px;
                        }
                    }
                    &:nth-child(2) {
                        width: 66%;
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
            }
        }
        .imgBox {
            width: 100%;
            display: flex;
            align-items: center;
            padding: 0 30px;
            margin-top: 10px;
            .addImg {
                width: 40%;
                .title {
                    font-size: 22px;
                    line-height: 80px;
                }
            }
            .imgInfo {
                width: 60%;
                p {
                    font-size: 22px;
                }
            }
        }
    }
    .footer {
        .van-button__text {
            color: #333;
        }
    }
}
</style>
