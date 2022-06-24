<template>
    <div class="addProjectInfo page">
        <Header :title="title"></Header>
        <div class="scroll">
            <van-tabs v-model="tabIndex" type="card" animated @click="changeCurrentIndex">
                <van-tab v-for="(item,index) in tabList" :title="item" :key="index" :name="index">
                    <div v-if="index == 0">
                        <div class="table">
                            <div class="tr">
                                <div class="td">项目名称</div>
                                <div class="td">
                                    <div class="inputItem">
                                        <input type="text" v-model="project_name" placeholder="请填写">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div  v-for="(row, i) in tableForm"  :key="i">
                            <div class="table"  v-if="index == (i+1)">
                                <div v-for="(value,key) in row" :key="key+'a'">
                                    <div class="imgBox" v-if="value.type == 'uploader'">
                                        <div class="addImg">
                                            <div class="title">照片</div>
                                            <van-uploader v-model="value.fileList" multiple :max-count="1" />
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
                                    <div class="tr" v-else>
                                        <div class="td">{{value.label}}</div>
                                        <div class="td">
                                            <div class="inputItem" v-if="value.type == 'text'">
                                                <input type="text" v-model="value.value" :placeholder="value.placeholder">
                                            </div>
                                            <div class="inputItem" v-else-if="value.type == 'phone' || value.type == 'number'" >
                                                <input type="number" v-model="value.value" :placeholder="value.placeholder">
                                            </div>
                                            <div class="selectForm" v-else-if="value.type == 'select' || value.type == 'time'" @click="selectPicker(key)">{{value.value == '' ? value.placeholder : value.value}}  <van-icon name="arrow-down" /></div>
                                        </div>
                                    </div>
                                </div>
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
                // pageType 判断是否编辑还是添加
                pageType: 'add',
                title: '新增参赛项目',
                tabIndex: 0,
                tabList: ['项目','指导老师','项目负责人','项目成员'],
                /**
                 * tableForm
                 * type-  表单类型 text-文本框 select-选择框 phone-手机号 time-选择时间
                 * */
                tableForm: [],


                pickerIndex: 0,
                showPicker: false,
                currentInfo: {},

                fileList: [],

                // 项目名称
                project_name: '',
                // 项目id ,没有为0
                project_id: 0,
            }
        },
        mounted() {
            let {project_id, title, type} = this.$route.query
            if (type && type == 'edit') {
                this.project_id = project_id
                this.title = '编辑'+title+'项目'
                this.project_name = title
                this.pageType = type
            }
            this.initTable()


        },
        methods: {
            initTable(){
                this.tableForm = [
                    {
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

                        img: {
                            type: 'uploader',
                            value: '',
                            fileList: []
                        }
                    },
                    {
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
                        img: {
                            type: 'uploader',
                            value: '',
                            fileList: []
                        }
                    },
                    {
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
                        img: {
                            type: 'uploader',
                            value: '',
                            fileList: []
                        }
                    }
                ]

                if (this.pageType == 'edit') {
                    this.getPorjectDetail(1)
                    this.getPorjectDetail(2)
                    this.getPorjectDetail(3)
                }
            },

            // 获取项目人员信息
            getPorjectDetail(index){
                this.$httpRequest.post('api/Participant.Person/details', {
                    project_id: this.project_id,
                    position: this.getPositionType(index),
                },'gameToken').then((res) => {
                    let tableForm = [...this.tableForm]
                    let table = tableForm[index-1];

                    for (let key in table){
                        if (table[key].type == 'uploader' && res[key] != '') {
                            table[key].fileList = [{
                                    url: res[key]
                                }]
                            console.log(res[key])
                        }else {
                            table[key].value = res[key]

                        }
                    }
                    this.tableForm = tableForm

                }).catch(() => {

                })
            },
            selectPicker( key) {
                let { tabIndex } = this;
                let item = this.tableForm[tabIndex-1][key]
                this.pickerIndex = key
                this.currentInfo = item
                this.showPicker = true;
            },
            onConfirm(value, index){
                let { pickerIndex, tabIndex } = this;

                this.tableForm[tabIndex-1][pickerIndex].value = value;
                this.tableForm[tabIndex-1][pickerIndex].defaultIndex = index;
                this.showPicker = false;
                this.$forceUpdate()
            },
            changeCurrentIndex(name){
                this.tabIndex = name;
            },
            submitBtn(){
                let { tableForm, tabIndex } = this;

                if (tabIndex == 0) {
                    if (this.project_name.trim() == '') {
                        this.$toast('请输入项目名称')
                        return;
                    }
                    this.addProjectName()
                }else {
                    if (this.project_id == 0) {
                        this.$toast('请先添加项目')
                        return;
                    }
                    let item = tableForm[tabIndex-1];
                    this.bindProjectName(item)
                }

            },
            // 添加项目
            addProjectName(){
                this.$httpRequest.post('api/Participant.Project/add', {
                    project_id: this.project_id,
                    project_name: this.project_name
                },'gameToken').then((res) => {
                    this.project_id = res.project_id
                    this.$toast('提交成功')
                    setTimeout(() => {
                        this.tabIndex+=1;
                    }, 300)
                }).catch(() => {

                })
            },
            // 绑定项目信息
            async bindProjectName(table){
                let form = {};
                for (let key in table) {
                    if (table[key].type == 'uploader' && table[key].fileList.length > 0 && table[key].fileList[0].file) {
                        await this.$api.uploadImg({
                            file: table[key].fileList[0].file
                        }).then(res => {
                            form[key] = res
                        })
                    }else {
                        form[key] = table[key].value;
                    }
                }
                console.log(form)

                this.$httpRequest.post('api/Participant.Person/edit', {
                    project_id: this.project_id,
                    project_name: this.project_name,
                    position: this.getPositionType(this.tabIndex),
                    ...form
                },'gameToken').then(() => {
                    this.$toast('提交成功')
                    setTimeout(() => {
                        if (this.tabIndex == 3) {
                            this.$router.back();
                        }else {
                            this.tabIndex+=1;
                        }
                    }, 300)
                }).catch(() => {

                })
            },

            getPositionType(tabIndex){
                /**
                 * position
                 * 1 分管创业工作领导
                 * 2 大赛工作部门主要负责人
                 * 3 项目负责人
                 * 4 指导老师
                 * 5 项目成员
                 * */
                switch (Number(tabIndex)) {
                        case 1:
                            return 4;
                        case 2:
                            return 3;
                        case 3:
                            return 5;

                }
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
