<i18n lang="yaml">
fr:
  Last week: La semaine dernière
  Today: "Aujourd'hui"
  Last month: Le mois dernier
  Events: Événements
  Trips: Voyages
  Hours: Heures
  Groups: Groupes
  Drivers: Conducteurs
  Daily: 'Tous les jours'
  Fuel: Carburant
  'Avg Speed': 'Vitesse moyenne'
pt:
  Events: Eventos
  Trips: Viagens
  Hours: Horas
  Fuel: Combustível
  'Avg Speed': 'Velocidade Média'
  unidentifiedDriver: 'Sem conductor'
  hardCornering: 'Viragem brusca'
  hardBraking: 'Travagem brusca'
  hardAcceleration: 'Acel. Brusca'
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
      <el-col :span="8">
        <el-progress v-if="loading" :percentage="percentage" />
      </el-col>
    </el-row>
    <el-row :gutter="20" style="display: flex; flex-direction: row">
      <el-col :span="8">
        <el-card :header="$t('Events')" shadow="never">
          <events />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card :header="$t('Trips')" shadow="never">
          <trips />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card :header="$t('Kms')" shadow="never">
          <kms />
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="never" :header="$t('Hours')">
          <hours />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="never" :header="$t('Fuel')">
          <fuel />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="never" :header="$t('Speed')">
          <speed />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Events from '@/components/Events.vue'
import Trips from '@/components/Trips.vue'
import Kms from '@/components/Kms.vue'
import Hours from '@/components/Hours.vue'
import Fuel from '@/components/Fuel.vue'
import Speed from '@/components/Speed.vue'

export default {
  name: 'DashboardComponent',
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
        }],
        firstDayOfWeek: 1
      }
    }
  },
  computed: {
    ...mapGetters(['from', 'to', 'percentage', 'loading']),
    dateRange: {
      set (value) {
        this.$store.commit('SET_DATE_RANGE', value)
      },
      get () {
        return this.$store.getters.dateRange
      }
    }
  },
  watch: {
    from () {
      this.$store.dispatch('initData')
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
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-card {
  border-radius: 10px;
  border-width: 2px;
  height: 100%;
}
.el-card__body {
  padding: 5px;
  height: calc(100% - 57px);
}
</style>
