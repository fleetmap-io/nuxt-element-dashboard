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
      loading: false,
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
            type: 'time',
            stacked: true,
            min: new Date(this.from).getTime(),
            max: new Date(this.to).getTime()
          },
          y: {
            stacked: true
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters(['trips', 'devices', 'height', 'from', 'to'])
  },
  watch: {
    from (from) {
      this.chartOptions.scales.x.min = new Date(from).getTime()
      this.chartOptions = { ...this.chartOptions }
    },
    to (to) {
      this.chartOptions.scales.x.max = new Date(to).getTime()
      this.chartOptions = { ...this.chartOptions }
    },
    trips (trips) {
      this.chartData.labels = this.devices.map(d => d.name)
      this.chartData.datasets = this.devices.map((d, i) => {
        return {
          data: trips.filter(t => t.deviceId === d.id).map((t) => {
            return {
              x: new Date(t.startTime),
              y: new Date(t.endTime)
            }
          }),
          backgroundColor: this.$color(i)
        }
      })
      this.loading = false
    }
  }
}
</script>
