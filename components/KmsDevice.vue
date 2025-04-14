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
  name: 'KmsDevice',
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
    ...mapGetters(['summary', 'devices', 'height', 'loading'])
  },
  watch: {
    summary () {
      this.convertData(this.summary)
    }
  },
  methods: {
    convertData (summaries) {
      this.chartData.labels = this.devices.map(d => d.name)
      this.chartData.datasets[0] = {
        data: summaries.map(s => s.distance),
        backgroundColor: this.devices.map((d, i) => this.$color(i))
      }
    }
  }
}
</script>
