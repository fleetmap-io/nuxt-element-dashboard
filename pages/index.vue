<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <el-container>
      <el-header style="text-align: center; font-size: 12px">
        <span>Dashboard</span>
        <div style="float: right;">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px" />
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>View</el-dropdown-item>
              <el-dropdown-item>Add</el-dropdown-item>
              <el-dropdown-item>Delete</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span style="text-align: right">Tom</span>
        </div>
      </el-header>
      <el-main>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
}
</script>

<style>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
  text-align: center;
}

.el-aside {
  color: #333;
}
</style>
