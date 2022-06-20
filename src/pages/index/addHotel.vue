<template>
<div class="addHotel page">
    <Header title="添加住宿"></Header>
    <div class="scroll">
        <van-button round block plain type="info" size="small" @click="jumpPage(item.id)" v-for="(item,index) in hotelList" :key="index">{{item.title}}</van-button>
        <van-button round block type="info" size="small" @click="jumpPage()">添加住宿</van-button>
    </div>
</div>
</template>

<script>
    import Header from "@/components/header.vue"

    export default {
        name: "addHotel",
        components: {
            Header
        },
        data(){
            return {
                hotelList: [
                    {
                        title: '酒店1',
                        id: 1
                    },
                    {
                        title: '酒店2',
                        id: 1
                    }
                ]
            }
        },
        mounted() {

        },
        methods: {
            jumpPage(id=''){
                this.$router.push({
                    path: '/addHotelDetail',
                    query: {
                        id
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
.addHotel {
    .scroll {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0 40px;
        .van-button {
            margin-bottom: 20px;
        }
    }
}
</style>
