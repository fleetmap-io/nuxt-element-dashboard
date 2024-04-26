<i18n lang="yaml">
fr:
  Events: Événements
  Trips: Voyages
  Hours: Heures
  Groups: Groupes
  Drivers: Conducteurs
  Daily: 'Tous les jours'
  Fuel: Carburant
  'Avg Speed': 'Vitesse moyenne'
</i18n>
<template>
  <div style="padding: 10px">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-date-picker
          v-model="dateRange"
          style="width: 100%"
          type="daterange"
          unlink-panels
          range-separator="-"
          value-format="timestamp"
          :picker-options="pickerOptions"
        />
      </el-col>
      <el-col :span="8" />
      <el-col :span="8" />
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <events />
      </el-col>
      <el-col :span="8">
        <trips />
      </el-col>
      <el-col :span="8">
        <kms />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <span>{{ $t('Events') }}</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <span>{{ $t('Trips') }}</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <span>{{ $t('Kms') }}</span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <hours />
      </el-col>
      <el-col :span="8">
        <fuel />
      </el-col>
      <el-col :span="8">
        <speed />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <span>{{ $t('Hours') }}</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <span>{{ $t('Fuel') }}</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <span>{{ $t('Avg Speed') }}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Events from '@/components/Events.vue'
import Trips from '@/components/Trips.vue'
import Kms from '@/components/Kms.vue'
import Hours from '@/components/Hours.vue'
import Fuel from '@/components/Fuel.vue'
import Speed from '@/components/Speed.vue'

export default {
  name: 'DashbordComponent',
  components: { Events, Trips, Kms, Hours, Fuel, Speed },
  data () {
    return {
      pickerOptions: {
        shortcuts: [{
          text: this.$t('Today'),
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            end.setHours(23)
            end.setMinutes(59)
            end.setSeconds(59)
            start.setHours(0)
            start.setMinutes(0)
            start.setSeconds(0)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: this.$t('Yesterday'),
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            end.setTime(start.getTime() - 3600 * 1000 * 24)
            start.setTime(start.getTime() - 3600 * 1000 * 24)
            end.setHours(23)
            end.setMinutes(59)
            end.setSeconds(59)
            start.setHours(0)
            start.setMinutes(0)
            start.setSeconds(0)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: this.$t('Last week'),
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: this.$t('Last month'),
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: this.$t('Last 3 months'),
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }],
        firstDayOfWeek: 1
      }
    }
  },
  computed: {
    dateRange: {
      set (value) {
        this.$store.commit('setDateRange', value)
      },
      get () {
        return this.$store.getters.dateRange
      }
    }
  }
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
