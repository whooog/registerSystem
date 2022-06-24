<template>
    <div class="addLeaderInfo page">
        <Header :title="title"></Header>
        <div class="scroll">
            <div class="table">
                <div class="tr" v-for="(item,key) in tableForm" :key="key">
                    <div class="td">{{item.label}}</div>
                    <div class="td">
                        <div class="inputItem" v-if="item.type == 'text'">
                            <input type="text" v-model="item.value" :placeholder="item.placeholder">
                        </div>
                        <div class="inputItem" v-else-if="item.type == 'phone' || item.type == 'number'" >
                            <input type="number" v-model="item.value" :placeholder="item.placeholder">
                        </div>
                        <div class="selectForm" v-else-if="item.type == 'select' || item.type == 'time'" @click="selectPicker(key)">{{item.value == '' ? item.placeholder : item.value}}  <van-icon name="arrow-down" /></div>
                    </div>
                </div>
            </div>
            <div class="imgBox">
                <div class="addImg">
                    <div class="title">照片</div>
                    <van-uploader v-model="fileList" multiple :max-count="1" :before-read="beforeRead"/>
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
            <van-button block native-type="submit" @click="submitBtn">提交</van-button>
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
        name: "addLeaderInfo",
        components: {
            Header
        },
        data(){
            return {
                title: '',

                // leader-分管创业工作校领导 principal-大赛工作部门主要负责人
                type: 'leader',
                /**
                 * tableForm
                 * type-  表单类型 text-文本框 select-选择框 phone-手机号 time-选择时间
                 * */
                tableForm: {
                    name:{
                        label: '姓名',
                        placeholder: '请输入姓名',
                        type: 'text',
                        defaultIndex: 0,
                        value: ''
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
                    role: {
                        label: '职位',
                        placeholder: '请输入职位',
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
                        content: ['男', '女']
                    },
                },


                pickerIndex: 0,
                showPicker: false,
                currentInfo: {},

                fileList: [],
                imgSrc: ''
            }
        },
        mounted() {
            let {title, type} = this.$route.query;
            this.title = title
            this.type = type;
            this.getPorjectDetail();

        },
        methods: {

            // 获取项目人员信息
            getPorjectDetail(){
                this.$httpRequest.post('api/Participant.Person/details', {
                    position: this.type == 'leader'? 1 : 2,
                },'gameToken').then((res) => {
                    let {tableForm} = this;

                    for (let key in tableForm){
                        tableForm[key].value = res[key]
                    }

                    if (res.img != '') {
                        this.fileList = [{
                            url: res.img
                        }]
                    }

                    console.log(tableForm)

                }).catch(() => {

                })
            },
            selectPicker(index) {
                let item = this.tableForm[index]
                this.pickerIndex = index
                this.currentInfo = item
                this.showPicker = true;
            },
            onConfirm(value, index){
                let { pickerIndex } = this;

                this.tableForm[pickerIndex].value = value;
                this.tableForm[pickerIndex].defaultIndex = index;
                this.showPicker = false;
                this.$forceUpdate()
            },
            // 限制图片大小
            filterImgSize(){
                this.$toast("图片大小不能超过400KB")
            },
            beforeRead(file) {
                console.log(file)
                // if (file.type !== 'image/jpeg') {
                //     this.$toast('请上传 jpg 格式图片');
                //     return false;
                // }
                return true;
            },
            async submitBtn(){
                let { tableForm, fileList } = this;
                // for (let i = 0; i<tableForm.length; i++) {
                //     if (tableForm[i].value == '') {
                //         this.$toast(tableForm[i].placeholder);
                //         return;
                //     }
                // }
                // if (fileList.length == 0) {
                //     this.$toast('请上传照片');
                //     return;
                // }
                if (fileList.length > 0 && fileList[0].file) {
                    await this.$api.uploadImg({
                        file: fileList[0].file
                    }).then(res => {
                        this.imgSrc = res
                    })
                }

                let form = {};
                for (let key in tableForm) {
                    form[key] = tableForm[key].value;
                }
                /**
                 * 1 分管创业工作领导 2大赛工作部门主要负责人
                 * 3项目负责人 4 指导老师 5 项目成员
                 * */

                this.$httpRequest.post('api/Participant.Person/edit', {
                    position: this.type == 'leader'? 1 : 2,
                    ...form,
                    img: this.imgSrc
                },'gameToken').then(() => {
                    this.$toast('提交成功')
                    setTimeout(() => {
                        this.$router.back();
                    }, 1000)
                }).catch(() => {

                })
            }
        }
    }
</script>

<style lang="scss">
.addLeaderInfo {
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
            background: #15CD63;
        }
    }
}
</style>
