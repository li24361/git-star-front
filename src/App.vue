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