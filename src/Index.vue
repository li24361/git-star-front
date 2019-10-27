<template>
    <el-container>
      <el-header>
        <el-row >
          <el-col align="right" v-if="islogin">
            <el-menu class="el-menu-demo" mode="horizontal" router>
              <el-submenu index="" >
                <template slot="title" >{{loginName}}</template>
                <el-menu-item index="" @click="logout">登出</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-header>
      <el-main style="height: 850px">
        <div id="app">
          <template v-if="!islogin ">
            <img src="https://i.loli.net/2019/10/26/2c83rMLYOZtXI4V.png" style="margin-bottom: 20px" />
            <div>
              <el-button type="primary" :loading="loading" @click="login" icon="el-icon-user-solid">Sign in with Github</el-button>
            </div>
            <div>
              <h1>为什么需要登录？</h1>
              该项目使用acccesstoken访问github的api，有次数限制

            </div>
          </template>
          <template v-else-if="islogin">
            <div>
              <img src="https://i.loli.net/2019/10/26/2c83rMLYOZtXI4V.png" style="margin-bottom: 20px" />
              <el-row  type="flex" justify="center">
                <el-col :span="3" align="right" :offset="9"><el-input v-model="input"  placeholder="input your login" ></el-input></el-col>
                <el-col :span="11" align="left" :offset="1"><el-button type="primary" :loading="loading"  @click="query" icon="el-icon-user-solid">Query By login</el-button></el-col>
              </el-row>
            </div>
          </template>
          <template v-if="!!this.userIndex.login">
            <el-container>
              <el-aside width="45%" align="center">
                <el-card class="box-card">
                <el-row>
                  <el-col>
                    <div class="block"><el-avatar shape="square" :size="130" :src="userIndex.avatarUrl"></el-avatar></div>
                    <div class="block"><h2>{{userIndex.login}}</h2></div>
                  </el-col>
                </el-row>
                  <el-row>
                    <el-col :span="8" align="right"><i class="el-icon-potato-strips"/> Join Date</el-col>
                    <el-col :span="15" align="left"  :offset="1">{{userIndex.createdAt}}</el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8" align="right"><i class="el-icon-cpu"/> Top Repo</el-col>
                    <el-col :span="15" align="left"  :offset="1">{{userIndex.topRepository}}</el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8" align="right"><i class="el-icon-s-custom"/> Followers</el-col>
                    <el-col :span="15" align="left"  :offset="1">{{userIndex.followers}}</el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8" align="right"><i class="el-icon-star-on"/> Get Stars</el-col>
                    <el-col :span="15" align="left" :offset="1">{{userIndex.ownStars}}</el-col>
                  </el-row>
                </el-card>
              </el-aside>
              <el-container>
                <el-header height="20px">
                  <el-row type="flex" justify="center">
                  <el-col  align="right"><h2><i class="el-icon-medal"></i>total score</h2></el-col>
                  <el-col :offset="1" align="left"><h2>{{userIndex.score}}</h2></el-col>
                  </el-row>
                </el-header>
                <el-main>
                  <template>
                    <ve-radar-chart :data="chartData" :legend="legend"/>
                  </template>

                </el-main>
              </el-container>
            </el-container>
          </template>
        </div>
      </el-main>
      <el-footer>
        <el-row type="flex" class="row-bg" >
          <el-col align="center">Made by  li24361</el-col>
        </el-row>
        </el-footer>
    </el-container>
</template>

<script>

import ElCol from "element-ui/packages/col/src/col";
import ElRow from "element-ui/packages/row/src/row";
import ElCard from "../node_modules/element-ui/packages/card/src/main.vue";


export default {
    components: {
        ElCard,
        ElRow,
        ElCol},
    data() {
        return {
            input: this.$cookies.get("login"),
            loading: false,
            legend: {show: false},
            loginName: this.$cookies.get("login"),
            activeLink: null,
            userIndex: {},
            chartData: {
                dimensions: [
                    {name: 'star ', max: 100},
                    {name: 'follower ', max: 100},
                    {name: 'own code ', max: 100},
                    {name: 'open source', max: 100},
                    {name: 'activity', max: 100}
                ],
                measures: []
            }
        };
    },
    computed: {
        measures: function () {
            return this.chartData.measures.push({
                name: 'userIndex',
                data:[
                this.userIndex.allStarsScore,
                    this.userIndex.followerScore,
                    this.userIndex.repositoryHIndexScore,
                    this.userIndex.contributeRepositoryHIndexScore,
                    this.userIndex.contributesScore
                ]
            });
        },
        islogin(){
            return this.$cookies.isKey("login")
        }
    },
  methods: {
    login() {
        this.loading = true;
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
                this.$notify(error.data)
            })
            .finally(() => this.loading = false)
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
        this.loading = true;
        this.axios
            .post('/search', {
                login: this.input,
                userName: this.$cookies.get("login")
            },
            {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
            .then(response => {
                if (response.data.code==0) {
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
                            name: 'userIndex',
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
                } else{
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
            .finally(() => this.loading = false)
    },
    logout() {
        this.$cookies.remove("login")
        this.$router.go(0)
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
.el-container {
  width: 70%;
  margin: 10px auto;
  text-align: center;
}

</style>
