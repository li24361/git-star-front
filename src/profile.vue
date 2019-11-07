<template>
    <div>
        <img src="https://i.loli.net/2019/11/05/4N1eiBL69gSzTMZ.png" style="margin-bottom: 20px;" width="300px"/>
        <template>
            <div>
                <el-row type="flex" justify="center">
                    <el-col :span="3" align="right" :offset="9">
                        <el-input v-model="input" placeholder="input your login"></el-input>
                    </el-col>
                    <el-col :span="11" align="left" :offset="1">
                        <el-button type="primary" :loading="loading" @click="query" icon="el-icon-search">查询</el-button>
                    </el-col>
                </el-row>
            </div>
        </template>
        <template v-if="this.showResult">
            <el-container>
                <el-aside width="400px" align="center">
                    <el-card class="box-card">
                        <el-row>
                            <el-col>
                                <div class="block">
                                    <el-avatar shape="square" :size="150" :src="userIndex.avatarUrl" @error="errorHandler">
                                        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                                    </el-avatar>
                                </div>
                                <div class="block">
                                    <el-link :href="githublink" :underline="false" target="_blank"><h2>{{userIndex.login}}</h2></el-link>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="10" align="right"><i class="el-icon-potato-strips"/> Join Date</el-col>
                            <el-col :span="13" align="left" :offset="1">{{userIndex.createdAt}}</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="10" align="right"><i class="el-icon-cpu"/> Top Repo</el-col>
                            <el-col :span="13" align="left" :offset="1">{{userIndex.topRepository}}</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="10" align="right"><i class="el-icon-s-custom"/> Followers</el-col>
                            <el-col :span="13" align="left" :offset="1">{{userIndex.followers}}</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="10" align="right"><i class="el-icon-star-on"/> Get Stars</el-col>
                            <el-col :span="13" align="left" :offset="1">{{userIndex.ownStars}}</el-col>
                        </el-row>
                    </el-card>
                </el-aside>
                <el-container>
                    <el-header height="20px">
                        <el-row type="flex" justify="center">
                            <el-col align="right"><h2><i class="el-icon-medal"></i>ladder score</h2></el-col>
                            <el-col :offset="1" align="left"><h2>{{userIndex.score}}</h2></el-col>
                        </el-row>
                    </el-header>
                    <el-main>
                        <template>
                            <ve-radar-chart :data="chartData" :legend="legend" :settings="setting"/>
                        </template>

                    </el-main>
                </el-container>
            </el-container>
        </template>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                input: this.$cookies.get("login"),
                legend: {show: false},
                loginName: this.$cookies.get("login"),
                showResult: false,
                userIndex: {},
                setting: {
                    itemStyle: {
                        normal: {
                            areaStyle: {
                                type: 'default'
                            }
                        }
                    }
                },
                chartData: {
                    dimensions: [
                        {name: '星星', max: 100},
                        {name: '粉丝', max: 100},
                        {name: '代码影响', max: 100},
                        {name: '其他项目', max: 100},
                        {name: '活跃度', max: 100}
                    ],
                    measures: []
                }
            };
        },
        computed: {
            measures: function () {
                return this.chartData.measures.push({
                    name: '明细',
                    data: [
                        this.userIndex.allStarsScore,
                        this.userIndex.followerScore,
                        this.userIndex.repositoryHIndexScore,
                        this.userIndex.contributeRepositoryHIndexScore,
                        this.userIndex.contributesScore
                    ]
                });
            },
            islogin() {
                // return true
                return this.$cookies.isKey("login")
            },
            githublink() {
                return 'https://github.com/' + this.input
            }
        },
        methods: {
            query() {
                if (!this.input) {
                    this.$notify({
                        title: '错误提示',
                        type: 'error',
                        message: 'Please input your login'
                    });
                    return true;
                }
                const loadingInstance = Loading.service({fullscreen: true});
                this.axios
                    .post('/search', {
                            login: this.input,
                            userName: this.$cookies.get("login")
                            // userName: "li24361"
                        },
                        {
                            headers: {
                                'Access-Control-Allow-Origin': '*'
                            }
                        })
                    .then(response => {
                        if (response.data.code == 0) {
                            this.userIndex.avatarUrl = response.data.data.avatarUrl;
                            this.userIndex.contributeYears = response.data.data.contributeYears;
                            this.userIndex.createdAt = response.data.data.createdAt;
                            this.userIndex.followers = response.data.data.followers;
                            this.userIndex.login = response.data.data.login;
                            this.userIndex.ownStars = response.data.data.ownStars;
                            this.userIndex.primaryLanguage = response.data.data.primaryLanguage;
                            this.userIndex.score = response.data.data.score;
                            this.userIndex.topRepository = response.data.data.topRepository;

                            this.chartData.measures.splice(0, 1,
                                {
                                    name: '明细分',
                                    data: [
                                        response.data.data.allStarsScore,
                                        response.data.data.followerScore,
                                        response.data.data.repositoryHIndexScore,
                                        response.data.data.contributeRepositoryHIndexScore,
                                        response.data.data.contributesScore
                                    ]
                                }
                            );
                            this.userIndex.allStarsScore = response.data.data.allStarsScore;
                            this.userIndex.followerScore = response.data.data.followerScore;
                            this.userIndex.repositoryHIndexScore = response.data.data.repositoryHIndexScore;
                            this.userIndex.contributeRepositoryHIndexScore = response.data.data.contributeRepositoryHIndexScore;
                            this.userIndex.contributesScore = response.data.data.contributesScore;
                            this.showResult = true
                        } else {
                            console.log(response)
                            this.$notify({
                                title: '错误提示',
                                type: 'error',
                                message: response.data.errorMsg
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        this.$notify({
                            title: '报错',
                            type: 'error',
                            message: error,
                        });
                    })
                    .finally(() => loadingInstance.close())
            },
            errorHandler() {
                return true
            }
        }
    }
</script>

<style>
    #app {
        font-family: Helvetica, sans-serif;
        text-align: center;
    }

    .el-aside .el-row {
        margin-bottom: 20px;
    }

    .el-col {
        border-radius: 4px;
    }

</style>
