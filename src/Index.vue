<template>
    <div>
        <img src="https://i.loli.net/2019/11/05/4N1eiBL69gSzTMZ.png" style="margin-bottom: 20px;" width="300px"/>
        <template>
            <div>
                <el-button type="primary" :loading="loading" @click="login" icon="el-icon-user-solid">使用 Github 登录</el-button>
            </div>
            <div>
                <h1>为什么需要登录？</h1>
                该项目使用acccess_token访问github的api，每小时有次数限制,所以使用各位自己的token来查询
            </div>
        </template>
    </div>
</template>

<script>
    import {Loading} from 'element-ui';
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
            githublink() {
                return 'https://github.com/' + this.input
            }
        },
        methods: {
            login() {
                const loadingInstance = Loading.service({fullscreen: true});
                this.axios
                    .get('/login', {
                        headers: {
                            'Access-Control-Allow-Origin': '*'
                        }
                    })
                    .then(response => {
                        window.location = response.data;
                    })
                    .catch(error => {
                        this.$notify({
                            title: '错误提示',
                            type: 'error',
                            message: 'server error!'
                        });
                    })
                    .finally()
            },
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
