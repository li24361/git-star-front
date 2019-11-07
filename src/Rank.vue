<template>
    <el-table
            :data="tableData"
            v-loading="loading"
            height="800"
            stripe
            style="width: 100%">
        <el-table-column
                prop="rank"
                width="50">
        </el-table-column>
        <el-table-column
                width="60">
            <template slot-scope="scope">
                <el-avatar shape="square" :size="size" :src="scope.row.avatarUrl "></el-avatar>
            </template>
        </el-table-column>
        <el-table-column
                prop="login"
                label="用户"
                width="150">
        </el-table-column>
        <el-table-column
                prop="ownStar"
                label="stars"
                width="90">
        </el-table-column>
        <el-table-column
                prop="follower"
                label="follower"
                width="90">
        </el-table-column>
        <el-table-column
                prop="primaryLanguage"
                label="主语言"
                width="140">
        </el-table-column>
        <el-table-column
                prop="contributeYears"
                label="贡献年份"
                width="80">
        </el-table-column>
        <el-table-column
                prop="allScore"
                label="得分">
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                loading: true
            }
        },
        created: function () {
            this.axios
                .get('/search/list', {
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                .then(response => {
                    console.log(response.data.data)
                    this.tableData = response.data.data;
                })
                .catch(error => {
                    this.$notify({
                        title: '错误提示',
                        type: 'error',
                        message: 'server error!'
                    });
                })
                .finally(() => this.loading =false)
        }
    }
</script>

<style scoped>

</style>