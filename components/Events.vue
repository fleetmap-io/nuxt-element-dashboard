<i18n lang="yaml">
pt:
  ignitionOn: Ignição Ligada
  ignitionOff: Ignição Desligada
  events: Eventos
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
  name: 'EventsChart',
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
            display: true
          }
        },
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters(['events', 'devices', 'height', 'loading'])
  },
  watch: {
    events () {
      try {
        this.convertData(this.events)
      } catch (e) {
        this.$message.error(e.message)
      }
    }
  },
  methods: {
    convertData (events) {
      const getType = e => e.attributes.alarm || e.type
      const labels = []
      events.forEach(e => !labels.includes(getType(e)) && labels.push(getType(e)))
      this.chartData.labels = labels.map(l => this.$t(l))
      this.chartData.datasets = this.devices.map((d) => {
        return {
          data: labels.map(l => events.filter(e => getType(e) === l && e.deviceId === d.id).length),
          backgroundColor: this.$color(this.devices.indexOf(d)) + 'DF',
          borderColor: this.$color(this.devices.indexOf(d)) + 'DF',
          label: d.name
        }
      })
    }
  }
}
</script>
