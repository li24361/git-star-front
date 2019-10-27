<template>
    <div>{{res}}</div>
</template>
<script>
    export default {
        data () {
            return {
                res: this.$route.query.result
            }
        },
        created() {
            // 这是element-ui中的组件
            const loading = this.$loading({
                lock: true,
                text: 'loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
            console.log(this.res)
            this.saveInfo()
            loading.close()
        },
        methods: {
            saveInfo () {
                let info = JSON.parse(this.res)
                // 跳转到登录前的页面或主页
                this.$router.push('/')
                // 记录用户
                this.$cookies.set("login",info.username)
            }
        }
    }
</script>
<style scoped>
</style>
