<template>
  <pie-chart
    :chart-options="chartOptions"
    :chart-data="chartData"
    :height="height"
  />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HoursChart',
  data () {
    return {
      loading: true,
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
    ...mapGetters(['summary', 'devices', 'height'])
  },
  watch: {
    summary () {
      this.convertData(this.summary)
      this.loading = false
    }
  },
  methods: {
    convertData (summaries) {
      const labels = this.devices.map(d => d.name)
      this.chartData.labels = labels.map(l => this.$t(l))
      this.chartData.datasets[0] = {
        data: summaries.map(s => Math.round(s.engineHours / 1000 / 60 / 60)),
        backgroundColor: this.devices.map((d, i) => this.$color(i))
      }
    }
  }
}
</script>
