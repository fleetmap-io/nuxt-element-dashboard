<template>
  <div style="padding: 10px">
    <el-row :gutter="20">
      <el-col :span="8">
        <bar-chart />
        <div class="grid-content bg-purple">
          <span>This text is centered.</span>
        </div>
      </el-col>
      <el-col :span="8">
        <bar-chart />
        <div class="grid-content bg-purple">
          <span>This text is centered.</span>
        </div>
      </el-col>
      <el-col :span="8">
        <bar-chart />
        <div class="grid-content bg-purple">
          <span>This text is centered.</span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <bar-chart />
        <div class="grid-content bg-purple">
          <span>This text is centered.</span>
        </div>
      </el-col>
      <el-col :span="8">
        <bar-chart />
        <div class="grid-content bg-purple">
          <span>This text is centered.</span>
        </div>
      </el-col>
      <el-col :span="8">
        <bar-chart />
        <div class="grid-content bg-purple">
          <span>This text is centered.</span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <bar-chart />
        <div class="grid-content bg-purple">
          <span>This text is centered.</span>
        </div>
      </el-col>
      <el-col :span="8">
        <bar-chart />
        <div class="grid-content bg-purple">
          <span>This text is centered.</span>
        </div>
      </el-col>
      <el-col :span="8">
        <bar-chart />
        <div class="grid-content bg-purple">
          <span>This text is centered.</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BarChart from '@/components/BarChart.vue'

export default {
  name: 'DashbordComponent',
  components: { BarChart }
}
</script>

<style>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  padding: 8px;
  text-align: center;
  vertical-align: center;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
