<i18n lang="yaml">
pt:
  ignitionOn: Ignição Ligada
</i18n>

<template>
  <div ref="gchart">
    <GChart
      v-loading="loading"
      :style="`height: ${height}px`"
      type="Timeline"
      :data="data"
      :options="options"
      :settings="settings"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { GChart } from 'vue-google-charts/legacy'

export default {
  name: 'TripsDevice',
  components: {
    GChart
  },
  data () {
    return {
      height: 300,
      rows: undefined,
      data: [
        { type: 'string' },
        { type: 'date' },
        { type: 'date' }
      ],
      options: {
        colors: this.$colors
      },
      settings: {
        packages: ['timeline'],
        language: this.$i18n.locale
      }
    }
  },
  computed: {
    ...mapGetters(['trips', 'devices', 'from', 'to', 'loading'])
  },
  watch: {
    from (from) {
    },
    to (to) {
    },
    trips (trips) {
      this.height = this.$refs.gchart.parentElement.clientHeight
      this.data = trips.map(t =>
        [this.devices.find(d => d.id === t.deviceId).name,
          new Date(t.startTime), new Date(t.endTime)])
    }
  }
}
</script>
