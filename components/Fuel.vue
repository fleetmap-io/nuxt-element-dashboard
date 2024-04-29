<template>
  <line-chart
    v-loading="loading"
    :chart-options="chartOptions"
    :chart-data="chartData"
    :height="height"
  />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FuelChart',
  data () {
    return {
      chartData: {
        labels: [],
        datasets: [{}]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters(['summary', 'devices', 'height', 'loading'])
  },
  watch: {
    summary () {
      this.convertData(this.summary)
    }
  },
  methods: {
    convertData (summaries) {
      const labels = this.devices.map(d => d.name)
      this.chartData.labels = labels.map(l => this.$t(l))
      this.chartData.datasets[0] = {
        data: summaries.map(s => Math.round(s.spentFuel)),
        backgroundColor: this.devices.map((d, i) => this.$color(i))
      }
    }
  }
}
</script>
