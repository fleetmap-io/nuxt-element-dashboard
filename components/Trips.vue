<i18n lang="yaml">
pt:
  ignitionOn: Ignição Ligada
</i18n>

<template>
  <Bar
    v-loading="loading"
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { mapGetters } from 'vuex'

export default {
  name: 'TripsChart',
  components: { Bar },
  data () {
    return {
      chartId: {
        type: String,
        default: 'bar-chart'
      },
      datasetIdKey: {
        type: String,
        default: 'label'
      },
      width: {
        type: Number,
        default: 400
      },
      height: {
        type: Number,
        default: 400
      },
      cssClasses: {
        default: '',
        type: String
      },
      styles: {
        type: Object,
        default: () => {}
      },
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
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters(['trips', 'devices'])
  },
  watch: {
    trips () {
      this.convertData(this.trips)
      this.loading = false
    }
  },
  methods: {
    convertData (trips) {
      const labels = []
      trips.forEach((e) => {
        if (!labels.includes(e.type)) {
          labels.push(e.type)
        }
      })
      this.chartData.labels = this.devices.map(d => d.name)
      this.chartData.datasets[0] = {
        data: this.devices.map(d => trips.filter(t => t.deviceId === d.id).length),
        backgroundColor: this.devices.map((d, i) => this.$color(i))
      }
    }
  }
}
</script>
