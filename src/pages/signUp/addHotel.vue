<template>
<div class="addHotel page">
    <Header title="添加住宿" colorStyle="blueStyle"></Header>
    <div class="scroll">
        <van-button round block class="btn1" size="small" @click="toHotelDetail(item.userhotel_id, item.hotel_name)" v-for="(item,index) in hotelList" :key="index">{{item.hotel_name}}</van-button>
        <van-button round block class="btn2" size="small" @click="addHotelDetail()">+ 添加住宿</van-button>
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
                hotelList: []
            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            getList(){
                this.$httpRequest.post('api/Participant.Userhotel/index', {}, 'gameToken').then(res => {
                    if (res.data.length>0){
                       this.hotelList = res.data;
                    }
                })
            },
            addHotelDetail(){
                this.$router.push({
                    path: '/addHotelDetail'
                })
            },
            toHotelDetail(id='', name){
                this.$router.push({
                    path: '/hotelDetail',
                    query: {
                        userhotel_id: id,
                        hotel_name: name
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
.addHotel {
    .scroll {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0 40px;
        .btn1 {
            background: #0035fc;
            color: #fff;
        }
        .btn2 {
            border: 6px solid #0035fc !important;
        }
        .van-button {
            margin-bottom: 20px;
        }
    }
}
</style>
