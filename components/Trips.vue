<i18n lang="yaml">
pt:
  ignitionOn: Ignição Ligada
</i18n>

<template>
  <bar-chart
    v-loading="loading"
    :chart-options="chartOptions"
    :chart-data="chartData"
    :height="height"
  />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TripsChart',
  data () {
    return {
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
        },
        scales: {
          x: {
            type: 'time'
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters(['trips', 'devices', 'height'])
  },
  watch: {
    trips (trips) {
      this.chartData.labels = this.devices.map(d => d.name)
      this.chartData.datasets = this.devices.map((d) => {
        return {
          data: trips.filter(t => t.deviceId === d.id).map((t) => {
            return {
              x: new Date(t.startTime),
              y: 1
            }
          }),
          backgroundColor: 'red'
        }
      })
      this.loading = false
    }
  }
}
</script>
