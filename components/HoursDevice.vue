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
  name: 'HoursDevice',
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
        data: summaries.map(s => s.engineHours),
        backgroundColor: this.devices.map((d, i) => this.$color(i))
      }
    }
  }
}
</script>
