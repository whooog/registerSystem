<template>
    <div class="newsList">
        <Header :showBg="false">
            <div>赛事咨询</div>
        </Header>
        <div class="scroll">
            <div class="subTitle"></div>
            <div class="newList">
                <div class="newItem">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "../../components/header.vue"

    export default {
        name: "newsList",
        components: {
            Header
        },
        data(){
            return {

            }
        },
        mounted() {
        },
        methods: {

        }
    }
</script>

<style scoped lang="scss">
.newsList {
    .scroll {
        .subTitle {
            height: 80px;
            line-height: 80px;
            padding: 0 30px;
            font-size: 26px;
            font-weight: bold;
        }
    }
}
</style>