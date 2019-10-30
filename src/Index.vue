<template>
    <el-container>
      <el-header>
        <el-menu :default-active="$route.path" mode="horizontal" router>
        <template  v-if="islogin">
          <el-submenu index="" style="float: right;" >
            <template slot="title"><i class="el-icon-menu"> {{loginName}}</i></template>
            <el-menu-item index=""><i class="el-icon-setting"></i> Settings</el-menu-item>
            <el-menu-item index=""  @click="logout"><i class="el-icon-circle-close"></i> Logout</el-menu-item>
          </el-submenu>
        </template>
          <el-menu-item index="/" style="float: right;">说明</el-menu-item>
          <el-menu-item index="/" style="float: right;">主页</el-menu-item>
        </el-menu>
      </el-header>
      <el-main style="height: 850px">
        <div id="app">
          <template v-if="!islogin ">
            <img src="https://i.loli.net/2019/10/26/2c83rMLYOZtXI4V.png" style="margin-bottom: 20px" />
            <div>
              <el-button type="primary" :loading="loading" @click="login" icon="el-icon-user-solid">使用 Github 登录</el-button>
            </div>
            <div>
              <h1>为什么需要登录？</h1>
              该项目使用acccess_token访问github的api，每小时有次数限制,所以使用各位自己的token来查询
            </div>
          </template>
          <template v-else-if="islogin">
            <div>
              <img src="https://i.loli.net/2019/10/26/2c83rMLYOZtXI4V.png" style="margin-bottom: 20px" />
              <el-row  type="flex" justify="center">
                <el-col :span="3" align="right" :offset="9"><el-input v-model="input"  placeholder="input your login" ></el-input></el-col>
                <el-col :span="11" align="left" :offset="1"><el-button type="primary" :loading="loading"  @click="query" icon="el-icon-search">查询</el-button></el-col>
              </el-row>
            </div>
          </template>
          <template v-if="!!this.userIndex.login">
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
                    <div class="block"><el-link :href="githublink" :underline="false" target="_blank"><h2>{{userIndex.login}}</h2></el-link></div>
                  </el-col>
                </el-row>
                  <el-row>
                    <el-col :span="10" align="right"><i class="el-icon-potato-strips"/> Join Date</el-col>
                    <el-col :span="13" align="left"  :offset="1">{{userIndex.createdAt}}</el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="10" align="right"><i class="el-icon-cpu"/> Top Repo</el-col>
                    <el-col :span="13" align="left"  :offset="1">{{userIndex.topRepository}}</el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="10" align="right"><i class="el-icon-s-custom"/> Followers</el-col>
                    <el-col :span="13" align="left"  :offset="1">{{userIndex.followers}}</el-col>
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
                  <el-col  align="right"><h2><i class="el-icon-medal"></i>ladder score</h2></el-col>
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
          <el-col align="center">

          </el-col>
        </el-row>
        </el-footer>
    </el-container>
</template>

<script>



export default {
    data() {
        return {
            input: this.$cookies.get("login"),
            loading: false,
            legend: {show: false},
            loginName: this.$cookies.get("login"),
            activeLink: null,
            userIndex: {},
            itemStyle: { normal: { areaStyle: { type: 'default' } } },
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
            // return true
            return this.$cookies.isKey("login")
        },
        githublink() {
            return 'https://github.com/'+this.userIndex.login
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
                this.$notify({
                    title: '错误提示',
                    type: 'error',
                    message: 'server error!'
                });
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
                 // userName: "li24361"
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
.el-container {
  width: 800px;
  margin: 10px auto;
  text-align: center;
}
.el-menu--horizontal .el-submenu > .el-menu {
  left: initial !important;
  right: 0;
}

</style>
