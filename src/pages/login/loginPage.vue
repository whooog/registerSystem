<template>
    <div class="loginPage page">
        <Header :hasClose="false" :main-color="false" title="大学生创新创业大赛注册"></Header>
        <div class="scroll">
            <div class="inputBox">
                <div class="input">
                    <input type="text" v-model="form.name" placeholder="请输入姓名">
                </div>
                <div class="label">姓名</div>
            </div>
            <div class="inputBox">
                <div class="input">
                    <input type="text" v-model="form.position" placeholder="请输入职位">
                </div>
                <div class="label">职位</div>
            </div>
            <div class="inputBox">
                <div class="input">
                    <input type="text" v-model="phone" placeholder="请输入手机号">
                </div>
                <div class="label">手机号码</div>
            </div>
            <div class="inputBox">
                <div class="input">
                    <input type="text" v-model="form.verify" placeholder="请输入短信验证码">
                </div>
                <div class="label">
                    <van-button size="mini" :disabled="disStatus" type="primary" @click="sendSmsCode">{{smsText}}</van-button>
                </div>
            </div>

            <van-field
                    readonly
                    clickable
                    label="类别"
                    placeholder="参赛高校"
                    size="mini"
            />
            <div class="schoolBox">
                <div class="inputBox2">
                    <div class="label">高校名称</div>
                    <div class="input">
                        <input type="text" placeholder="请规范填写学校全称" @focus="searchList" @input="searchList" v-model="school">
                    </div>
                </div>
                <ul class="schollList" v-if="schoolList.length>0 && schoolStatus">
                    <li v-for="(item,index) in schoolList" :class="{'active': form.school_id === item.school_id}" :key="index" @click="selectSchool(item)">
                        {{item.name}}
                        <van-icon name="success" v-if="form.school_id === item.school_id" color="#ee0a24"/>
                    </li>
                </ul>
            </div>
            <div style="margin: 50px 5px 20px;">
                <van-button round block size="small" type="primary" native-type="submit" class="submitBtn" @click="submitPage">注册</van-button>
                <van-button round block plain size="small" type="default" native-type="submit" class="submitBtn" @click="submitPage">登录</van-button>
            </div>
        </div>

    </div>
</template>

<script>
    import Header from "../../components/header.vue"
    import localStorage from "../../utils/localStorage"

    import {_debounce} from '@/utils/common'
    export default {
    name:'',
    components: {
        Header
    },
    data() {
        return {
            phone: '',
            sms: '',

            disStatus: false,
            smsText: '发送验证码',
            timer: '',
            form: {
                // 短信验证手机号
                mobile: '',
                // 短信验证ID（发送短信的接口返回的key值）
                verify_id: '',
                // 短信验证码
                verify: '',
                // 手机号
                phone: '',
                // 学校id:
                school_id: '',
                // 类别
                type: 1,
                // 职位
                position: '',
                // 姓名
                name: ''
            },
            // 学校名字
            school: '',
            schoolList: [],

            schoolStatus: false
        };
    },
    mounted(){
        clearInterval(this.timer)
    },
    methods: {
        searchList: _debounce(function () {
            this.schoolStatus = true;
            this.getScrollList()
        }, 700),
        selectSchool(value){
            this.form.school_id = value.school_id
            this.school = value.name;
            setTimeout(() => {
                this.schoolStatus = false;
            }, 700)
        },
        getScrollList(){
            this.form.school_id = ''
            this.$httpRequest.post('api/School/index', {
                name: this.school
            }).then(res => {
                let list = res.data;
                list.forEach(item => {
                    item.text = item.name
                })
                this.schoolList = list;
            })
        },
        // 发送短信
        sendSmsCode(){
            let { phone } = this
            if (!this.$common.checkPhone(phone)){
                this.$toast('请检查手机号是否正确');
                return;
            }
            this.disStatus = true;
            this.$httpRequest.post('api/Member/sendSms', {
                mobile: phone
            }).then((res) => {
                this.form.verify_id = res.data.key
                let sec = 60;
                this.smsText =  sec + 's)重新获取';
                clearInterval(this.timer)
                this.timer = setInterval(() => {
                    sec--;
                    this.smsText = sec + 's)重新获取';
                    if(sec === 0) {
                        this.smsText = '发送验证码';
                        clearInterval(this.timer);
                        this.disStatus = false;
                    }
                }, 1000);

            }).catch(() => {
                this.disStatus = false;
            })
        },
        handleInfo(){

        },
        submitPage(){
            let { phone, form } = this;
            if (form.name == ''){
                this.$toast("请输入姓名");
                return;
            }
            if (form.position == ''){
                this.$toast("请输入职位");
                return;
            }
            if (!this.$common.checkPhone(phone)){
                this.$toast('请检查手机号是否正确');
                return;
            }
            if (form.verify == ''){
                this.$toast("请输入验证码");
                return;
            }
            if (form.school_id == ''){
                this.$toast("请输入高校名称");
                return;
            }
            form.mobile = phone;
            form.phone = phone;
            console.log(form)
            this.$httpRequest.post('/api/Member/login', {
                ...form
            }).then(res => {
                localStorage.set('gameToken', res.data.token)
                this.$router.replace({
                    path:"/pioneerGame",
                    query: this.$route.query
                })
            })

        }
    }
}
</script>
<style lang="scss">
    @import "../../assets/style/variable.scss";
    .loginPage{
        .scroll {
            background: #0035fc;
            padding: 40px 30px 20px;
            .van-cell {
                margin-top: 20px;
                padding: 3px 16px;
                border-radius: 0;
            }

            .van-field__control {
                text-align: right;
                &::placeholder {
                    color: #000;
                }
            }
            .inputBox {
                display: flex;
                align-items: center;
                border: 1px solid #fff;
                margin-top: 40px;
                .input {
                    width: 75%;
                    height: 55px;
                    display: flex;
                    align-items: center;
                    border-right: 1px solid #000;

                    input {
                        background: transparent;
                        width: 100%;
                        height: 100%;
                        border: none;
                        outline: none;
                        color: #fff;
                        padding: 0 20px;
                        text-align: center;
                    }
                    input::placeholder {
                        color: #fff;
                    }
                }
                .label {
                    width: 25%;
                    height: 55px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #fff;
                    .van-button {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .inputBox2 {
                display: flex;
                align-items: center;
                border: 1px solid #fff;
                /*box-shadow: 0 6px 16px #ddd;*/

                margin-top: 30px;
                background: #fff;

                .input {
                    width: 75%;
                    height: 55px;
                    display: flex;
                    align-items: center;
                    input {
                        width: 100%;
                        height: 100%;
                        border: none;
                        outline: none;
                        color: #000;
                        padding: 0 20px;
                        text-align: right;
                        font-size: 26px;
                    }
                    input::placeholder {
                        color: #646566;
                    }
                }
                .label {
                    width: 25%;
                    height: 55px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #646566;
                    font-size: 26px;
                    .van-button {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .schoolBox {
                position: relative;
                background: #fff;
                .schollList {
                    background: #fff;
                    box-shadow: 2px 6px 18px #000;
                    position: relative;
                    z-index: 1;
                    margin-top: 5px;
                    li {
                        height: 65px;
                        line-height: 65px;
                        font-size: 26px;
                        padding: 0 30px;
                        border-bottom: 1px solid #000;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        &.active {
                            color: #ee0a24;
                        }
                    }
                }
            }
            .submitBtn {
                margin-top: 50px;
            }
        }
    }
</style>
