export const state = () => ({
  user: null,
  geofences: [],
  devices: [],
  groups: [],
  drivers: [],
  users: [],
  dateRange: [new Date(new Date() - 1000 * 60 * 60 * 24 * 3), new Date()],
  loading: false,
  trips: [],
  summary: [],
  events: []
})

export const getters = {
  from: state => state.dateRange[0] && new Date(state.dateRange[0]).toISOString(),
  to: state => state.dateRange[1] && new Date(state.dateRange[1]).toISOString(),
  loading: state => state.loading,
  deviceIds: state => state.devices.map(d => `deviceId=${d.id}`).join('&'),
  dateRange: state => state.dateRange,
  summary: state => state.summary,
  user: state => state.user,
  trips: state => state.trips,
  devices: state => state.devices,
  events: state => state.events
}

export const mutations = {
  setDateRange (state, dateRange) {
    state.dateRange = dateRange
  },
  SET_DEVICES (state, devices) {
    state.devices = devices.slice(0, 4)
  },
  SET_TRIPS (state, trips) {
    state.trips = trips
  },
  SET_SUMMARY (state, summary) {
    state.summary = summary
  },
  SET_EVENTS (state, events) {
    state.events = events
  }
}

export const actions = {
  async initData ({ commit, getters }) {
    commit('SET_DEVICES', await this.$axios.$get('devices'))
    const trips = await this.$axios.$get(`reports/trips?${getters.deviceIds}&from=${getters.from}&to=${getters.to}`)
      .catch(e => this.$message.error(e.message))
    commit('SET_TRIPS', trips)
    const summary = await this.$axios.$get(`reports/summary?${getters.deviceIds}&from=${getters.from}&to=${getters.to}`)
      .catch(e => alert(e.message))
    commit('SET_SUMMARY', summary)
    commit('SET_EVENTS', await this.$axios.$get(`reports/events?${getters.deviceIds}&from=${getters.from}&to=${getters.to}`))
  }
}
