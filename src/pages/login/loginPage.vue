<template>
    <div class="loginPage page">
        <Header :hasClose="false" title="登录/注册"></Header>
        <div class="scroll">
            <van-field v-model="phone" type="tel" label="手机号" placeholder="请输入手机号" />
            <van-field
                    v-model="sms"
                    center
                    clearable
                    label="短信验证码"
                    placeholder="请输入短信验证码"
            >
                <template #button>
                    <van-button size="small" type="primary">发送验证码</van-button>
                </template>
            </van-field>
            <van-field
                    readonly
                    clickable
                    name="picker"
                    :value="value"
                    label="选择器"
                    placeholder="点击选择参赛高校"
                    @click="showPicker = true"
            />
            <van-field v-model="text" label="文本" placeholder="请规范填写学习全职"/>
            <div style="margin: 20px 25px;">
                <van-button round block type="info" native-type="submit" class="submitBtn" @click="handleInfo">注册</van-button>
                <van-button round block plain type="info" native-type="submit" class="submitBtn">登录</van-button>
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

            columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
            value: '',
            showPicker: false,
        };
    },
    activated(){

    },
    methods: {
        onConfirm(value) {
            this.value = value;
            this.showPicker = false;
        },
        handleInfo(){
            this.$router.replace({
                path:"/entryInfo"
            })
        }
    }
}
</script>
<style lang="scss">
    @import "../../assets/style/variable.scss";
    .loginPage{
        .scroll {
            background: #f7f8fa;
            padding: 40px 20px 20px;
            .van-cell {
                margin-bottom: 20px;
            }
            .submitBtn {
                margin-top: 50px;
            }
        }
    }
</style>
