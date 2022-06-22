<template>
    <div class="addProjectInfo page">
        <Header title="新增参赛项目"></Header>
        <div class="scroll">
            <van-tabs v-model="tabIndex" type="card" animated @click="changeCurrentIndex">
                <van-tab v-for="(item,index) in tabList" :title="item" :key="index" :name="index">
                    <div v-if="index == 0">
                        <div class="table">
                            <div class="tr">
                                <div class="td">项目名称</div>
                                <div class="td">
                                    <div class="inputItem">
                                        <input type="text" v-model="projectName" placeholder="请填写">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else>
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
                                <p>1. 图片尺寸大小等于600*800像素</p>
                                <p>2. 图片中只有一个端正人脸</p>
                                <p>3. 图片中人脸部分占总面积30%以上, 单色无图文背景</p>
                                <p>4. 图片大小不小于100KB, 不大于400KB</p>
                                <p>5. 格式为jpg</p>
                            </div>
                        </div>
                    </div>
                </van-tab>
            </van-tabs>

        </div>
        <div class="footer">
            <van-button block native-type="submit" @click="submitBtn">保存</van-button>
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
        name: "addProjectInfo",
        components: {
            Header
        },
        data(){
            return {
                tabIndex: 0,
                tabList: ['项目','指导老师','项目负责人','项目成员'],
                /**
                 * tableForm
                 * type-  表单类型 text-文本框 select-选择框 phone-手机号 time-选择时间
                 * */
                tableForm: [
                    {
                        label: '姓名',
                        placeholder: '请输入姓名',
                        type: 'text',
                        defaultIndex: 0,
                        value: ''
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
                        label: '职位',
                        placeholder: '请输入备注',
                        type: 'text',
                        defaultIndex: 0,
                        value: '',
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
                ],


                pickerIndex: 0,
                showPicker: false,
                currentInfo: {},

                fileList: [],

                // 项目名称
                projectName: ''
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
            changeCurrentIndex(name){
                this.tabIndex = name
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
.addProjectInfo {

    .scroll {
        .van-tabs__wrap {
            margin: 12px 0;
        }
        .van-tabs__nav--card {
            border: none;
        }
        .van-tabs__nav {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .van-tab {
            width: 22%;
            border: 1px solid #d2d2d2;
            color: #333;
            line-height: 26px;
            font-size: 12px;
            flex: none;
            border-radius: 5px;
            &.van-tab--active {
                background: #87c785;
                color: #333;
            }
        }
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
            padding: 0 30px;
            margin-top: 10px;
            .addImg {
                width: 35%;
                .title {
                    font-size: 22px;
                    line-height: 50px;
                    margin-bottom: 10px;
                }
            }
            .imgInfo {
                width: 65%;
                p {
                    font-size: 22px;
                    margin: 0;
                    margin-top: 5px;
                    line-height: 40px;
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
