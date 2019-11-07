<template>
    <div>{{res}}</div>
</template>
<script>
    import { Loading } from 'element-ui';
    export default {
        data () {
            return {
                res: this.$route.query.result
            }
        },
        created() {
            this.saveInfo()
            // 跳转到登录前的页面或主页
            this.$router.push('/query')
            let loadingInstance = Loading.service({ fullscreen: true })
            loadingInstance.close()
        },
        methods: {
            saveInfo () {
                let info = JSON.parse(this.res)
                // 记录用户
                this.$cookies.set("login",info.username)
            }
        }
    }
</script>
<style scoped>
</style>
