export const state = () => ({
  session: {},
  geofences: [],
  devices: [],
  groups: [],
  drivers: [],
  users: [],
  dateRange: [new Date(new Date() - 1000 * 60 * 60 * 24 * 3), new Date()],
  loading: true,
  trips: [],
  summary: [],
  events: [],
  percentage: 0,
  selectedGroup: -1
})

export const getters = {
  from: state => state.dateRange[0] && new Date(state.dateRange[0]).toISOString(),
  to: state => state.dateRange[1] && new Date(state.dateRange[1]).toISOString(),
  loading: state => state.loading,
  driver: state => (uniqueId) => {
    const result = state.drivers.find(d => d.uniqueId === uniqueId)
    return (result && result.name) || uniqueId
  },
  drivers: state => state.drivers,
  dateRange: state => state.dateRange,
  summary: state => state.summary,
  trips: state => state.trips,
  devices: state => state.devices,
  events: state => state.events,
  session: state => state.session,
  height: () => 300,
  percentage: state => state.percentage,
  groups: state => state.groups
}

export const mutations = {
  SET_DATE_RANGE (state, dateRange) {
    state.dateRange = dateRange
  },
  SET_DEVICES (state, devices) {
    state.allDevices = devices
    if (devices) {
      state.devices = devices.filter(d => d.groupId === state.selectedGroup).slice(0, 50).sort((a, b) => a.name.localeCompare(b.name))
    }
  },
  SET_DRIVERS (state, drivers) {
    state.drivers = drivers
  },
  SET_TRIPS (state, trips) {
    state.trips = trips
  },
  SET_SUMMARY (state, summary) {
    summary.forEach((s) => {
      s.distance = Math.round(s.distance / 1000)
      s.maxSpeed = Math.round(s.maxSpeed * 1.852)
      s.spentFuel = Math.round(s.spentFuel)
      s.engineHours = Math.round((s.engineHours > 0 ? s.engineHours : 0) / 1000 / 60 / 60)
      delete s.averageSpeed
      delete s.startOdometer
      delete s.endOdometer
    })
    state.summary = summary
  },
  SET_EVENTS (state, events) {
    state.events = events
  },
  SET_SESSION (state, session) {
    state.session = session
  },
  SET_LOADING (state, loading) {
    state.loading = loading
  },
  SET_PERCENTAGE (state, percentage) {
    state.percentage = percentage
  },
  SET_GROUPS (state, groups) {
    state.groups = groups
    state.selectedGroup = groups[0] && groups[0].id
  },
  SET_SELECTED_GROUP (state, selected) {
    state.selectedGroup = selected
  }
}

export const actions = {
  async initData ({ commit, dispatch }) {
    commit('SET_SESSION', await this.$axios.$get('session'))
    commit('SET_GROUPS', await this.$axios.$get('groups'))
    commit('SET_DEVICES', await this.$axios.$get('devices'))
    commit('SET_DRIVERS', await this.$axios.$get('drivers'))
    dispatch('getData')
  },
  refresh ({ commit, dispatch, state }) {
    commit('SET_DEVICES', state.allDevices)
    return dispatch('getData')
  },
  async getData ({ commit, getters, state }) {
    commit('SET_LOADING', true)
    let percentage = 0
    commit('SET_PERCENTAGE', percentage)
    try {
      const types = ['trips', 'summary'].map(t => `type=${t}`).join('&')
      const data = await Promise.all(state.devices.map(async (device) => {
        const result = await this.$axios.$get(`reports/allinone?deviceId=${device.id}&from=${getters.from}&to=${getters.to}&${types}`)
        percentage += 50 / state.devices.length
        commit('SET_PERCENTAGE', Math.round(percentage))
        result.events = await this.$axios.$get(`reports/events?deviceId=${device.id}&from=${getters.from}&to=${getters.to}`)
        percentage += 50 / state.devices.length
        commit('SET_PERCENTAGE', Math.round(percentage))
        return result
      }))
      const trips = data.map(d => d.trips).flat()
      const summary = data.map(d => d.summary).flat()
      const events = data.map(d => d.events).flat()
      commit('SET_TRIPS', trips)
      commit('SET_SUMMARY', summary)
      commit('SET_EVENTS', events)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
      alert(e.message)
    }
    commit('SET_LOADING', false)
  }
}
