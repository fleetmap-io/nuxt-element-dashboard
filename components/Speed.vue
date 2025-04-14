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
  name: 'SpeedChart',
  props: {
    type: {
      default: 'maxSpeed',
      type: String
    },
    entity: {
      default: 'devices',
      type: String
    }
  },
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
    ...mapGetters(['summary', 'devices', 'height', 'loading', 'trips', 'driver'])
  },
  watch: {
    trips () {
      this.convertData(this.trips)
    },
    summary () {
      if (this.entity === 'devices') {
        this.convertData(this.summary)
      }
    }
  },
  methods: {
    convertData (summaries) {
      if (this.entity === 'devices') {
        const labels = this.devices.map(d => d.name)
        this.chartData.labels = labels.map(l => this.$t(l))
        this.chartData.datasets[0] = {
          data: summaries.map(s => Math.round(s[this.type] * 1.852)),
          backgroundColor: this.devices.map((d, i) => this.$color(i))
        }
      } else {
        const drivers = summaries
          .filter(t => t.driverUniqueId)
          .reduce((p, c) => p.includes(c.driverUniqueId) ? p : p.concat([c.driverUniqueId]), [])
        this.chartData.labels = drivers.map(d => this.driver(d))
        this.chartData.datasets[0] = {
          data: drivers.map(uniqueId => summaries
            .filter(t => t.driverUniqueId === uniqueId)
            .reduce((p, c) => Math.max(p, c.maxSpeed), 0)
          ),
          backgroundColor: drivers.map((d, i) => this.$color(i))
        }
      }
    }
  }
}
</script>
