<template>
  <pie-chart
    v-loading="loading"
    :chart-options="chartOptions"
    :chart-data="chartData"
    :height="height*2"
  />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HoursDriver',
  data () {
    return {
      chartData: {
        labels: [],
        datasets: [{ data: [] }]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  computed: {
    ...mapGetters(['trips', 'driver', 'drivers', 'height', 'loading'])
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
          .reduce((p, c) => p + c.duration, 0)
        ).map(duration => Math.round(duration / 1000 / 60 / 60)),
        backgroundColor: drivers.map((d, i) => this.$color(i))
      }
    }
  }
}
</script>
