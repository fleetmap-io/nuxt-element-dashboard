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
  name: 'KmsDriver',
  data () {
    return {
      chartData: {
        labels: [],
        datasets: [{ data: [] }]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters(['trips', 'devices', 'height', 'loading', 'drivers', 'driver'])
  },
  watch: {
    trips (trips) {
      const drivers = trips
        .filter(t => t.driverUniqueId)
        .reduce((p, c) => p.includes(c.driverUniqueId) ? p : p.concat([c.driverUniqueId]), [])
      this.chartData.labels = drivers.map(d => this.driver(d))
      this.chartData.datasets[0] = {
        data: drivers.map(uniqueId => trips
          .filter(t => t.driverUniqueId === uniqueId)
          .reduce((p, c) => p + c.distance, 0)
        ).map(distance => Math.round(distance / 1000)),
        backgroundColor: drivers.map((d, i) => this.$color(i))
      }
    }
  }
}
</script>
