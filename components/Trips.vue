<i18n lang="yaml">
pt:
  ignitionOn: Ignição Ligada
</i18n>

<template>
  <GChart type="Timeline" :data="data" :options="options" :settings="settings" />
</template>

<script>
import { mapGetters } from 'vuex'
import { GChart } from 'vue-google-charts/legacy'

export default {
  name: 'TripsChart',
  components: {
    GChart
  },
  data () {
    return {
      rows: undefined,
      loading: false,
      data: [
        { type: 'string' },
        { type: 'date' },
        { type: 'date' }
      ],
      options: {
        colors: this.$colors
      },
      settings: {
        packages: ['timeline']
      }
    }
  },
  computed: {
    ...mapGetters(['trips', 'devices', 'height', 'from', 'to'])
  },
  watch: {
    from (from) {
    },
    to (to) {
    },
    trips (trips) {
      this.data = trips.map(t =>
        [this.devices.find(d => d.id === t.deviceId).name,
          new Date(t.startTime), new Date(t.endTime)])
      this.loading = false
    }
  }
}
</script>
