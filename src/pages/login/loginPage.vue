<template>
    <div class="loginPage page">
        <Header :hasClose="false" :main-color="false"></Header>
        <div class="scroll">
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
                    name="picker"
                    :value="value"
                    label="类别"
                    placeholder="请选择"
                    @click="showPicker = true"
                    size="mini"
            />
            <van-field v-model="form.School" label="高校名称" placeholder="请规范填写学习全职" size="small"/>
            <div style="margin: 50px 5px 20px;">
                <van-button round block size="small" type="primary" native-type="submit" class="submitBtn" @click="handleInfo">注册</van-button>
                <van-button round block plain size="small" type="default" native-type="submit" class="submitBtn" @click="submitPage">登录</van-button>
            </div>
        </div>

        <van-popup v-model="showPicker" position="bottom">
            <van-picker
                    show-toolbar
                    :columns="columns"
                    @confirm="onConfirm"
                    @cancel="showPicker = false"
            />
        </van-popup>
    </div>
</template>

<script>
    import Header from "../../components/header.vue"

    export default {
    name:'',
    components: {
        Header
    },
    data() {
        return {
            phone: '',
            sms: '',

            columns: [
                {
                    text: '高校',
                    id: 1
                },
                {
                    text: '机构',
                    id: 2
                },
            ],
            value: '',
            showPicker: false,

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
                // 学校全称
                School: '',
                // 类别
                type: ''
            }
        };
    },
    mounted(){
        clearInterval(this.timer)

    },
    methods: {
        onConfirm(value) {
            this.value = value.text;
            this.form.type = value.text;
            this.showPicker = false;
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
                this.form.verify_id = res.key
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
            this.$router.replace({
                path:"/pioneerGame"
            })
        },
        submitPage(){
            let { phone } = this;
            if (!this.$common.checkPhone(phone)){
                this.$toast('请检查手机号是否正确');
                return;
            }
            this.form.mobile = phone
            this.form.phone = phone
            console.log(JSON.stringify(this.form))
            return;

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
            .inputBox {
                display: flex;
                align-items: center;
                border: 1px solid #fff;
                margin-top: 50px;
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
            .submitBtn {
                margin-top: 50px;
            }
        }
    }
</style>
