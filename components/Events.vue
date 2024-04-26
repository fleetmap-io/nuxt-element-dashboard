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
  name: 'EventsChart',
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
      loading: false,
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
    ...mapGetters(['events', 'devices'])
  },
  watch: {
    events () {
      try {
        this.convertData(this.events)
        this.loading = false
      } catch (e) {
        this.$message.error(e.message)
      }
    }
  },
  methods: {
    convertData (events) {
      const labels = []
      events.forEach((e) => {
        if (!labels.includes(e.type)) {
          labels.push(e.type)
        }
      })
      this.chartData.labels = labels.map(l => this.$t(l))
      this.chartData.datasets[0] = {
        data: labels.map(l => events.filter(e => e.type === l).length),
        backgroundColor: labels.map((d, i) => this.$color(i))
      }
    }
  }
}
</script>
