<template>
    <div class="entryInfo page">
        <Header :title="title"></Header>
        <div class="scroll">
            <div class="table">
                <div class="tr" v-for="(item,key) in tableForm" :key="key">
                    <div class="td">{{item.label}}</div>
                    <div class="td">
                        <template v-if="!is_add">
                            <div class="inputItem" v-if="item.type == 'text'">
                                <input type="text" v-model="item.value" :placeholder="item.placeholder">
                            </div>
                            <div class="inputItem" v-else-if="item.type == 'phone'" >
                                <input type="number" v-model="item.value" :placeholder="item.placeholder">
                            </div>
                            <div class="selectForm" v-else-if="item.type == 'select' || item.type == 'time'" @click="selectPicker(key)">{{item.value == '' ? item.placeholder : item.value}}  <van-icon name="arrow-down" /></div>

                        </template>
                        <template v-else>
                            <div class="inputItem">
                                <input type="text" v-model="item.value" readonly>
                            </div>
                        </template>

                    </div>
                </div>
            </div>
            <div class="imgBox">
                <div class="addImg">
                    <div class="title">照片</div>
                    <van-uploader v-model="fileList" multiple :max-count="1" :before-read="beforeRead" v-if="!is_add"/>
                    <div class="photoImg" v-else>
                        <img :src="photo" alt="">
                    </div>
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
        <div class="footer">
            <van-button block color="#15CD63" native-type="submit" @click="submitBtn" v-if="!is_add">提交</van-button>
            <van-button block color="#15CD63" native-type="submit" @click="back" v-else>首页</van-button>
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
                    type="datehour"
                    @confirm="onConfirm"
                    title="选择年月日小时"
                    :columns-order="[ 'year','month', 'day', 'hour']"
                    :formatter="formatTime"
                    :min-date="minDate"
                    :max-date="maxDate"
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
                title: '',
                /**
                 * tableForm
                 * type-  表单类型 text-文本框 select-选择框 phone-手机号 time-选择时间
                 * */
                tableForm: {
                    company_name: {
                        label: '投资机构单位名称',
                        placeholder: '请规范填写单位名称',
                        type: 'text',
                        defaultIndex: 0,
                        value: ''
                    },
                    name:{
                        label: '姓名',
                        placeholder: '请输入姓名',
                        type: 'text',
                        defaultIndex: 0,
                        value: ''
                    },
                    depart: {
                        label: '部门及职位',
                        placeholder: '请输入部门职位',
                        type: 'text',
                        defaultIndex: 0,
                        value: ''
                    },
                    sex: {
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
                    phone: {
                        label: '手机号',
                        placeholder: '请输入手机号',
                        type: 'phone',
                        defaultIndex: 0,
                        value: ''
                    },
                    id_card: {
                        label: '身份证号、护照号',
                        placeholder: '请输入身份证号、护照号',
                        type: 'text',
                        defaultIndex: 0,
                        value: ''
                    },
                    is_green:{
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
                    is_eat: {
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
                    traffic: {
                        label: '交通方式',
                        placeholder: '交通方式',
                        type: 'select',
                        defaultIndex: 0,
                        value: '',
                        content: [{
                            text: '自驾',
                            id: 1
                            },{
                                text: '交通',
                                id: 2
                            }]
                    },
                    car_num: {
                        label: '车牌号',
                            placeholder: '请输入车牌号',
                        type: 'text',
                        defaultIndex: 0,
                        value: '',
                    },
                    arrive_time:{
                        label: '抵达时间',
                        placeholder: '请选择抵达时间',
                        type: 'time',
                        defaultIndex: 0,
                        value: '',
                    },
                    leave_time: {
                        label: '离开时间',
                        placeholder: '请选择离开时间',
                        type: 'time',
                        defaultIndex: 0,
                        value: '',
                    },
                    remark:{
                        label: '备注',
                        placeholder: '请输入备注',
                        type: 'text',
                        defaultIndex: 0,
                        value: '',
                    },
                },

                is_add: 1,

                pickerIndex: 0,
                showPicker: false,
                currentInfo: {},

                minDate: '',
                maxDate: '',

                fileList: [],
                photo: ''
            }
        },
        mounted() {
            this.minDate = new Date(this.$common.getNowTimeStamp(false))
            this.maxDate = new Date(new Date().getFullYear()+1, 11, 1)
            this.getDetail();
        },
        methods: {
            getDetail(){
                this.$httpRequest.post('api/Participant.Company/detail', {}, 'signUpToken').then(res => {
                    /**
                     * is_add 0-未提交 1-已提交
                     * */
                    let response = res.data;
                    this.is_add = response.is_add == 1 ? true : false
                    if (response.is_add == 1) {
                        this.title = '洽谈信息录入详情'
                        let { tableForm } = this;
                        for (let key in tableForm) {
                            if (key == 'arrive_time') {
                                tableForm[key].value = response.arrive_time_text
                            }else if (key == 'leave_time'){
                                tableForm[key].value = response.leave_time_text
                            }else {
                                tableForm[key].value = response[key]
                            }
                        }
                        this.photo = response.photo
                    }else {
                        this.title = '洽谈信息录入'
                    }
                }).catch(() => {
                })
            },
            selectPicker(index) {
                let item = this.tableForm[index]
                this.pickerIndex = index
                this.currentInfo = item
                this.showPicker = true;
            },
            beforeRead(file) {
                console.log(file)
                // if (file.type !== 'image/jpeg') {
                //     this.$toast('请上传 jpg 格式图片');
                //     return false;
                // }
                return true;
            },
            onConfirm(value, index){
                let { pickerIndex } = this;
                if (this.currentInfo.type == 'select') {
                    this.tableForm[pickerIndex].value = value.text;
                    this.tableForm[pickerIndex].defaultIndex = index;
                }else {
                    this.tableForm[pickerIndex].value = value
                    this.tableForm[pickerIndex].value = `${value.getMonth() + 1}月${value.getDate()}日${value.getHours()}点`;
                    this.tableForm[pickerIndex].date = value.valueOf().toString();
                }
                this.showPicker = false;
                this.$forceUpdate()
            },
            formatTime(type, val) {
                if (type === 'year') {
                    return val + '年';
                }else if (type === 'month') {
                    return val + '月';
                }else if (type === 'day') {
                    return val + '日';
                }else if (type === 'hour') {
                    return val + '点';
                }
                return val;
            },
            back(){
                this.$router.back()
            },
            async submitBtn(){
                let { tableForm, fileList } = this;
                for (let i = 0; i<tableForm.length; i++) {
                    if (tableForm[i].value == '') {
                        this.$toast(tableForm[i].placeholder);
                        return;
                    }
                }
                if (fileList.length == 0) {
                    this.$toast('请上传照片');
                    return;
                }


                let form = {}
                await this.$api.uploadImg({
                    file: fileList[0].file
                }).then(res => {
                    form.photo = res
                })
                for (let key in tableForm) {
                    if (tableForm[key].type == 'time') {
                        form[key] = tableForm[key].date
                    }else {
                        form[key] = tableForm[key].value
                    }
                }
                this.$httpRequest.post('api/Participant.Company/edit', form, "signUpToken").then(() => {
                    this.$toast('提交成功')
                    setTimeout(() => {
                        this.$router.back();
                    }, 500)
                }).catch(() => {

                })

            }
        }
    }
</script>

<style lang="scss">
.entryInfo {
    .scroll {
        padding-bottom: 40px;
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
                .photoImg , .photoImg img{
                    width: 80%;
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
        .van-button__text {
            color: #333;
        }
    }
}
</style>
