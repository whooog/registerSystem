<template>
    <div class="child-section">
        <Header title="子页面"></Header>
    </div>
</template>

<script>
import Header from "../../components/header.vue";
export default {
    name:'',
    components: {
        Header
    },
    data() {
        return {

        }
    },
    methods: {
        handleTitleBack(){
            this.$router.back()
        }
    }
}
</script>
<style scoped lang="scss">

</style>
