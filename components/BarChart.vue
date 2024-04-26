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
  name: 'BarChart',
  components: { Bar },
  props: {
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
    }
  },
  data () {
    return {
      loading: true,
      chartData: {
        labels: ['January', 'February', 'March'],
        datasets: [{ data: [40, 20, 12] }]
      },
      chartOptions: {
        responsive: true
      }
    }
  },
  computed: {
    ...mapGetters(['deviceIds', 'from', 'to'])
  },
  watch: {
    deviceIds () {
      this.get()
    },
    from () {
      this.get()
    }
  },
  methods: {
    get () {
      if (this.deviceIds && this.from && this.to) {
        const url = `reports/events?${this.deviceIds}&from=${this.from}&to=${this.to}`
        this.$axios.$get(url)
      }
    }
  }
}
</script>
