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
  vehicles: véhicules
  drivers: conducteurs
pt:
  Speed: Velocidade
  drivers: motoristas
  Events: Eventos
  vehicles: veículos
  Trips: Viagens
  Hours: Horas
  Fuel: Combustível
  Avg Speed: 'Velocidade Média'
  Max speed: 'Velocidade máxima'
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
        <el-progress :percentage="percentage" />
      </el-col>
    </el-row>
    <el-row :gutter="20" style="display: flex; flex-direction: row">
      <el-col :span="8">
        <el-card :header="$t('Trips')+' '+ $t('vehicles')" shadow="never">
          <trips-device />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-card :header="$t('Kms')+' '+ $t('vehicles')" shadow="never">
            <kms-device />
          </el-card>
        </el-row>
        <el-row>
          <el-card :header="$t('Max speed') +' '+ $t('vehicles')" shadow="never">
            <speed />
          </el-card>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-card :header="$t('Hours')+' '+ $t('vehicles')" shadow="never">
          <hours-device />
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="display: flex; flex-direction: row">
      <el-col :span="8">
        <el-card :header="$t('Trips') +' '+ $t('drivers')" shadow="never">
          <trips-driver />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-card :header="$t('Kms')+' '+ $t('drivers')" shadow="never">
            <kms-driver />
          </el-card>
        </el-row>
        <el-row>
          <el-card :header="$t('Max speed')+' '+ $t('drivers')" shadow="never">
            <speed entity="drivers" />
          </el-card>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-card :header="$t('Hours')+' '+ $t('drivers')" shadow="never">
          <hours-driver />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DashboardComponent',
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
