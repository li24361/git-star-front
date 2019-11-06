<template>
  <div id="app">
    <el-container>
      <el-header>
          <top/>
      </el-header>
      <el-main style="height: 850px">
        <router-view></router-view>
      </el-main>
      <el-footer>
          <end/>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
  import header from "~/header"
  import footer from "~/footer";
  export default {
    name: 'app',
    components: {
      'top': header,
      'end': footer

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

</style>