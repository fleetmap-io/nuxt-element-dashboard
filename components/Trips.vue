<i18n lang="yaml">
pt:
  ignitionOn: Ignição Ligada
</i18n>

<template>
  <Bar
    v-loading="loading"
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { mapGetters } from 'vuex'

export default {
  name: 'TripsChart',
  components: { Bar },
  data () {
    return {
      chartId: {
        type: String,
        default: 'bar-chart'
      },
      datasetIdKey: {
        type: String,
        default: 'label'
      },
      width: {
        type: Number,
        default: 400
      },
      height: {
        type: Number,
        default: 400
      },
      cssClasses: {
        default: '',
        type: String
      },
      styles: {
        type: Object,
        default: () => {}
      },
      plugins: {
        type: Array,
        default: () => []
      },
      loading: true,
      chartData: {
        labels: [],
        datasets: [{ data: [] }]
      },
      chartOptions: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters(['trips', 'devices'])
  },
  watch: {
    trips (trips) {
      this.chartData.labels = this.devices.map(d => d.name)
      this.chartData.datasets = this.devices.map((d) => {
        return {
          data: trips.filter(t => t.deviceId === d.id).map(t => [new Date(t.startTime).getTime(), new Date(t.endTime).getTime()]),
          backgroundColor: 'red'
        }
      })
      this.loading = false
    }
  }
}
</script>
