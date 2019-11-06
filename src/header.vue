<template>
    <el-row>
        <el-col :span="6">
            <img src="https://i.loli.net/2019/11/05/4hTfbd9nmHV1irA.png" style="width: 200px;float: left"/>
        </el-col>
        <el-col :span="18">
            <el-menu :default-active="$route.path" mode="horizontal" router>
                <template v-if="islogin">
                    <el-submenu index="" style="float: right;">
                        <template slot="title"><i class="el-icon-menu"> {{loginName}}</i></template>
                        <el-menu-item index=""><i class="el-icon-setting"></i> Settings</el-menu-item>
                        <el-menu-item index="" @click="logout"><i class="el-icon-circle-close"></i> Logout</el-menu-item>
                    </el-submenu>
                </template>
                <el-menu-item index="/rank" style="float: right;">排名</el-menu-item>
                <el-menu-item index="/" style="float: right;">主页</el-menu-item>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        data() {
            return {
                name: 'header',
                loginName: this.$cookies.get("login"),
            }
        },
        methods: {
            logout() {
                this.$cookies.remove("login")
                this.$router.go(0)
            },
        },
        computed: {
            islogin() {
                return this.$cookies.isKey("login")
            }
        }
    }
</script>

<style scoped>
    .el-menu--horizontal .el-submenu > .el-menu {
        left: initial !important;
        right: 0;
    }
</style>